import { Play } from 'lucide-react';
import { placeholderImg } from '@/lib/img';
import { useDragScroll } from '@/lib/useDragScroll';
import { cn } from '@/lib/cn';
import type { SportsVideo } from '@/mocks/sports';

interface SportsVideosSectionProps {
  videos: SportsVideo[];
  title?: string;
  moreLabel?: string;
}

export function SportsVideosSection({
  videos,
  title = '스포츠 영상',
  moreLabel = '더보기',
}: SportsVideosSectionProps) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLUListElement>();

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h2 className="text-[14px] font-bold text-gray-900">{title}</h2>
        <button type="button" className="text-[12px] text-gray-500">
          {moreLabel} &gt;
        </button>
      </div>
      <ul
        ref={ref}
        {...handlers}
        className={cn(
          'flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar select-none touch-pan-x',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        {videos.map((v) => (
          <li key={v.id} className="shrink-0 w-[220px]">
            <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-900">
              <img
                src={placeholderImg(v.thumbnailSeed, 400, 240, 'sport,highlight,action')}
                alt=""
                className="w-full h-full object-cover pointer-events-none"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-9 h-9 rounded-full bg-black/55 text-white inline-flex items-center justify-center">
                  <Play size={16} fill="currentColor" />
                </span>
              </div>
              <span className="absolute bottom-1.5 right-1.5 bg-black/65 text-white text-[10px] font-medium px-1 rounded">
                {v.duration}
              </span>
            </div>
            <p className="mt-2 text-[13px] font-semibold leading-snug line-clamp-2 text-gray-900">
              {v.title}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-gray-500">
              <span className="truncate">{v.channel}</span>
              <span className="text-gray-300">·</span>
              <span>{v.views}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
