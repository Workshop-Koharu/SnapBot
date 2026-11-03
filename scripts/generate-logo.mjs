// Script to generate high-quality purple gradient X-shaped logo PNG and ICO
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, pixelFn) {
  const bytesPerPixel = 4;
  const rawData = Buffer.alloc(height * (width * bytesPerPixel + 1));
  let offset = 0;

  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter type 0: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y, width, height);
      rawData[offset++] = Math.round(Math.max(0, Math.min(255, r)));
      rawData[offset++] = Math.round(Math.max(0, Math.min(255, g)));
      rawData[offset++] = Math.round(Math.max(0, Math.min(255, b)));
      rawData[offset++] = Math.round(Math.max(0, Math.min(255, a)));
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function createChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc ^= buf[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // RGBA color type
  ihdr[10] = 0; // Deflate compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Non-interlaced

  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Distance from point (px, py) to line segment (x1, y1) -> (x2, y2)
function distToSegment(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
}

// Pixel generator for X-shaped opaque purple gradient logo
function logoPixel(x, y, w, h) {
  const cx = w / 2;
  const cy = h / 2;

  // Diagonal 1: top-left to bottom-right
  const span = w * 0.32;
  const thickness = w * 0.088;

  const d1 = distToSegment(x, y, cx - span, cy - span, cx + span, cy + span);
  const d2 = distToSegment(x, y, cx + span, cy - span, cx - span, cy + span);
  const dMin = Math.min(d1, d2);

  if (dMin > thickness + 1.5) {
    return [0, 0, 0, 0]; // Transparent outside
  }

  // Smooth anti-aliased edge
  const alpha = Math.max(0, Math.min(1, (thickness + 1.5 - dMin) / 2));

  // Opaque Purple Gradient (from #6366F1 indigo-500 to #A855F7 purple-500 to #C084FC)
  const gradT = (x + y) / (w + h);
  const r = 99 + (192 - 99) * gradT;
  const g = 102 + (132 - 102) * gradT;
  const b = 241 + (252 - 241) * (1 - gradT * 0.2);

  return [r, g, b, alpha * 255];
}

// Create ICO buffer from PNG buffer
function createIco(pngBuffer, width, height) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(1, 4); // 1 Image

  const entry = Buffer.alloc(16);
  entry[0] = width >= 256 ? 0 : width;
  entry[1] = height >= 256 ? 0 : height;
  entry[2] = 0; // Palette count
  entry[3] = 0; // Reserved
  entry.writeUInt16LE(1, 4); // Color planes
  entry.writeUInt16LE(32, 6); // Bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // Size of image data
  entry.writeUInt32LE(22, 12); // Offset = 6 + 16 = 22

  return Buffer.concat([header, entry, pngBuffer]);
}

const publicDir = path.resolve('public');
const appDir = path.resolve('src/app');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// 1. Generate 512x512 logo.png
const png512 = createPng(512, 512, logoPixel);
fs.writeFileSync(path.join(publicDir, 'logo.png'), png512);

// 2. Generate 256x256 icon.png
const png256 = createPng(256, 256, logoPixel);
fs.writeFileSync(path.join(publicDir, 'icon.png'), png256);
fs.writeFileSync(path.join(appDir, 'icon.png'), png256);

// 3. Generate 64x64 favicon.ico
const png64 = createPng(64, 64, logoPixel);
const ico = createIco(png64, 64, 64);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);
fs.writeFileSync(path.join(appDir, 'favicon.ico'), ico);

console.log('Successfully generated logo.png, icon.png, and favicon.ico!');

