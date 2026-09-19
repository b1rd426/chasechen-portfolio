export type PreviewKind = "portfolio" | "sorting" | "physics";

/** Static project illustrations; full experiments are available at their links. */
export function ProjectPreview({ kind }: { kind: PreviewKind }) {
  return (
    <div
      className={`project-preview project-preview-${kind}`}
      aria-hidden="true"
    >
      {kind === "portfolio" ? (
        <div className="preview-browser">
          <div className="preview-browser-bar">
            <i />
            <i />
            <i />
            <span>chase0426.com</span>
          </div>
          <div className="preview-portfolio">
            <span>Chase Chen.</span>
            <p>
              把想法，
              <br />
              慢慢做成现实。
            </p>
            <small>走进我的作品 ↗</small>
          </div>
        </div>
      ) : kind === "sorting" ? (
        <svg viewBox="0 0 640 360" fill="none">
          <path
            d="M70 282H570M70 96H570M70 158H570M70 220H570"
            stroke="currentColor"
            strokeOpacity=".1"
          />
          {[18, 32, 64, 45, 78, 92].map((value, index) => (
            <g key={value}>
              <rect
                x={91 + index * 78}
                y={282 - value * 1.9}
                width="40"
                height={value * 1.9}
                rx="2"
                fill={index === 2 || index === 3 ? "#c7a57f" : "#82958c"}
                opacity={index > 3 ? 0.85 : 0.65}
              />
              <text
                x={111 + index * 78}
                y="308"
                textAnchor="middle"
                fill="#b5bdb4"
                fontSize="13"
              >
                {value}
              </text>
            </g>
          ))}
          <path
            d="M265 130Q307 88 345 130m-9-2 9 2-1-9"
            stroke="#d1b48e"
            strokeWidth="1.5"
          />
          <text x="70" y="53" fill="#c3c6b7" fontSize="13" letterSpacing="2">
            冒泡排序
          </text>
          <text x="570" y="53" textAnchor="end" fill="#9ca89f" fontSize="12">
            比较 · 交换 · 有序
          </text>
        </svg>
      ) : (
        <svg viewBox="0 0 640 360" fill="none">
          {[72, 104, 136].map((radius) => (
            <g key={radius} stroke="#9fac9e" strokeOpacity=".12">
              <circle cx="220" cy="228" r={radius} />
              <circle cx="420" cy="228" r={radius} />
            </g>
          ))}
          <path
            d="M220 228 320 134 420 228"
            stroke="#85988e"
            strokeDasharray="4 6"
            strokeOpacity=".6"
          />
          <g strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M320 134 362 95m-10 1 10-1-1 10" stroke="#c7a57f" />
            <path d="M320 134 278 95m1 10-1-10 10 1" stroke="#94afa5" />
            <path d="M320 134V56m-6 9 6-9 6 9" stroke="#e0d6bb" />
          </g>
          <circle cx="320" cy="134" r="4" fill="#e4decc" />
          {[220, 420].map((x) => (
            <g key={x}>
              <circle cx={x} cy="228" r="19" fill="#1b2421" stroke="#b39b7d" />
              <path d={`M${x - 6} 228h12m-6-6v12`} stroke="#dcc3a2" />
            </g>
          ))}
          <g fill="#bfc5b8" fontSize="13">
            <text x="210" y="270">
              q₁
            </text>
            <text x="410" y="270">
              q₂
            </text>
            <text x="334" y="59">
              E
            </text>
            <text x="366" y="92">
              E₁
            </text>
            <text x="256" y="92">
              E₂
            </text>
            <text x="331" y="151">
              P
            </text>
          </g>
          <text x="70" y="324" fill="#aeb8ac" fontSize="13" letterSpacing="2">
            看见场的叠加
          </text>
          <text x="570" y="324" textAnchor="end" fill="#bda88b" fontSize="14">
            E = E₁ + E₂
          </text>
        </svg>
      )}
    </div>
  );
}
