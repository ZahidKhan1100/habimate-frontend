import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_ALT = "HabiMate — Shared living, simplified";

export function habimateOgImageResponse(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0b1220 0%, #1e293b 45%, #0f172a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #FF6A6A, #FF8A8A)",
            }}
          />
          <span
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: -2,
              color: "#FF6A6A",
            }}
          >
            HabiMate
          </span>
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: "#94a3b8",
            marginTop: 8,
          }}
        >
          Shared living, simplified
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#2EC4B6",
            marginTop: 28,
            fontWeight: 600,
          }}
        >
          Fair splits · AI receipts · House wall
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
