import test from "node:test";
import assert from "node:assert/strict";
import { finiteRod, gaussSphere, K, EPSILON_0 } from "../lib/physics/models.ts";
function near(a, b, rel = 1e-9, abs = 1e-10) {
  assert.ok(
    Math.abs(a - b) <= abs + rel * Math.max(Math.abs(a), Math.abs(b)),
    `${a} ≠ ${b}`,
  );
}
const sphere = (mode, r, q = 1e-9, a = 0.4, R = 1) =>
  gaussSphere({ mode, charge: q, outer: R, inner: a, radius: r });
test("rod independent closed-form integration and signed charge", () => {
  for (const L of [0.1, 1, 4])
    for (const d of [0.05, 0.5, 10])
      for (const q of [-2e-9, 0, 3e-9]) {
        const a = finiteRod(L, d, q, 2048);
        near(a.exact, ((K * q) / L) * (1 / d - 1 / (L + d)));
        near(a.numerical, a.exact, 3e-4);
        near(
          a.contributions.reduce((s, t) => s + t.dq, 0),
          q,
          1e-8,
          1e-20,
        );
      }
});
test("midpoint quadrature converges and short rod tends to point charge", () => {
  const errors = [8, 32, 128, 512].map(
    (n) => finiteRod(1, 0.2, 1e-9, n).relativeError,
  );
  for (let i = 1; i < errors.length; i++)
    assert.ok(errors[i] < errors[i - 1] / 8);
  near(finiteRod(1e-7, 1, 1e-9, 4).exact, K * 1e-9, 2e-7);
  near(
    finiteRod(1, 1e5, 1e-9, 4).exact,
    (K * 1e-9) / (1e5 + 0.5) ** 2,
    1e-9,
    1e-20,
  );
});
test("rod rejects singular geometry and invalid counts", () => {
  for (const values of [
    [0, 1, 1, 4],
    [1, 0, 1, 4],
    [1, -1, 1, 4],
    [1, 1, 1, 2.3],
    [1, 1, NaN, 4],
  ])
    assert.throws(() => finiteRod(...values), RangeError);
});
test("solid sphere has linear interior field and known center potential", () => {
  near(sphere("solid", 0).field, 0);
  near(sphere("solid", 0).potential, 1.5 * K * 1e-9);
  for (const r of [0.2, 0.5, 0.8]) {
    near(sphere("solid", r).field, K * 1e-9 * r);
    near(sphere("solid", r).enclosed, 1e-9 * r ** 3, 1e-10, 1e-22);
  }
});
test("layer cavity is equipotential with zero field, not zero potential", () => {
  for (const r of [0, 0.1, 0.3, 0.4]) {
    near(sphere("layer", r).field, 0);
    near(sphere("layer", r).potential, sphere("layer", 0).potential);
  }
  assert.ok(sphere("layer", 0).potential > 0);
});
test("volume distributions are continuous at material boundaries", () => {
  for (const mode of ["solid", "layer"])
    for (const r of [0.4, 1]) {
      const left = sphere(mode, r - 1e-8),
        right = sphere(mode, r + 1e-8);
      near(left.field, right.field, 1e-6, 1e-6);
      near(left.potential, right.potential, 1e-6);
    }
});
test("Gauss flux, exterior monopole and sign reversal", () => {
  for (const mode of ["solid", "layer", "surface"])
    for (const r of [0.2, 0.7, 1.3, 5]) {
      const x = sphere(mode, r),
        negative = sphere(mode, r, -1e-9);
      near(4 * Math.PI * r * r * x.field, x.flux);
      near(x.flux, x.enclosed / EPSILON_0);
      near(negative.field, -x.field);
      near(negative.potential, -x.potential);
      if (r > 1) {
        near(x.field, (K * 1e-9) / r ** 2);
        near(x.potential, (K * 1e-9) / r);
      }
    }
});
test("independent potential derivative equals negative field", () => {
  for (const mode of ["solid", "layer", "surface"])
    for (const r of [0.2, 0.6, 1.4, 3]) {
      const h = 1e-5;
      const derivative =
        (sphere(mode, r + h).potential - sphere(mode, r - h).potential) /
        (2 * h);
      near(-derivative, sphere(mode, r).field, 1e-7, 1e-7);
    }
});
test("surface charge has continuous potential and two field limits", () => {
  const at = sphere("surface", 1);
  assert.equal(at.field, null);
  assert.equal(at.enclosed, null);
  assert.equal(at.flux, null);
  near(at.limits.outside - at.limits.inside, at.density / EPSILON_0);
  near(
    sphere("surface", 1 - 1e-8).potential,
    sphere("surface", 1 + 1e-8).potential,
    1e-7,
  );
});
test("thin volume layer tends to surface shell away from boundary", () => {
  for (const r of [0.3, 1.2]) {
    const thin = sphere("layer", r, 1e-9, 0.999999);
    const shell = sphere("surface", r);
    near(thin.potential, shell.potential, 2e-6);
    near(thin.field, shell.field);
  }
});
test("sphere rejects invalid geometry", () => {
  for (const v of [
    { outer: 0 },
    { inner: 1 },
    { radius: -0.1 },
    { charge: Infinity },
  ])
    assert.throws(
      () =>
        gaussSphere({
          mode: "layer",
          charge: 1e-9,
          outer: 1,
          inner: 0.4,
          radius: 0.6,
          ...v,
        }),
      RangeError,
    );
});

test("zero charge is zero field and potential including a geometrical surface", () => {
  for (const mode of ["solid", "layer", "surface"])
    for (const radius of [0, 0.4, 1, 2]) {
      const result = sphere(mode, radius, 0);
      assert.equal(result.field, 0);
      assert.equal(result.potential, 0);
      assert.equal(result.flux, 0);
    }
});
