import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useDragScroll } from '@/lib/useDragScroll';
import { ACTIVE_RECOMMENDATION } from '@/mocks/maiExplore';
import { RecommendCard } from './RecommendCard';
import { ArchiveItemCard } from './ArchiveItemCard';
import { CreateExploreSheet } from './CreateExploreSheet';
import { useExplore } from './ExploreContext';
import { ExperimentalChatInput, ExperimentalModal } from './ExperimentalSurface';

type FilterId = 'all' | 'inProgress' | 'favorites' | 'experimental';

// 스크롤 영역 안에 들어가는 본문. 추천 카드 + 아카이브.
export function MaiExploreFeed() {
  const {
    items,
    recDismissed,
    dismissRec,
    toggleFavorite,
    openSheetFromRec,
    setExperimentalActive,
  } = useExplore();
  const [filter, setFilter] = useState<FilterId>('all');

  // 실험 칩 진입/이탈을 컨텍스트에 알림 — chat input/modal 오버레이가 이를 보고 켜짐
  useEffect(() => {
    setExperimentalActive(filter === 'experimental');
    return () => setExperimentalActive(false);
  }, [filter, setExperimentalActive]);

  const filtered = useMemo(() => {
    let out = items;
    // 실험 모드는 자산 surface 자체는 동일하게 노출 (시안 B 스펙: 진입로만 다름)
    if (filter === 'inProgress') {
      out = out.filter((i) => i.inProgress);
    } else if (filter === 'favorites') {
      out = out.filter((i) => i.favorited);
    }
    // 정렬 — 디폴트(작업 중 → 최신순 복합)
    const sorted = [...out].sort((a, b) => {
      if (a.inProgress !== b.inProgress) return a.inProgress ? -1 : 1;
      return b.recencyRank - a.recencyRank;
    });
    return sorted;
  }, [items, filter]);

  return (
    <div className="bg-white">
      <FilterChipBar value={filter} onChange={setFilter} />

      {!recDismissed ? (
        <RecommendCard
          rec={ACTIVE_RECOMMENDATION}
          onAccept={openSheetFromRec}
          onDismiss={dismissRec}
        />
      ) : null}

      <div
        className={cn(
          // pt-3: 추천 카드가 닫혔을 때는 칩 디바이더와, 노출 시에는 추천 카드 바닥과 12px 간격 확보
          'px-3 pt-3',
          // 실험 모드에서는 채팅 입력 백드롭(약 68px) 위로 마지막 카드가 노출되되 간격은 좁게
          filter === 'experimental' ? 'pb-[76px]' : 'pb-6',
        )}
      >
        {filtered.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          // 카드 사이 디바이더 — 마지막 카드 아래에는 표시되지 않음
          // 첫 카드의 my-1.5(작업 중 카드 breathing room) 상단을 제거해 칩 바와 일정한 간격 유지
          <div className="flex flex-col divide-y divide-gray-200 [&>*:first-child]:mt-0">
            {filtered.map((item) => (
              <ArchiveItemCard
                key={item.id}
                item={item}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// AppShell의 mainOverlay 슬롯 — FAB + 실험 채팅 입력 (스크롤 영역 위, BottomTabBar 아래)
export function MaiExploreMainOverlay() {
  const { openSheetEmpty, experimentalActive } = useExplore();
  return (
    <div className="absolute inset-0 pointer-events-none">
      {!experimentalActive ? (
        <button
          type="button"
          onClick={openSheetEmpty}
          aria-label="새 탐구 시작"
          className="pointer-events-auto absolute right-4 bottom-4 w-14 h-14 rounded-full bg-gray-900 text-white shadow-[0_8px_20px_rgba(0,0,0,0.25)] flex items-center justify-center active:scale-95 transition-transform z-30"
        >
          <Plus size={24} strokeWidth={2.4} />
        </button>
      ) : null}
      <ExperimentalChatInput />
    </div>
  );
}

// AppShell의 fullOverlay 슬롯 — 바텀시트 + 실험 모달 (BottomTabBar까지 덮음)
export function MaiExploreFullOverlay() {
  const { sheetOpen, sheetPrefill, closeSheet, submitSheet } = useExplore();
  return (
    <>
      <CreateExploreSheet
        open={sheetOpen}
        prefill={sheetPrefill}
        onClose={closeSheet}
        onSubmit={submitSheet}
      />
      <ExperimentalModal />
    </>
  );
}

function FilterChipBar({
  value,
  onChange,
}: {
  value: FilterId;
  onChange: (v: FilterId) => void;
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
      <div className="flex items-center min-w-max gap-1.5 py-3 px-3">
        <Chip
          label="전체"
          active={value === 'all'}
          onClick={() => onChange('all')}
        />
        <Chip
          label="실험"
          active={value === 'experimental'}
          onClick={() => onChange('experimental')}
        />
        {/* 시각 구분선 — 실험은 다른 모드(전체/작업중/즐겨찾기에 영향 받지 않음) */}
        <span className="w-px h-5 bg-gray-200 shrink-0" aria-hidden />
        <Chip
          label="작업 중"
          active={value === 'inProgress'}
          onClick={() => onChange('inProgress')}
        />
        <Chip
          label="즐겨찾기"
          active={value === 'favorites'}
          onClick={() => onChange('favorites')}
        />
      </div>
    </div>
  );
}

function Chip({
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

function EmptyState({ filter }: { filter: FilterId }) {
  let msg = '아직 탐구 결과물이 없어요';
  let sub = '추천 카드 또는 + 버튼으로 시작해보세요';
  if (filter === 'inProgress') {
    msg = '작업 중인 탐구가 없어요';
    sub = '시작했다가 멈춘 슬롯이 여기에 모입니다';
  } else if (filter === 'favorites') {
    msg = '즐겨찾기한 탐구가 없어요';
    sub = '카드 우상단의 별을 눌러 표시할 수 있어요';
  }
  return (
    <div className="px-6 py-12 flex flex-col items-center text-center bg-white rounded-[14px] border border-gray-100">
      <p className="text-[13px] font-semibold text-gray-700">{msg}</p>
      <p className="mt-1 text-[12px] text-gray-500">{sub}</p>
    </div>
  );
}
