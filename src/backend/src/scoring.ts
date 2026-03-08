/**
 * Compute an IQ-scale score from raw test results.
 *
 * Uses a simple normal distribution mapping:
 *   IQ = mean + z * sd
 * where z is derived from the proportion correct, mapped through
 * an approximate inverse normal CDF (probit).
 *
 * This is a placeholder algorithm. A real implementation would use
 * item response theory (IRT) models calibrated on pilot data.
 */

const IQ_MEAN = 100;
const IQ_SD = 15;

/** Approximate inverse normal CDF (rational approximation) */
function probit(p: number): number {
  // Clamp to avoid infinities
  const clamped = Math.max(0.001, Math.min(0.999, p));

  // Rational approximation (Abramowitz & Stegun 26.2.23)
  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.383577518672690e2, -3.066479806614716e1, 2.506628277459239e0,
  ];
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1,
  ];

  const q = clamped - 0.5;

  if (Math.abs(q) <= 0.425) {
    const r = 0.180625 - q * q;
    return (
      (q *
        (((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r +
          a[5]) *
          r +
          1) *
          r +
          1)) /
      (((((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1) *
        r +
        1) *
        r +
        1)
    );
  }

  // Tail approximation
  const r = q < 0 ? clamped : 1 - clamped;
  const s = Math.sqrt(-2 * Math.log(r));
  const t =
    (((((2.32121276858 * s + 4.85014127135) * s - 2.29796479134) * s -
      2.78718931138) *
      s +
      4.91395899726) *
      s +
      2.50662823884) /
    (((((0.3224671291 * s + 2.59240287649) * s + 1.52455699086) * s +
      0.24178072517) *
      s +
      0.0038560700634) *
      s +
      1);
  return q < 0 ? -t : t;
}

export function calculateScore(
  correctCount: number,
  totalCount: number
): {
  iqEstimate: number;
  percentile: number;
  correctCount: number;
  totalCount: number;
  rawPercent: number;
} {
  if (totalCount === 0) {
    return {
      iqEstimate: IQ_MEAN,
      percentile: 50,
      correctCount: 0,
      totalCount: 0,
      rawPercent: 0,
    };
  }

  const rawPercent = correctCount / totalCount;

  // Map raw percent to a percentile (assume the test is calibrated so
  // that 50% correct = 50th percentile). We use a slight compression
  // to avoid extreme scores on a short test.
  const adjustedPercent = 0.1 + rawPercent * 0.8; // compress to [0.1, 0.9]
  const z = probit(adjustedPercent);
  const iqEstimate = Math.round(IQ_MEAN + z * IQ_SD);

  // Percentile from z-score
  const percentile = Math.round(adjustedPercent * 100);

  return {
    iqEstimate: Math.max(55, Math.min(145, iqEstimate)), // clamp
    percentile,
    correctCount,
    totalCount,
    rawPercent: Math.round(rawPercent * 100),
  };
}
