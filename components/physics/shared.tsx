"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import katex from "katex";
import { Container } from "@/components/container";
export function Formula({ tex }: { tex: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const check = () => setOverflow(el.scrollWidth > el.clientWidth + 2);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    document.fonts.ready.then(check);
    return () => observer.disconnect();
  }, [tex]);
  return (
    <div>
      <div
        ref={container}
        className="ph-formula"
        role="region"
        aria-label={overflow ? "数学公式，可左右滚动" : "数学公式"}
        tabIndex={overflow ? 0 : undefined}
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(tex, {
            displayMode: true,
            throwOnError: true,
            trust: false,
            strict: "error",
          }),
        }}
      />
      {overflow && <p className="ph-formula-hint">左右滑动可查看完整公式</p>}
    </div>
  );
}
export const fmt = (n: number | null, d = 4) =>
  n === null
    ? "边界处不定义"
    : n === 0
      ? "0"
      : Math.abs(n) >= 1e4 || Math.abs(n) < 0.001
        ? n.toExponential(3)
        : Number(n.toPrecision(d)).toString();
export function DemoShell({
  title,
  description,
  children,
  chapter = 14,
  footnote,
}: {
  title: string;
  description: string;
  children: ReactNode;
  chapter?: number;
  footnote?: string;
}) {
  return (
    <Container className="py-10 sm:py-14">
      <nav className="ph-breadcrumb" aria-label="物理项目导航">
        <Link href="/projects">项目</Link>
        <span>/</span>
        <Link href="/projects/university-physics">大学物理</Link>
        <span>/</span>
        <Link href={"/projects/university-physics/chapter-" + chapter}>第{chapter}章</Link>
      </nav>
      <header className="ph-demo-header">
        <p className="ph-kicker">电场 · 几何 · 推导</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      {children}
      <p className="ph-footnote">
        {footnote ?? "真空静电模型，SI单位。蓝色表示电荷分布，金色表示观察位置或高斯面，绿色表示有符号电场。箭头表示方向，精确大小请看读数。"}
      </p>
    </Container>
  );
}
export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  unit?: string;
}) {
  return (
    <label className="ph-slider">
      <span>
        {label}
        <output>
          {Number(value.toFixed(4))} {unit}
        </output>
      </span>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <small>
        {min}—{max} {unit}
      </small>
    </label>
  );
}
export function Readout({
  label,
  value,
  unit,
}: {
  label: string;
  value: number | null;
  unit: string;
}) {
  return (
    <div className="ph-readout">
      <span>{label}</span>
      <strong>
        {fmt(value)} <small>{unit}</small>
      </strong>
    </div>
  );
}
export function Steps({
  labels,
  step,
  setStep,
  reset,
}: {
  labels: string[];
  step: number;
  setStep: (n: number) => void;
  reset: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (step === labels.length - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep(step + 1), 2200);
    return () => clearTimeout(t);
  }, [playing, step, labels.length, setStep]);
  return (
    <div className="ph-steps">
      <div className="ph-step-tabs">
        {labels.map((s, i) => (
          <button
            key={s}
            onClick={() => {
              setPlaying(false);
              setStep(i);
            }}
            aria-current={step === i ? "step" : undefined}
            className={step === i ? "active" : ""}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>
      <div className="ph-actions">
        <button
          onClick={() => {
            setPlaying(false);
            setStep(Math.max(0, step - 1));
          }}
          disabled={!step}
        >
          上一步
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setStep(Math.min(labels.length - 1, step + 1));
          }}
          disabled={step === labels.length - 1}
        >
          下一步
        </button>
        <button
          onClick={() => {
            if (step === labels.length - 1) setStep(0);
            setPlaying(!playing);
          }}
        >
          {playing ? "暂停讲解" : "播放讲解"}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            reset();
          }}
        >
          重置全部
        </button>
        <small>播放只推进讲解步骤，不代表真实时间演化。</small>
      </div>
    </div>
  );
}
export function Tasks({ items }: { items: { title: string; text: string }[] }) {
  return (
    <section className="ph-tasks">
      <h2>带着预测操作</h2>
      {items.map((t, i) => (
        <details key={t.title}>
          <summary>
            {i + 1}. {t.title}
          </summary>
          <p>{t.text}</p>
        </details>
      ))}
    </section>
  );
}
