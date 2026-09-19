"use client";
import { useState } from "react";
import { gaussSphere, K, type SphereMode } from "@/lib/physics/models";
import { Formula, Slider, Readout, Steps, Tasks, fmt } from "./shared";
export function GaussSphereDemo() {
  const [mode, setMode] = useState<SphereMode>("layer"),
    [Q, setQ] = useState(5),
    [R, setR] = useState(1),
    [aRatio, setA] = useState(0.5),
    [rRatio, setRadius] = useState(0.75),
    [step, setStep] = useState(0),
    [plot, setPlot] = useState<"field" | "potential">("field");
  const a = mode === "solid" ? 0 : aRatio * R,
    r = rRatio * R,
    q = Q * 1e-9;
  const calc = (radius: number) =>
    gaussSphere({ mode, charge: q, outer: R, inner: a, radius });
  const m = calc(r),
    region =
      m.region === "cavity"
        ? "空腔内"
        : m.region === "material"
          ? "带电体内"
          : m.region === "surface"
            ? "理想面电荷处"
            : "分布外";
  const reset = () => {
    setMode("layer");
    setQ(5);
    setR(1);
    setA(0.5);
    setRadius(0.75);
    setStep(0);
    setPlot("field");
  };
  const yScale =
    plot === "field"
      ? (K * Math.max(Math.abs(q), 1e-9)) / R ** 2
      : (1.5 * K * Math.max(Math.abs(q), 1e-9)) / R;
  const px = (t: number) => 58 + t * 180,
    py = (v: number) => 126 - (v / yScale) * 86;
  const path = (lo: number, hi: number) =>
    Array.from({ length: 121 }, (_, i) => {
      const t = lo + ((hi - lo) * i) / 120;
      const val = calc(t * R)[plot];
      return val === null ? "" : `${i === 0 ? "M" : "L"}${px(t)},${py(val)}`;
    }).join(" ");
  const paths =
    mode === "surface" && plot === "field"
      ? [path(0, 0.999999), path(1.000001, 2.5)]
      : [path(0, 2.5)];
  const value = m[plot];
  return (
    <>
      <div className="ph-mode-tabs" role="group" aria-label="电荷分布模型">
        {(
          [
            ["solid", "均匀实心球"],
            ["layer", "均匀厚球层"],
            ["surface", "理想带电球面"],
          ] as const
        ).map(([key, label]) => (
          <button
            className={mode === key ? "active" : ""}
            aria-pressed={mode === key}
            key={key}
            onClick={() => setMode(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="ph-workbench">
        <div className="ph-scene">
          <div className="ph-scene-top">
            <span className="ph-pill">{region}</span>
            <span>高斯面 r / R = {rRatio.toFixed(2)}</span>
          </div>
          <svg
            viewBox="0 0 650 360"
            role="img"
            aria-label={`球对称分布剖面，高斯面位于${region}，半径${fmt(r)}米，径向场强${fmt(m.field)}牛每库仑`}
          >
            <defs>
              <marker
                id="sphere-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0 0L10 5L0 10" fill="#34d399" />
              </marker>
            </defs>
            <circle
              cx="275"
              cy="180"
              r="62"
              fill={mode === "surface" ? "none" : "#60a5fa25"}
              stroke="#60a5fa"
              strokeWidth={mode === "surface" ? 4 : 2}
            />
            {mode === "layer" && (
              <circle
                cx="275"
                cy="180"
                r={62 * aRatio}
                fill="#091322"
                stroke="#60a5fa"
                strokeWidth="1"
              />
            )}
            <circle
              cx="275"
              cy="180"
              r={62 * rRatio}
              fill="none"
              stroke="#fbbf24"
              strokeDasharray="5 5"
              strokeWidth="2"
            />
            <circle cx="275" cy="180" r="3" fill="#cbd5e1" />
            <path d="M275 180h62" stroke="#60a5fa" />
            <text x="302" y="199" fill="#93c5fd">
              R
            </text>
            <path
              d={`M275 180L${275 + 62 * rRatio * 0.707} ${180 - 62 * rRatio * 0.707}`}
              stroke="#fbbf24"
            />
            <text
              x={288 + 62 * rRatio * 0.354}
              y={165 - 62 * rRatio * 0.354}
              fill="#fbbf24"
            >
              r
            </text>
            <text x="251" y="201" fill="#cbd5e1">
              O
            </text>
            <text x="462" y="68" fill="#93c5fd">
              {Q > 0 ? "+" : Q < 0 ? "−" : ""} 电荷分布
            </text>
            <text x="462" y="96" fill="#fbbf24">
              虚线：高斯面
            </text>
            <text x="462" y="124" fill="#34d399">
              箭头：径向场
            </text>
            {step >= 2 &&
              m.field !== null &&
              m.field !== 0 &&
              [0, 60, 120, 180, 240, 300].map((deg) => {
                const th = (deg * Math.PI) / 180,
                  base = 62 * rRatio,
                  tip = base + Math.sign(m.field!) * 28;
                return (
                  <path
                    key={deg}
                    d={`M${275 + base * Math.cos(th)} ${180 + base * Math.sin(th)}L${275 + tip * Math.cos(th)} ${180 + tip * Math.sin(th)}`}
                    stroke="#34d399"
                    strokeWidth="2.5"
                    markerEnd="url(#sphere-arrow)"
                  />
                );
              })}
            <text x="35" y="340" fill="#94a3b8">
              二维剖面；实际高斯面是同心球面，面积 4πr²。
            </text>
          </svg>
          <p className="ph-caption">
            {
              [
                "球对称使电场沿径向，同一个同心球面上场强大小相同。",
                "只统计金色高斯面内部的电荷；空腔的包围电荷为零。",
                "正电荷使场向外，负电荷使场向内。零电场的位置不画方向箭头。",
                "比较边界内外及电势曲线；电势参考点取在无穷远。",
              ][step]
            }{" "}
            {mode === "surface" && rRatio === 1 && Q !== 0
              ? "理想面电荷处场强有跃变，此处分别显示两侧极限，不取任意平均。"
              : ""}
          </p>
          <div className="ph-readouts">
            <Readout
              label="包围电荷 Q内"
              value={m.enclosed === null ? null : m.enclosed * 1e9}
              unit="nC"
            />
            <Readout label="径向场强 Eᵣ" value={m.field} unit="N/C" />
            <Readout label="电势 U（U∞ = 0）" value={m.potential} unit="V" />
            <Readout label="电通量 Φ" value={m.flux} unit="N·m²/C" />
          </div>
        </div>
        <aside className="ph-controls">
          <h2>让高斯面穿过边界</h2>
          <Slider
            label="总电荷 Q"
            value={Q}
            min={-10}
            max={10}
            step={0.5}
            onChange={setQ}
            unit="nC"
          />
          <Slider
            label="外半径 R"
            value={R}
            min={0.2}
            max={2}
            step={0.1}
            onChange={setR}
            unit="m"
          />
          {mode === "layer" && (
            <Slider
              label="内半径 a / R"
              value={aRatio}
              min={0.1}
              max={0.95}
              step={0.05}
              onChange={setA}
            />
          )}
          <Slider
            label="高斯面 r / R"
            value={rRatio}
            min={0}
            max={2.5}
            step={0.01}
            onChange={setRadius}
          />
          <p className="ph-mini-readings">
            r = {fmt(r)} m {mode === "layer" && ` · a = ${fmt(a)} m`}
          </p>
          <div className="ph-actions">
            <button onClick={() => setRadius(0)}>到球心</button>
            {mode === "layer" && (
              <button onClick={() => setRadius(aRatio)}>到内边界</button>
            )}
            <button onClick={() => setRadius(1)}>到外边界</button>
            <button onClick={() => setRadius(1.5)}>到外部</button>
          </div>
          <p className="ph-footnote">
            保持总电荷 Q 不变时，改变半径会改变电荷密度。
          </p>
          <p className="ph-mini-readings">
            {mode === "surface" ? "σ" : "ρ"} = {fmt(m.density)}{" "}
            {mode === "surface" ? "C/m²" : "C/m³"}
          </p>
          {m.limits && (
            <p className="ph-mini-readings">
              E(R⁻) = 0 N/C
              <br />
              E(R⁺) = {fmt(m.limits.outside)} N/C
            </p>
          )}
        </aside>
      </div>
      <Steps
        labels={["看对称", "数电荷", "求场强", "查边界"]}
        step={step}
        setStep={setStep}
        reset={reset}
      />
      <section className="ph-panel">
        <h2>同一模型，四个相互约束的量</h2>
        <Formula
          tex={String.raw`\begin{gathered}\Phi_E=\oint\mathbf E\cdot d\mathbf S\\=4\pi r^2E_r=\frac{Q_{\mathrm{in}}(r)}{\varepsilon_0}\quad(r>0)\end{gathered}`}
        />
        {mode === "surface" ? (
          <Formula
            tex={String.raw`\begin{gathered}E_r=\begin{cases}0,&r<R\\kQ/r^2,&r>R\end{cases}\\U=\frac{kQ}{\max(r,R)}\end{gathered}`}
          />
        ) : (
          <>
            <Formula
              tex={String.raw`\begin{gathered}Q_{\mathrm{in}}=\begin{cases}0,&r\le a\\Q\dfrac{r^3-a^3}{R^3-a^3},&a<r<R\\Q,&r\ge R\end{cases}\\E_r=\frac{kQ_{\mathrm{in}}}{r^2}\quad(r>0)\end{gathered}`}
            />
            <p>
              {mode === "solid"
                ? "实心球取 a = 0，内部 E 与 r 成正比，球心 E = 0。"
                : "空腔内场强为零，但电势通常不为零。厚球层两侧场强连续。"}
            </p>
            <div className="ph-potential-regions">
              <p>空腔及内边界：r ≤ a</p>
              <Formula tex={String.raw`U(r)=\frac{3kQ(R^2-a^2)}{2(R^3-a^3)}`} />
              <p>带电区域：a &lt; r &lt; R</p>
              <Formula
                tex={String.raw`U(r)=\frac{kQ\left(3R^2/2-r^2/2-a^3/r\right)}{R^3-a^3}`}
              />
              <p>外边界及外部：r ≥ R</p>
              <Formula tex={String.raw`U(r)=\frac{kQ}{r}`} />
            </div>
          </>
        )}
        <p>
          场强的正负相对于径向向外。体分布的中心值用连续极限计算；高斯面积为零时不能直接除以
          r²。
        </p>
      </section>
      <section className="ph-panel">
        <div className="ph-chart-header">
          <h2>从中心走到外部</h2>
          <div className="ph-mode-tabs">
            <button
              className={plot === "field" ? "active" : ""}
              aria-pressed={plot === "field"}
              onClick={() => setPlot("field")}
            >
              场强 Eᵣ
            </button>
            <button
              className={plot === "potential" ? "active" : ""}
              aria-pressed={plot === "potential"}
              onClick={() => setPlot("potential")}
            >
              电势 U
            </button>
          </div>
        </div>
        <svg
          viewBox="0 0 560 255"
          role="img"
          aria-label={`${plot === "field" ? "场强" : "电势"}随半径变化，金点为当前高斯面；曲线包含正负方向`}
        >
          <path d="M58 25V226M58 126H520" stroke="#64748b" />
          {[0, 0.5, 1, 1.5, 2, 2.5].map((t) => (
            <g key={t}>
              <path d={`M${px(t)} 126v5`} stroke="#94a3b8" />
              <text x={px(t) - 7} y="244" fill="#94a3b8" fontSize="12">
                {t}
              </text>
            </g>
          ))}
          {[-1, 0, 1].map((t) => (
            <text
              key={t}
              x="1"
              y={py(t * yScale) + 4}
              fill="#94a3b8"
              fontSize="11"
            >
              {fmt(t * yScale, 3)}
            </text>
          ))}
          <text x="473" y="22" fill="#cbd5e1">
            r / R
          </text>
          <text x="63" y="20" fill="#34d399">
            {plot === "field" ? "Eᵣ (N/C)" : "U (V)"}
          </text>
          <path d={`M${px(1)} 30V222`} stroke="#60a5fa" strokeDasharray="4 4" />
          {mode === "layer" && (
            <path
              d={`M${px(aRatio)} 30V222`}
              stroke="#60a5fa"
              strokeDasharray="4 4"
            />
          )}
          {paths.map((p, i) => (
            <path
              d={p}
              key={i}
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
            />
          ))}
          <path
            d={`M${px(rRatio)} 30V222`}
            stroke="#fbbf24"
            strokeDasharray="3 3"
          />
          {value !== null && (
            <circle cx={px(rRatio)} cy={py(value)} r="5" fill="#fbbf24" />
          )}
          {mode === "surface" && plot === "field" && Q !== 0 && (
            <>
              <circle
                cx={px(1)}
                cy={py(0)}
                r="4"
                fill="#0b1425"
                stroke="#34d399"
              />
              <circle
                cx={px(1)}
                cy={py((K * q) / R ** 2)}
                r="4"
                fill="#0b1425"
                stroke="#34d399"
              />
            </>
          )}
        </svg>
        <p className="ph-caption">
          横轴是无量纲半径
          r/R，纵轴给出真实单位与刻度。金色竖线和读数始终对应同一个位置；理想球面的场强跃变处用两个空心点表示左右极限。
        </p>
      </section>
      <Tasks
        items={[
          {
            title: "空腔没有电荷，电势也一定为零吗？",
            text: "选择厚球层，先预测，再把高斯面移到球心。Q内、通量与场强为零，但电势一般非零。电势由相对于无穷远的做功定义。",
          },
          {
            title: "相同总电荷，球外能分辨三种分布吗？",
            text: "固定 Q、R，在 r/R = 1.5 处切换三种分布。球外 E 和 U 应完全相同，这是球对称性与总电荷共同决定的结果。",
          },
          {
            title: "把厚球层变薄，边界会发生什么？",
            text: "逐渐增大 a/R，再切换理想球面。有限厚度的曲线连续，理想球面有场强跃变而电势连续；不要把理想表面处的场强读成零或外侧值。",
          },
          {
            title: "电荷反号后，哪些量反号？",
            text: "保持几何尺寸不变，将 Q 反号。包围电荷、通量、场强和电势都反号；零点和区域边界不变。",
          },
        ]}
      />
    </>
  );
}
