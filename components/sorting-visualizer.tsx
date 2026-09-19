"use client";

import {
  Dices,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import { GlowCard } from "@/components/glow-card";
import {
  algorithmDefinitions,
  generateSortingSteps,
  type SortingAlgorithm,
} from "@/lib/sorting-algorithms";
import { cn } from "@/lib/cn";

const initialValues = [8, 3, 6, 1, 7, 4, 2, 5];
const speedIntervals = [1000, 700, 450, 260, 120] as const;

function randomValues() {
  return Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 18) + 2,
  );
}

function isFormControl(target: EventTarget | null) {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLSelectElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLButtonElement
  );
}

export function SortingVisualizer() {
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>("bubble");
  const [values, setValues] = useState(initialValues);
  const [manualInput, setManualInput] = useState(initialValues.join(", "));
  const [inputError, setInputError] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedLevel, setSpeedLevel] = useState(3);

  const steps = useMemo(
    () => generateSortingSteps(algorithm, values),
    [algorithm, values],
  );
  const currentStep = steps[stepIndex] ?? steps[0];
  const lastStepIndex = Math.max(steps.length - 1, 0);
  const isComplete = stepIndex >= lastStepIndex;
  const definition = algorithmDefinitions[algorithm];
  const maximumValue = Math.max(...currentStep.values, 1);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setStepIndex(0);
  }, []);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((current) => Math.min(current + 1, lastStepIndex));
  }, [lastStepIndex]);

  const togglePlayback = useCallback(() => {
    if (isComplete) {
      setStepIndex(0);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((playing) => !playing);
  }, [isComplete]);

  useEffect(() => {
    reset();
  }, [algorithm, values, reset]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (isComplete) {
      setIsPlaying(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setStepIndex((current) => Math.min(current + 1, lastStepIndex));
    }, speedIntervals[speedLevel - 1]);

    return () => window.clearTimeout(timeout);
  }, [isComplete, isPlaying, lastStepIndex, speedLevel, stepIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isFormControl(event.target)) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        togglePlayback();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        stepForward();
      } else if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        reset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reset, stepForward, togglePlayback]);

  function applyManualInput(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parts = manualInput
      .split(/[\s,，]+/)
      .map((part) => part.trim())
      .filter(Boolean);
    const parsed = parts.map(Number);

    if (parsed.length < 2 || parsed.length > 16) {
      setInputError("请输入 2–16 个整数，用逗号或空格分隔。");
      return;
    }

    if (
      parsed.some(
        (value) => !Number.isInteger(value) || value < 1 || value > 99,
      )
    ) {
      setInputError("每个值必须是 1–99 之间的整数。");
      return;
    }

    setInputError("");
    setValues(parsed);
    setManualInput(parsed.join(", "));
  }

  function useRandomValues() {
    const nextValues = randomValues();
    setInputError("");
    setValues(nextValues);
    setManualInput(nextValues.join(", "));
  }

  return (
    <div className="space-y-5">
      <GlowCard className="p-5 sm:p-6" tone="violet">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <label className="block text-sm font-semibold text-slate-100">
            排序算法
            <select
              value={algorithm}
              onChange={(event) =>
                setAlgorithm(event.target.value as SortingAlgorithm)
              }
              className="focus-ring mt-2 min-h-11 w-full rounded-lg border border-white/15 bg-slate-950 px-3 text-sm text-white"
              aria-label="选择排序算法"
            >
              <option value="bubble">冒泡排序</option>
              <option value="selection">选择排序</option>
              <option value="insertion">插入排序</option>
            </select>
          </label>

          <form onSubmit={applyManualInput} className="min-w-0">
            <label
              htmlFor="manual-array"
              className="block text-sm font-semibold text-slate-100"
            >
              手动输入数组
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                id="manual-array"
                value={manualInput}
                onChange={(event) => setManualInput(event.target.value)}
                className="focus-ring min-h-11 min-w-0 flex-1 rounded-lg border border-white/15 bg-slate-950 px-3 text-sm text-white placeholder:text-slate-500"
                placeholder="例如：8, 3, 6, 1"
                aria-describedby="array-help array-error"
              />
              <button
                type="submit"
                className="focus-ring min-h-11 rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                aria-label="应用手动输入的数组"
              >
                应用数组
              </button>
              <button
                type="button"
                onClick={useRandomValues}
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-4 text-sm font-semibold text-white transition hover:border-cyan-300/40"
                aria-label="随机生成数组"
              >
                <Dices className="h-4 w-4" />
                随机数组
              </button>
            </div>
            <p id="array-help" className="mt-2 text-xs leading-5 text-slate-400">
              支持 2–16 个 1–99 的整数，逗号或空格分隔。
            </p>
            <p
              id="array-error"
              role="alert"
              className="mt-1 min-h-5 text-xs text-rose-200"
            >
              {inputError}
            </p>
          </form>
        </div>
      </GlowCard>

      <GlowCard className="p-5 sm:p-6" tone="cyan">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200">
              {definition.name}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              {definition.summary}
            </p>
          </div>
          <dl className="grid shrink-0 grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
              <dt className="text-xs text-slate-400">时间复杂度</dt>
              <dd className="mt-1 font-semibold text-white">
                {definition.timeComplexity}
              </dd>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
              <dt className="text-xs text-slate-400">空间复杂度</dt>
              <dd className="mt-1 font-semibold text-white">
                {definition.spaceComplexity}
              </dd>
            </div>
          </dl>
        </div>

        <div
          role="list"
          aria-label={`当前数组：${currentStep.values.join("，")}`}
          className="mt-6 flex h-64 items-end gap-1 overflow-hidden rounded-lg border border-white/10 bg-slate-950/60 px-2 pb-3 pt-8 sm:h-80 sm:gap-2 sm:px-4"
        >
          {currentStep.values.map((value, index) => {
            const isSwapping = currentStep.swapping.includes(index);
            const isComparing = currentStep.comparing.includes(index);
            const isSorted = currentStep.sorted.includes(index);

            return (
              <div
                key={index}
                role="listitem"
                aria-label={`位置 ${index + 1}，值 ${value}${
                  isSwapping
                    ? "，准备交换"
                    : isComparing
                      ? "，正在比较"
                      : isSorted
                        ? "，已排序"
                        : ""
                }`}
                className="flex min-w-0 flex-1 flex-col items-center justify-end"
                style={{ height: "100%" }}
              >
                <span className="mb-1 text-[10px] font-semibold text-slate-200 sm:text-xs">
                  {value}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "w-full rounded-t-sm border transition-[height,background-color,border-color] duration-300 motion-reduce:transition-none",
                    isSwapping
                      ? "border-rose-200 bg-rose-400"
                      : isComparing
                        ? "border-amber-100 bg-amber-300"
                        : isSorted
                          ? "border-emerald-200 bg-emerald-400"
                          : "border-cyan-200/50 bg-cyan-400/70",
                  )}
                  style={{ height: `${Math.max((value / maximumValue) * 88, 8)}%` }}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-300">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-amber-300" /> 正在比较
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-rose-400" /> 准备交换
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-emerald-400" /> 已排序 / 有序区
          </span>
        </div>

        <div
          aria-live="polite"
          className="mt-5 rounded-lg border border-cyan-200/15 bg-cyan-300/[0.06] p-4"
        >
          <p className="text-xs font-semibold text-cyan-200">当前步骤</p>
          <p className="mt-1 text-sm leading-6 text-white">
            {currentStep.description}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs text-slate-400">比较次数</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {currentStep.comparisons}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs text-slate-400">交换次数</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {currentStep.swaps}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs text-slate-400">步骤进度</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {stepIndex}/{lastStepIndex}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={togglePlayback}
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              aria-label={isPlaying ? "暂停排序动画" : "播放排序动画"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isPlaying ? "暂停" : isComplete ? "重新播放" : "播放"}
            </button>
            <button
              type="button"
              onClick={stepForward}
              disabled={isComplete}
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="执行下一步排序"
            >
              <SkipForward className="h-4 w-4" />
              单步
            </button>
            <button
              type="button"
              onClick={reset}
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-4 text-sm font-semibold text-white transition hover:border-cyan-300/40"
              aria-label="重置排序过程"
            >
              <RotateCcw className="h-4 w-4" />
              重置
            </button>
          </div>

          <label className="flex min-w-0 items-center gap-3 text-sm font-semibold text-slate-200 lg:min-w-72">
            <Gauge className="h-4 w-4 shrink-0 text-cyan-200" />
            速度 {speedLevel}x
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={speedLevel}
              onChange={(event) => setSpeedLevel(Number(event.target.value))}
              className="focus-ring min-w-0 flex-1 accent-cyan-300"
              aria-label="调整排序动画速度"
              aria-valuetext={`${speedLevel} 倍速度`}
            />
          </label>
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-400">
          键盘：空格播放/暂停，→ 单步，R 重置。输入框和下拉菜单聚焦时不会触发快捷键。
        </p>
      </GlowCard>
    </div>
  );
}
