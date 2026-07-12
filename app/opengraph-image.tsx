import { ImageResponse } from "next/og";

export const alt = "Chase Chen 软件工程作品集";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 18% 12%, rgba(34,211,238,0.34), transparent 34%), radial-gradient(circle at 88% 22%, rgba(168,85,247,0.3), transparent 36%), #030712",
          color: "#f8fafc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            color: "#a5f3fc",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #67e8f9 0%, #60a5fa 52%, #c084fc 100%)",
              color: "#030712",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            CC
          </div>
          Chase Chen · Software Engineering Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              maxWidth: 980,
              fontSize: 68,
              lineHeight: 1.12,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            把想法逐步做成清晰、可用、能复盘的小产品
          </div>
          <div
            style={{
              color: "#cbd5e1",
              fontSize: 28,
              lineHeight: 1.5,
            }}
          >
            Web 开发 · 数据结构与算法 · 项目复盘 · AI 工具探索
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#94a3b8",
            fontSize: 24,
          }}
        >
          <span>华南理工大学软件工程学生</span>
          <span>chase0426.com</span>
        </div>
      </div>
    ),
    size,
  );
}
