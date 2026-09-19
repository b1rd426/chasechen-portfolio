import test from 'node:test';
import assert from 'node:assert/strict';
import { uniformFlux } from '../lib/physics/field-and-potential.ts';
test('flux follows field-normal dot product including zero and opposite orientations',()=>{
  for(const [angle,expected] of [[0,2],[60,1],[90,0],[120,-1],[180,-2]]) {
    assert.ok(Math.abs(uniformFlux(100,.02,angle).flux-expected)<1e-12);
  }
  assert.equal(uniformFlux(0,.02,30).flux,0);
  assert.equal(uniformFlux(100,0,30).flux,0);
  assert.throws(()=>uniformFlux(100,.02,181),RangeError);
});
test('closed box has canceling entrance and exit flux at nonzero field',()=>{
  for(const theta of [0,23,60,90]) {
    const left=uniformFlux(100,.02,180-theta).flux;
    const right=uniformFlux(100,.02,theta).flux;
    assert.ok(Math.abs(left+right)<1e-12);
  }
});
