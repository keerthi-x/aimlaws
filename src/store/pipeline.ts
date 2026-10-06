import { create } from "zustand";
import type { ScenarioId } from "@/lib/scene/plaza";
import type { Association, Detection, PipelineStats, TrackEvent, TrackSnapshot } from "@/lib/tracker/types";

export type SourceMode = "plaza" | "camera";

export type Snapshot = {
  detections: Detection[];
  tracks: TrackSnapshot[];
  associations: Association[];
  events: TrackEvent[];
  stats: PipelineStats;
};

type PipelineState = {
  running: boolean;
  source: SourceMode;
  scenario: ScenarioId;
  maxAge: number;
  minHits: number;
  iouThreshold: number;
  showDetections: boolean;
  showTracks: boolean;
  showTrails: boolean;
  showPredicted: boolean;
  selectedId: number | null;
  snapshot: Snapshot | null;
  cameraError: string | null;
  detectorLoading: boolean;
  resetKey: number;
  setRunning: (running: boolean) => void;
  setSource: (source: SourceMode) => void;
  setScenario: (scenario: ScenarioId) => void;
  setMaxAge: (maxAge: number) => void;
  setMinHits: (minHits: number) => void;
  setIouThreshold: (iouThreshold: number) => void;
  setShowDetections: (value: boolean) => void;
  setShowTracks: (value: boolean) => void;
  setShowTrails: (value: boolean) => void;
  setShowPredicted: (value: boolean) => void;
  setSelectedId: (id: number | null) => void;
  setSnapshot: (snapshot: Snapshot) => void;
  setCameraError: (error: string | null) => void;
  setDetectorLoading: (value: boolean) => void;
  bumpReset: () => void;
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

export const usePipeline = create<PipelineState>((set) => ({
  running: true,
  source: "plaza",
  scenario: "courtyard",
  maxAge: 50,
  minHits: 3,
  iouThreshold: 0.3,
  showDetections: true,
  showTracks: true,
  showTrails: true,
  showPredicted: true,
  selectedId: null,
  snapshot: {
    detections: [],
    tracks: [],
    associations: [],
    events: [],
    stats: emptyStats,
  },
  cameraError: null,
  detectorLoading: false,
  resetKey: 0,
  setRunning: (running) => set({ running }),
  setSource: (source) => set({ source, cameraError: null, selectedId: null }),
  setScenario: (scenario) => set({ scenario, source: "plaza", selectedId: null }),
  setMaxAge: (maxAge) => set({ maxAge }),
  setMinHits: (minHits) => set({ minHits }),
  setIouThreshold: (iouThreshold) => set({ iouThreshold }),
  setShowDetections: (showDetections) => set({ showDetections }),
  setShowTracks: (showTracks) => set({ showTracks }),
  setShowTrails: (showTrails) => set({ showTrails }),
  setShowPredicted: (showPredicted) => set({ showPredicted }),
  setSelectedId: (selectedId) => set({ selectedId }),
  setSnapshot: (snapshot) => set({ snapshot }),
  setCameraError: (cameraError) => set({ cameraError }),
  setDetectorLoading: (detectorLoading) => set({ detectorLoading }),
  bumpReset: () => set((s) => ({ resetKey: s.resetKey + 1, selectedId: null })),
}));
