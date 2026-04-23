import { Link } from 'react-router-dom';
import type { NewsArticle } from '@/types';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface InterestArticlesProps {
  articles: NewsArticle[];
}

export function InterestArticles({ articles }: InterestArticlesProps) {
  return (
    <section className="bg-white">
      <SectionHeader title="관심 있을 만한 기사" />
      <ul className="divide-y divide-gray-100 px-4">
        {articles.map((a) => (
          <li key={a.id}>
            <Link to={`/news/${a.id}`} className="flex gap-3 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-[14px] leading-snug font-medium line-clamp-2 text-gray-900">
                  {a.title}
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  {a.publisher} · {a.publishedAt}
                </p>
              </div>
              <img
                src={a.thumbnailUrl}
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
