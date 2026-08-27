#!/usr/bin/env node
/**
 * Ingest raw assets from assets-source/ into the site.
 *
 * Usage: node scripts/ingest-assets.mjs
 *
 * - assets-source/hero.mp4      -> public/hero.mp4 + public/frames/frame_XXXX.jpg
 *                                  (24fps, 1920px wide) and lib/heroFrames.ts
 *                                  FRAME_COUNT is rewritten to the real count
 * - assets-source/finishes/*.jpg|png -> public/finishes/ and content/finishes.json
 * - assets-source/spaces/*.jpg|png   -> public/spaces/ and content/spaces.json
 * - assets-source/og.jpg|png         -> public/og.jpg (social share image)
 *
 * Requires ffmpeg/ffprobe on PATH.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'assets-source');
const heroSrc = path.join(src, 'hero.mp4');
const framesDir = path.join(root, 'public', 'frames');
const finishesSrc = path.join(src, 'finishes');
const finishesDst = path.join(root, 'public', 'finishes');

const BLURBS = {
  tuxedo: 'Black, white, and gray — crisp, formal, hides tire marks.',
  gravel: 'Cool grays with quiet depth — the modern default.',
  saddle: 'Warm tan and brown — reads like stone underfoot.',
  outback: 'Earth-tone multicolor — forgiving, organic, warm.',
  'slate-metallic': 'Deep gray pearlescent metallic with a subtle swirl.',
};

const SPACE_BLURBS = {
  patio: 'Covered patios and outdoor slabs — UV-stable, weather-ready.',
  showroom: 'Showrooms and shop floors that carry real traffic.',
  basement: 'Basements sealed against moisture, finished like living space.',
};

function titleCase(slug) {
  return slug
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Curated copy lives in content/*.json once it exists — only seed a
// content file when it is missing or empty, never overwrite it.
function contentFileIsEmpty(p) {
  if (!fs.existsSync(p)) return true;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8')).length === 0;
  } catch {
    return true;
  }
}

if (fs.existsSync(heroSrc)) {
  const probe = execFileSync('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=r_frame_rate,nb_frames,duration',
    '-of', 'json',
    heroSrc,
  ]).toString();
  console.log('ffprobe:', probe.trim());

  fs.rmSync(framesDir, { recursive: true, force: true });
  fs.mkdirSync(framesDir, { recursive: true });
  execFileSync('ffmpeg', [
    '-i', heroSrc,
    '-vf', 'fps=24,scale=1920:-1',
    '-q:v', '3',
    path.join(framesDir, 'frame_%04d.jpg'),
  ], { stdio: 'inherit' });

  // Phone set: portrait 4:5 center crop at FULL source height, 12fps.
  // Portrait phones cover-fit by height, so keeping all 1080 source rows
  // is what keeps the scrub sharp; the side crop only removes floor that
  // a phone screen could never show anyway.
  const framesSmDir = path.join(root, 'public', 'frames-sm');
  fs.rmSync(framesSmDir, { recursive: true, force: true });
  fs.mkdirSync(framesSmDir, { recursive: true });
  execFileSync('ffmpeg', [
    '-i', heroSrc,
    '-vf', 'fps=12,crop=ih*4/5:ih:(iw-ih*4/5)/2:0',
    '-q:v', '4',
    path.join(framesSmDir, 'frame_%04d.jpg'),
  ], { stdio: 'inherit' });
  const frameCountSm = fs
    .readdirSync(framesSmDir)
    .filter((f) => /^frame_\d{4}\.jpg$/.test(f)).length;

  const frameCount = fs
    .readdirSync(framesDir)
    .filter((f) => /^frame_\d{4}\.jpg$/.test(f)).length;
  if (frameCount === 0) throw new Error('No frames extracted');

  fs.copyFileSync(heroSrc, path.join(root, 'public', 'hero.mp4'));

  const heroFramesTs = path.join(root, 'lib', 'heroFrames.ts');
  const ts = fs
    .readFileSync(heroFramesTs, 'utf8')
    .replace(/FRAME_COUNT_LG = \d+/, `FRAME_COUNT_LG = ${frameCount}`)
    .replace(/FRAME_COUNT_SM = \d+/, `FRAME_COUNT_SM = ${frameCountSm}`);
  fs.writeFileSync(heroFramesTs, ts);
  console.log(
    `Extracted ${frameCount} desktop + ${frameCountSm} phone frames; counts updated.`
  );
} else {
  console.log('assets-source/hero.mp4 not found — skipping frames.');
}

if (fs.existsSync(finishesSrc)) {
  fs.mkdirSync(finishesDst, { recursive: true });
  const files = fs
    .readdirSync(finishesSrc)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  const entries = files.map((f) => {
    fs.copyFileSync(path.join(finishesSrc, f), path.join(finishesDst, f));
    const slug = f.replace(/\.[^.]+$/, '').toLowerCase();
    return {
      name: titleCase(slug),
      file: f,
      blurb: BLURBS[slug] ?? 'Full-broadcast flake with a mirror-gloss topcoat.',
    };
  });
  const finishesJson = path.join(root, 'content', 'finishes.json');
  if (contentFileIsEmpty(finishesJson)) {
    fs.writeFileSync(finishesJson, JSON.stringify(entries, null, 2) + '\n');
  }
  console.log(`Ingested ${entries.length} finishes.`);
} else {
  console.log('assets-source/finishes/ not found — skipping finishes.');
}

const spacesSrc = path.join(src, 'spaces');
const spacesDst = path.join(root, 'public', 'spaces');
if (fs.existsSync(spacesSrc)) {
  fs.mkdirSync(spacesDst, { recursive: true });
  const files = fs
    .readdirSync(spacesSrc)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  const entries = files.map((f) => {
    fs.copyFileSync(path.join(spacesSrc, f), path.join(spacesDst, f));
    const slug = f.replace(/\.[^.]+$/, '').toLowerCase();
    return {
      name: titleCase(slug),
      file: f,
      blurb: SPACE_BLURBS[slug] ?? 'Seamless flake epoxy with a mirror-gloss topcoat.',
    };
  });
  const spacesJson = path.join(root, 'content', 'spaces.json');
  if (contentFileIsEmpty(spacesJson)) {
    fs.writeFileSync(spacesJson, JSON.stringify(entries, null, 2) + '\n');
  }
  console.log(`Ingested ${entries.length} spaces.`);
} else {
  console.log('assets-source/spaces/ not found — skipping spaces.');
}

for (const ext of ['jpg', 'jpeg', 'png']) {
  const og = path.join(src, `og.${ext}`);
  if (fs.existsSync(og)) {
    if (ext === 'png') {
      execFileSync('ffmpeg', ['-y', '-i', og, '-q:v', '3', path.join(root, 'public', 'og.jpg')]);
    } else {
      fs.copyFileSync(og, path.join(root, 'public', 'og.jpg'));
    }
    console.log('Ingested og.jpg.');
    break;
  }
}
