/**
 * Split a dollar total into whole-cent parts that sum exactly (matches app backend).
 * Remainder cents go to earlier indices.
 */
export function splitEqualCentsParts(total: number, count: number): number[] {
  if (count <= 0 || !Number.isFinite(total)) return [];
  const centsTotal = Math.round(total * 100);
  const base = Math.floor(centsTotal / count);
  const remainder = centsTotal % count;
  return Array.from(
    { length: count },
    (_, i) => (base + (i < remainder ? 1 : 0)) / 100,
  );
}
