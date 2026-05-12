import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { findProject, normalizeCardKind, projects } from '../../axiom.config';
import type { AxiomDoc } from './types';
import { AxiomProvider } from './AxiomContext';
import { AxiomHeader } from './AxiomHeader';
import { FileTreePane } from './FileTreePane';
import { MockupPane } from './MockupPane';
import { SpecPane } from './SpecPane';

// 사용자가 트리에서 카드 kind 문서를 클릭하면 iframe 에 scroll-to-card 를 보내고,
// 그 결과로 iframe 이 스크롤되며 발생하는 card-visible 메시지가 다시 activeDoc 를
// 흔드는 echo 를 막기 위해 잠시 동안 자동 전환을 멈춘다.
const CARD_AUTO_SWITCH_SUPPRESS_MS = 1500;

/** cardKind 의 prefix 로 어느 mockup 라우트에 사는 카드인지 추론. */
function inferRouteForCardKind(kind: string): string | undefined {
  if (kind.startsWith('i')) return '/mai/issue';
  if (kind.startsWith('n')) return '/mai/news';
  return undefined;
}

export function AxiomShell() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? findProject(projectId) : undefined;
  const initialDoc = project?.docs.find((d) => d.primary) ?? project?.docs[0];
  const [activeDoc, setActiveDoc] = useState<AxiomDoc | undefined>(initialDoc);
  // 자동 전환 무시 deadline (ms timestamp). 0 이면 활성 상태.
  const suppressUntilRef = useRef(0);

  useEffect(() => {
    if (project) {
      setActiveDoc(project.docs.find((d) => d.primary) ?? project.docs[0]);
    }
  }, [project]);

  // 사용자가 트리에서 문서를 클릭했을 때.
  // cardKind 가 있으면 iframe 에도 (라우트 전환 + 스크롤) 명령을 보낸다.
  const selectDoc = useCallback(
    (doc: AxiomDoc) => {
      setActiveDoc(doc);
      if (doc.cardKind) {
        const iframe = document.querySelector<HTMLIFrameElement>(
          'iframe[data-axiom-mockup]',
        );
        const route = inferRouteForCardKind(doc.cardKind);
        iframe?.contentWindow?.postMessage(
          { type: 'axiom:goto-card', kind: doc.cardKind, route },
          '*',
        );
        suppressUntilRef.current = Date.now() + CARD_AUTO_SWITCH_SUPPRESS_MS;
      }
    },
    [],
  );

  // iframe 스크롤 → card-visible 자동 수신해 문서 자동 전환
  useEffect(() => {
    if (!project) return;
    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (!data || data.type !== 'axiom:card-visible' || typeof data.kind !== 'string') {
        return;
      }
      if (Date.now() < suppressUntilRef.current) return;
      const normalized = normalizeCardKind(data.kind);
      const match = project!.docs.find((d) => d.cardKind === normalized);
      if (match) {
        setActiveDoc(match);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [project]);

  if (!projectId || !project) {
    return <Navigate to={`/axiom/${projects[0]?.id ?? 'mai'}`} replace />;
  }

  return (
    <AxiomProvider projectId={project.id}>
      <div className="flex flex-col h-dvh bg-gray-50 text-gray-900">
        <AxiomHeader project={project} />
        <div className="flex-1 min-h-0 grid grid-cols-[260px_440px_minmax(0,1fr)] gap-3 p-3">
          <FileTreePane project={project} activeDoc={activeDoc} onSelect={selectDoc} />
          <MockupPane project={project} activeDoc={activeDoc} />
          <SpecPane doc={activeDoc} />
        </div>
      </div>
    </AxiomProvider>
  );
}
