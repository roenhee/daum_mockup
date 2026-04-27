import { Play } from 'lucide-react';
import type { ShortItem } from '@/mocks/shorts';
import { SectionHeader, SectionMoreButton } from '@/components/ui/SectionHeader';
import { useDragScroll } from '@/lib/useDragScroll';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/asset';

interface ShortsSectionProps {
  items: ShortItem[];
  title?: string;
  moreLabel?: string;
}

export function ShortsSection({
  items,
  title = '쇼츠',
  moreLabel = '쇼츠 더보기',
}: ShortsSectionProps) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();

  return (
    <section className="bg-white">
      <SectionHeader title={title} />
      <div
        ref={ref}
        {...handlers}
        className={cn(
          'overflow-x-auto no-scrollbar select-none touch-pan-x',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        <ul className="flex gap-2 px-4 pb-3 min-w-max">
          {items.map((s) => (
            <li key={s.id} className="w-[128px] shrink-0">
              <div className="relative rounded-xl overflow-hidden aspect-[9/16] bg-gray-900">
                <img
                  src={asset(s.thumbnailUrl)}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-2 left-2 inline-flex items-center gap-1 text-white text-[10px] font-semibold">
                  <Play size={10} fill="currentColor" />
                  {formatViews(s.viewCount)}
                </div>
                <p className="absolute bottom-2 left-2 right-2 text-white text-[12px] font-semibold leading-snug line-clamp-2">
                  {s.title}
                </p>
              </div>
              <p className="mt-1.5 text-[11px] text-gray-500 truncate">{s.author}</p>
            </li>
          ))}
        </ul>
      </div>
      <SectionMoreButton label={moreLabel} />
    </section>
  );
}

function formatViews(n: number) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천`;
  return n.toString();
}
