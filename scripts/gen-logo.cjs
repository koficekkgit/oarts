const fs = require("fs");
const path = require("path");
const opentype = require("opentype.js");
const sharp = require("sharp");

const FONT = path.join(
  __dirname,
  "..",
  "node_modules",
  "next",
  "dist",
  "compiled",
  "@vercel",
  "og",
  "Geist-Regular.ttf",
);
const OUT_DIR = "C:/Users/kofic/Desktop";

const FG = "#F5F5F5"; // off-white
const CHAMPAGNE = "#D6D0C4";
const BG = "#0a0a0a";

const font = opentype.parse(fs.readFileSync(FONT));
const fontSize = 500;

// wordmark -> vector path (baseline at y = 0)
const wordPath = font.getPath("oarts", 0, 0, fontSize, { kerning: true });
const bb = wordPath.getBoundingBox();
const wordPathData = wordPath.toPathData(2);

// 4-point sparkle (24x24 viewBox), matching the site mark
const sparkleD =
  "M12 0c.55 6.28 5.72 11.45 12 12-6.28.55-11.45 5.72-12 12-.55-6.28-5.72-11.45-12-12C6.28 11.45 11.45 6.28 12 0Z";
const sp = fontSize * 0.42; // sparkle size
const sparkleScale = sp / 24;
const gap = fontSize * 0.09;
const sparkleX = bb.x2 + gap;
const sparkleY = -sp; // bottom sits on the baseline (like items-end on the site)

// content bounds + padding
const pad = fontSize * 0.28;
const minX = Math.min(bb.x1, sparkleX);
const maxX = Math.max(bb.x2, sparkleX + sp);
const minY = Math.min(bb.y1, sparkleY);
const maxY = Math.max(bb.y2, sparkleY + sp);
const W = Math.ceil(maxX - minX + pad * 2);
const H = Math.ceil(maxY - minY + pad * 2);
const tx = (pad - minX).toFixed(2);
const ty = (pad - minY).toFixed(2);

const stroke = (fontSize * 0.013).toFixed(2); // nudge Regular toward the site's semibold

function buildSvg(withBg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${withBg ? `<rect width="${W}" height="${H}" fill="${BG}"/>` : ""}
<g transform="translate(${tx} ${ty})">
  <path d="${wordPathData}" fill="${FG}" stroke="${FG}" stroke-width="${stroke}" stroke-linejoin="round"/>
  <g transform="translate(${sparkleX.toFixed(2)} ${sparkleY.toFixed(2)}) scale(${sparkleScale.toFixed(4)})">
    <path d="${sparkleD}" fill="${CHAMPAGNE}"/>
  </g>
</g>
</svg>`;
}

async function run() {
  const transparent = buildSvg(false);
  const black = buildSvg(true);

  // keep the source SVG too (scalable)
  fs.writeFileSync(path.join(OUT_DIR, "oarts-logo.svg"), transparent);

  await sharp(Buffer.from(transparent)).png().toFile(path.join(OUT_DIR, "oarts-logo.png"));
  await sharp(Buffer.from(black)).png().toFile(path.join(OUT_DIR, "oarts-logo-black.png"));
  // also a JPEG on black (no transparency in jpeg)
  await sharp(Buffer.from(black)).jpeg({ quality: 95 }).toFile(path.join(OUT_DIR, "oarts-logo-black.jpg"));

  console.log(`Logo ${W}x${H}px ->`);
  console.log("  " + path.join(OUT_DIR, "oarts-logo.png") + " (transparent)");
  console.log("  " + path.join(OUT_DIR, "oarts-logo-black.png") + " (black bg)");
  console.log("  " + path.join(OUT_DIR, "oarts-logo-black.jpg") + " (jpeg)");
  console.log("  " + path.join(OUT_DIR, "oarts-logo.svg") + " (vector)");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
