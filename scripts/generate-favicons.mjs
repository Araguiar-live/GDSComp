import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

/** Raster favicons use a fixed black mark (Safari ignores SVG theme media queries for PNG/ICO). */
const rasterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <g transform="scale(4.231404958677686)">
    <g transform="translate(0 5.5)">
      <path fill="#000000" d="M28.1465 9.94756e-05C39.0128 9.94756e-05 48.4418 6.0162 53.1328 14.8253C56.3528 20.872 61.8107 26.5517 68.7871 26.5519H75.0586C82.2057 26.5519 88 32.2134 88 39.1964V77.7599C87.9999 88.2343 79.3086 96.7257 68.5879 96.7257C63.2945 96.7257 58.9082 100.653 55.2275 104.457C51.9247 107.871 47.2461 110.001 42.0586 110.001C32.0526 110.001 23.9414 102.076 23.9414 92.2999C23.9415 87.104 26.2326 82.4307 29.8818 79.1925C34.4742 75.1173 39.4707 70.2092 39.4707 64.0694C39.4707 58.7053 33.6367 55.0011 28.1465 55.0011C12.6016 55.0008 0 42.688 0 27.5001C0.000183619 12.3124 12.6017 0.00034167 28.1465 9.94756e-05Z" />
      <path fill="#000000" d="M121 14.6667C121 22.767 114.434 29.3335 106.333 29.3335C98.2331 29.3335 91.6665 22.767 91.6665 14.6667C91.6665 6.56653 98.2331 0 106.333 0C114.434 0 121 6.56653 121 14.6667Z" />
    </g>
  </g>
</svg>`;

const svgBuffer = Buffer.from(rasterSvg);

async function png(size, outName) {
  const out = join(publicDir, outName);
  await sharp(svgBuffer).resize(size, size).png().toFile(out);
  console.log("wrote", outName);
}

await png(16, "favicon-16x16.png");
await png(32, "favicon-32x32.png");
await png(32, "favicon.png");
await png(180, "apple-touch-icon.png");
await png(512, "favicon-512x512.png");

const ico = await pngToIco([
  join(publicDir, "favicon-16x16.png"),
  join(publicDir, "favicon-32x32.png"),
]);
writeFileSync(join(publicDir, "favicon.ico"), ico);
console.log("wrote favicon.ico");
