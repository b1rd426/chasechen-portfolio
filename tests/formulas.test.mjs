import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import katex from "katex";
test("field and potential lessons render every equation branch", () => {
  let count=0;
  for(const name of ["field-superposition","potential-slope","flux-angle"]) {
    const text=readFileSync(new URL("../components/physics/"+name+".tsx",import.meta.url),"utf8");
    for(const match of text.matchAll(/String\.raw\u0060([^\u0060]+)\u0060/g)) {
      katex.renderToString(match[1],{throwOnError:true,strict:"error",trust:false});count++;
    }
  }
  assert.equal(count,15);
});
test("original demo formulas preserve TeX commands and semantic fractions", () => {
  const formulas = [];
  for (const name of ["finite-rod", "gauss-sphere"]) {
    const text = readFileSync(
      new URL("../components/physics/" + name + ".tsx", import.meta.url),
      "utf8",
    );
    assert.ok(
      !/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text),
      "No escaped control characters",
    );
    for (const match of text.matchAll(/String\.raw\u0060([^\u0060]+)\u0060/g)) {
      formulas.push(match[1]);
      assert.ok(
        match[1].includes("\\"),
        "Formula commands survived serialization",
      );
      katex.renderToString(match[1], {
        throwOnError: true,
        strict: "error",
        trust: false,
      });
    }
  }
  assert.equal(formulas.length, 10);
  assert.match(katex.renderToString(formulas[1]), /λ/);
  assert.match(katex.renderToString(formulas[2]), /class="mfrac"/);
  assert.match(katex.renderToString(formulas[3]), /∫/);
});

test("capacitor explanation formulas render all seven branches", () => {
  const text = readFileSync(new URL("../components/physics/capacitor.tsx",import.meta.url),"utf8");
  const formulas=[...text.matchAll(/String\.raw\u0060([^\u0060]+)\u0060/g)].map(m=>m[1]);
  assert.equal(formulas.length,7);
  for(const tex of formulas) {
    assert.ok(!/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(tex));
    katex.renderToString(tex,{throwOnError:true,strict:"error",trust:false});
  }
  assert.ok(formulas.some(f=>f.includes("A_{\\rm source}")));
});
