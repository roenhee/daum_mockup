function seedToLock(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h << 5) - h + seed.charCodeAt(i);
  return Math.abs(h) % 10000;
}

export function placeholderImg(
  seed: string,
  w: number,
  h: number,
  topic = 'sport,stadium',
): string {
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(topic)}?lock=${seedToLock(seed)}`;
}
