// Frame counts are set from the actual JPEGs extracted from hero.mp4 by
// scripts/ingest-assets.mjs — keep them in sync with public/frames*.
// public/frames/   : 1920px-wide landscape frames at 24fps (desktop)
// public/frames-sm/: portrait 4:5 center-crop at full source height,
//                    12fps (phones — sharper per byte because portrait
//                    screens cover-fit by height)
export const FRAME_COUNT_LG = 289;
export const FRAME_COUNT_SM = 145;

export type FrameSize = 'lg' | 'sm';

export function frameCount(size: FrameSize): number {
  return size === 'sm' ? FRAME_COUNT_SM : FRAME_COUNT_LG;
}

export function frameSrc(index: number, size: FrameSize = 'lg'): string {
  const dir = size === 'sm' ? '/frames-sm' : '/frames';
  return `${dir}/frame_${String(index + 1).padStart(4, '0')}.jpg`;
}
