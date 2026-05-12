import { useEffect, useRef } from 'react';
import type { AxiomProject } from './types';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function MockupPane({ project }: { project: AxiomProject }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const src = `${BASE}/#${project.mockupEntry}`;

  // 프로젝트 전환 시 iframe을 강제로 새 entry로 리셋. src 변경만으로는
  // HashRouter 내부 navigate가 일어나지 않을 수 있어 reload.
  useEffect(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    try {
      win.location.replace(src);
    } catch {
      // cross-origin이면 무시 (여기선 same-origin)
    }
  }, [src]);

  return (
    <section className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-100">
      <div className="relative w-[390px] h-[845px] rounded-[44px] border-[8px] border-black overflow-hidden bg-white shrink-0">
        <iframe
          ref={iframeRef}
          src={src}
          title={`mockup-${project.id}`}
          data-axiom-mockup="true"
          className="w-full h-full border-0 block"
        />
      </div>
    </section>
  );
}
