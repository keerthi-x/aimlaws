import { useEffect, useRef } from "react";
import { createWorld, detectPeople, stepWorld, type PlazaWorld, type ScreenMap } from "@/lib/scene/plaza";
import { drawCameraFrame, drawPlaza, videoToCanvasBox } from "@/lib/scene/draw";
import { SortTracker } from "@/lib/tracker/sort";
import type { Association, Detection, PipelineStats, TrackEvent, TrackSnapshot } from "@/lib/tracker/types";
import { detectPersons, loadPersonDetector } from "@/lib/vision/coco";
import { usePipeline } from "@/store/pipeline";

type Result = {
  detections: Detection[];
  tracks: TrackSnapshot[];
  associations: Association[];
  events: TrackEvent[];
  stats: PipelineStats;
};

const emptyStats: PipelineStats = {
  frame: 0,
  detections: 0,
  active: 0,
  occluded: 0,
  tentative: 0,
  recoveries: 0,
  idSwitches: 0,
  lost: 0,
};

const emptyResult: Result = {
  detections: [],
  tracks: [],
  associations: [],
  events: [],
  stats: emptyStats,
};

const STEP = 1 / 30;

export function Viewport() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const worldRef = useRef<PlazaWorld>(createWorld("courtyard"));
  const trackerRef = useRef(new SortTracker());
  const streamRef = useRef<MediaStream | null>(null);
  const lastDetectRef = useRef(0);
  const cameraDetsRef = useRef<Detection[]>([]);
  const detectBusy = useRef(false);
  const resultRef = useRef<Result>(emptyResult);
  const accRef = useRef(0);
  const frameRef = useRef(0);

  const source = usePipeline((s) => s.source);
  const scenario = usePipeline((s) => s.scenario);
  const resetKey = usePipeline((s) => s.resetKey);
  const maxAge = usePipeline((s) => s.maxAge);
  const minHits = usePipeline((s) => s.minHits);
  const iouThreshold = usePipeline((s) => s.iouThreshold);

  useEffect(() => {
    worldRef.current = createWorld(scenario);
    trackerRef.current.reset();
    cameraDetsRef.current = [];
    resultRef.current = emptyResult;
    accRef.current = 0;
    frameRef.current = 0;
  }, [scenario, resetKey, source]);

  useEffect(() => {
    trackerRef.current.setParams({
      maxAge,
      minHits,
      iouThreshold,
      lowIouThreshold: Math.max(0.08, iouThreshold - 0.15),
    });
  }, [maxAge, minHits, iouThreshold]);

  useEffect(() => {
    let cancelled = false;
    const video = videoRef.current;

    async function startCamera() {
      if (source !== "camera" || !video) return;
      usePipeline.getState().setDetectorLoading(true);
      usePipeline.getState().setCameraError(null);
      try {
        await loadPersonDetector();
        if (cancelled) return;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        video.srcObject = stream;
        await video.play();
        trackerRef.current.reset();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Camera or detector is unavailable in this session.";
        usePipeline.getState().setCameraError(message);
        usePipeline.getState().setSource("plaza");
      } finally {
        if (!cancelled) usePipeline.getState().setDetectorLoading(false);
      }
    }

    if (source === "camera") {
      void startCamera();
    } else {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      if (video) video.srcObject = null;
    }

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [source, resetKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let lastUi = 0;
    let alive = true;

    const loop = (now: number) => {
      if (!alive) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const rect = wrap.getBoundingClientRect();
      const cssW = Math.max(1, rect.width);
      const cssH = Math.max(1, rect.height);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        canvas.style.width = `${cssW}px`;
        canvas.style.height = `${cssH}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const map: ScreenMap = { width: cssW, height: cssH };
      const state = usePipeline.getState();
      const overlay = {
        detections: state.showDetections,
        tracks: state.showTracks,
        trails: state.showTrails,
        predicted: state.showPredicted,
        selectedId: state.selectedId,
      };

      if (state.running) accRef.current += dt;

      while (accRef.current >= STEP) {
        accRef.current -= STEP;
        if (!state.running) break;
        frameRef.current += 1;
        let detections: Detection[] = [];
        if (state.source === "plaza") {
          stepWorld(worldRef.current, STEP);
          detections = detectPeople(
            worldRef.current.people,
            worldRef.current.pillars,
            map,
            frameRef.current,
          );
        } else {
          detections = cameraDetsRef.current;
        }
        const updated = trackerRef.current.update(detections);
        resultRef.current = { ...updated, detections };
      }

      if (state.source === "camera") {
        const video = videoRef.current;
        if (video && video.readyState >= 2 && state.running && !detectBusy.current && now - lastDetectRef.current > 90) {
          lastDetectRef.current = now;
          detectBusy.current = true;
          void detectPersons(video)
            .then((raw) => {
              cameraDetsRef.current = raw.map((d) => ({
                ...videoToCanvasBox(d, video, map),
                score: d.score,
                gtId: d.gtId,
              }));
            })
            .catch(() => {
              cameraDetsRef.current = [];
            })
            .finally(() => {
              detectBusy.current = false;
            });
        }
      }

      const result = resultRef.current;
      if (state.source === "plaza") {
        drawPlaza(
          ctx,
          worldRef.current,
          map,
          result.detections,
          result.tracks,
          result.associations,
          overlay,
        );
      } else {
        const video = videoRef.current;
        if (video && video.readyState >= 2) {
          drawCameraFrame(
            ctx,
            video,
            map,
            result.detections,
            result.tracks,
            result.associations,
            overlay,
          );
        } else {
          ctx.fillStyle = "#0c0b0a";
          ctx.fillRect(0, 0, cssW, cssH);
        }
      }

      if (now - lastUi > 90) {
        lastUi = now;
        state.setSnapshot(result);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative min-h-[240px] w-full flex-1 overflow-hidden rounded-lg bg-surface-2"
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <video ref={videoRef} className="hidden" playsInline muted />
      <Hud />
    </div>
  );
}

function Hud() {
  const stats = usePipeline((s) => s.snapshot?.stats);
  const source = usePipeline((s) => s.source);
  const detectorLoading = usePipeline((s) => s.detectorLoading);
  const cameraError = usePipeline((s) => s.cameraError);
  const occluded = stats?.occluded ?? 0;

  return (
    <>
      <div className="pointer-events-none absolute inset-x-3 top-3 flex flex-wrap justify-between gap-1.5">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-bg/70 px-2 py-1 text-[11px] text-fg">
            {source === "plaza" ? "Detector" : "Camera"}
          </span>
          <span className="rounded-full bg-bg/70 px-2 py-1 text-[11px] tabular-nums text-muted">
            {stats?.frame ?? 0}
          </span>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          <span className="rounded-full bg-bg/70 px-2 py-1 text-[11px] text-detect">
            Det {stats?.detections ?? 0}
          </span>
          <span className="rounded-full bg-bg/70 px-2 py-1 text-[11px] text-fg">
            Live {stats?.active ?? 0}
          </span>
          <span
            className={`rounded-full bg-bg/70 px-2 py-1 text-[11px] text-hold ${occluded > 0 ? "loom-pulse" : ""}`}
          >
            Held {occluded}
          </span>
        </div>
      </div>
      {detectorLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-bg/50 text-sm text-muted">
          Loading person detector…
        </div>
      ) : null}
      {cameraError ? (
        <div className="absolute bottom-3 left-3 right-3 rounded-md border border-border bg-surface/90 px-3 py-2 text-sm text-lost">
          {cameraError}
        </div>
      ) : null}
    </>
  );
}
