import type { ContentArticle } from '@/types';

interface TextArticleListProps {
  articles: ContentArticle[];
}

export function TextArticleList({ articles }: TextArticleListProps) {
  return (
    <section className="bg-white border-b border-content-divider">
      <ul className="divide-y divide-content-divider px-4">
        {articles.map((a) => (
          <li key={a.id} className="py-3">
            <p className="text-body leading-snug line-clamp-1 text-content-primary">
              {a.title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
