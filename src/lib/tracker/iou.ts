import type { Box } from "./types";

export function boxArea(b: Box): number {
  return Math.max(0, b.w) * Math.max(0, b.h);
}

export function intersectionArea(a: Box, b: Box): number {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.w, b.x + b.w);
  const y2 = Math.min(a.y + a.h, b.y + b.h);
  return Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
}

export function iou(a: Box, b: Box): number {
  const inter = intersectionArea(a, b);
  if (inter <= 0) return 0;
  const union = boxArea(a) + boxArea(b) - inter;
  return union <= 0 ? 0 : inter / union;
}

export function boxCenter(b: Box): { x: number; y: number } {
  return { x: b.x + b.w / 2, y: b.y + b.h / 2 };
}

export function clampBox(b: Box, width: number, height: number): Box {
  const x = Math.max(0, Math.min(width - 1, b.x));
  const y = Math.max(0, Math.min(height - 1, b.y));
  const w = Math.max(4, Math.min(width - x, b.w));
  const h = Math.max(4, Math.min(height - y, b.h));
  return { x, y, w, h };
}
