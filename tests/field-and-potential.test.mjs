import test from 'node:test';
import assert from 'node:assert/strict';
import { K } from '../lib/physics/models.ts';
import { pointChargeField, axisPotential, electricWork } from '../lib/physics/field-and-potential.ts';
const close = (a,b,tol=1e-7) => assert.ok(Math.abs(a-b) <= tol*Math.max(1,Math.abs(b)), `${a} != ${b}`);
const base = {mode:'ring',x:1,outer:1,inner:.5,charge:2e-9,density:1e-9};

test('equal charges cancel E at midpoint but reinforce potential; opposite charges reverse this',()=>{
 const same=pointChargeField([{x:-1,y:0,charge:1e-9},{x:1,y:0,charge:1e-9}],{x:0,y:0});
 close(same.x,0); close(same.y,0); close(same.potential,2*K*1e-9);
 const opposite=pointChargeField([{x:-1,y:0,charge:1e-9},{x:1,y:0,charge:-1e-9}],{x:0,y:0});
 close(opposite.x,2*K*1e-9);close(opposite.potential,0);
});
test('field components agree with independently differentiated potential away from sources',()=>{
 const sources=[{x:-.8,y:0,charge:3e-9},{x:.8,y:0,charge:-2e-9}],h=1e-5;
 for(const point of [{x:.2,y:.7},{x:-1.1,y:1.3}]){
  const f=pointChargeField(sources,point);
  for(const component of ['x','y']) {
   const p=pointChargeField(sources,{...point,[component]:point[component]+h}).potential;
   const m=pointChargeField(sources,{...point,[component]:point[component]-h}).potential;
   close(f[component],-(p-m)/(2*h));
  }
 }
});
test('closed-path numerical field integral cancels despite nonzero local field',()=>{
 const sources=[{x:0,y:0,charge:3e-9},{x:3,y:.4,charge:-1e-9}];
 const path=[[-1,-1],[1,-1],[1,1],[-1,1],[-1,-1]];let work=0;
 for(let j=0;j<4;j++) for(let i=0;i<4000;i++){
  const dx=(path[j+1][0]-path[j][0])/4000,dy=(path[j+1][1]-path[j][1])/4000;
  const f=pointChargeField(sources,{x:path[j][0]+(i+.5)*dx,y:path[j][1]+(i+.5)*dy});
  work+=f.x*dx+f.y*dy;
 }
 close(work,0,1e-6);
});
test('ring axis field agrees with direct Coulomb integration around the source ring',()=>{
 for(const x of [-2,-.4,0,.7,2]){
  let field=0, potential=0;const n=8000;
  for(let i=0;i<n;i++){
   const angle=2*Math.PI*(i+.5)/n, sx=Math.cos(angle),sy=Math.sin(angle);
   const r=Math.hypot(x,sx,sy);
   field+=K*base.charge/n*x/r**3;potential+=K*base.charge/n/r;
  }
  const result=axisPotential({...base,x}); close(result.field,field);close(result.potential,potential);
 }
});
test('annulus agrees with independent radial quadrature, including negative x',()=>{
 for(const x of [-1,.5,0]){
  let potential=0,field=0;const n=10000,ds=.5/n;
  for(let i=0;i<n;i++){
   const s=.5+(i+.5)*ds,dq=2*Math.PI*s*ds*base.density,r=Math.hypot(s,x);
   potential+=K*dq/r;field+=K*dq*x/r**3;
  }
  const result=axisPotential({...base,mode:'annulus',x});close(result.potential,potential);close(result.field,field);
 }
});
test('negative gradient, polarity, zero source, ring maximum and far-field limits',()=>{
 for(const mode of ['ring','annulus']) for(const x of [-1.7,-.2,.6,2.2]) {
  const f=axisPotential({...base,mode,x}),h=1e-5;
  close(f.field,-(axisPotential({...base,mode,x:x+h}).potential-axisPotential({...base,mode,x:x-h}).potential)/(2*h));
  const neg=axisPotential({...base,mode,x,charge:-base.charge,density:-base.density});
  close(neg.field,-f.field);close(neg.potential,-f.potential);
 }
 const peak=axisPotential({...base,x:1/Math.sqrt(2)}).field;
 assert.ok(peak>axisPotential({...base,x:.6}).field && peak>axisPotential({...base,x:.8}).field);
 for(const mode of ['ring','annulus']) {
  const f=axisPotential({...base,mode,x:10000});
  close(f.field/(K*f.totalCharge/1e8),1); close(f.potential/(K*f.totalCharge/10000),1);
  const z=axisPotential({...base,mode,charge:0,density:0});close(z.field,0);close(z.potential,0);
 }
});
test('reference shift preserves field and work; negative probe reverses work',()=>{
 const a=axisPotential({...base,x:0}),b=axisPotential({...base,x:1});
 const shiftedA=axisPotential({...base,x:0,offset:30}),shiftedB=axisPotential({...base,x:1,offset:30});
 close(a.field,shiftedA.field);close(b.field,shiftedB.field);
 const w=electricWork(1e-9,a.potential,b.potential), ws=electricWork(1e-9,shiftedA.potential,shiftedB.potential);
 close(w.work*1e9,ws.work*1e9);close(w.energyChange*1e9,-w.work*1e9);
 assert.ok(w.work>0 && w.energyChange<0);
 close(electricWork(-1e-9,a.potential,b.potential).work*1e9,-w.work*1e9);
});
test('singular point source and charged disk have explicit undefined fields, no numerical clipping',()=>{
 assert.equal(pointChargeField([{x:0,y:0,charge:1e-9}],{x:0,y:0}),null);
 close(pointChargeField([{x:0,y:0,charge:0}],{x:0,y:0}).magnitude,0);
 const disk=axisPotential({...base,mode:'annulus',inner:0,x:0});
 assert.equal(disk.field,null);close(disk.insideLimit,-disk.outsideLimit);
 close(axisPotential({...base,mode:'annulus',inner:0,x:0,density:0}).field,0);
 assert.throws(()=>axisPotential({...base,inner:1}),RangeError);
 assert.throws(()=>axisPotential({...base,outer:0}),RangeError);
 assert.throws(()=>pointChargeField([],{x:NaN,y:0}),RangeError);
});
