import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Open Numeric — Solutions Numériques";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 900 }}>Open Numeric</div>
        <div style={{ fontSize: 32, marginTop: 20, opacity: 0.8 }}>
          Solutions Numériques Complètes
        </div>
        <div style={{ fontSize: 24, marginTop: 40, opacity: 0.6 }}>
          Développement · Design · Formation · Maintenance
        </div>
      </div>
    ),
    { ...size },
  );
}