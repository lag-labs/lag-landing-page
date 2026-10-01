import { ImageResponse } from "next/og";

// Raster versions of public/icon.svg (Satori can't read CSS vars, so the
// brand hexes are repeated here — keep in sync with the tokens).
const brand = "#0095ff";
const mark = "#ffffff";
const markPath =
  "M27 3h10v19l13.4-13.4 7 7L44 29h19v10H44l13.4 13.4-7 7L37 46v18H27V46L13.6 59.4l-7-7L20 39H1V29h19L6.6 15.6l7-7L27 22Z";

/** Square brand mark as a PNG. `rounded` follows the favicon; Apple adds its own mask. */
export function markImage(size: number, { rounded = true } = {}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: brand,
        borderRadius: rounded ? size / 4 : 0,
      }}
    >
      <svg
        width={size * 0.64}
        height={size * 0.64}
        viewBox="0 0 64 64"
        role="img"
        aria-label="laglabs"
      >
        <path d={markPath} fill={mark} />
      </svg>
    </div>,
    { width: size, height: size },
  );
}

/** Wraps a PNG in an ICO container (PNG-in-ICO, supported by every current browser). */
export async function pngToIco(png: ArrayBuffer, size: number) {
  const bytes = new Uint8Array(png);
  const header = new ArrayBuffer(22);
  const view = new DataView(header);
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: icon
  view.setUint16(4, 1, true); // image count
  view.setUint8(6, size >= 256 ? 0 : size); // width
  view.setUint8(7, size >= 256 ? 0 : size); // height
  view.setUint8(8, 0); // palette
  view.setUint8(9, 0); // reserved
  view.setUint16(10, 1, true); // colour planes
  view.setUint16(12, 32, true); // bits per pixel
  view.setUint32(14, bytes.byteLength, true); // image size
  view.setUint32(18, 22, true); // image offset
  const ico = new Uint8Array(22 + bytes.byteLength);
  ico.set(new Uint8Array(header), 0);
  ico.set(bytes, 22);
  return ico;
}
