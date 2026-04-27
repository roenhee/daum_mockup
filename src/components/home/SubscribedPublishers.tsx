import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import type { NewsArticle, Publisher } from '@/types';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { asset } from '@/lib/asset';

interface SubscribedPublishersProps {
  publishers: Publisher[];
  featured: NewsArticle;
}

export function SubscribedPublishers({ publishers, featured }: SubscribedPublishersProps) {
  return (
    <section className="bg-white">
      <SectionHeader title="구독한 언론사" />

      <div className="overflow-x-auto no-scrollbar">
        <ul className="flex gap-3 px-4 pb-3 min-w-max items-start">
          {publishers.map((p) => (
            <li key={p.id} className="flex flex-col items-center gap-1.5 w-[58px]">
              <div className="relative">
                <img
                  src={p.logoUrl}
                  alt={p.name}
                  className="w-[52px] h-[52px] rounded-full object-cover bg-gray-100 border border-gray-200"
                  loading="lazy"
                />
              </div>
              <span className="text-[11px] text-gray-700 truncate w-full text-center">
                {p.name}
              </span>
            </li>
          ))}
          <li className="flex flex-col items-center gap-1.5 w-[58px]">
            <button
              type="button"
              aria-label="언론사 추가"
              className="w-[52px] h-[52px] rounded-full border border-dashed border-gray-300 text-gray-400 inline-flex items-center justify-center bg-white"
            >
              <Plus size={22} />
            </button>
            <span className="text-[11px] text-gray-500">추가</span>
          </li>
        </ul>
      </div>

      <Link
        to={`/news/${featured.id}`}
        className="block relative mx-4 mb-4 rounded-xl overflow-hidden aspect-square"
      >
        <img
          src={asset(featured.thumbnailUrl)}
          alt=""
          className="w-full h-full object-cover bg-gray-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full py-0.5 pl-0.5 pr-2.5">
          <span className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={`https://picsum.photos/seed/${featured.publisher}/40/40`}
              alt=""
              className="w-full h-full object-cover"
            />
          </span>
          <span className="text-[11px] font-semibold text-gray-900">
            {featured.publisher}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-[16px] font-bold leading-snug line-clamp-3">
            {featured.title}
          </p>
          <p className="mt-1.5 text-[11px] opacity-80">{featured.publishedAt}</p>
        </div>
      </Link>
    </section>
  );
}
