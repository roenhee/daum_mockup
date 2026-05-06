import { Fragment, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Plus, Search, X } from 'lucide-react';
import { MAI_NEWS_FEED } from '@/mocks/maiNews';
import { MAI_KEYWORD_SUGGESTIONS, MAI_REGISTERED_KEYWORDS } from '@/mocks/mai';
import { useDragScroll } from '@/lib/useDragScroll';
import { cn } from '@/lib/cn';
import {
  N1ArticleMulti,
  N1ArticleSingle,
  N4KeywordRec,
  N8Followup,
  N9AssetAnomaly,
  N9EnvAnomaly,
  N11IssueSpike,
  N14Trending,
  N17DailyBriefing,
  N18Flash,
  N19LocalPopular,
  N20CohortNewSub,
  N20CohortPopular,
} from './MaiNewsCards';

const ARTICLE_KINDS = new Set(['n1a', 'n1b']);
const FLAT_KINDS = new Set(['n11', 'n8a', 'n8b']);
const NO_STATUS_KINDS = new Set(['n14']);
// "내 주변" 칩에서만 노출되는 컨텍스트성 슬롯
const CONTEXT_KINDS = new Set(['n9a', 'n9b', 'n19', 'n20a', 'n20b']);
// 키워드 필터에서 제외되는 슬롯 (브리핑·트렌딩 등 멀티 주제)
const NON_ARTICLE_KINDS = new Set(['n17', 'n14']);

type FeedItem = (typeof MAI_NEWS_FEED)[number];
type Group =
  | { mode: 'stream'; items: { item: FeedItem; idx: number }[] }
  | { mode: 'flat'; item: FeedItem; idx: number }
  | { mode: 'card'; item: FeedItem; idx: number };

type FilterMode = 'feed' | 'all' | string;

function groupItems(
  pairs: { item: FeedItem; idx: number }[],
): Group[] {
  const groups: Group[] = [];
  for (const pair of pairs) {
    const { item, idx } = pair;
    if (ARTICLE_KINDS.has(item.kind)) {
      const last = groups[groups.length - 1];
      if (last && last.mode === 'stream') {
        last.items.push(pair);
        continue;
      }
      groups.push({ mode: 'stream', items: [pair] });
    } else if (FLAT_KINDS.has(item.kind)) {
      groups.push({ mode: 'flat', item, idx });
    } else {
      groups.push({ mode: 'card', item, idx });
    }
  }
  return groups;
}

function getSlotKeywords(item: FeedItem): string[] {
  switch (item.kind) {
    case 'n1a':
    case 'n1b':
      return item.data.keywords;
    case 'n4':
      return item.data.keywords.map((k) => k.keyword);
    case 'n8a':
    case 'n8b': {
      const text =
        (item.data.sourceTitle ?? '') +
        ' ' +
        item.data.observation +
        ' ' +
        item.data.title;
      return MAI_REGISTERED_KEYWORDS.filter((kw) => text.includes(kw));
    }
    case 'n9b':
      return [item.data.asset];
    case 'n11': {
      const kws: string[] = [item.data.keyword];
      if (item.data.mode === 'newKeyword' && item.data.newKeyword) {
        kws.push(item.data.newKeyword);
      }
      return kws;
    }
    case 'n14':
      return item.data.items.map((i) => i.keyword);
    case 'n17':
      return item.data.keywords;
    case 'n18':
      return [item.data.keyword];
    default:
      return [];
  }
}

function slotMatchesKeyword(item: FeedItem, kw: string): boolean {
  if (CONTEXT_KINDS.has(item.kind)) return false;
  if (NON_ARTICLE_KINDS.has(item.kind)) return false;
  const slotKws = getSlotKeywords(item);
  return slotKws.some(
    (k) =>
      k.toLowerCase().includes(kw.toLowerCase()) ||
      kw.toLowerCase().includes(k.toLowerCase()),
  );
}

