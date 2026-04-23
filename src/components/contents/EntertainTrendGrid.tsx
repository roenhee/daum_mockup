import { Thumbnail } from '@/components/ui/Thumbnail';
import { ArticleMeta } from '@/components/ui/ArticleMeta';
import type { TrendPhoto } from '@/mocks/entertain';

interface EntertainTrendGridProps {
  title?: string;
  items: TrendPhoto[];
}

export function EntertainTrendGrid({
  title = '트렌드 연예',
  items,
}: EntertainTrendGridProps) {
  return (
    <section className="bg-white border-b border-content-divider">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h2 className="text-body font-bold text-content-primary">{title}</h2>
        <button type="button" className="text-caption text-content-secondary">
          더보기 &gt;
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-4 px-4 pb-4">
        {items.map((item) => (
          <li key={item.id}>
            <Thumbnail
              url={item.imageUrl}
              seed={item.imageSeed}
              topic="korean,kpop,fashion"
              width={320}
              height={400}
              className="rounded-lg w-full aspect-[4/5]"
            />
            <p className="mt-2 text-body-sm font-semibold leading-snug line-clamp-2 text-content-primary">
              {item.title}
            </p>
            <ArticleMeta
              className="mt-0.5"
              publisher={item.publisher}
              elapsed={item.elapsed}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
