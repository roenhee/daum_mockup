import { Fragment, useState } from 'react';
import { Plus, Sparkles, TrendingUp, Check } from 'lucide-react';
import { useDragScroll } from '@/lib/useDragScroll';
import { cn } from '@/lib/cn';

export interface KeywordCard {
  keyword: string;
  subscribers: string; // e.g. "12.4만 명"
  note?: string; // 부가 설명 (옵션)
}

/* ─────────── 타이틀 아래 해시태그 — ArticleBody 안에서 호출 ─────────── */
export function ArticleKeywordTags({ keywords }: { keywords: string[] }) {
  if (!keywords?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {keywords.map((k) => (
        <span
          key={k}
          className="inline-flex items-center px-2 py-[3px] rounded-full bg-gray-100 text-[11.5px] text-gray-700 font-medium"
        >
          #{k}
        </span>
      ))}
    </div>
  );
}

/* ─────────── 1. 이 기사와 연관된 키워드 구독 추천 ─────────── */
export function RelatedKeywordSubscribe({
  keywords,
}: {
  keywords: KeywordCard[];
}) {
  return (
    <Section title="이 기사와 연관된 키워드를 구독해보세요" sub="새 기사가 나오면 알림으로 받아볼 수 있어요">
      <KeywordSubscribeList keywords={keywords} />
    </Section>
  );
}

/* ─────────── 2. 이 뉴스를 본 다른 사람들이 구독한 키워드 ─────────── */
export function OthersSubscribedKeywords({
  keywords,
}: {
  keywords: KeywordCard[];
}) {
  return (
    <Section
      title="이 뉴스를 본 다른 분들이 구독한 키워드"
      sub="비슷한 관심사를 가진 사람들이 함께 추적 중이에요"
    >
      <KeywordSubscribeList keywords={keywords} />
    </Section>
  );
}

/* ─────────── 3. 지금 사람들이 많이 구독한 키워드 1~3위 ─────────── */
export function TrendingKeywordRanking({
  keywords,
}: {
  keywords: KeywordCard[];
}) {
  return (
    <section className="bg-white">
      <header className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <TrendingUp size={14} className="text-daum-red" strokeWidth={2.4} />
          <h3 className="text-[14px] font-extrabold text-gray-900">
            지금 사람들이 많이 구독한 키워드
          </h3>
        </div>
        <span className="text-[11px] text-gray-400">실시간 · TOP 3</span>
      </header>
      <ol className="px-4 pb-4 divide-y divide-gray-100">
        {keywords.slice(0, 3).map((k, i) => (
          <KeywordRankItem key={k.keyword} item={k} rank={i + 1} />
        ))}
      </ol>
    </section>
  );
}

/* ─────────── 공통 — 섹션 셸 ─────────── */
function Section({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white">
      <header className="px-4 pt-4 pb-2 flex items-center gap-1.5">
        <Sparkles size={13} className="text-daum-blue" strokeWidth={2.4} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-extrabold text-gray-900 leading-snug">
            {title}
          </h3>
          {sub ? (
            <p className="text-[11px] text-gray-500 leading-snug mt-0.5">{sub}</p>
          ) : null}
        </div>
      </header>
      {children}
    </section>
  );
}

/* ─────────── 공통 — 키워드 구독 카드 가로 스크롤 리스트 ─────────── */
function KeywordSubscribeList({ keywords }: { keywords: KeywordCard[] }) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();
  return (
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
              className="w-px self-stretch bg-gray-200 shrink-0"
            />
          ) : null}
          <KeywordSubscribeCard item={k} />
        </Fragment>
      ))}
    </div>
  );
}

function KeywordSubscribeCard({ item }: { item: KeywordCard }) {
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

/* ─────────── 공통 — 랭킹 row ─────────── */
function KeywordRankItem({ item, rank }: { item: KeywordCard; rank: number }) {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <li className="flex items-center gap-3 py-2.5">
      <span
        className={cn(
          'shrink-0 inline-flex items-center justify-center w-6 text-[15px] font-extrabold tabular-nums',
          rank === 1 ? 'text-daum-red' : 'text-gray-700',
        )}
      >
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-gray-900 leading-tight">
          #{item.keyword}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-500">
          구독 {item.subscribers}
          {item.note ? <span className="text-gray-300"> · </span> : null}
          {item.note}
        </p>
      </div>
      <button
        type="button"
        aria-pressed={subscribed}
        onClick={() => setSubscribed((s) => !s)}
        className={cn(
          'shrink-0 inline-flex items-center justify-center gap-0.5 h-7 px-2.5 rounded-lg text-[11.5px] font-semibold transition-colors',
          subscribed
            ? 'bg-gray-100 text-gray-700'
            : 'bg-daum-blue/10 text-daum-blue',
        )}
      >
        {subscribed ? (
          <>
            <Check size={11} strokeWidth={2.6} />
            구독 중
          </>
        ) : (
          <>
            <Plus size={11} strokeWidth={2.6} />
            구독
          </>
        )}
      </button>
    </li>
  );
}
