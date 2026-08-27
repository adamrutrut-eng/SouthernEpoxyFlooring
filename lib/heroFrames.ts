// FRAME_COUNT is set from the actual number of JPEGs extracted from
// hero.mp4 into public/frames/ — keep it in sync with that folder.
// public/frames/ holds 1920px frames; public/frames-sm/ holds 960px
// frames served to small screens (the hero canvas caps DPR at 2, so
// 960px covers phone rendering with a quarter of the bytes).
export const FRAME_COUNT = 289;

export type FrameSize = 'lg' | 'sm';

export function frameSrc(index: number, size: FrameSize = 'lg'): string {
  const dir = size === 'sm' ? '/frames-sm' : '/frames';
  return `${dir}/frame_${String(index + 1).padStart(4, '0')}.jpg`;
}
