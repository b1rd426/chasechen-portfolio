"use client";

import { Pause, Play, RotateCcw, Shuffle, StepForward } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { GlowCard } from "@/components/glow-card";
import { cn } from "@/lib/cn";

type SortStep = {
  values: number[];
  comparing?: [number, number];
  swapped?: [number, number];
  sorted: number[];
  note: string;
};

const presets = [
  [42, 18, 63, 31, 76, 24, 55, 9],
  [68, 12, 48, 36, 81, 27, 59, 15],
  [35, 74, 21, 62, 11, 53, 46, 29],
];

function buildBubbleSteps(input: number[]): SortStep[] {
  const values = [...input];
  const steps: SortStep[] = [
    {
      values: [...values],
      sorted: [],
      note: "准备开始冒泡排序",
    },
  ];

  for (let pass = 0; pass < values.length - 1; pass += 1) {
    let changed = false;

    for (let index = 0; index < values.length - pass - 1; index += 1) {
      steps.push({
        values: [...values],
        comparing: [index, index + 1],
        sorted: Array.from({ length: pass }, (_, offset) => values.length - 1 - offset),
        note: `比较 ${values[index]} 和 ${values[index + 1]}`,
      });

      if (values[index] > values[index + 1]) {
        [values[index], values[index + 1]] = [values[index + 1], values[index]];
        changed = true;
        steps.push({
          values: [...values],
          swapped: [index, index + 1],
          sorted: Array.from({ length: pass }, (_, offset) => values.length - 1 - offset),
          note: "左侧更大，交换位置",
        });
      }
    }

    steps.push({
      values: [...values],
      sorted: Array.from({ length: pass + 1 }, (_, offset) => values.length - 1 - offset),
      note: `第 ${pass + 1} 轮完成，最大值沉到右侧`,
    });

    if (!changed) {
      break;
    }
  }

  steps.push({
    values: [...values],
    sorted: values.map((_, index) => index),
    note: "排序完成",
  });

  return steps;
}

function isHighlighted(pair: [number, number] | undefined, index: number) {
  return Boolean(pair?.includes(index));
}

export function SortingVisualizer() {
  const [presetIndex, setPresetIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const values = presets[presetIndex];
  const steps = useMemo(() => buildBubbleSteps(values), [values]);
  const currentStep = steps[stepIndex];
  const progress = Math.round((stepIndex / (steps.length - 1)) * 100);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (stepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setStepIndex((current) => Math.min(current + 1, steps.length - 1));
    }, 620);

    return () => window.clearTimeout(timer);
  }, [isPlaying, stepIndex, steps.length]);

  const reset = () => {
    setIsPlaying(false);
    setStepIndex(0);
  };

  const shufflePreset = () => {
    setIsPlaying(false);
    setPresetIndex((current) => (current + 1) % presets.length);
    setStepIndex(0);
  };

  return (
    <GlowCard className="p-5 sm:p-7">
      <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-5 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Bubble Sort</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            排序过程可视化
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.07] text-slate-100 transition hover:border-cyan-300/35 hover:text-cyan-100"
            aria-label={isPlaying ? "暂停排序动画" : "播放排序动画"}
            onClick={() => setIsPlaying((playing) => !playing)}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.07] text-slate-100 transition hover:border-cyan-300/35 hover:text-cyan-100"
            aria-label="前进一步"
            onClick={() => {
              setIsPlaying(false);
              setStepIndex((current) => Math.min(current + 1, steps.length - 1));
            }}
          >
            <StepForward className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.07] text-slate-100 transition hover:border-cyan-300/35 hover:text-cyan-100"
            aria-label="重置排序"
            onClick={reset}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.07] text-slate-100 transition hover:border-cyan-300/35 hover:text-cyan-100"
            aria-label="切换数组"
            onClick={shufflePreset}
          >
            <Shuffle className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_260px] lg:items-end">
        <div
          className="flex min-h-72 items-end gap-2 rounded-lg border border-white/10 bg-slate-950/45 p-4 sm:gap-3 sm:p-6"
          aria-label="排序数组"
        >
          {currentStep.values.map((value, index) => {
            const comparing = isHighlighted(currentStep.comparing, index);
            const swapped = isHighlighted(currentStep.swapped, index);
            const sorted = currentStep.sorted.includes(index);

            return (
              <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex w-full min-w-6 items-start justify-center rounded-t-md border border-white/10 px-1 pt-2 text-xs font-semibold text-slate-950 shadow-neon transition-all duration-300",
                    sorted && "bg-emerald-300",
                    comparing && "bg-yellow-200",
                    swapped && "bg-pink-300",
                    !sorted && !comparing && !swapped && "bg-cyan-300",
                  )}
                  style={{ height: `${value * 2.45}px` }}
                >
                  {value}
                </div>
                <span className="text-xs text-slate-500">{index + 1}</span>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold text-slate-500">当前步骤</p>
          <p className="mt-2 min-h-12 text-sm leading-6 text-slate-100">
            {currentStep.note}
          </p>
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
              <span>
                {stepIndex + 1} / {steps.length}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-cyan-300 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-400">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <dt>比较</dt>
              <dd className="mt-1 font-semibold text-yellow-100">黄色</dd>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <dt>交换</dt>
              <dd className="mt-1 font-semibold text-pink-100">粉色</dd>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <dt>已排序</dt>
              <dd className="mt-1 font-semibold text-emerald-100">绿色</dd>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <dt>算法</dt>
              <dd className="mt-1 font-semibold text-cyan-100">冒泡</dd>
            </div>
          </dl>
        </div>
      </div>
    </GlowCard>
  );
}
