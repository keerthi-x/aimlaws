import type { Association, Box, Detection, TrackSnapshot } from "@/lib/tracker/types";
import { boxCenter } from "@/lib/tracker/iou";
import {
  pillarBox,
  worldToScreen,
  type Person,
  type Pillar,
  type PlazaWorld,
  type ScreenMap,
} from "./plaza";

export type OverlayFlags = {
  detections: boolean;
  tracks: boolean;
  trails: boolean;
  predicted: boolean;
  selectedId: number | null;
};

type DrawItem =
  | { z: number; kind: "person"; person: Person }
  | { z: number; kind: "pillar"; pillar: Pillar };

export function drawPlaza(
  ctx: CanvasRenderingContext2D,
  world: PlazaWorld,
  map: ScreenMap,
  detections: Detection[],
  tracks: TrackSnapshot[],
  associations: Association[],
  overlay: OverlayFlags,
) {
  ctx.clearRect(0, 0, map.width, map.height);
  drawSky(ctx, map);
  drawGround(ctx, map);
  drawFarBuildings(ctx, map);

  const items: DrawItem[] = [
    ...world.people.map((person) => ({ z: person.z, kind: "person" as const, person })),
    ...world.pillars.map((pillar) => ({ z: pillar.z, kind: "pillar" as const, pillar })),
  ];
  items.sort((a, b) => a.z - b.z);

  if (overlay.trails) drawTrails(ctx, tracks, overlay.selectedId);

  for (const item of items) {
    if (item.kind === "person") drawPerson(ctx, item.person, map);
    else drawPillar(ctx, item.pillar, map);
  }

  if (overlay.detections) drawDetections(ctx, detections);
  if (overlay.tracks) {
    if (overlay.predicted) drawPredicted(ctx, tracks, overlay.selectedId);
    drawTracks(ctx, tracks, overlay.selectedId);
    drawAssociations(ctx, detections, tracks, associations);
  }
}

function drawSky(ctx: CanvasRenderingContext2D, map: ScreenMap) {
  const g = ctx.createLinearGradient(0, 0, 0, map.height * 0.42);
  g.addColorStop(0, "#161310");
  g.addColorStop(1, "#2a231c");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, map.width, map.height * 0.42);
}

function drawFarBuildings(ctx: CanvasRenderingContext2D, map: ScreenMap) {
  ctx.fillStyle = "#1b1815";
  const base = map.height * 0.3;
  const blocks = [
    { x: 0.04, w: 0.12, h: 0.1 },
    { x: 0.18, w: 0.08, h: 0.16 },
    { x: 0.28, w: 0.14, h: 0.12 },
    { x: 0.5, w: 0.1, h: 0.18 },
    { x: 0.64, w: 0.16, h: 0.11 },
    { x: 0.84, w: 0.12, h: 0.15 },
  ];
  for (const b of blocks) {
    ctx.fillRect(map.width * b.x, base - map.height * b.h, map.width * b.w, map.height * b.h);
  }
}

function drawGround(ctx: CanvasRenderingContext2D, map: ScreenMap) {
  const top = map.height * 0.3;
  const g = ctx.createLinearGradient(0, top, 0, map.height);
  g.addColorStop(0, "#2c2620");
  g.addColorStop(1, "#1a1714");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, top);
  ctx.lineTo(map.width, top);
  ctx.lineTo(map.width, map.height);
  ctx.lineTo(0, map.height);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(242,239,233,0.05)";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 8; i++) {
    const y = top + ((map.height - top) * i) / 8;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(map.width, y);
    ctx.stroke();
  }
  const vanishX = map.width * 0.5;
  for (let i = -6; i <= 6; i++) {
    ctx.beginPath();
    ctx.moveTo(vanishX + i * map.width * 0.08, top);
    ctx.lineTo(vanishX + i * map.width * 0.22, map.height);
    ctx.stroke();
  }
}

