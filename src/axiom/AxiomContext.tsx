import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AxiomContextValue } from './types';

const AxiomCtx = createContext<AxiomContextValue | null>(null);

export function AxiomProvider({ projectId, children }: { projectId: string; children: ReactNode }) {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const [highlightedAnchor, setHighlightedAnchor] = useState<string | null>(null);

  const highlightAnchor = useCallback((id: string) => {
    setHighlightedAnchor(id);
    // iframe 안의 SpecAnchor에 outline 표시 메시지 송신
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe[data-axiom-mockup]',
    );
    iframe?.contentWindow?.postMessage({ type: 'axiom:highlight', id }, '*');
    window.setTimeout(() => {
      setHighlightedAnchor((current) => (current === id ? null : current));
    }, 1500);
  }, []);

  // iframe(목업) → 부모: enter/leave 수신해 activeAnchor 갱신
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'axiom:enter' && typeof data.id === 'string') {
        setActiveAnchor(data.id);
      } else if (data.type === 'axiom:leave' && typeof data.id === 'string') {
        // 다른 앵커로 이동 시 이전 앵커의 leave 가 새 앵커의 active를 덮어쓰지
        // 않도록, leave id 가 현재 active id 일 때만 초기화한다.
        setActiveAnchor((current) => (current === data.id ? null : current));
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const value = useMemo<AxiomContextValue>(
    () => ({ projectId, activeAnchor, setActiveAnchor, highlightedAnchor, highlightAnchor }),
    [projectId, activeAnchor, highlightedAnchor, highlightAnchor],
  );

  return <AxiomCtx.Provider value={value}>{children}</AxiomCtx.Provider>;
}

export function useAxiomContext(): AxiomContextValue | null {
  return useContext(AxiomCtx);
}
