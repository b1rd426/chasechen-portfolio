import { ImageResponse } from "next/og";

export const alt = "Chase Chen Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(34, 211, 238, 0.35), transparent 30%), radial-gradient(circle at 82% 28%, rgba(168, 85, 247, 0.32), transparent 28%)",
          color: "#f8fafc",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: 72,
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255, 255, 255, 0.14)",
            borderRadius: 28,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            height: "100%",
            justifyContent: "space-between",
            padding: 54,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                alignItems: "center",
                background: "linear-gradient(135deg, #67e8f9, #818cf8)",
                borderRadius: 18,
                color: "#020617",
                display: "flex",
                fontSize: 30,
                fontWeight: 800,
                height: 72,
                justifyContent: "center",
                width: 72,
              }}
            >
              CC
            </div>
            <div
              style={{
                color: "#a5f3fc",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              Software Engineering Portfolio
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontSize: 82, fontWeight: 800, letterSpacing: 0 }}>
              Chase Chen
            </div>
            <div
              style={{
                color: "#bae6fd",
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.12,
              }}
            >
              把想法快速做成可用产品
            </div>
            <div
              style={{
                color: "#cbd5e1",
                fontSize: 30,
                lineHeight: 1.45,
                maxWidth: 900,
              }}
            >
              Web 开发 · 算法实验 · AI 工具探索 · 华南理工大学软件工程
            </div>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 24 }}>
            chase0426.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
