import { Fragment, useMemo, useState } from 'react';
import { MAI_ISSUE_FEED, type IssueFeedItem } from '@/mocks/maiIssue';
import { MAI_REGISTERED_KEYWORDS } from '@/mocks/mai';
import { useDragScroll } from '@/lib/useDragScroll';
import { cn } from '@/lib/cn';
import {
  I1DailyDigest,
  I2IssueFlow,
  I3MultiOutlet,
  I4WeeklyReport,
  I6CrossIssue,
  I10IssueMap,
  I30DeepdiveAudio,
} from './IssueNoteCards';

type FilterMode = 'all' | string;

// 노트 슬롯 표시 순서 (스펙 ID 기준)
const KIND_ORDER: IssueFeedItem['kind'][] = [
  'i1a', 'i1b', 'i2a', 'i2b', 'i3a', 'i4a', 'i4b',
  'i6a', 'i6b', 'i10a', 'i10b', 'i30a', 'i30b',
];
const KIND_INDEX: Record<IssueFeedItem['kind'], number> = Object.fromEntries(
  KIND_ORDER.map((k, i) => [k, i]),
) as Record<IssueFeedItem['kind'], number>;

// 노트 유형 라벨로 슬롯 카테고리 인덱스 (필터 칩과 별개로, 분류 용도)
const KIND_TO_TOPICS = (item: IssueFeedItem): string[] => {
  // 통합/포트폴리오/종합은 키워드 필터에서 제외 (모든 키워드를 포함하므로)
  if (item.kind === 'i1b' || item.kind === 'i4b' || item.kind === 'i30b') {
    return [];
  }
  return item.data.topics;
};

function matchesKeyword(item: IssueFeedItem, kw: string): boolean {
  const topics = KIND_TO_TOPICS(item);
  if (topics.length === 0) return false;
  return topics.some(
    (t) =>
      t.toLowerCase().includes(kw.toLowerCase()) ||
      kw.toLowerCase().includes(t.toLowerCase()),
  );
}

export function MaiIssueFeed() {
  const [filter, setFilter] = useState<FilterMode>('all');

  const visibleItems = useMemo(() => {
    const base =
      filter === 'all'
        ? MAI_ISSUE_FEED
        : MAI_ISSUE_FEED.filter((item) => matchesKeyword(item, filter));
    return [...base].sort((a, b) => KIND_INDEX[a.kind] - KIND_INDEX[b.kind]);
  }, [filter]);

  return (
    <div className="bg-white">
      <KeywordChipBar value={filter} onChange={setFilter} />

      <div className="bg-white pb-4">
        {visibleItems.length === 0 ? (
          <div className="px-3 pt-4">
            <EmptyState keyword={filter} />
          </div>
        ) : (
          visibleItems.map((item, i) => (
            <Fragment key={`${item.kind}-${i}`}>
              {i > 0 ? (
                <div className="h-2 bg-gray-100" aria-hidden />
              ) : null}
              {renderItem(item)}
            </Fragment>
          ))
        )}
        {visibleItems.length > 0 ? <FeedFooter /> : null}
      </div>
    </div>
  );
}

function KeywordChipBar({
  value,
  onChange,
}: {
  value: FilterMode;
  onChange: (v: FilterMode) => void;
}) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      {...handlers}
      className={cn(
        'border-b border-gray-100 overflow-x-auto no-scrollbar select-none touch-pan-x bg-white',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
      )}
    >
      <div className="flex items-center min-w-max gap-1.5 py-2.5">
        <div className="sticky left-0 z-10 flex items-center gap-1.5 bg-white shrink-0 pl-3 pr-1">
          <ChipButton
            label="전체"
            active={value === 'all'}
            onClick={() => onChange('all')}
          />
          <span className="w-px h-5 bg-gray-200 ml-1 shrink-0" aria-hidden />
        </div>
        {MAI_REGISTERED_KEYWORDS.map((kw) => (
          <ChipButton
            key={kw}
            label={`#${kw}`}
            active={value === kw}
            onClick={() => onChange(kw)}
          />
        ))}
        <div className="pr-3 shrink-0" />
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

function EmptyState({ keyword }: { keyword: string }) {
  return (
    <div className="px-6 py-12 flex flex-col items-center text-center bg-white rounded-[14px] border border-gray-100">
      <p className="text-[13px] font-semibold text-gray-700">
        '{keyword}' 관련 이슈 노트가 아직 없어요
      </p>
      <p className="mt-1 text-[12px] text-gray-500">
        이슈 노트는 기사가 일정 수 이상 쌓이면 합성돼요
      </p>
    </div>
  );
}

function FeedFooter() {
  return (
    <p className="pt-3 pb-1 text-center text-[10px] text-gray-400 tracking-wide">
      이슈 노트는 매일 아침/저녁, 그리고 주제별 기사가 쌓이면 합성됩니다
    </p>
  );
}

function renderItem(item: IssueFeedItem) {
  switch (item.kind) {
    case 'i1a':
    case 'i1b':
      return <I1DailyDigest data={item.data} />;
    case 'i2a':
    case 'i2b':
      return <I2IssueFlow data={item.data} />;
    case 'i3a':
      return <I3MultiOutlet data={item.data} />;
    case 'i4a':
    case 'i4b':
      return <I4WeeklyReport data={item.data} />;
    case 'i6a':
    case 'i6b':
      return <I6CrossIssue data={item.data} />;
    case 'i10a':
    case 'i10b':
      return <I10IssueMap data={item.data} />;
    case 'i30a':
    case 'i30b':
      return <I30DeepdiveAudio data={item.data} />;
  }
}
