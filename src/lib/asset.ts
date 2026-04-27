/**
 * GitHub Pages 등 하위 경로 호스팅 시 public/ 정적 asset 참조를 올바르게 해주는 헬퍼.
 * `vite.config.ts` 의 `base` 값이 `import.meta.env.BASE_URL` 로 주입된다.
 *
 * - 절대 URL(`http://`, `https://`, `data:`)이면 그대로 반환 (passthrough).
 * - public/ 정적 경로면 BASE_URL을 prefix.
 *
 * 사용:
 * - `asset('/icons/tab/home.svg')` → `'/daum_mockup/icons/tab/home.svg'`
 * - `asset('https://picsum.photos/...')` → `'https://picsum.photos/...'`
 */
export function asset(path: string): string {
  if (/^(https?:|data:)/.test(path)) return path;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${clean}`;
}
