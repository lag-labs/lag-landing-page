import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Served as /og.png (a real extension, so static hosts send image/png).
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

const font = (weight: number) =>
  readFile(join(process.cwd(), `src/fonts/manrope-${weight}.ttf`));

// Brand values duplicated from the design tokens (Satori can't read CSS vars).
const paper = "#f7f7f5";
const ink = "#1d2024";
const muted = "#5a5e64";
const brand = "#0095ff";
const brandStrong = "#0165b0";
const line = "#e0e0dc";

export async function GET() {
  const [medium, semibold, extrabold] = await Promise.all([
    font(500),
    font(600),
    font(800),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: paper,
        color: ink,
        fontFamily: "Manrope",
        padding: "64px 72px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: "-0.065em",
          }}
        >
          laglabs
          <div
            style={{
              width: 9,
              height: 9,
              marginLeft: 6,
              marginBottom: 11,
              borderRadius: 1,
              background: brand,
            }}
          />
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, color: muted }}>
          {site.url.replace("https://", "")}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.064em",
            }}
          >
            More ambition.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.064em",
            }}
          >
            Less&nbsp;
            <span
              style={{
                color: brandStrong,
                borderBottom: `4px solid ${brand}`,
              }}
            >
              busywork
            </span>
            .
          </div>
        </div>
        <div
          style={{
            width: 210,
            height: 210,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            background: brand,
            transform: "rotate(-8deg)",
          }}
        >
          <svg
            width="96"
            height="96"
            viewBox="0 0 64 64"
            role="img"
            aria-label="laglabs mark"
          >
            <path
              d="M27 3h10v19l13.4-13.4 7 7L44 29h19v10H44l13.4 13.4-7 7L37 46v18H27V46L13.6 59.4l-7-7L20 39H1V29h19L6.6 15.6l7-7L27 22Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${line}`,
          paddingTop: 24,
          fontSize: 24,
          fontWeight: 500,
          color: muted,
        }}
      >
        <span>Custom AI employees for mid-sized companies.</span>
        <span style={{ color: ink, fontWeight: 600 }}>Managed by laglabs</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Manrope", data: medium, weight: 500, style: "normal" },
        { name: "Manrope", data: semibold, weight: 600, style: "normal" },
        { name: "Manrope", data: extrabold, weight: 800, style: "normal" },
      ],
    },
  );
}
