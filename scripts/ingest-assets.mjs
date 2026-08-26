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

function titleCase(slug) {
  return slug
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
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

  const frameCount = fs
    .readdirSync(framesDir)
    .filter((f) => /^frame_\d{4}\.jpg$/.test(f)).length;
  if (frameCount === 0) throw new Error('No frames extracted');

  fs.copyFileSync(heroSrc, path.join(root, 'public', 'hero.mp4'));

  const heroFramesTs = path.join(root, 'lib', 'heroFrames.ts');
  const ts = fs
    .readFileSync(heroFramesTs, 'utf8')
    .replace(/FRAME_COUNT = \d+/, `FRAME_COUNT = ${frameCount}`);
  fs.writeFileSync(heroFramesTs, ts);
  console.log(`Extracted ${frameCount} frames; FRAME_COUNT updated.`);
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
  fs.writeFileSync(
    path.join(root, 'content', 'finishes.json'),
    JSON.stringify(entries, null, 2) + '\n'
  );
  console.log(`Ingested ${entries.length} finishes.`);
} else {
  console.log('assets-source/finishes/ not found — skipping finishes.');
}
