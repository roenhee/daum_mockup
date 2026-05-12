import { useEffect, useRef, useState } from 'react';
import type { AxiomDoc, AxiomProject } from './types';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const PHONE_W = 406;
const PHONE_H = 861;
const BORDER = 8;

interface BracketRect {
  top: number; // phone-bezel 내부 좌표 (border 포함)
  height: number;
  cardKind: string;
}

export function MockupPane({
  project,
  activeDoc,
}: {
  project: AxiomProject;
  activeDoc: AxiomDoc | undefined;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [bracket, setBracket] = useState<BracketRect | null>(null);
  const src = `${BASE}/#${project.mockupEntry}`;
  const kind = activeDoc?.cardKind;

  // 프로젝트 전환 시 iframe 리로드
  useEffect(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    try {
      win.location.replace(src);
    } catch {
      /* same-origin only */
    }
  }, [src]);

  // 활성 cardKind 가 있을 때 iframe 내부 해당 카드 위치를 추적해 우측 박스로 표시
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !kind) {
      setBracket(null);
      return;
    }

    function update() {
      const inner = iframe?.contentDocument;
      if (!inner) {
        setBracket(null);
        return;
      }
      const target = inner.querySelector<HTMLElement>(
        `[data-card-kind="${CSS.escape(kind!)}"]`,
      );
      if (!target) {
        setBracket(null);
        return;
      }
      const rect = target.getBoundingClientRect();
      // 폰 뷰포트 0~PHONE_H 범위에 클램프
      const innerTop = Math.max(0, rect.top);
      const innerBottom = Math.min(PHONE_H - BORDER * 2, rect.bottom);
      if (innerBottom <= innerTop) {
        setBracket(null);
        return;
      }
      setBracket({
        top: BORDER + innerTop,
        height: innerBottom - innerTop,
        cardKind: kind!,
      });
    }

    update();
    const win = iframe.contentWindow;
    const main = win?.document.querySelector('main');
    main?.addEventListener('scroll', update, { passive: true });
    // 라우트 전환 등으로 DOM 이 바뀌는 경우를 위해 짧은 폴링 (저비용)
    const interval = window.setInterval(update, 250);
    return () => {
      main?.removeEventListener('scroll', update);
      window.clearInterval(interval);
    };
  }, [kind, src]);

  return (
    <section className="h-full overflow-y-auto rounded-lg border border-gray-200 bg-gray-100">
      {/* min-h-full 로 컨테이너가 부모 이상의 높이를 보장 → 화면이 충분히 크면 폰이
          정중앙, 화면이 좁아 폰이 다 안 들어가면 자연스럽게 세로 스크롤 발생. */}
      <div className="min-h-full flex items-center justify-center px-3 py-4">
        <div className="relative" style={{ width: PHONE_W, height: PHONE_H }}>
        <div
          className="relative bg-white overflow-hidden rounded-[44px] border-[8px] border-black"
          style={{ width: PHONE_W, height: PHONE_H }}
        >
          <iframe
            ref={iframeRef}
            src={src}
            title={`mockup-${project.id}`}
            data-axiom-mockup="true"
            className="w-full h-full border-0 block"
          />
        </div>
        {bracket ? (
          <div
            className="absolute pointer-events-none"
            style={{
              left: PHONE_W + 6,
              top: bracket.top,
              height: bracket.height,
            }}
          >
            <div className="h-full w-[14px] rounded-r-md border-2 border-blue-400 border-l-0 bg-blue-100/40" />
            <div className="absolute top-1/2 -translate-y-1/2 left-[18px] whitespace-nowrap px-2 py-0.5 rounded bg-blue-500 text-white text-[10px] font-medium shadow">
              {activeDoc?.label ?? bracket.cardKind}
            </div>
          </div>
        ) : null}
        </div>
      </div>
    </section>
  );
}
