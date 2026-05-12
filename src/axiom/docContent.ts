// 빌드 타임 docs 인라인. eager 로딩.
const RAW_DOCS = import.meta.glob('/docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function loadDoc(path: string): string | undefined {
  return RAW_DOCS[`/${path}`];
}

export function listDocPaths(): string[] {
  return Object.keys(RAW_DOCS).map((p) => p.replace(/^\//, ''));
}
