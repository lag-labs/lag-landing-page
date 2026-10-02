import { ImageResponse } from "next/og";

// The brand-guide symbol (blue tile, ink asterisk), identical to public/icon.svg.
// Satori can't read CSS variables, so the guide hexes are repeated here.
const symbol = (rx: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="${rx}" fill="#00a9bd"/><g transform="translate(8 7)" fill="#242820"><path d="M27 3h10v19l13.4-13.4 7 7L44 29h19v10H44l13.4 13.4-7 7L37 46v18H27V46L13.6 59.4l-7-7L20 39H1V29h19L6.6 15.6l7-7L27 22Z"/></g></svg>`;

export const symbolDataUri = (rx = 20) =>
  `data:image/svg+xml;base64,${Buffer.from(symbol(rx)).toString("base64")}`;

/** Square brand symbol as a PNG. Apple applies its own mask, so it gets square corners. */
export function markImage(size: number, { rounded = true } = {}) {
  return new ImageResponse(
    // biome-ignore lint/performance/noImgElement: Satori renders plain <img>
    <img
      src={symbolDataUri(rounded ? 20 : 0)}
      width={size}
      height={size}
      alt="laglabs"
    />,
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
