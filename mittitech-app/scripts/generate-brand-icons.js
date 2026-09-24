const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#05190E" />
      <stop offset="40%" stop-color="#0E3320" />
      <stop offset="100%" stop-color="#1B4D31" />
    </linearGradient>

    <!-- Border Rim Gradient -->
    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A3E635" stop-opacity="0.85" />
      <stop offset="50%" stop-color="#52B788" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#1B4332" stop-opacity="0.7" />
    </linearGradient>

    <!-- Core Ambient Radial Glow -->
    <radialGradient id="ambientGlow" cx="50%" cy="52%" r="48%">
      <stop offset="0%" stop-color="#52B788" stop-opacity="0.38" />
      <stop offset="55%" stop-color="#2D6A4F" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#05190E" stop-opacity="0" />
    </radialGradient>

    <!-- Primary Leaf Gradient (Left) -->
    <linearGradient id="leafLeft" x1="0%" y1="100%" x2="80%" y2="0%">
      <stop offset="0%" stop-color="#15803D" />
      <stop offset="50%" stop-color="#22C55E" />
      <stop offset="100%" stop-color="#4ADE80" />
    </linearGradient>

    <!-- Secondary Leaf Gradient (Right - Lime / Tech) -->
    <linearGradient id="leafRight" x1="20%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#166534" />
      <stop offset="45%" stop-color="#65A30D" />
      <stop offset="100%" stop-color="#A3E635" />
    </linearGradient>

    <!-- Soil Terraces (Mitti / Earth Layers) -->
    <linearGradient id="soilDeep" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#78350F" stop-opacity="0.85" />
      <stop offset="45%" stop-color="#92400E" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#1E3A2B" stop-opacity="0.9" />
    </linearGradient>

    <linearGradient id="soilTerrace" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D6A4F" />
      <stop offset="50%" stop-color="#40916C" />
      <stop offset="100%" stop-color="#52B788" />
    </linearGradient>

    <!-- Glowing Node Pulse -->
    <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="35%" stop-color="#BEF264" />
      <stop offset="75%" stop-color="#4ADE80" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#22C55E" stop-opacity="0" />
    </radialGradient>

    <!-- Satellite / Telemetry Wave Gradient -->
    <linearGradient id="telemetryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A3E635" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#52B788" stop-opacity="0.3" />
    </linearGradient>
  </defs>

  <!-- Base Rounded Squircle Container -->
  <rect x="18" y="18" width="476" height="476" rx="112" ry="112" fill="url(#bgGrad)" />
  <rect x="18" y="18" width="476" height="476" rx="112" ry="112" fill="url(#ambientGlow)" />
  <rect x="23" y="23" width="466" height="466" rx="107" ry="107" fill="none" stroke="url(#rimGrad)" stroke-width="10" />

  <!-- Background Soil Contour Terraces (Mitti / Earth Layers) -->
  <path d="M 64 365 C 140 330, 200 375, 290 345 C 360 322, 410 345, 448 375 L 448 400 C 448 424, 424 448, 400 448 L 112 448 C 88 448, 64 424, 64 400 Z" fill="url(#soilDeep)" opacity="0.75" />
  <path d="M 64 395 C 130 365, 220 395, 310 370 C 375 352, 420 372, 448 395 L 448 400 C 448 424, 424 448, 400 448 L 112 448 C 88 448, 64 424, 64 400 Z" fill="url(#soilTerrace)" opacity="0.5" />

  <!-- Remote Sensing / Satellite Telemetry Arcs (Top Right) -->
  <path d="M 320 120 A 110 110 0 0 1 385 185" fill="none" stroke="url(#telemetryGrad)" stroke-width="9" stroke-linecap="round" opacity="0.85" />
  <path d="M 345 90 A 155 155 0 0 1 420 165" fill="none" stroke="url(#telemetryGrad)" stroke-width="7" stroke-linecap="round" opacity="0.55" stroke-dasharray="10 10" />
  <circle cx="390" cy="110" r="8" fill="#A3E635" />

  <!-- Main Sprout & Intelligent Bio-Leaf -->
  <!-- Left Leaf Curve -->
  <path d="M 256 112 C 256 112, 155 165, 150 268 C 145 345, 202 388, 256 398 C 256 345, 256 215, 256 112 Z" fill="url(#leafLeft)" />

  <!-- Right Leaf Curve (Geometric precision fold) -->
  <path d="M 256 112 C 256 112, 355 160, 360 252 C 365 325, 312 378, 256 398 C 278 325, 292 215, 256 112 Z" fill="url(#leafRight)" opacity="0.96" />

  <!-- Leaf Center Bio-Neural Vein / Precision Spine -->
  <path d="M 256 398 L 256 135" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" opacity="0.95" />
  
  <!-- Circuit Vein Branches -->
  <path d="M 256 322 L 206 284" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" opacity="0.85" />
  <path d="M 256 270 L 308 232" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" opacity="0.85" />
  <path d="M 256 218 L 216 186" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" opacity="0.85" />

  <!-- AI Telemetry Core / Glowing Bio-Node -->
  <circle cx="256" cy="270" r="30" fill="url(#pulseGlow)" />
  <circle cx="256" cy="270" r="14" fill="#FFFFFF" />
  <circle cx="256" cy="270" r="7" fill="#15803D" />

  <!-- Micro Sensor Nodes at Branch Ends -->
  <circle cx="206" cy="284" r="8" fill="#A3E635" />
  <circle cx="308" cy="232" r="8" fill="#BEF264" />
  <circle cx="216" cy="186" r="7" fill="#A3E635" />
