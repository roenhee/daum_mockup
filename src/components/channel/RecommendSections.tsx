import { Link } from 'react-router-dom';
import type { RecommendCard } from '@/mocks/channelView';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface PersonalizedRecommendProps {
  items: RecommendCard[];
}

export function PersonalizedRecommend({ items }: PersonalizedRecommendProps) {
  return (
    <section className="bg-white">
      <SectionHeader title="이런 콘텐츠는 어때요?" />
      <ul className="divide-y divide-gray-100 px-4">
        {items.map((it) => (
          <li key={it.id}>
            <Link to={`/channel/${it.id}`} className="flex gap-3 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-[14px] leading-snug font-medium line-clamp-2 text-gray-900">
                  {it.title}
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  {it.source}
                  {it.meta ? (
                    <>
                      <span className="mx-1 text-gray-300">·</span>
                      <span>{it.meta}</span>
                    </>
                  ) : null}
                </p>
              </div>
              <img
                src={it.thumbnailUrl}
                alt=""
                className="shrink-0 w-[72px] h-[72px] rounded-md object-cover bg-gray-100"
                loading="lazy"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface PopularContentProps {
  item: RecommendCard;
}

export function PopularContent({ item }: PopularContentProps) {
  return (
    <section className="bg-white">
      <SectionHeader title="많은 관심을 받고 있는" />
      <Link
        to={`/channel/${item.id}`}
        className="block relative mx-4 mb-4 rounded-xl overflow-hidden aspect-[4/5]"
      >
        <img
          src={item.thumbnailUrl}
          alt=""
          className="w-full h-full object-cover bg-gray-200"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-[17px] font-bold leading-snug line-clamp-3">
            {item.title}
          </p>
          <p className="mt-2 text-[11px] opacity-85">
            {item.source}
            {item.meta ? (
              <>
                <span className="mx-1">·</span>
                <span>{item.meta}</span>
              </>
            ) : null}
          </p>
        </div>
      </Link>
    </section>
  );
}