// 예시 모드 시퀀스 — MAI_NEWS_FEED 원본 인덱스 기준.
// 시간대: 모닝 브리핑(아침) → 출근길 → 11:30 시장 → 오후 날씨 → 이브닝 브리핑.
// 기사 슬롯(n1a/n1b)은 2개 이상 연달아 묶음으로 배치한다.
const FEED_EXAMPLE_ORDER = [
  23, // n17a 모닝 브리핑
  17, // n9a 출근 경로
  0,  // n1a 호르무즈 통항 15척
  19, // n11a 보도량 급증 (이란 전쟁)
  8,  // n1b 호르무즈 역봉쇄 다매체
  1,  // n1a 이란 미국 제안
  12, // n4a 키워드 추천 (행동)
  9,  // n1b 이란-미 핵협상 결렬
  3,  // n1a WTI 96달러
  15, // n8b 후속 동일 기자 (이란)
  18, // n9b 삼성전자 +5.4% (오전 11:30)
  20, // n11b 신규 키워드 HBM4E
  2,  // n1a 코스피 사상 최고
  10, // n1b HBM4 양산
  4,  // n1a HBM4 석 달
  14, // n8a 후속 시리즈 (반도체)
  13, // n4b 키워드 추천 (인접)
  16, // n9a 오후 비 소식
  21, // n14a 트렌딩 전체
  5,  // n1a 상괭이
  11, // n1b 오월드 5월 재개장
  7,  // n1a 늑구
  6,  // n1a 아쿠아리움 오월드
  25, // n18 속보 (늑구)
  26, // n19a 동네 인기 (대전 중구)
  27, // n19b 광역 인기 (대전)
  28, // n20a 사람들 인기 기사
  29, // n20b 사람들 신규 구독
  22, // n14b 트렌딩 인접
  24, // n17b 이브닝 브리핑
];

function buildFeedItems<T extends { item: FeedItem; idx: number }>(
  pairs: T[],
): T[] {
  const byIdx = new Map(pairs.map((p) => [p.idx, p]));
  const out: T[] = [];
  for (const i of FEED_EXAMPLE_ORDER) {
    const p = byIdx.get(i);
    if (p) out.push(p);
  }
  // 시퀀스에 누락된 슬롯이 있으면 뒤에 붙여 — 데이터 추가 시 안전장치
  for (const p of pairs) {
    if (!FEED_EXAMPLE_ORDER.includes(p.idx)) out.push(p);
  }
  return out;
}

export function MaiNewsFeed() {
  const [filter, setFilter] = useState<FilterMode>('all');
  const [keywordSheetOpen, setKeywordSheetOpen] = useState(false);
  const [overrides, setOverrides] = useState<Map<number, boolean>>(new Map());
  const isRead = (idx: number) => overrides.get(idx) ?? idx >= 5;
  const toggleRead = (idx: number) => {
    setOverrides((prev) => {
      const next = new Map(prev);
      next.set(idx, !isRead(idx));
      return next;
    });
  };

  // 모든 슬롯에 원본 인덱스를 부여
  const indexedAll = useMemo(
    () => MAI_NEWS_FEED.map((item, idx) => ({ item, idx })),
    [],
  );

  const activeKeyword =
    filter !== 'all' && filter !== 'feed' && filter !== 'nearby'
      ? filter
      : null;

  // 필터 모드에 따른 슬롯 결정
  const visibleItems = useMemo(() => {
    if (filter === 'feed') return buildFeedItems(indexedAll);
    if (filter === 'nearby') {
      return indexedAll.filter(({ item }) => CONTEXT_KINDS.has(item.kind));
    }
    if (activeKeyword) {
      return indexedAll.filter(({ item }) =>
        slotMatchesKeyword(item, activeKeyword),
      );
    }
    return indexedAll;
  }, [filter, activeKeyword, indexedAll]);

  const groups = groupItems(visibleItems);

  return (
    <div className="bg-white">
      <KeywordChipBar
        value={filter}
        onChange={(v) => setFilter(v)}
        onAddKeyword={() => setKeywordSheetOpen(true)}
      />

      {groups.length === 0 ? (
        <EmptyState mode={filter} keyword={activeKeyword} />
      ) : (
        groups.map((g, gi) => {
          const showSeparator = gi > 0;
          if (g.mode === 'stream') {
            return (
              <Fragment key={`g-${gi}`}>
                {showSeparator ? <SlotSeparator /> : null}
                <section>
                  {g.items.map((pair, ii) => (
                    <Fragment key={`s-${pair.idx}`}>
                      <div className="relative">
                        <SlotStatus
                          read={isRead(pair.idx)}
                          onToggle={() => toggleRead(pair.idx)}
                        />
                        {renderItem(pair.item)}
                      </div>
                      {ii < g.items.length - 1 ? (
                        <div className="h-px bg-gray-100 mx-4" />
                      ) : null}
                    </Fragment>
                  ))}
                </section>
              </Fragment>
            );
          }
          if (g.mode === 'flat') {
            return (
              <Fragment key={`g-${gi}`}>
                {showSeparator ? <SlotSeparator /> : null}
                <div className="relative">
                  <SlotStatus
                    read={isRead(g.idx)}
                    onToggle={() => toggleRead(g.idx)}
                  />
                  {renderItem(g.item)}
                </div>
              </Fragment>
            );
          }
          const hideStatus = NO_STATUS_KINDS.has(g.item.kind);
          return (
            <Fragment key={`g-${gi}`}>
              {showSeparator ? <SlotSeparator /> : null}
              <div className="relative px-3 py-3">
                {!hideStatus ? (
                  <SlotStatus
                    read={isRead(g.idx)}
                    inset
                    onToggle={() => toggleRead(g.idx)}
                  />
                ) : null}
                {renderItem(g.item)}
              </div>
            </Fragment>
          );
        })
      )}

      {keywordSheetOpen ? (
        <KeywordAddSheet onClose={() => setKeywordSheetOpen(false)} />
      ) : null}
    </div>
  );
}

