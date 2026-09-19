import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background:
            "linear-gradient(135deg, #67e8f9 0%, #60a5fa 52%, #c084fc 100%)",
          color: "#030712",
          fontFamily: "Arial, sans-serif",
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: "-0.06em",
        }}
      >
        CC
      </div>
    ),
    size,
  );
}
