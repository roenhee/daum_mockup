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

// 가운데 컬럼 최소: 폰 프레임 외곽(406px) + 양옆 여백.
const LEFT_MIN = 200;
const LEFT_MAX = 420;
const CENTER_MIN = 430;
const CENTER_MAX = 720;
const DEFAULT_LEFT = 260;
const DEFAULT_CENTER = 460;

export function AxiomShell() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? findProject(projectId) : undefined;
  const initialDoc = project?.docs.find((d) => d.primary) ?? project?.docs[0];
  const [activeDoc, setActiveDoc] = useState<AxiomDoc | undefined>(initialDoc);
  const suppressUntilRef = useRef(0);

  // 패널 너비 (드래그로 조정)
  const [leftW, setLeftW] = useState<number>(DEFAULT_LEFT);
  const [centerW, setCenterW] = useState<number>(DEFAULT_CENTER);
  const [dragging, setDragging] = useState<null | 'left' | 'center'>(null);

  useEffect(() => {
    if (project) {
      setActiveDoc(project.docs.find((d) => d.primary) ?? project.docs[0]);
    }
  }, [project]);

  // 사용자가 트리에서 문서를 클릭했을 때.
  const selectDoc = useCallback((doc: AxiomDoc) => {
    setActiveDoc(doc);
    if (doc.cardKind) {
      const iframe = document.querySelector<HTMLIFrameElement>('iframe[data-axiom-mockup]');
      const route = inferRouteForCardKind(doc.cardKind);
      iframe?.contentWindow?.postMessage(
        { type: 'axiom:goto-card', kind: doc.cardKind, route },
        '*',
      );
      suppressUntilRef.current = Date.now() + CARD_AUTO_SWITCH_SUPPRESS_MS;
    }
  }, []);

  // iframe 스크롤 → card-visible 자동 수신해 문서 자동 전환
  useEffect(() => {
    if (!project) return;
    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (!data || data.type !== 'axiom:card-visible') return;
      if (Date.now() < suppressUntilRef.current) return;
      // null = 뷰포트 중앙에 카드가 없음
      // 활성 doc 이 카드 doc 일 때만 비운다 — PRD/정책 같은 일반 문서는 유지.
      if (data.kind === null) {
        setActiveDoc((prev) => (prev?.cardKind ? undefined : prev));
        return;
      }
      if (typeof data.kind !== 'string') return;
      const normalized = normalizeCardKind(data.kind);
      const match = project!.docs.find((d) => d.cardKind === normalized);
      if (match) setActiveDoc(match);
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [project]);

  // 드래그 핸들 mousedown 처리
  const onStartDrag = useCallback(
    (target: 'left' | 'center') => (e: React.MouseEvent) => {
      e.preventDefault();
      setDragging(target);
      const startX = e.clientX;
      const startLeft = leftW;
      const startCenter = centerW;
      function move(ev: MouseEvent) {
        const dx = ev.clientX - startX;
        if (target === 'left') {
          setLeftW(clamp(startLeft + dx, LEFT_MIN, LEFT_MAX));
        } else {
          setCenterW(clamp(startCenter + dx, CENTER_MIN, CENTER_MAX));
        }
      }
      function up() {
        setDragging(null);
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      }
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    },
    [leftW, centerW],
  );

  if (!projectId || !project) {
    return <Navigate to={`/axiom/${projects[0]?.id ?? 'mai'}`} replace />;
  }

  return (
    <AxiomProvider projectId={project.id}>
      <div className="flex flex-col h-dvh bg-gray-50 text-gray-900">
        <AxiomHeader project={project} />
        <div className="relative flex-1 min-h-0 flex p-3 gap-0">
          <div style={{ width: leftW }} className="min-w-0 shrink-0">
            <FileTreePane project={project} activeDoc={activeDoc} onSelect={selectDoc} />
          </div>
          <ResizeHandle onMouseDown={onStartDrag('left')} active={dragging === 'left'} />
          <div style={{ width: centerW }} className="min-w-0 shrink-0">
            <MockupPane project={project} activeDoc={activeDoc} />
          </div>
          <ResizeHandle onMouseDown={onStartDrag('center')} active={dragging === 'center'} />
          <div className="flex-1 min-w-0">
            <SpecPane doc={activeDoc} />
          </div>
          {/* 드래그 중에는 iframe 이 마우스 이벤트를 가로채지 않도록 오버레이 */}
          {dragging ? (
            <div
              className="absolute inset-0 z-50"
              style={{ cursor: 'col-resize' }}
              aria-hidden
            />
          ) : null}
        </div>
      </div>
    </AxiomProvider>
  );
}

function ResizeHandle({
  onMouseDown,
  active,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
  active: boolean;
}) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      onMouseDown={onMouseDown}
      className={
        'group relative w-3 shrink-0 cursor-col-resize flex items-center justify-center ' +
        (active ? 'bg-blue-50' : '')
      }
    >
      <div
        className={
          'h-12 w-[3px] rounded-full transition-colors ' +
          (active ? 'bg-blue-400' : 'bg-gray-200 group-hover:bg-gray-400')
        }
      />
    </div>
  );
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
