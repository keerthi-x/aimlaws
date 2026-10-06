import { hungarian } from "./hungarian";
import { iou } from "./iou";
import { KalmanBoxTracker } from "./kalman";
import {
  TRACK_COLORS,
  type Association,
  type Box,
  type Detection,
  type PipelineStats,
  type TrackEvent,
  type TrackSnapshot,
  type TrackState,
} from "./types";

type InternalTrack = {
  id: number;
  kalman: KalmanBoxTracker;
  hits: number;
  age: number;
  timeSinceUpdate: number;
  state: TrackState;
  color: string;
  trail: { x: number; y: number }[];
  lastBox: Box;
  predBox: Box;
  score: number;
  gtId?: number;
  occludedFrames: number;
};

export type SortParams = {
  maxAge: number;
  minHits: number;
  iouThreshold: number;
  lowIouThreshold: number;
  highScore: number;
};

const DEFAULT_PARAMS: SortParams = {
  maxAge: 45,
  minHits: 3,
  iouThreshold: 0.3,
  lowIouThreshold: 0.15,
  highScore: 0.45,
};

export class SortTracker {
  private nextId = 1;
  private eventSeq = 1;
  private tracks: InternalTrack[] = [];
  private events: TrackEvent[] = [];
  private frame = 0;
  private recoveries = 0;
  private idSwitches = 0;
  private lost = 0;
  private gtBinding = new Map<number, number>();
  params: SortParams;

  constructor(params: Partial<SortParams> = {}) {
    this.params = { ...DEFAULT_PARAMS, ...params };
  }

  reset() {
    this.nextId = 1;
    this.eventSeq = 1;
    this.tracks = [];
    this.events = [];
    this.frame = 0;
    this.recoveries = 0;
    this.idSwitches = 0;
    this.lost = 0;
    this.gtBinding.clear();
  }

  setParams(params: Partial<SortParams>) {
    this.params = { ...this.params, ...params };
  }

  update(detections: Detection[]): {
    tracks: TrackSnapshot[];
    associations: Association[];
    events: TrackEvent[];
    stats: PipelineStats;
  } {
    this.frame += 1;
    const { maxAge, minHits, iouThreshold, lowIouThreshold, highScore } = this.params;

    for (const track of this.tracks) {
      track.predBox = track.kalman.predict();
      track.age += 1;
      track.timeSinceUpdate += 1;
    }

    const live = this.tracks.filter((t) => t.state !== "deleted");
    const highDets: number[] = [];
    const lowDets: number[] = [];
    detections.forEach((det, i) => {
      if (det.score >= highScore) highDets.push(i);
      else lowDets.push(i);
    });

    const associations: Association[] = [];
    const unmatchedTracks = new Set(live.map((_, i) => i));
    const unmatchedDets = new Set(detections.map((_, i) => i));

    const match = (trackIdxs: number[], detIdxs: number[], minIou: number, stage: "high" | "low") => {
      if (trackIdxs.length === 0 || detIdxs.length === 0) return;
      const cost: number[][] = trackIdxs.map((ti) =>
        detIdxs.map((di) => {
          const overlap = iou(live[ti]!.predBox, detections[di]!);
          return overlap < minIou ? 1e5 : 1 - overlap;
        }),
      );
      const assign = hungarian(cost);
      assign.forEach((col, row) => {
        if (col < 0) return;
        const c = cost[row]![col]!;
        if (c >= 1e4) return;
        const ti = trackIdxs[row]!;
        const di = detIdxs[col]!;
        if (!unmatchedTracks.has(ti) || !unmatchedDets.has(di)) return;
        unmatchedTracks.delete(ti);
        unmatchedDets.delete(di);
        associations.push({
          trackId: live[ti]!.id,
          detIndex: di,
          iou: 1 - c,
          stage,
        });
        this.applyMatch(live[ti]!, detections[di]!);
      });
    };

    const highTrackIdx = [...unmatchedTracks];
    match(highTrackIdx, highDets, iouThreshold, "high");
    match([...unmatchedTracks], lowDets, lowIouThreshold, "low");

    for (const ti of unmatchedTracks) {
      const track = live[ti]!;
      if (track.state === "confirmed" || track.state === "occluded") {
        if (track.state === "confirmed") {
          track.state = "occluded";
          this.pushEvent("occluded", track.id, `T-${pad(track.id)} held through occlusion`);
        }
        track.occludedFrames += 1;
      }
      if (track.timeSinceUpdate > maxAge) {
        track.state = "deleted";
        this.lost += 1;
        this.pushEvent("lost", track.id, `T-${pad(track.id)} dropped after ${track.timeSinceUpdate} frames`);
      }
    }

    for (const di of unmatchedDets) {
      const det = detections[di]!;
      if (det.score < 0.25) continue;
      this.spawn(det);
    }

    const snapshots: TrackSnapshot[] = [];
    for (const track of this.tracks) {
      if (track.state === "deleted") continue;
      const box = track.timeSinceUpdate === 0 ? track.lastBox : track.predBox;
      const c = { x: box.x + box.w / 2, y: box.y + box.h };
      track.trail.push(c);
      if (track.trail.length > 48) track.trail.shift();
      const vel = track.kalman.velocity();
      snapshots.push({
        id: track.id,
        box,
        predBox: track.predBox,
        color: track.color,
        state: track.state,
        hits: track.hits,
        age: track.age,
        timeSinceUpdate: track.timeSinceUpdate,
        score: track.score,
        trail: track.trail.slice(),
        vx: vel.vx,
        vy: vel.vy,
        gtId: track.gtId,
      });
      if (track.state === "tentative" && track.hits >= minHits && track.timeSinceUpdate === 0) {
        track.state = "confirmed";
        this.pushEvent("confirmed", track.id, `T-${pad(track.id)} confirmed`);
      }
    }

    this.tracks = this.tracks.filter((t) => t.state !== "deleted" || t.age < maxAge + 2);

    const stats: PipelineStats = {
      frame: this.frame,
      detections: detections.length,
      active: snapshots.filter((t) => t.state === "confirmed").length,
      occluded: snapshots.filter((t) => t.state === "occluded").length,
      tentative: snapshots.filter((t) => t.state === "tentative").length,
      recoveries: this.recoveries,
      idSwitches: this.idSwitches,
      lost: this.lost,
    };

    return { tracks: snapshots, associations, events: this.events.slice(-14), stats };
  }

