import type { Box } from "./types";

/**
 * SORT-style constant-velocity Kalman on [cx, cy, s, r, vx, vy, vs].
 * s = area, r = aspect (w/h).
 */
export class KalmanBoxTracker {
  private x: Float64Array;
  private p: Float64Array;

  constructor(box: Box) {
    const cx = box.x + box.w / 2;
    const cy = box.y + box.h / 2;
    const s = Math.max(1, box.w * box.h);
    const r = box.w / Math.max(1, box.h);
    this.x = new Float64Array([cx, cy, s, r, 0, 0, 0]);
    this.p = new Float64Array(49);
    for (let i = 0; i < 7; i++) this.p[i * 7 + i] = i < 4 ? 10 : 1000;
  }

  predict(): Box {
    const [cx, cy, s, r, vx, vy, vs] = this.x;
    let ns = s + vs;
    if (ns < 1) ns = 1;
    this.x[0] = cx + vx;
    this.x[1] = cy + vy;
    this.x[2] = ns;
    this.x[4] = vx * 0.995;
    this.x[5] = vy * 0.995;
    this.x[6] = vs * 0.99;

    const qPos = 1;
    const qVel = 0.08;
    const q = [qPos, qPos, qPos, 1e-4, qVel, qVel, qVel];
    for (let i = 0; i < 7; i++) this.p[i * 7 + i] += q[i]!;

    // Inflate covariance between position and velocity a little.
    this.p[0 * 7 + 4] += 0.02;
    this.p[4 * 7 + 0] += 0.02;
    this.p[1 * 7 + 5] += 0.02;
    this.p[5 * 7 + 1] += 0.02;

    return this.toBox();
  }

  update(box: Box): Box {
    const zcx = box.x + box.w / 2;
    const zcy = box.y + box.h / 2;
    const zs = Math.max(1, box.w * box.h);
    const zr = box.w / Math.max(1, box.h);
    const z = [zcx, zcy, zs, zr];

    const r = [4, 4, 10, 0.02];
    const gain = [0.55, 0.55, 0.4, 0.35];
    for (let i = 0; i < 4; i++) {
      const innov = z[i]! - this.x[i]!;
      const k = gain[i]! * (this.p[i * 7 + i] / (this.p[i * 7 + i] + r[i]!));
      this.x[i] += k * innov;
      this.p[i * 7 + i] *= 1 - k;
    }

    this.x[4] = 0.65 * this.x[4]! + 0.35 * (zcx - (this.x[0]! - this.x[4]!));
    this.x[5] = 0.65 * this.x[5]! + 0.35 * (zcy - (this.x[1]! - this.x[5]!));
    this.x[6] = 0.7 * this.x[6]! + 0.3 * (zs - (this.x[2]! - this.x[6]!));

    return this.toBox();
  }

  toBox(): Box {
    const cx = this.x[0]!;
    const cy = this.x[1]!;
    const s = Math.max(16, this.x[2]!);
    const r = Math.max(0.15, Math.min(4, this.x[3]!));
    const w = Math.sqrt(s * r);
    const h = s / w;
    return { x: cx - w / 2, y: cy - h / 2, w, h };
  }

  velocity(): { vx: number; vy: number } {
    return { vx: this.x[4]!, vy: this.x[5]! };
  }
}
