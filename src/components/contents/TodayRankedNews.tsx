import { Thumbnail } from '@/components/ui/Thumbnail';
import type { RankedPhotoNews } from '@/mocks/entertain';

interface TodayRankedNewsProps {
  title?: string;
  items: RankedPhotoNews[];
  timestamp?: string;
}

export function TodayRankedNews({
  title = '오늘의 뉴스',
  items,
  timestamp,
}: TodayRankedNewsProps) {
  return (
    <section className="bg-white border-b border-content-divider">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="text-body font-bold text-content-primary">{title}</h2>
          {timestamp ? (
            <span className="text-meta text-content-muted">{timestamp}</span>
          ) : null}
        </div>
        <button type="button" className="text-caption text-content-secondary">
          전체 &gt;
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-4 px-4 pb-4">
        {items.map((item) => (
          <li key={item.rank}>
            <div className="relative">
              <Thumbnail
                url={item.imageUrl}
                seed={item.imageSeed}
                topic="korean,kpop,idol"
                className="rounded-md w-full aspect-[4/3]"
              />
              <span className="absolute top-1 left-1 w-5 h-5 rounded bg-black/70 text-white text-meta font-bold tabular-nums inline-flex items-center justify-center">
                {item.rank}
              </span>
            </div>
            <p className="mt-1.5 text-caption font-semibold leading-snug line-clamp-2 text-content-primary">
              {item.title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