  private spawn(det: Detection) {
    const id = this.nextId++;
    const kalman = new KalmanBoxTracker(det);
    const track: InternalTrack = {
      id,
      kalman,
      hits: 1,
      age: 1,
      timeSinceUpdate: 0,
      state: "tentative",
      color: TRACK_COLORS[(id - 1) % TRACK_COLORS.length]!,
      trail: [{ x: det.x + det.w / 2, y: det.y + det.h }],
      lastBox: det,
      predBox: det,
      score: det.score,
      gtId: det.gtId,
      occludedFrames: 0,
    };
    this.tracks.push(track);
    this.pushEvent("born", id, `T-${pad(id)} born from detection`);
    if (det.gtId != null) this.bindGt(id, det.gtId);
  }

  private applyMatch(track: InternalTrack, det: Detection) {
    const wasOccluded = track.state === "occluded" || track.timeSinceUpdate > 1;
    track.lastBox = track.kalman.update(det);
    track.hits += 1;
    track.timeSinceUpdate = 0;
    track.score = det.score;
    if (wasOccluded && (track.state === "occluded" || track.state === "confirmed")) {
      track.state = "confirmed";
      this.recoveries += 1;
      const held = Math.max(1, track.occludedFrames);
      this.pushEvent(
        "recovered",
        track.id,
        `T-${pad(track.id)} recovered after ${held} frame${held === 1 ? "" : "s"}`,
      );
      track.occludedFrames = 0;
    } else if (track.state === "tentative" && track.hits >= this.params.minHits) {
      track.state = "confirmed";
      this.pushEvent("confirmed", track.id, `T-${pad(track.id)} confirmed`);
    } else if (track.state !== "tentative") {
      track.state = "confirmed";
    }
    if (det.gtId != null) this.bindGt(track.id, det.gtId);
  }

  private bindGt(trackId: number, gtId: number) {
    const prev = this.gtBinding.get(gtId);
    if (prev != null && prev !== trackId) this.idSwitches += 1;
    this.gtBinding.set(gtId, trackId);
    const track = this.tracks.find((t) => t.id === trackId);
    if (track) track.gtId = gtId;
  }

  private pushEvent(kind: TrackEvent["kind"], trackId: number, note: string) {
    this.events.push({
      id: this.eventSeq++,
      kind,
      trackId,
      frame: this.frame,
      note,
    });
    if (this.events.length > 40) this.events.shift();
  }
}

function pad(id: number): string {
  return String(id).padStart(2, "0");
}
