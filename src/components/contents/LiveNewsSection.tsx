import { Link } from 'react-router-dom';
import type { NewsArticle } from '@/types';
import { LiveBadge } from '@/components/ui/LiveBadge';
import { SectionHeader, SectionMoreButton } from '@/components/ui/SectionHeader';
import { useDragScroll } from '@/lib/useDragScroll';
import { cn } from '@/lib/cn';

interface LiveNewsSectionProps {
  items: NewsArticle[];
}

export function LiveNewsSection({ items }: LiveNewsSectionProps) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();

  return (
    <section className="bg-white">
      <SectionHeader title="LIVE 뉴스" />
      <div
        ref={ref}
        {...handlers}
        className={cn(
          'overflow-x-auto no-scrollbar select-none touch-pan-x',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        <ul className="flex gap-3 px-4 pb-3 min-w-max">
          {items.map((a) => (
            <li key={a.id} className="w-[260px] shrink-0">
              <Link to={`/news/${a.id}`} className="block">
                <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-900">
                  <img
                    src={a.thumbnailUrl}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                  <LiveBadge className="absolute top-2 left-2" />
                  {a.viewCount ? (
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                      {formatViewers(a.viewCount)} 시청
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-[13px] font-semibold leading-snug line-clamp-2 text-gray-900">
                  {a.title}
                </p>
                <p className="mt-1 text-[11px] text-gray-500 truncate">
                  {a.publisher} · {a.publishedAt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <SectionMoreButton label="LIVE 뉴스 더보기" />
    </section>
  );
}

function formatViewers(n: number) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천`;
  return n.toString();
}
