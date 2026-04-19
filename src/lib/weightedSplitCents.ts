import { splitEqualCentsParts } from "./splitEqualCents";

/**
 * Weighted split in whole cents; sums exactly to `totalDollars` (matches backend ExpenseSplit weighted logic).
 */
export function weightedSplitCents(
  totalDollars: number,
  weights: number[],
): number[] {
  const n = weights.length;
  if (n === 0) return [];
  const w = weights.map((x) => (x > 0 ? x : 0));
  const sumW = w.reduce((a, b) => a + b, 0);
  if (sumW <= 0) {
    return splitEqualCentsParts(totalDollars, n);
  }

  const centsTotal = Math.round(totalDollars * 100);
  const baseCents: number[] = [];
  const fractions: number[] = [];
  let allocated = 0;

  for (let i = 0; i < n; i++) {
    const portion = (w[i] / sumW) * centsTotal;
    const floor = Math.floor(portion);
    baseCents[i] = floor;
    fractions[i] = portion - floor;
    allocated += floor;
  }

  let remainder = centsTotal - allocated;
  if (remainder > 0) {
    const order = fractions
      .map((f, i) => ({ f, i }))
      .sort((a, b) => b.f - a.f || a.i - b.i);
    for (const { i } of order) {
      if (remainder <= 0) break;
      baseCents[i] += 1;
      remainder -= 1;
    }
  }

  return baseCents.map((c) => c / 100);
}