function drawPillar(ctx: CanvasRenderingContext2D, pillar: Pillar, map: ScreenMap) {
  const box = pillarBox(pillar, map);
  const { scale } = worldToScreen(pillar.x, pillar.z, map);
  const depth = Math.max(8, pillar.d * 3.4 * scale);

  ctx.fillStyle = "rgba(8,7,6,0.35)";
  ctx.beginPath();
  ctx.ellipse(box.x + box.w / 2, box.y + box.h + 4, box.w * 0.55, 6 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  if (pillar.kind === "planter") {
    roundRect(ctx, box.x, box.y + box.h * 0.35, box.w, box.h * 0.65, 6);
    ctx.fillStyle = "#3a342e";
    ctx.fill();
    roundRect(ctx, box.x + 4, box.y, box.w - 8, box.h * 0.45, 8);
    ctx.fillStyle = "#4a3a32";
    ctx.fill();
    ctx.fillStyle = "#3e4a3a";
    ctx.fillRect(box.x + box.w * 0.2, box.y - 8, 4, 18);
    ctx.fillRect(box.x + box.w * 0.55, box.y - 4, 5, 14);
    ctx.fillStyle = "#5a6a4a";
    ctx.beginPath();
    ctx.ellipse(box.x + box.w * 0.22, box.y - 8, 10, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(box.x + box.w * 0.58, box.y - 6, 12, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  ctx.fillStyle = "#2f2a26";
  ctx.fillRect(box.x + box.w * 0.72, box.y + 8, depth, box.h - 8);

  const body = ctx.createLinearGradient(box.x, 0, box.x + box.w, 0);
  body.addColorStop(0, "#4c453e");
  body.addColorStop(0.45, "#5a534b");
  body.addColorStop(1, "#3e3933");
  ctx.fillStyle = body;
  ctx.fillRect(box.x, box.y + 10, box.w, box.h - 10);

  ctx.fillStyle = "#635c54";
  ctx.fillRect(box.x - 4, box.y, box.w + 8, 14);
  ctx.fillStyle = "#3a352f";
  ctx.fillRect(box.x - 6, box.y + box.h - 12, box.w + 12, 12);

  if (pillar.kind === "wall") {
    ctx.fillStyle = "rgba(242,239,233,0.04)";
    for (let i = 1; i < 5; i++) {
      ctx.fillRect(box.x + (box.w * i) / 5, box.y + 16, 1, box.h - 28);
    }
  }
}

function drawPerson(ctx: CanvasRenderingContext2D, person: Person, map: ScreenMap) {
  const { sx, sy, scale } = worldToScreen(person.x, person.z, map);
  const h = person.style.height * 92 * scale;
  const w = h * person.style.girth;
  const bob = Math.sin(person.phase * 2) * 1.2 * scale;
  const stride = Math.sin(person.phase) * 0.22 * h;
  const face = person.facing;
  const top = sy - h + bob;

  ctx.fillStyle = "rgba(8,7,6,0.32)";
  ctx.beginPath();
  ctx.ellipse(sx, sy + 2, w * 0.7, 5 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = person.style.pants;
  ctx.lineWidth = Math.max(3, w * 0.22);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(sx - 2 * face, top + h * 0.55);
  ctx.lineTo(sx - 4 * face, top + h * 0.78);
  ctx.lineTo(sx - stride * 0.35 * face, sy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(sx + 2 * face, top + h * 0.55);
  ctx.lineTo(sx + 4 * face, top + h * 0.78);
  ctx.lineTo(sx + stride * 0.35 * face, sy);
  ctx.stroke();

  roundRect(ctx, sx - w / 2, top + h * 0.22, w, h * 0.38, 6);
  ctx.fillStyle = person.style.coat;
  ctx.fill();

  ctx.strokeStyle = person.style.coat;
  ctx.lineWidth = Math.max(2.4, w * 0.16);
  ctx.beginPath();
  ctx.moveTo(sx + 6 * face, top + h * 0.28);
  ctx.lineTo(sx + 10 * face + stride * 0.2, top + h * 0.48);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(sx - 6 * face, top + h * 0.28);
  ctx.lineTo(sx - 8 * face - stride * 0.2, top + h * 0.46);
  ctx.stroke();

  const headR = h * 0.09;
  ctx.beginPath();
  ctx.arc(sx + 3 * face, top + h * 0.14, headR, 0, Math.PI * 2);
  ctx.fillStyle = person.style.skin;
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(sx + 2 * face, top + h * 0.11, headR * 1.05, headR * 0.7, 0, Math.PI, Math.PI * 2);
  ctx.fillStyle = person.style.hair;
  ctx.fill();
}

function drawDetections(ctx: CanvasRenderingContext2D, detections: Detection[]) {
  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "rgba(142,185,194,0.85)";
  ctx.lineWidth = 1.25;
  for (const det of detections) {
    ctx.strokeRect(det.x, det.y, det.w, det.h);
    ctx.setLineDash([]);
    ctx.font = "500 10px Outfit, sans-serif";
    ctx.fillStyle = "rgba(142,185,194,0.9)";
    ctx.fillText(`${Math.round(det.score * 100)}`, det.x, det.y - 4);
    ctx.setLineDash([4, 4]);
  }
  ctx.restore();
}

function drawTrails(ctx: CanvasRenderingContext2D, tracks: TrackSnapshot[], selectedId: number | null) {
  for (const track of tracks) {
    if (track.trail.length < 2) continue;
    const dim = selectedId != null && selectedId !== track.id;
    ctx.beginPath();
    ctx.moveTo(track.trail[0]!.x, track.trail[0]!.y);
    for (let i = 1; i < track.trail.length; i++) {
      ctx.lineTo(track.trail[i]!.x, track.trail[i]!.y);
    }
    ctx.strokeStyle = hexAlpha(track.color, dim ? 0.18 : 0.45);
    ctx.lineWidth = dim ? 1 : 1.75;
    ctx.lineJoin = "round";
    ctx.stroke();
  }
}

function drawPredicted(ctx: CanvasRenderingContext2D, tracks: TrackSnapshot[], selectedId: number | null) {
  ctx.save();
  ctx.setLineDash([3, 5]);
  for (const track of tracks) {
    if (track.state !== "occluded" && track.timeSinceUpdate < 1) continue;
    const dim = selectedId != null && selectedId !== track.id;
    const b = track.predBox;
    ctx.strokeStyle = hexAlpha(track.color, dim ? 0.2 : 0.7);
    ctx.lineWidth = 1.25;
    ctx.strokeRect(b.x, b.y, b.w, b.h);
  }
  ctx.restore();
}

function drawTracks(ctx: CanvasRenderingContext2D, tracks: TrackSnapshot[], selectedId: number | null) {
  ctx.font = "600 11px Outfit, sans-serif";
  for (const track of tracks) {
    const dim = selectedId != null && selectedId !== track.id;
    const b = track.box;
    ctx.strokeStyle = hexAlpha(track.color, dim ? 0.25 : 0.95);
    ctx.lineWidth = track.state === "occluded" ? 1 : 1.75;
    if (track.state === "occluded") {
      ctx.setLineDash([5, 4]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.strokeRect(b.x, b.y, b.w, b.h);
    ctx.setLineDash([]);

    const label =
      track.state === "occluded"
        ? `T-${pad(track.id)} held`
        : track.state === "tentative"
          ? `T-${pad(track.id)}…`
          : `T-${pad(track.id)}`;
    const tw = ctx.measureText(label).width + 10;
    const lx = b.x;
    const ly = Math.max(12, b.y - 16);
    ctx.fillStyle = hexAlpha(track.color, dim ? 0.35 : 0.92);
    roundRect(ctx, lx, ly - 11, tw, 16, 4);
    ctx.fill();
    ctx.fillStyle = dim ? "rgba(12,11,10,0.55)" : "#0c0b0a";
    ctx.fillText(label, lx + 5, ly + 1);
  }
}

function drawAssociations(
  ctx: CanvasRenderingContext2D,
  detections: Detection[],
  tracks: TrackSnapshot[],
  associations: Association[],
) {
  ctx.lineWidth = 1;
  for (const link of associations) {
    const det = detections[link.detIndex];
    const track = tracks.find((t) => t.id === link.trackId);
    if (!det || !track) continue;
    const a = boxCenter(det);
    const b = boxCenter(track.box);
    ctx.strokeStyle = hexAlpha(track.color, 0.28);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
}

export function drawCameraFrame(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  map: ScreenMap,
  detections: Detection[],
  tracks: TrackSnapshot[],
  associations: Association[],
  overlay: OverlayFlags,
) {
  ctx.clearRect(0, 0, map.width, map.height);
  ctx.fillStyle = "#0c0b0a";
  ctx.fillRect(0, 0, map.width, map.height);
  const vw = video.videoWidth || 1;
  const vh = video.videoHeight || 1;
  const cover = Math.max(map.width / vw, map.height / vh);
  const dw = vw * cover;
  const dh = vh * cover;
  const dx = (map.width - dw) / 2;
  const dy = (map.height - dh) / 2;
  ctx.drawImage(video, dx, dy, dw, dh);
  if (overlay.trails) drawTrails(ctx, tracks, overlay.selectedId);
  if (overlay.detections) drawDetections(ctx, detections);
  if (overlay.tracks) {
    if (overlay.predicted) drawPredicted(ctx, tracks, overlay.selectedId);
    drawTracks(ctx, tracks, overlay.selectedId);
    drawAssociations(ctx, detections, tracks, associations);
  }
}

export function videoToCanvasBox(box: Box, video: HTMLVideoElement, map: ScreenMap): Box {
  const vw = video.videoWidth || 1;
  const vh = video.videoHeight || 1;
  const cover = Math.max(map.width / vw, map.height / vh);
  const dw = vw * cover;
  const dh = vh * cover;
  const dx = (map.width - dw) / 2;
  const dy = (map.height - dh) / 2;
  return {
    x: dx + box.x * cover,
    y: dy + box.y * cover,
    w: box.w * cover,
    h: box.h * cover,
  };
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function hexAlpha(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function pad(id: number): string {
  return String(id).padStart(2, "0");
}
