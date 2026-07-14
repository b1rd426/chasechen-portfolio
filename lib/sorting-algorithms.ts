export type SortingAlgorithm = "bubble" | "selection" | "insertion";

export type SortingStepKind =
  | "initial"
  | "compare"
  | "swap"
  | "sorted"
  | "complete";

export type SortingStep = {
  values: number[];
  kind: SortingStepKind;
  comparing: number[];
  swapping: number[];
  sorted: number[];
  comparisons: number;
  swaps: number;
  description: string;
};

export type AlgorithmDefinition = {
  name: string;
  summary: string;
  timeComplexity: string;
  spaceComplexity: string;
};

export const algorithmDefinitions: Record<
  SortingAlgorithm,
  AlgorithmDefinition
> = {
  bubble: {
    name: "冒泡排序",
    summary: "反复比较相邻元素，把较大的值逐轮推到数组末端。",
    timeComplexity: "平均/最坏 O(n²)，最好 O(n)",
    spaceComplexity: "O(1)",
  },
  selection: {
    name: "选择排序",
    summary: "每轮在未排序区间找到最小值，并放到当前起点。",
    timeComplexity: "最好/平均/最坏 O(n²)",
    spaceComplexity: "O(1)",
  },
  insertion: {
    name: "插入排序",
    summary: "把当前元素向前移动，插入左侧已经有序的区间。",
    timeComplexity: "平均/最坏 O(n²)，最好 O(n)",
    spaceComplexity: "O(1)",
  },
};

type StepState = {
  comparisons: number;
  swaps: number;
  sorted: Set<number>;
};

function snapshot(
  values: number[],
  state: StepState,
  input: {
    kind: SortingStepKind;
    description: string;
    comparing?: number[];
    swapping?: number[];
  },
): SortingStep {
  return {
    values: [...values],
    kind: input.kind,
    comparing: input.comparing ?? [],
    swapping: input.swapping ?? [],
    sorted: Array.from(state.sorted).sort((a, b) => a - b),
    comparisons: state.comparisons,
    swaps: state.swaps,
    description: input.description,
  };
}

function initialSteps(values: number[], state: StepState): SortingStep[] {
  return [
    snapshot(values, state, {
      kind: "initial",
      description:
        values.length === 0
          ? "数组为空，不需要排序。"
          : "数组已就绪，选择播放或单步开始排序。",
    }),
  ];
}

function completeStep(values: number[], state: StepState): SortingStep {
  values.forEach((_, index) => state.sorted.add(index));

  return snapshot(values, state, {
    kind: "complete",
    description:
      values.length <= 1
        ? "数组已经有序。"
        : `排序完成：共比较 ${state.comparisons} 次，交换 ${state.swaps} 次。`,
  });
}

function bubbleSortSteps(input: readonly number[]): SortingStep[] {
  const values = [...input];
  const state: StepState = { comparisons: 0, swaps: 0, sorted: new Set() };
  const steps = initialSteps(values, state);

  for (let end = values.length - 1; end > 0; end -= 1) {
    let swapped = false;

    for (let index = 0; index < end; index += 1) {
      state.comparisons += 1;
      steps.push(
        snapshot(values, state, {
          kind: "compare",
          comparing: [index, index + 1],
          description: `比较 ${values[index]} 与 ${values[index + 1]}。`,
        }),
      );

      if (values[index] > values[index + 1]) {
        steps.push(
          snapshot(values, state, {
            kind: "swap",
            swapping: [index, index + 1],
            description: `准备交换 ${values[index]} 与 ${values[index + 1]}。`,
          }),
        );
        [values[index], values[index + 1]] = [
          values[index + 1],
          values[index],
        ];
        state.swaps += 1;
        swapped = true;
      }
    }

    state.sorted.add(end);
    steps.push(
      snapshot(values, state, {
        kind: "sorted",
        description: `位置 ${end + 1} 已确定，值为 ${values[end]}。`,
      }),
    );

    if (!swapped) {
      for (let index = 0; index < end; index += 1) {
        state.sorted.add(index);
      }
      break;
    }
  }

  steps.push(completeStep(values, state));
  return steps;
}

function selectionSortSteps(input: readonly number[]): SortingStep[] {
  const values = [...input];
  const state: StepState = { comparisons: 0, swaps: 0, sorted: new Set() };
  const steps = initialSteps(values, state);

  for (let start = 0; start < values.length - 1; start += 1) {
    let minimum = start;

    for (let index = start + 1; index < values.length; index += 1) {
      state.comparisons += 1;
      steps.push(
        snapshot(values, state, {
          kind: "compare",
          comparing: [minimum, index],
          description: `比较当前最小值 ${values[minimum]} 与 ${values[index]}。`,
        }),
      );

      if (values[index] < values[minimum]) {
        minimum = index;
      }
    }

    if (minimum !== start) {
      steps.push(
        snapshot(values, state, {
          kind: "swap",
          swapping: [start, minimum],
          description: `准备把最小值 ${values[minimum]} 交换到位置 ${start + 1}。`,
        }),
      );
      [values[start], values[minimum]] = [values[minimum], values[start]];
      state.swaps += 1;
    }

    state.sorted.add(start);
    steps.push(
      snapshot(values, state, {
        kind: "sorted",
        description: `位置 ${start + 1} 已确定，值为 ${values[start]}。`,
      }),
    );
  }

  steps.push(completeStep(values, state));
  return steps;
}

function insertionSortSteps(input: readonly number[]): SortingStep[] {
  const values = [...input];
  const state: StepState = { comparisons: 0, swaps: 0, sorted: new Set() };
  const steps = initialSteps(values, state);

  if (values.length > 0) {
    state.sorted.add(0);
  }

  for (let end = 1; end < values.length; end += 1) {
    let index = end;
    state.sorted.clear();
    for (let sortedIndex = 0; sortedIndex < end; sortedIndex += 1) {
      state.sorted.add(sortedIndex);
    }

    while (index > 0) {
      state.comparisons += 1;
      steps.push(
        snapshot(values, state, {
          kind: "compare",
          comparing: [index - 1, index],
          description: `比较 ${values[index - 1]} 与待插入值 ${values[index]}。`,
        }),
      );

      if (values[index - 1] <= values[index]) {
        break;
      }

      steps.push(
        snapshot(values, state, {
          kind: "swap",
          swapping: [index - 1, index],
          description: `准备交换 ${values[index - 1]} 与 ${values[index]}，让待插入值左移。`,
        }),
      );
      [values[index - 1], values[index]] = [
        values[index],
        values[index - 1],
      ];
      state.swaps += 1;
      index -= 1;
    }

    state.sorted.clear();
    for (let sortedIndex = 0; sortedIndex <= end; sortedIndex += 1) {
      state.sorted.add(sortedIndex);
    }
    steps.push(
      snapshot(values, state, {
        kind: "sorted",
        description: `前 ${end + 1} 个元素已经局部有序。`,
      }),
    );
  }

  steps.push(completeStep(values, state));
  return steps;
}

export function generateSortingSteps(
  algorithm: SortingAlgorithm,
  input: readonly number[],
): SortingStep[] {
  switch (algorithm) {
    case "bubble":
      return bubbleSortSteps(input);
    case "selection":
      return selectionSortSteps(input);
    case "insertion":
      return insertionSortSteps(input);
  }
}
