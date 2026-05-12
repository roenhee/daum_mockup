import type { AxiomProject } from '@/axiom/types';

export const projects: AxiomProject[] = [
  {
    id: 'mai',
    name: 'M:AI 탭',
    description: 'Daum 앱의 AI 어시스턴트 마이 탭. 프로필·게이트웨이·뉴스/이슈/탐색 피드를 다룬다.',
    mockupEntry: '/mai/news',
    docs: [
      // PRD
      { path: 'docs/projects/mai/prd/main.md', label: 'PRD', primary: true },
      { path: 'docs/projects/mai/prd/policy.md', label: '정책' },
      { path: 'docs/projects/mai/prd/deck.md', label: '컨셉 deck' },
      // 카드 kind 별 스펙 (목업 스크롤 → 자동 전환)
      { path: 'docs/projects/mai/docs/n17-daily-briefing.md', label: 'N17 데일리 브리핑', cardKind: 'n17' },
      { path: 'docs/projects/mai/docs/n11-issue-spike.md', label: 'N11 이슈 급증', cardKind: 'n11' },
      { path: 'docs/projects/mai/docs/n1-article.md', label: 'N1 뉴스 기사', cardKind: 'n1a' },
      { path: 'docs/projects/mai/docs/n9-anomaly.md', label: 'N9 이상 신호', cardKind: 'n9a' },
      { path: 'docs/projects/mai/docs/n18-flash.md', label: 'N18 속보', cardKind: 'n18' },
      { path: 'docs/projects/mai/docs/n8-followup.md', label: 'N8 후속 콘텐츠', cardKind: 'n8a' },
      { path: 'docs/projects/mai/docs/n4-keyword-rec.md', label: 'N4 키워드 추천', cardKind: 'n4' },
      { path: 'docs/projects/mai/docs/n14-trending.md', label: 'N14 트렌딩', cardKind: 'n14' },
      { path: 'docs/projects/mai/docs/n19-local-popular.md', label: 'N19 지역 인기', cardKind: 'n19' },
      { path: 'docs/projects/mai/docs/n20-cohort.md', label: 'N20 코호트', cardKind: 'n20a' },
    ],
    links: {
      figma: 'https://www.figma.com/file/REPLACE_ME',
      github: 'https://github.com/roenhee/daum_mockup/tree/main/src/components/mai',
    },
  },
  {
    id: 'home',
    name: '홈탭',
    description: 'Daum 앱 홈 탭. 다음 사이클에 본격 작성 예정.',
    mockupEntry: '/',
    docs: [{ path: 'docs/projects/home/prd.md', label: 'PRD', primary: true }],
    links: {
      figma: '',
      github: 'https://github.com/roenhee/daum_mockup/tree/main/src/components/home',
    },
  },
];

/** docs[].path 에서 프로젝트 base path 를 잘라낸 상대경로를 돌려준다. */
export function getProjectBasePath(projectId: string): string {
  return `docs/projects/${projectId}/`;
}

export function findProject(id: string): AxiomProject | undefined {
  return projects.find((p) => p.id === id);
}

/**
 * 카드 kind 동족군을 대표 kind 로 정규화.
 * - n8b → n8a (후속 series/byline 변종이 같은 스펙 공유)
 * - n9b → n9a (env/asset anomaly 가 같은 스펙 공유)
 * - n20b → n20a
 * - n1b → n1a
 *
 * scroll-spy 가 보낸 실제 kind 를 axiom.config 의 cardKind 와 매칭할 때 사용.
 */
export function normalizeCardKind(kind: string): string {
  return kind.replace(/^(n\d+)b$/, '$1a');
}
