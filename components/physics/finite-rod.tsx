"use client";
import { useState } from "react";
import { finiteRod } from "@/lib/physics/models";
import { Formula, Slider, Readout, Steps, Tasks, fmt } from "./shared";
export function FiniteRodDemo() {
  const [L, setL] = useState(2),
    [d, setD] = useState(1),
    [q, setQ] = useState(5),
    [n, setN] = useState(16),
    [selected, setSelected] = useState(8),
    [step, setStep] = useState(0);
  const model = finiteRod(L, d, q * 1e-9, n),
    index = Math.min(selected, n) - 1,
    c = model.contributions[index];
  const scale = 520 / (L + d),
    x0 = 58,
    end = x0 + L * scale,
    p = x0 + (L + d) * scale,
    sx = x0 + c.x * scale;
  const reset = () => {
    setL(2);
    setD(1);
    setQ(5);
    setN(16);
    setSelected(8);
    setStep(0);
  };
  const maxField = Math.max(
    ...model.contributions.map((x) => Math.abs(x.field)),
    1e-30,
  );
  return (
    <>
      <div className="ph-workbench">
        <div className="ph-scene">
          <div className="ph-scene-top">
            <span className="ph-pill">杆 0 ≤ x′ ≤ L</span>
            <span>场点 P 固定在 L + d</span>
          </div>
          <svg
            role="img"
            aria-label={`均匀带电杆长${L}米，观察点距右端${d}米，电荷${q}纳库仑；电场${q > 0 ? "向右" : q < 0 ? "向左" : "为零"}`}
            viewBox="0 0 700 290"
          >
            <defs>
              <marker
                id="rod-arrow"
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
            <path d="M35 190H665" stroke="#94a3b8" strokeWidth="1" />
            <text x="648" y="215" fill="#94a3b8">
              +x
            </text>
            <rect
              x={x0}
              y="127"
              width={L * scale}
              height="26"
              rx="5"
              fill="#60a5fa"
              opacity=".75"
            />
            {step >= 1 &&
              model.contributions.map((m, i) => (
                <rect
                  key={i}
                  x={x0 + (i * L * scale) / n}
                  y="123"
                  width={(L * scale) / n}
                  height="34"
                  fill={i === index ? "#fbbf24" : "transparent"}
                  stroke="#0b1425"
                  strokeWidth="1"
                />
              ))}
            <circle cx={p} cy="140" r="6" fill="#fbbf24" />
            <text x={p - 5} y="175" fill="#fbbf24">
              P
            </text>
            <text x={x0} y="213" fill="#cbd5e1">
              0
            </text>
            <text x={end - 5} y="213" fill="#cbd5e1">
              L
            </text>
            <path d={`M${end} 240H${p}m0-4v8M${end} 236v8`} stroke="#fbbf24" />
            <text x={(end + p) / 2 - 10} y="262" fill="#fbbf24">
              d
            </text>
            <text x={(x0 + end) / 2 - 25} y="106" fill="#93c5fd">
              {q > 0 ? "+" : q < 0 ? "−" : ""} Q
            </text>
            {step >= 1 && (
              <>
                <path
                  d={`M${sx} 60H${p}M${sx} 55V110M${p} 55V110`}
                  stroke="#fbbf24"
                  strokeDasharray="4 4"
                />
                <text x={(sx + p) / 2 - 60} y="43" fill="#fbbf24">
                  s = L + d − x′
                </text>
                <text x={sx - 8} y="177" fill="#fbbf24">
                  dq
                </text>
              </>
            )}
            {step >= 2 && q !== 0 && (
              <path
                d={`M${p} 140h${Math.sign(q) * 62}`}
                stroke="#34d399"
                strokeWidth="3"
                markerEnd="url(#rod-arrow)"
              />
            )}
            <text x={p - 10} y="106" fill="#34d399">
              {step >= 2 ? (q === 0 ? "E = 0" : step === 2 ? "dE" : "E") : ""}
            </text>
          </svg>
          <p className="ph-caption">
            {
              [
                "先建立坐标：源点沿杆变化，观察点始终在杆的右侧。",
                "金色小段是当前微元。等长分割时 dq 相同，到 P 的距离不同。",
                "在 P 处画微元电场。正电荷向右、负电荷向左；本模型各微元方向相同。",
                "下面每根柱对应一个微元的场强大小。越靠近 P，贡献越大。",
              ][step]
            }
          </p>
          {step === 3 && (
            <div
              className="ph-contribution-bars"
              aria-label="各微元电场大小相对比较"
            >
              {model.contributions.map((m, i) => (
                <button
                  key={i}
                  aria-label={`选择第${i + 1}个微元，场强${fmt(m.field)}牛每库仑`}
                  title={`微元 ${i + 1}: ${fmt(m.field)} N/C`}
                  onClick={() => setSelected(i + 1)}
                  style={{
                    height: `${Math.max(2, (Math.abs(m.field) / maxField) * 100)}%`,
                    background: i === index ? "#fbbf24" : "#34d399",
                  }}
                />
              ))}
            </div>
          )}
          <div className="ph-readouts">
            <Readout label="解析场强 Eₓ" value={model.exact} unit="N/C" />
            <Readout label="中点求和 Eₙ" value={model.numerical} unit="N/C" />
            <Readout
              label={q === 0 ? "绝对误差（零电荷）" : "相对误差"}
              value={q === 0 ? 0 : model.relativeError * 100}
              unit={q === 0 ? "N/C" : "%"}
            />
          </div>
        </div>
        <aside className="ph-controls">
          <h2>改变物理条件</h2>
          <Slider
            label="杆长 L"
            value={L}
            min={0.2}
            max={5}
            step={0.1}
            onChange={setL}
            unit="m"
          />
          <Slider
            label="距右端 d"
            value={d}
            min={0.05}
            max={5}
            step={0.05}
            onChange={setD}
            unit="m"
          />
          <Slider
            label="总电荷 Q"
            value={q}
            min={-10}
            max={10}
            step={0.5}
            onChange={setQ}
            unit="nC"
          />
          <Slider
            label="微元数 N"
            value={n}
            min={1}
            max={160}
            step={1}
            onChange={(v) => {
              setN(v);
              setSelected(Math.min(selected, v));
            }}
          />
          <Slider
            label="选中微元"
            value={index + 1}
            min={1}
            max={n}
            step={1}
            onChange={(v) => {
              setSelected(v);
              setStep(Math.max(1, step));
            }}
          />
          <div className="ph-mini-readings">
            <p>λ = {fmt(model.density * 1e9)} nC/m</p>
            <p>dq = {fmt(c.dq * 1e9)} nC</p>
            <p>s = {fmt(c.separation)} m</p>
            <p>dEₓ ≈ {fmt(c.field)} N/C</p>
          </div>
          <p className="ph-footnote">
            Q 为整根杆的固定总电荷；改变 L 会同时改变线密度。理想细杆，d &gt;
            0。
          </p>
        </aside>
      </div>
      <Steps
        labels={["建系", "取微元", "画方向", "求和与积分"]}
        step={step}
        setStep={setStep}
        reset={reset}
      />
      <section className="ph-panel">
        <h2>
          {
            [
              "从源点到场点",
              "把电荷分成小段",
              "写出一段的贡献",
              "让求和走向积分",
            ][step]
          }
        </h2>
        <Formula
          tex={
            [
              String.raw`x'\in[0,L],\quad x_P=L+d,\quad s=L+d-x'>0`,
              String.raw`\lambda=\frac QL,\quad \Delta x=\frac LN,\quad \Delta q=\lambda\Delta x=\frac QN`,
              String.raw`dE_x=\frac{1}{4\pi\varepsilon_0}\frac{\lambda\,dx'}{(L+d-x')^2}`,
              String.raw`E_x=k\frac QL\int_0^L\frac{dx'}{(L+d-x')^2}=\frac{kQ}{d(d+L)}`,
            ][step]
          }
        />
        <p>
          {step === 3
            ? "求和用每小段中点的距离近似整段贡献。N 增大时近似收敛；解析结果不随 N 改变。"
            : "坐标 x′ 描述源电荷位置，s 是源点到 P 的距离。电荷的正负直接决定有符号场强的正负。"}
        </p>
      </section>
      <Tasks
        items={[
          {
            title: "近端与远端：等量电荷谁贡献更大？",
            text: "先预测，再选择靠近两端的微元。保持 N 不变比较 s 与 dE。贡献与距离平方成反比，近端的等量电荷贡献更大。",
          },
          {
            title: "只增加 N，真实电场会改变吗？",
            text: "固定 L、d、Q，将 N 从 4 增大到 16、64。解析场强应保持不变，中点求和更接近它；这改变的是计算精度。",
          },
          {
            title: "把电荷反号，再让观察点远离",
            text: "先把 Q 从 +5 改为 −5 nC，箭头与两个场强读数同时反向，误差比例不变。随后减小 L 并增大 d，比较 kQ/d²：当 d 远大于 L 时，杆可以近似点电荷。",
          },
        ]}
      />
    </>
  );
}