function KeywordChipBar({
  value,
  onChange,
  onAddKeyword,
}: {
  value: FilterMode;
  onChange: (v: FilterMode) => void;
  onAddKeyword: () => void;
}) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      {...handlers}
      className={cn(
        'border-b border-gray-100 overflow-x-auto no-scrollbar select-none touch-pan-x',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
      )}
    >
      <div className="flex items-center min-w-max gap-1.5 py-2.5">
        {/* 전체 + 내 주변 + 디바이더: 전체 칩이 좌측에 닿으면 sticky로 함께 고정 */}
        <div className="sticky left-0 z-10 flex items-center gap-1.5 bg-white shrink-0 pl-3 pr-1">
          <ChipButton
            label="전체"
            active={value === 'all'}
            onClick={() => onChange('all')}
          />
          <ChipButton
            label="내 주변"
            active={value === 'nearby'}
            onClick={() => onChange('nearby')}
          />
          <span
            className="w-px h-5 bg-gray-200 ml-1 shrink-0"
            aria-hidden
          />
        </div>
        {MAI_REGISTERED_KEYWORDS.map((kw) => (
          <ChipButton
            key={kw}
            label={`#${kw}`}
            active={value === kw}
            onClick={() => onChange(kw)}
          />
        ))}
        <ChipButton
          label="예시"
          active={value === 'feed'}
          onClick={() => onChange('feed')}
        />
        <div className="pr-3 shrink-0">
          <button
            type="button"
            onClick={onAddKeyword}
            className="h-8 px-3 rounded-full text-[12px] font-medium border border-gray-200 text-gray-500 inline-flex items-center gap-0.5 bg-white"
          >
            <Plus size={12} strokeWidth={2.4} />
            키워드
          </button>
        </div>
      </div>
    </div>
  );
}

function ChipButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'h-8 px-3 rounded-full text-[12px] font-medium border transition-colors shrink-0',
        active
          ? 'bg-gray-900 text-white border-gray-900'
          : 'bg-white text-gray-700 border-gray-200',
      )}
    >
      {label}
    </button>
  );
}

function EmptyState({
  mode,
  keyword,
}: {
  mode: FilterMode;
  keyword: string | null;
}) {
  if (mode === 'nearby') {
    return (
      <div className="px-6 py-12 flex flex-col items-center text-center">
        <p className="text-[13px] font-semibold text-gray-700">
          내 주변 알림이 아직 없어요
        </p>
      </div>
    );
  }
  if (keyword) {
    return (
      <div className="px-6 py-12 flex flex-col items-center text-center">
        <p className="text-[13px] font-semibold text-gray-700">
          '{keyword}' 관련 기사가 아직 없어요
        </p>
        <p className="mt-1 text-[12px] text-gray-500">
          다른 키워드를 살펴보거나 잠시 후 다시 확인해보세요
        </p>
      </div>
    );
  }
  return null;
}

