import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  generateSortingSteps,
  type SortingAlgorithm,
} from "./sorting-algorithms";

const algorithms: SortingAlgorithm[] = ["bubble", "selection", "insertion"];

function finalValues(algorithm: SortingAlgorithm, values: number[]) {
  const steps = generateSortingSteps(algorithm, values);
  return steps.at(-1)?.values;
}

describe("generateSortingSteps", () => {
  for (const algorithm of algorithms) {
    test(`${algorithm}: 空数组`, () => {
      const steps = generateSortingSteps(algorithm, []);
      assert.deepEqual(steps.at(-1)?.values, []);
      assert.equal(steps.at(-1)?.kind, "complete");
    });

    test(`${algorithm}: 单元素数组`, () => {
      assert.deepEqual(finalValues(algorithm, [7]), [7]);
    });

    test(`${algorithm}: 重复元素`, () => {
      assert.deepEqual(finalValues(algorithm, [4, 2, 4, 1, 2]), [1, 2, 2, 4, 4]);
    });

    test(`${algorithm}: 逆序数组`, () => {
      assert.deepEqual(finalValues(algorithm, [5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
    });

    test(`${algorithm}: 不修改输入数组`, () => {
      const input = [3, 1, 2];
      generateSortingSteps(algorithm, input);
      assert.deepEqual(input, [3, 1, 2]);
    });
  }

  test("冒泡排序会生成比较、交换准备与完成状态", () => {
    const steps = generateSortingSteps("bubble", [2, 1]);
    assert.ok(steps.some((step) => step.kind === "compare"));
    assert.ok(steps.some((step) => step.kind === "swap"));
    assert.equal(steps.at(-1)?.comparisons, 1);
    assert.equal(steps.at(-1)?.swaps, 1);
    assert.deepEqual(steps.at(-1)?.sorted, [0, 1]);
  });
});
