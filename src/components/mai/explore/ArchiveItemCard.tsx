import { useState } from 'react';
import { Headphones, Play, RefreshCw, Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import { SLOT_KIND_META, type ArchiveItem } from '@/mocks/maiExplore';
import { SlotThumbnail } from './SlotThumbnail';
import { useMaiPlayer } from '../news/MaiPlayer';

export function ArchiveItemCard({
  item,
  onToggleFavorite,
}: {
  item: ArchiveItem;
  onToggleFavorite: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const meta = SLOT_KIND_META[item.kind];
  const player = useMaiPlayer();
  const toggle = () => setExpanded((v) => !v);

  return (
    <article
      className={cn(
        'relative bg-white overflow-hidden',
        // 작업 중 카드만 둥근 모서리 — 어두운 오버레이가 부드럽게 보이도록
        item.inProgress && 'rounded-[12px] my-1.5',
      )}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        disabled={item.inProgress}
        className="w-full text-left px-3 py-3 disabled:cursor-default"
      >
        {/* 메타 행 — 좌측 점 아이콘 자리에 카드 종류 미니 아이콘 인라인 */}
        <div className="flex items-center gap-1.5 pr-8">
          <SlotThumbnail kind={item.kind} size={14} bare />
          <span className="text-[11px] font-medium text-gray-500 truncate">
            {meta.label}
          </span>
          {item.hasUpdate ? (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-[1px] rounded shrink-0 bg-[#EBF1FE] text-[#3D6EE0]">
              <RefreshCw size={9} className="-mt-px" /> 업데이트
            </span>
          ) : null}
        </div>
        <h3 className="mt-1 text-[14px] font-semibold text-gray-900 leading-snug pr-8">
          {item.title}
        </h3>
        <p className="mt-0.5 text-[12px] text-gray-500 leading-snug">{item.snippet}</p>
        {item.tags.length > 0 ? (
          <div className="mt-1.5 flex items-center gap-1 flex-wrap">
            {item.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[11px] text-gray-500 bg-gray-50 px-1.5 py-[1px] rounded"
              >
                #{t}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-1.5 flex items-center gap-1.5 text-[10.5px] text-gray-400">
          <span>{item.createdAt}</span>
          {item.sourceCount > 0 ? (
            <>
              <Dot />
              <span>기사 {item.sourceCount}건</span>
            </>
          ) : null}
          {typeof item.listenCount === 'number' ? (
            <>
              <Dot />
              <span className="inline-flex items-center gap-0.5">
                <Headphones size={10} /> {item.listenCount}회
              </span>
            </>
          ) : null}
          {typeof item.viewCount === 'number' && !item.listenCount ? (
            <>
              <Dot />
              <span>본 횟수 {item.viewCount}</span>
            </>
          ) : null}
        </div>
      </button>

      {/* 즐겨찾기 별 — 작업 중에는 비활성화. 오버레이 위로 노출. */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (item.inProgress) return;
          onToggleFavorite(item.id);
        }}
        disabled={item.inProgress}
        aria-label={item.favorited ? '즐겨찾기 해제' : '즐겨찾기'}
        aria-disabled={item.inProgress}
        className={cn(
          'absolute top-2 right-2 p-1 z-[2]',
          item.inProgress && 'opacity-30 cursor-not-allowed',
        )}
      >
        <Star
          size={16}
          className={cn(item.favorited ? 'text-[#F4B400]' : 'text-gray-300')}
          fill={item.favorited ? 'currentColor' : 'none'}
        />
      </button>

      {/* 본문 끝 — 좌측 정렬 전체보기/접기 + 오디오 카드 재생 버튼 */}
      {!item.inProgress ? (
        <div className="px-3 pb-2.5 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className="text-[12px] text-[#3D6EE0] font-medium underline-offset-2 hover:underline"
          >
            {expanded ? '접기' : '전체보기 →'}
          </button>
          {item.kind === 'audio' ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                player?.play({
                  title: item.title,
                  duration: '31:00',
                  variant: 'deepdive',
                });
              }}
              className="inline-flex items-center gap-1 h-7 pl-2 pr-2.5 rounded-full text-white text-[11px] font-medium"
              style={{ background: '#0B1A4A' }}
            >
              <Play size={11} fill="currentColor" />
              재생
            </button>
          ) : null}
        </div>
      ) : null}

      {expanded && !item.inProgress ? (
        <div className="px-3 pb-3">
          <div className="rounded-[10px] bg-gray-50 px-3 py-3 space-y-2.5">
            {item.body.map((b, i) => (
              <div key={i}>
                {b.heading ? (
                  <p className="text-[12px] font-semibold text-gray-800 mb-0.5">
                    {b.heading}
                  </p>
                ) : null}
                <p className="text-[12.5px] text-gray-600 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* 작업 중 — 카드 전체를 어두운 오버레이로 덮음. 클릭/펼치기 불가. */}
      {item.inProgress ? (
        <div className="absolute inset-0 rounded-[12px] bg-black/40 flex flex-col items-center justify-center gap-1.5 z-[1]">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 text-white text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" aria-hidden />
            작업 중
          </span>
          <p className="text-white/80 text-[11px] leading-snug px-6 text-center">
            슬롯 캔버스에서 합성 중이에요
          </p>
        </div>
      ) : null}
    </article>
  );
}

function Dot() {
  return <span className="w-[2px] h-[2px] rounded-full bg-gray-300" aria-hidden />;
}