</svg>`;

async function run() {
  const root = path.resolve(__dirname, '..');
  const appDir = path.join(root, 'app');
  const pubDir = path.join(root, 'public');

  // 1. Save SVG icons
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(pubDir, 'icon.svg'), svgContent);
  console.log('Saved app/icon.svg and public/icon.svg');

  // 2. Generate PNGs of various sizes
  const sizes = [16, 32, 48, 64, 180, 192, 512];
  const pngBuffers = {};

  for (const size of sizes) {
    const buf = await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toBuffer();
    pngBuffers[size] = buf;
  }

  // Write individual PNGs
  fs.writeFileSync(path.join(pubDir, 'favicon-16x16.png'), pngBuffers[16]);
  fs.writeFileSync(path.join(pubDir, 'favicon-32x32.png'), pngBuffers[32]);
  fs.writeFileSync(path.join(pubDir, 'apple-touch-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), pngBuffers[180]);
  fs.writeFileSync(path.join(appDir, 'icon.png'), pngBuffers[512]);
  fs.writeFileSync(path.join(pubDir, 'icon-192.png'), pngBuffers[192]);
  fs.writeFileSync(path.join(pubDir, 'icon-512.png'), pngBuffers[512]);
  console.log('Rendered PNGs for 16, 32, 48, 64, 180, 192, 512');

  // 3. Save temp files for Python ICO generation
  fs.writeFileSync('/tmp/ico_16.png', pngBuffers[16]);
  fs.writeFileSync('/tmp/ico_32.png', pngBuffers[32]);
  fs.writeFileSync('/tmp/ico_48.png', pngBuffers[48]);
  fs.writeFileSync('/tmp/ico_64.png', pngBuffers[64]);

  const pyScript = `
from PIL import Image
img16 = Image.open('/tmp/ico_16.png')
img32 = Image.open('/tmp/ico_32.png')
img48 = Image.open('/tmp/ico_48.png')
img64 = Image.open('/tmp/ico_64.png')

img32.save('${path.join(appDir, 'favicon.ico')}', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)], append_images=[img16, img48, img64])
img32.save('${path.join(pubDir, 'favicon.ico')}', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)], append_images=[img16, img48, img64])
print("Successfully generated favicon.ico for app/ and public/!")
`;
  fs.writeFileSync('/tmp/make_ico.py', pyScript);
  execSync('python3 /tmp/make_ico.py', { stdio: 'inherit' });
  console.log('All icons generated successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
