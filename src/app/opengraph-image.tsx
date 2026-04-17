import { ImageResponse } from "next/og";

export const alt = "CJ Clark — Cybersecurity Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #07080f 0%, #0e1019 60%, #151724 100%)",
          color: "#e2e4ed",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(205,255,100,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(205,255,100,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            display: "flex",
          }}
        />

        {/* Top row: label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontFamily: "monospace",
            fontSize: "22px",
            letterSpacing: "0.25em",
            color: "#cdff64",
            textTransform: "uppercase",
          }}
        >
          <span>{">_|"}</span>
          <span style={{ color: "#8b8fa3" }}>// cybersecurity engineer</span>
        </div>

        {/* Middle: name + title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: "148px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: "#e2e4ed",
              display: "flex",
            }}
          >
            CJ Clark
          </div>
          <div
            style={{
              fontSize: "36px",
              color: "#cdff64",
              fontFamily: "monospace",
              marginTop: "12px",
              display: "flex",
            }}
          >
            Cybersecurity Engineer
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#8b8fa3",
              marginTop: "8px",
              maxWidth: "900px",
              display: "flex",
            }}
          >
            Security tools, automation, and AI projects — with 5 interactive
            demos.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: "20px",
            color: "#8b8fa3",
          }}
        >
          <span>christianjclark92@gmail.com</span>
          <span style={{ color: "#cdff64" }}>github.com/cjcsecurity</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
