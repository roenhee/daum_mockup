import { Link } from 'react-router-dom';
import type { Headline } from '@/mocks/contentsNews';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface RecommendNewsListProps {
  headlines: Headline[];
  timestamp?: string;
}

export function RecommendNewsList({ headlines, timestamp }: RecommendNewsListProps) {
  return (
    <section className="bg-white">
      <SectionHeader title="이 시각 추천뉴스" right={timestamp} />
      <ul className="divide-y divide-gray-100 px-4 pb-2">
        {headlines.map((h) => (
          <li key={h.id}>
            <Link to={`/news/${h.id}`} className="flex flex-col py-2.5">
              <p className="text-[14px] leading-snug font-medium line-clamp-1 text-gray-900">
                {h.title}
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                {h.publisher} · {h.publishedAt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
