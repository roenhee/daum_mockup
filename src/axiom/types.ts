export interface AxiomDoc {
  path: string;
  label: string;
  primary?: boolean;
  anchor?: string;
  // 새소식 / 이슈노트 카드 kind 와 1:1 매핑. 목업에서 해당 카드가 보이면 이 문서로 자동 전환.
  cardKind?: string;
  // HTML 등 외부 자산을 임베드할 때. path 는 트리 위치만 결정, src 가 실제 iframe 소스 (BASE 기준).
  src?: string;
}

export interface AxiomLinks {
  figma?: string;
  github?: string;
}

export interface AxiomProject {
  id: string;
  name: string;
  description?: string;
  mockupEntry: string;
  docs: AxiomDoc[];
  links: AxiomLinks;
}

export interface AxiomContextValue {
  projectId: string;
  activeAnchor: string | null;
  setActiveAnchor: (id: string | null) => void;
  highlightedAnchor: string | null;
  highlightAnchor: (id: string) => void;
}
