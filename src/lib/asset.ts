/**
 * GitHub Pages 등 하위 경로 호스팅 시 public/ 정적 asset 참조를 올바르게 해주는 헬퍼.
 * `vite.config.ts` 의 `base` 값이 `import.meta.env.BASE_URL` 로 주입된다.
 *
 * 사용: `asset('/icons/tab/home.svg')` → `'/daum_mockup/icons/tab/home.svg'`
 */
export function asset(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${clean}`;
}
