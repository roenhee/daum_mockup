import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import type { AxiomDoc, AxiomProject } from './types';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function MockupPane({
  project,
  activeDoc,
}: {
  project: AxiomProject;
  activeDoc: AxiomDoc | undefined;
}) {
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
    <section className="overflow-hidden flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-200 bg-gray-100 px-3 py-4">
      <SlotIndicator doc={activeDoc} />
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

function SlotIndicator({ doc }: { doc: AxiomDoc | undefined }) {
  if (!doc) {
    return <div className="h-7" aria-hidden />;
  }
  const isCard = !!doc.cardKind;
  return (
    <div
      className={
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] transition-colors ' +
        (isCard
          ? 'border-blue-200 bg-blue-50 text-blue-800'
          : 'border-gray-200 bg-white text-gray-700')
      }
      title="현재 우측 spec 문서가 가리키는 slot"
    >
      <MapPin size={12} className={isCard ? 'text-blue-500' : 'text-gray-400'} />
      <span className="text-[10px] uppercase tracking-wide opacity-70">
        {isCard ? '카드 slot' : '문서'}
      </span>
      <span className="font-medium">{doc.label}</span>
    </div>
  );
}
