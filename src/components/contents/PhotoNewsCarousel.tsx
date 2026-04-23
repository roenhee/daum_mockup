import { Link } from 'react-router-dom';
import type { NewsArticle } from '@/types';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useDragScroll } from '@/lib/useDragScroll';
import { cn } from '@/lib/cn';

interface PhotoNewsCarouselProps {
  items: NewsArticle[];
}

export function PhotoNewsCarousel({ items }: PhotoNewsCarouselProps) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();

  return (
    <section className="bg-white">
      <SectionHeader title="포토 뉴스" />
      <div
        ref={ref}
        {...handlers}
        className={cn(
          'overflow-x-auto no-scrollbar select-none touch-pan-x',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        <ul className="flex gap-2 px-4 pb-4 min-w-max">
          {items.map((a) => (
            <li key={a.id} className="w-[140px] shrink-0">
              <Link to={`/news/${a.id}`} className="block">
                <div className="relative rounded-lg overflow-hidden aspect-square bg-gray-100">
                  <img
                    src={a.thumbnailUrl}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
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
    </section>
  );
}
