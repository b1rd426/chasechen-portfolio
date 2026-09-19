/** Original electrostatic models. All inputs/outputs use SI units. */
export const EPSILON_0 = 8.8541878128e-12;
export const K = 1 / (4 * Math.PI * EPSILON_0);
function finite(...values: number[]) {
  if (!values.every(Number.isFinite))
    throw new RangeError("参数必须是有限数值");
}
export function finiteRod(
  length: number,
  distance: number,
  charge: number,
  count: number,
) {
  finite(length, distance, charge, count);
  if (
    length <= 0 ||
    distance <= 0 ||
    !Number.isInteger(count) ||
    count < 1 ||
    count > 16384
  )
    throw new RangeError("杆长、距离必须大于零，微元数必须为 1–16384 的整数");
  const dx = length / count;
  const dq = charge / count;
  const contributions = Array.from({ length: count }, (_, index) => {
    const x = (index + 0.5) * dx;
    const separation = length + distance - x;
    return { x, dx, dq, separation, field: (K * dq) / separation ** 2 };
  });
  const exact = (K * charge) / (distance * (distance + length));
  const numerical = contributions.reduce(
    (total, item) => total + item.field,
    0,
  );
  return {
    exact,
    numerical,
    contributions,
    density: charge / length,
    relativeError: exact === 0 ? 0 : Math.abs((numerical - exact) / exact),
  };
}
export type SphereMode = "solid" | "layer" | "surface";
export type SphereInput = {
  mode: SphereMode;
  charge: number;
  outer: number;
  inner: number;
  radius: number;
};
export function gaussSphere({
  mode,
  charge,
  outer,
  inner,
  radius,
}: SphereInput) {
  finite(charge, outer, inner, radius);
  if (
    !["solid", "layer", "surface"].includes(mode) ||
    outer <= 0 ||
    radius < 0 ||
    inner < 0 ||
    inner >= outer
  )
    throw new RangeError("要求 R > 0、0 ≤ 内半径 < R、r ≥ 0");
  if (mode === "surface") {
    const atSurface = radius === outer;
    const undefinedField = atSurface && charge !== 0;
    const enclosed = radius < outer ? 0 : charge;
    return {
      field: undefinedField
        ? null
        : radius < outer
          ? 0
          : (K * charge) / radius ** 2,
      potential: (K * charge) / Math.max(radius, outer),
      enclosed: undefinedField ? null : enclosed,
      flux: undefinedField ? null : enclosed / EPSILON_0,
      region: atSurface ? "surface" : radius < outer ? "cavity" : "outside",
      density: charge / (4 * Math.PI * outer ** 2),
      limits: { inside: 0, outside: (K * charge) / outer ** 2 },
    };
  }
  const a = mode === "solid" ? 0 : inner;
  const cube = outer ** 3 - a ** 3;
  const fraction =
    radius <= a ? 0 : radius >= outer ? 1 : (radius ** 3 - a ** 3) / cube;
  const enclosed = charge * fraction;
  const field = radius === 0 ? 0 : (K * enclosed) / radius ** 2;
  const potential =
    radius <= a
      ? (1.5 * K * charge * (outer ** 2 - a ** 2)) / cube
      : radius >= outer
        ? (K * charge) / radius
        : ((K * charge) / cube) *
          (1.5 * outer ** 2 - 0.5 * radius ** 2 - a ** 3 / radius);
  return {
    field,
    potential,
    enclosed,
    flux: enclosed / EPSILON_0,
    region: radius < a ? "cavity" : radius <= outer ? "material" : "outside",
    density: charge / (((4 * Math.PI) / 3) * cube),
    limits: null,
  };
}
