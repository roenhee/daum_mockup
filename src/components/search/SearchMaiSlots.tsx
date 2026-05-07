import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight, Headphones, Play, Plus, Sparkles } from 'lucide-react';
import { useDragScroll } from '@/lib/useDragScroll';
import { useMaiPlayer } from '@/components/mai/news/MaiPlayer';
import { cn } from '@/lib/cn';

export interface SearchKeywordCard {
  keyword: string;
  subscribers: string;
  note?: string;
}

/* ─────────── 검색 결과 — 유관 키워드 구독 추천 슬롯 ─────────── */
export function SearchKeywordSubscribe({
  query,
  keywords,
}: {
  query: string;
  keywords: SearchKeywordCard[];
}) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();
  return (
    <section className="bg-white">
      <header className="px-4 pt-4 pb-2 flex items-start gap-1.5">
        <Sparkles size={13} className="mt-0.5 text-daum-blue" strokeWidth={2.4} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-extrabold text-gray-900 leading-snug">
            '{query}'와 함께 보는 키워드, 구독해 보세요
          </h3>
          <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
            새 기사가 나오면 M:AI가 알림으로 알려드려요
          </p>
        </div>
      </header>
      <div
        ref={ref}
        {...handlers}
        className={cn(
          'px-4 pb-4 flex items-stretch gap-3 overflow-x-auto no-scrollbar select-none touch-pan-x',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        {keywords.map((k, i) => (
          <Fragment key={k.keyword}>
            {i > 0 ? (
              <span
                aria-hidden
                className="w-px self-stretch my-3 bg-gray-200 shrink-0"
              />
            ) : null}
            <KeywordCard item={k} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function KeywordCard({ item }: { item: SearchKeywordCard }) {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <div className="shrink-0 w-[170px] py-1 flex flex-col gap-2">
      <div className="flex flex-col">
        <span className="text-[14px] font-bold text-gray-900 leading-snug">
          #{item.keyword}
        </span>
        <span className="text-[11px] text-gray-500 mt-0.5">
          구독 {item.subscribers}
        </span>
        {item.note ? (
          <span className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">
            {item.note}
          </span>
        ) : null}
      </div>
      <button
        type="button"
        aria-pressed={subscribed}
        onClick={() => setSubscribed((s) => !s)}
        className={cn(
          'mt-auto inline-flex items-center justify-center gap-1 h-8 rounded-lg text-[12px] font-semibold transition-colors',
          subscribed
            ? 'bg-gray-100 text-gray-700'
            : 'bg-daum-blue/10 text-daum-blue',
        )}
      >
        {subscribed ? (
          <>
            <Check size={12} strokeWidth={2.6} />
            구독 중
          </>
        ) : (
          <>
            <Plus size={12} strokeWidth={2.6} />
            구독하기
          </>
        )}
      </button>
    </div>
  );
}

/* ─────────── 검색 결과 — 오디오 브리핑 슬롯 ─────────── */
export function SearchAudioBriefing({ query }: { query: string }) {
  const player = useMaiPlayer();
  const handlePlay = () =>
    player?.play({
      title: `'${query}' 핵심 흐름 4분 30초`,
      duration: '4:30',
      variant: 'evening',
    });
  return (
    <section className="bg-white px-3 py-4">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <h2 className="text-[14px] font-extrabold text-gray-900 inline-flex items-center gap-1.5">
          <Headphones size={14} className="text-daum-blue" strokeWidth={2.4} />
          '{query}' 오디오 브리핑
        </h2>
        <span className="text-[11px] text-gray-400">M:AI</span>
      </div>

      <article className="relative rounded-card border border-gray-100 px-4 py-3.5 bg-gradient-to-tr from-white from-50% to-[#C2C9E8]">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#5C6BC0]/15 text-[#5C6BC0]">
            <Headphones size={11} strokeWidth={2.4} />
          </span>
          <h3 className="text-[12.5px] font-bold leading-snug text-gray-900">
            '{query}' 핵심 흐름 4분 30초
          </h3>
        </div>
        <p className="mt-2 text-[13px] text-gray-800 leading-relaxed">
          오늘 '{query}' 관련 기사 32건을 모아 핵심 흐름과 입장 차이, 영향까지 한 번에 정리한
          오디오 브리핑이에요. 이동 중에도 들을 수 있어요.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            aria-label="재생"
            onClick={handlePlay}
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-white text-[12px] font-medium"
            style={{ backgroundColor: '#5C6BC0' }}
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
          기사 <span className="font-semibold">32건</span> 기반
        </span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-400">매 1시간 갱신</span>
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
              나만의 키워드 브리핑 받아보기
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
