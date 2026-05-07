import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Play, Sparkles, Sprout } from 'lucide-react';

const NOTE_CHIP =
  'inline-flex items-center px-1.5 py-[2px] rounded-md bg-[#F1ECE0] text-[10.5px] font-semibold text-[#5C5340]';
const BRIEF_CHIP =
  'inline-flex items-center px-2 py-[3px] rounded-full bg-white/70 text-[10.5px] font-semibold text-[#7A4A1A] backdrop-blur-sm';

/* ─────────── 대한민국 오늘의 브리핑 — N17 모닝 변형 톤 ─────────── */
export function KoreaDailyBriefingCard() {
  return (
    <section className="bg-white px-3 py-4">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <h2 className="text-[14px] font-extrabold text-gray-900">
          오늘의 대한민국 브리핑
        </h2>
        <span className="text-[11px] text-gray-400">M:AI</span>
      </div>

      <article className="relative rounded-card border border-gray-100 px-4 py-3.5 bg-gradient-to-tr from-white from-50% to-[#FFE0B0]">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#E89B2A]/15 text-[#E89B2A]">
            <Sprout size={12} strokeWidth={2.4} />
          </span>
          <h3 className="text-[12.5px] font-bold leading-snug text-gray-900">
            오늘 아침 대한민국 브리핑
          </h3>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1">
          <span className={BRIEF_CHIP}>#정치</span>
          <span className={BRIEF_CHIP}>#경제</span>
          <span className={BRIEF_CHIP}>#사회</span>
          <span className={BRIEF_CHIP}>#스포츠</span>
        </div>
        <p className="mt-2 text-[13px] text-gray-800 leading-relaxed">
          호르무즈 통항 제한과 WTI 96달러 돌파, 대선 후보 공약 발표, 늑구
          오월드 5월 재개장 불투명, 그리고 LG·KT 한밤 명승부 — 오늘 대한민국
          전체 흐름을 4분 30초에 정리했어요.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            aria-label="재생"
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-white text-[12px] font-medium"
            style={{ backgroundColor: '#E89B2A' }}
          >
            <Play size={12} fill="white" />
            재생
          </button>
          <button
            type="button"
            className="h-8 px-3 rounded-lg border border-gray-200 bg-white text-[12px] text-gray-700"
          >
            텍스트 보기
          </button>
        </div>
      </article>
      <div className="mt-2 rounded-card border border-gray-100 bg-white px-4 py-2 flex items-center justify-center gap-2 text-[11px] text-gray-600">
        <span className="inline-flex items-center gap-1">
          <Play size={10} fill="currentColor" className="text-gray-500" />
          <span className="font-semibold">4분 30초</span>
        </span>
        <span className="text-gray-300">·</span>
        <span>
          기사 <span className="font-semibold">42건</span> 기반
        </span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-400">매일 7시 갱신</span>
      </div>

      <Link
        to="/mai/news"
        className="mt-3 flex items-center justify-between rounded-card bg-gray-50 px-4 py-3 active:bg-gray-100"
      >
        <span className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-daum-blue/10 text-daum-blue">
            <Sparkles size={14} strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[13px] font-bold text-gray-900">
              나만의 키워드로 브리핑 받아보기
            </span>
            <span className="text-[11px] text-gray-500 mt-0.5">
              관심 주제만 골라 매일 4분 요약
            </span>
          </span>
        </span>
        <span className="inline-flex items-center gap-0.5 text-[12px] font-semibold text-daum-blue shrink-0">
          M:AI 탭
          <ChevronRight size={14} strokeWidth={2.4} />
        </span>
      </Link>
    </section>
  );
}

/* ─────────── 이슈 노트 프리뷰 카드 ─────────── */
export function MaiIssueNotePreview() {
  return (
    <section className="bg-white px-3 py-4">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <h2 className="text-[14px] font-extrabold text-gray-900">
          오늘의 이슈 노트
        </h2>
        <span className="text-[11px] text-gray-400">M:AI · 이슈 노트</span>
      </div>

      <article className="relative bg-white rounded-card border border-[#E8DFC8] overflow-hidden">
        <div className="h-[3px] bg-gradient-to-r from-[#E89B2A] to-[#C75B0E]" />
        <div className="px-4 pt-3.5 pb-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-semibold tracking-wide text-[#8A7E66]">
            <span className="uppercase text-[#C75B0E]">데일리 다이제스트</span>
            <span className="text-[#D6CDB6]">·</span>
            <span>No. 142</span>
            <span className="text-[#D6CDB6]">·</span>
            <span>오늘 7:00</span>
          </div>
          <h3 className="mt-1.5 text-[16px] font-extrabold text-[#1F1B14] leading-snug">
            오늘 이란 전쟁 핵심 3가지
          </h3>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className={NOTE_CHIP}>#이란 전쟁</span>
            <span className={NOTE_CHIP}>#호르무즈</span>
            <span className={NOTE_CHIP}>#유가</span>
          </div>
          <p className="mt-2.5 text-[13.5px] text-[#3D362A] leading-[1.7]">
            오늘 이란 전쟁 핵심 3가지 — 호르무즈 통항 제한 조치, 미군 항모
            진입, 국제유가 급등으로의 연쇄 반응까지 한 호흡으로 정리했어요.
          </p>
          <p className="mt-2.5 text-[11px] text-[#8A7E66]">
            기사 12건 기반 · M:AI가 합성
          </p>
        </div>
      </article>

      <Link
        to="/mai/issue"
        className="mt-3 flex items-center justify-between rounded-card bg-gray-50 px-4 py-3 active:bg-gray-100"
      >
        <span className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#C75B0E]/10 text-[#C75B0E]">
            <ArrowRight size={14} strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[13px] font-bold text-gray-900">
              이 이슈 자세히 보기
            </span>
            <span className="text-[11px] text-gray-500 mt-0.5">
              흐름 / 다매체 논조 / 근거 기사까지 정리
            </span>
          </span>
        </span>
        <span className="inline-flex items-center gap-0.5 text-[12px] font-semibold text-[#C75B0E] shrink-0">
          M:AI 탭
          <ChevronRight size={14} strokeWidth={2.4} />
        </span>
      </Link>
    </section>
  );
}

/* ─────────── M:AI 홍보 광고 배너 — 콘텐츠탭 BizBoard 형태 ─────────── */
export function MaiPromoBanner() {
  return (
    <Link to="/mai/news" className="block active:opacity-90">
      <div
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(120deg, #1B2547 0%, #3553B7 55%, #6B82E0 100%)',
        }}
      >
        <div className="w-full aspect-[32/5] flex items-center px-4">
          <div className="flex-1 min-w-0 flex flex-col">
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-wider text-white/70">
              <Sparkles size={10} strokeWidth={2.4} />
              BIZBOARD · M:AI
            </span>
            <p className="mt-0.5 text-[12px] font-bold text-white leading-snug line-clamp-1">
              관심 키워드만 골라 AI가 요약해드려요
            </p>
            <p className="text-[10px] text-white/80 line-clamp-1">
              Daum M:AI · 매일 4분 브리핑 · 광고
            </p>
          </div>
          <span className="ml-3 shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 text-white text-[11px] font-extrabold tracking-tight">
            M:AI
          </span>
        </div>
        <span className="absolute top-1.5 right-1.5 text-[9px] font-medium text-white/80 bg-black/40 px-1.5 py-0.5 rounded">
          AD
        </span>
      </div>
    </Link>
  );
}
