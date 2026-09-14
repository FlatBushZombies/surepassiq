/** Caps stagger so long grids don't produce absurdly long total delays. */
export function staggerDelay(index: number, stepMs = 60, maxSteps = 6) {
  return Math.min(index, maxSteps) * stepMs;
}