function KeywordAddSheet({ onClose }: { onClose: () => void }) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [query, setQuery] = useState('');
  useEffect(() => {
    setTarget(document.getElementById('phone-frame-root'));
  }, []);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  if (!target) return null;
  return createPortal(
    <div className="absolute inset-0 z-50">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gray-50 rounded-t-[28px] max-h-[85%] min-h-[55%] flex flex-col">
        <div className="pt-3 pb-1 flex justify-center shrink-0">
          <span className="w-10 h-1 rounded-full bg-gray-300" />
        </div>
        <div className="px-4 pt-2 shrink-0 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-[14px] font-bold text-gray-900">키워드 추가</h4>
            <p className="mt-0.5 text-[11px] text-gray-500">
              관심 키워드를 추가하면 새소식 피드에 우선 노출돼요
            </p>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="-mr-1 -mt-1 p-1 text-gray-500"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-4 pt-3 shrink-0">
          <div className="rounded-2xl bg-white px-3 py-2.5 flex items-center gap-2">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="키워드 입력 (예: 환율)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="입력 지우기"
                className="text-gray-400"
              >
                <X size={14} />
              </button>
            ) : null}
          </div>
        </div>
        <div className="overflow-y-auto px-4 pt-3 pb-5">
          <p className="text-[11px] font-semibold text-gray-700">추천 키워드</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {MAI_KEYWORD_SUGGESTIONS.map((kw) => (
              <button
                key={kw}
                type="button"
                className="h-7 pl-2 pr-2.5 rounded-full bg-white border border-gray-200 text-[12px] text-gray-700 inline-flex items-center gap-0.5"
              >
                <Plus size={11} strokeWidth={2.4} className="text-gray-500" />
                #{kw}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    target,
  );
}

function SlotSeparator() {
  return (
    <div className="px-4 py-1" aria-hidden>
      <div className="h-px bg-gray-100" />
    </div>
  );
}

function SlotStatus({
  read,
  inset = false,
  onToggle,
}: {
  read: boolean;
  inset?: boolean;
  onToggle?: () => void;
}) {
  const position = inset ? 'top-5 right-5' : 'top-3 right-4';
  return (
    <button
      type="button"
      aria-label={read ? '읽음 — 눌러서 새 소식으로' : '새 소식 — 눌러서 읽음 표시'}
      aria-pressed={read}
      onClick={(e) => {
        e.stopPropagation();
        onToggle?.();
      }}
      className={`absolute ${position} z-10 inline-flex items-center justify-center w-5 h-5 rounded-full active:bg-gray-100`}
    >
      {read ? (
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-100 text-gray-400">
          <Check size={10} strokeWidth={3} />
        </span>
      ) : (
        <span className="relative inline-flex w-2.5 h-2.5">
          <span className="absolute inset-0 rounded-full bg-daum-red opacity-50 animate-ping" />
          <span className="relative w-2.5 h-2.5 rounded-full bg-daum-red" />
        </span>
      )}
    </button>
  );
}

function renderItem(item: (typeof MAI_NEWS_FEED)[number]) {
  switch (item.kind) {
    case 'n17':
      return <N17DailyBriefing data={item.data} />;
    case 'n11':
      return <N11IssueSpike data={item.data} />;
    case 'n1a':
      return <N1ArticleSingle data={item.data} />;
    case 'n1b':
      return <N1ArticleMulti data={item.data} />;
    case 'n9a':
      return <N9EnvAnomaly data={item.data} />;
    case 'n9b':
      return <N9AssetAnomaly data={item.data} />;
    case 'n18':
      return <N18Flash data={item.data} />;
    case 'n8a':
    case 'n8b':
      return <N8Followup data={item.data} />;
    case 'n4':
      return <N4KeywordRec data={item.data} />;
    case 'n19':
      return <N19LocalPopular data={item.data} />;
    case 'n20a':
      return <N20CohortPopular data={item.data} />;
    case 'n20b':
      return <N20CohortNewSub data={item.data} />;
    case 'n14':
      return <N14Trending data={item.data} />;
  }
}
