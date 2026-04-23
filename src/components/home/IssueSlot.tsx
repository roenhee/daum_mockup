import { Link } from 'react-router-dom';
import type { NewsArticle } from '@/types';

interface IssueSlotProps {
  issues: NewsArticle[];
}

export function IssueSlot({ issues }: IssueSlotProps) {
  return (
    <section className="px-4 py-2 bg-white">
      <ul className="divide-y divide-gray-100">
        {issues.slice(0, 4).map((n, i) => (
          <li key={n.id}>
            <Link
              to={`/news/${n.id}`}
              className="flex items-center gap-2 py-2.5 text-[14px] leading-snug"
            >
              {i === 0 ? (
                <span className="text-[11px] font-bold text-daum-red shrink-0">속보</span>
              ) : null}
              <span className="flex-1 truncate text-gray-900">{n.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
