import type { Detection } from "@/lib/tracker/types";

type CocoModel = {
  detect: (input: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement) => Promise<
    { bbox: [number, number, number, number]; class: string; score: number }[]
  >;
};

type TfWindow = Window & {
  cocoSsd?: { load: (opts?: { base?: string }) => Promise<CocoModel> };
  tf?: { ready: () => Promise<void> };
};

let loading: Promise<CocoModel> | null = null;
let model: CocoModel | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "1") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
        once: true,
      });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "1";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

export async function loadPersonDetector(): Promise<void> {
  if (model) return;
  if (!loading) {
    loading = (async () => {
      await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js");
      await loadScript(
        "https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js",
      );
      const w = window as TfWindow;
      if (w.tf?.ready) await w.tf.ready();
      if (!w.cocoSsd) throw new Error("Person detector failed to initialize");
      const loaded = await w.cocoSsd.load({ base: "lite_mobilenet_v2" });
      model = loaded;
      return loaded;
    })();
  }
  await loading;
}

export function isDetectorReady(): boolean {
  return model != null;
}

export async function detectPersons(video: HTMLVideoElement): Promise<Detection[]> {
  if (!model) await loadPersonDetector();
  if (!model) return [];
  const preds = await model.detect(video);
  return preds
    .filter((p) => p.class === "person" && p.score >= 0.35)
    .map((p) => ({
      x: p.bbox[0],
      y: p.bbox[1],
      w: p.bbox[2],
      h: p.bbox[3],
      score: p.score,
    }));
}
