/**
 * Kuhn–Munkres (Hungarian) min-cost assignment.
 * Returns column index for each row, or -1 if that row is unmatched.
 */
export function hungarian(cost: number[][]): number[] {
  const rows = cost.length;
  const cols = cost[0]?.length ?? 0;
  if (rows === 0 || cols === 0) return Array.from({ length: rows }, () => -1);

  const n = Math.max(rows, cols);
  const a: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(1e5));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      a[i + 1][j + 1] = cost[i][j];
    }
  }

  const u = Array(n + 1).fill(0);
  const v = Array(n + 1).fill(0);
  const p = Array(n + 1).fill(0);
  const way = Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minv = Array(n + 1).fill(Number.POSITIVE_INFINITY);
    const used = Array(n + 1).fill(false);
    do {
      used[j0] = true;
      const i0 = p[j0] as number;
      let delta = Number.POSITIVE_INFINITY;
      let j1 = 0;
      for (let j = 1; j <= n; j++) {
        if (used[j]) continue;
        const cur = a[i0][j] - u[i0] - v[j];
        if (cur < minv[j]) {
          minv[j] = cur;
          way[j] = j0;
        }
        if (minv[j] < delta) {
          delta = minv[j];
          j1 = j;
        }
      }
      for (let j = 0; j <= n; j++) {
        if (used[j]) {
          u[p[j]] += delta;
          v[j] -= delta;
        } else {
          minv[j] -= delta;
        }
      }
      j0 = j1;
    } while (p[j0] !== 0);
    do {
      const j1 = way[j0] as number;
      p[j0] = p[j1];
      j0 = j1;
    } while (j0 !== 0);
  }

  const assignment = Array.from({ length: rows }, () => -1);
  for (let j = 1; j <= n; j++) {
    const row = p[j] as number;
    if (row >= 1 && row <= rows && j <= cols) {
      assignment[row - 1] = j - 1;
    }
  }
  return assignment;
}
