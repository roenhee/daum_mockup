import { useEffect, useState, type ReactNode } from 'react';

/**
 * 목업 컴포넌트가 axiom shell의 우측 spec 문서와 연동하기 위한 래퍼.
 *
 * - axiom shell 안의 iframe에서 렌더링될 때만 활성화 (window.parent !== window).
 * - 일반 모드(`/#/mai` 직접 접속)에선 단순 패스스루 — 자식만 반환.
 * - mouseenter/leave 시 부모 윈도우에 postMessage 송신.
 * - 부모로부터 highlight 메시지 수신 시 1.5초간 outline 표시.
 */
export function SpecAnchor({ id, children }: { id: string; children: ReactNode }) {
  const isEmbedded =
    typeof window !== 'undefined' && window.parent !== window;
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    if (!isEmbedded) return;
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'axiom:highlight' && e.data.id === id) {
        setHighlighted(true);
        window.setTimeout(() => setHighlighted(false), 1500);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [id, isEmbedded]);

  if (!isEmbedded) {
    return <>{children}</>;
  }

  return (
    <div
      data-spec-anchor={id}
      onMouseEnter={() =>
        window.parent.postMessage({ type: 'axiom:enter', id }, '*')
      }
      onMouseLeave={() =>
        window.parent.postMessage({ type: 'axiom:leave', id }, '*')
      }
      className={
        highlighted
          ? 'relative ring-2 ring-blue-500 ring-offset-1 rounded transition-shadow'
          : 'relative'
      }
    >
      {children}
    </div>
  );
}
