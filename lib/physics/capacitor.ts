import { EPSILON_0 as EPS0 } from "./models.ts";

export type CapacitorInput = {
  area: number; distance: number; initialDistance: number;
  initialVoltage: number; relativePermittivity: number; fraction: number;
  geometry: "area" | "thickness"; constraint: "voltage" | "charge";
};

/** Linear, lossless dielectric; SI. Neglect plate and material-interface fringe fields.
 * Each result is an independent quasistatic comparison with the vacuum baseline.
 * Selecting a constraint does not model a switch transient.
 */
export function capacitor(input: CapacitorInput) {
  const { area: S, distance: d, initialDistance: d0, initialVoltage: U0,
    relativePermittivity: er, fraction: f, geometry, constraint } = input;
  if (![S, d, d0, U0, er, f].every(Number.isFinite) ||
      S <= 0 || d <= 0 || d0 <= 0 || er < 1 || f < 0 || f > 1 ||
      !["area", "thickness"].includes(geometry) ||
      !["voltage", "charge"].includes(constraint)) {
    throw new RangeError("Invalid capacitor parameters");
  }
  const C0 = EPS0 * S / d0, Q0 = C0 * U0, W0 = C0 * U0 ** 2 / 2;
  const factor = geometry === "area" ? 1 - f + er * f : 1 / (1 - f + f / er);
  const C = EPS0 * S / d * factor;
  const Q = constraint === "charge" ? Q0 : C * U0;
  const U = constraint === "voltage" ? U0 : Q / C;
  const Ea = geometry === "area" ? U / d : Q / (EPS0 * S);
  const Ed = geometry === "area" ? U / d : Ea / er;
  const energyVacuum = EPS0 * Ea ** 2 / 2 * S * d * (1 - f);
  const energyDielectric = EPS0 * er * Ed ** 2 / 2 * S * d * f;
  const W = C * U ** 2 / 2;
  const sourceWork = constraint === "voltage" ? U0 * (Q - Q0) : 0;
  return { C0, Q0, W0, C, Q, U, W, factor, energyVacuum, energyDielectric,
    vacuumField: f < 1 ? Ea : null, dielectricField: f > 0 ? Ed : null,
    polarization: f > 0 ? EPS0 * (er - 1) * Ed : null,
    sourceWork, externalWork: W - W0 - sourceWork,
    capacitanceRatio: C / C0, energyRatio: W0 === 0 ? null : W / W0 };
}
