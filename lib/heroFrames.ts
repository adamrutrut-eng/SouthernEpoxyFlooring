// FRAME_COUNT is set from the actual number of JPEGs extracted from
// hero.mp4 into public/frames/ — keep it in sync with that folder.
export const FRAME_COUNT = 288;

export function frameSrc(index: number): string {
  return `/frames/frame_${String(index + 1).padStart(4, '0')}.jpg`;
}
