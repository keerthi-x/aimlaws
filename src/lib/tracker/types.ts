export type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Detection = Box & {
  score: number;
  gtId?: number;
};

export type TrackState = "tentative" | "confirmed" | "occluded" | "deleted";

export type Association = {
  trackId: number;
  detIndex: number;
  iou: number;
  stage: "high" | "low";
};

export type TrackEventKind = "born" | "confirmed" | "occluded" | "recovered" | "lost";

export type TrackEvent = {
  id: number;
  kind: TrackEventKind;
  trackId: number;
  frame: number;
  note: string;
};

export type TrackSnapshot = {
  id: number;
  box: Box;
  predBox: Box;
  color: string;
  state: TrackState;
  hits: number;
  age: number;
  timeSinceUpdate: number;
  score: number;
  trail: { x: number; y: number }[];
  vx: number;
  vy: number;
  gtId?: number;
};

export type PipelineStats = {
  frame: number;
  detections: number;
  active: number;
  occluded: number;
  tentative: number;
  recoveries: number;
  idSwitches: number;
  lost: number;
};

export const TRACK_COLORS = [
  "#7BA3B0",
  "#C4A484",
  "#8BAF8E",
  "#B08AA8",
  "#A8B07A",
  "#C48484",
  "#7A9BB0",
  "#B09A7A",
  "#9A8FB0",
  "#7AA89A",
  "#C4B07A",
  "#8A9A7A",
] as const;
