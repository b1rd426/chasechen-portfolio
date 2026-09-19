import { K, EPSILON_0 } from './models.ts';

export type PointCharge = { x: number; y: number; charge: number };
export type Vector2 = { x: number; y: number };
/** SI units. No softening: the location of a nonzero point source is singular. */
export function pointChargeField(sources: PointCharge[], point: Vector2) {
  if (![point.x, point.y, ...sources.flatMap(s => [s.x, s.y, s.charge])].every(Number.isFinite))
    throw new RangeError('电荷与坐标须为有限数值');
  const contributions = sources.map(s => {
    const dx = point.x - s.x, dy = point.y - s.y, distance = Math.hypot(dx, dy);
    if (s.charge === 0) return { x: 0, y: 0, potential: 0, distance };
    if (distance === 0) return null;
    return { x: K * s.charge * dx / distance ** 3, y: K * s.charge * dy / distance ** 3,
      potential: K * s.charge / distance, distance };
  });
  if (contributions.some(c => c === null)) return null;
  const terms = contributions as NonNullable<typeof contributions[number]>[];
  const x = terms.reduce((v, c) => v + c.x, 0), y = terms.reduce((v, c) => v + c.y, 0);
  return { x, y, magnitude: Math.hypot(x, y), potential: terms.reduce((v, c) => v + c.potential, 0), contributions: terms };
}

export type AxisInput = { mode: 'ring' | 'annulus'; x: number; outer: number; inner: number;
  charge: number; density: number; offset?: number };
/** Finite uniform ring or annulus, observed on its perpendicular symmetry axis. */
export function axisPotential({mode, x, outer, inner, charge, density, offset = 0}: AxisInput) {
  if (![x, outer, inner, charge, density, offset].every(Number.isFinite) || outer <= 0 ||
      inner < 0 || inner >= outer || !['ring', 'annulus'].includes(mode))
    throw new RangeError('要求R>0，0≤内半径<R，且参数有限');
  const b = Math.hypot(x, outer), a = Math.hypot(x, inner);
  if (mode === 'ring') {
    return { potential: K * charge / b + offset, field: K * charge * x / b ** 3,
      totalCharge: charge, insideLimit: null, outsideLimit: null };
  }
  // Rationalization avoids subtracting almost equal square roots in the far field.
  const factor = density / (2 * EPSILON_0);
  const potential = factor * (outer ** 2 - inner ** 2) / (a + b) + offset;
  const surface = inner === 0 && x === 0 && density !== 0;
  const field = surface ? null : density === 0 ? 0 :
    factor * x * (outer ** 2 - inner ** 2) / ((a + b) * a * b);
  return { potential, field, totalCharge: density * Math.PI * (outer ** 2 - inner ** 2),
    insideLimit: surface ? -factor : null, outsideLimit: surface ? factor : null };
}

export function electricWork(testCharge: number, potentialA: number, potentialB: number) {
  if (![testCharge, potentialA, potentialB].every(Number.isFinite)) throw new RangeError('参数须有限');
  const work = testCharge * (potentialA - potentialB);
  return { work, energyChange: -work };
}

export function uniformFlux(field: number, area: number, angle: number) {
  if (![field,area,angle].every(Number.isFinite)||field<0||area<0||angle<0||angle>180)
    throw new RangeError('要求E≥0、S≥0、法线夹角在0到180度之间');
  const cosine=angle===90?0:Math.cos(angle*Math.PI/180);
  return { flux: field*area*cosine, signedProjection: area*cosine, cosine };
}
