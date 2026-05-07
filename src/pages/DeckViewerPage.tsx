import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { asset } from '@/lib/asset';

// 사용자 해상도 풀스크린으로 deck 노출. 우상단에 목업 복귀 링크 항상 표시.
export function DeckViewerPage() {
  return (
    <div className="fixed inset-0 bg-[#0B1320]">
      <iframe
        src={asset('/deck/m-ai-understanding-agent.html')}
        title="M:AI 이해 에이전트 — 최종 3탭 구조 deck"
        className="w-full h-full border-0"
        allowFullScreen
      />
      <Link
        to="/"
        className="fixed top-3 right-3 z-50 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white/95 backdrop-blur-sm border border-black/10 text-[13px] font-semibold text-gray-900 shadow-[0_4px_14px_rgba(0,0,0,0.25)] active:bg-white"
        aria-label="목업으로 돌아가기"
      >
        <ArrowLeft size={15} strokeWidth={2.4} />
        목업으로 돌아가기
      </Link>
    </div>
  );
}
