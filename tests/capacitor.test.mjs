import test from "node:test";
import assert from "node:assert/strict";
import { capacitor } from "../lib/physics/capacitor.ts";
import { EPSILON_0 as EPS0 } from "../lib/physics/models.ts";
const base = { area: 0.01, distance: 0.002, initialDistance: 0.002, initialVoltage: 100,
  relativePermittivity: 3, fraction: 1, geometry: "area", constraint: "charge" };
function close(a,b) { assert.ok(Math.abs(a-b) <= 1e-11 * Math.max(Math.abs(a),Math.abs(b),1e-20), a+" != "+b); }
test("capacitor: SI baseline matches epsilon0 S/d and charge/energy", () => {
  const r = capacitor({...base, fraction: 0});
  close(r.C, EPS0 * 5); close(r.U, 100); close(r.Q, EPS0 * 500);
  close(r.W, EPS0 * 25000); close(r.sourceWork,0); close(r.externalWork,0);
  assert.equal(r.dielectricField,null);
});
test("capacitor: filling geometry, endpoints and vacuum limit", () => {
  for (const geometry of ["area","thickness"]) {
    close(capacitor({...base,geometry,fraction:0}).factor,1);
    close(capacitor({...base,geometry}).factor,3);
    close(capacitor({...base,geometry,relativePermittivity:1,fraction:.37}).factor,1);
  }
  close(capacitor({...base,fraction:.5}).factor,2);
  close(capacitor({...base,geometry:"thickness",fraction:.5}).factor,1.5);
});
test("capacitor: fixed Q and fixed U are different experiments", () => {
  const q=capacitor(base), u=capacitor({...base,constraint:"voltage"});
  close(q.Q,q.Q0); close(q.U,100/3); close(q.W,q.W0/3);
  close(u.U,100); close(u.Q,3*u.Q0); close(u.W,3*u.W0);
  close(u.sourceWork,2*(u.W-u.W0));
  assert.ok(q.externalWork<0 && u.externalWork<0);
});
test("capacitor: doubling separation and polarity/zero checks", () => {
  for (const constraint of ["charge","voltage"]) {
    const r=capacitor({...base,fraction:0,distance:.004,constraint});
    close(r.C,r.C0/2);
    close(r.energyRatio,constraint==="charge"?2:.5);
    const neg=capacitor({...base,fraction:0,distance:.004,constraint,initialVoltage:-100});
    close(neg.Q,-r.Q); close(neg.vacuumField,-r.vacuumField); close(neg.W,r.W);
  }
  const z=capacitor({...base,initialVoltage:0});
  assert.equal(z.W,0); assert.equal(z.Q,0); assert.equal(z.energyRatio,null);
});
test("capacitor: field integration independently recovers voltage, charge and energy", () => {
  for (const geometry of ["area","thickness"])
    for (const constraint of ["charge","voltage"])
      for (const f of [.1,.37,.9]) {
        const a={...base,geometry,constraint,fraction:f,distance:.0037,relativePermittivity:5.2};
        const r=capacitor(a), Ea=r.vacuumField, Ed=r.dielectricField;
        if(geometry==="thickness") {
          close(Ea*a.distance*(1-f)+Ed*a.distance*f,r.U);
          close(EPS0*Ea,EPS0*a.relativePermittivity*Ed);
          close(r.Q,EPS0*Ea*a.area);
        } else {
          close(Ea*a.distance,r.U); close(Ed,Ea);
          close(r.Q,EPS0*Ea*a.area*(1-f)+EPS0*a.relativePermittivity*Ed*a.area*f);
        }
        close(r.energyVacuum+r.energyDielectric,r.W);
        close(r.W-r.W0,r.sourceWork+r.externalWork);
      }
});
test("capacitor: finite difference mechanical work equals plate attraction in vacuum", () => {
  const h=1e-7;
  for(const constraint of ["charge","voltage"]) {
    const mid=capacitor({...base,constraint,fraction:0});
    const plus=capacitor({...base,constraint,fraction:0,distance:base.distance+h});
    const minus=capacitor({...base,constraint,fraction:0,distance:base.distance-h});
    const derivative=(plus.externalWork-minus.externalWork)/(2*h);
    const force=EPS0*mid.vacuumField**2*base.area/2;
    assert.ok(Math.abs(derivative/force-1)<1e-7);
  }
});
test("capacitor: reject invalid parameters and enum values", () => {
  for (const patch of [{distance:0},{area:-1},{fraction:1.01},{relativePermittivity:.9},
    {initialVoltage:NaN},{initialDistance:Infinity},{geometry:"guess"},{constraint:"both"}])
    assert.throws(()=>capacitor({...base,...patch}),RangeError);
});
