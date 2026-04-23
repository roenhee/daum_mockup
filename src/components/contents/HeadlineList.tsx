import { Thumbnail } from '@/components/ui/Thumbnail';
import { ArticleMeta } from '@/components/ui/ArticleMeta';
import type { ContentArticle } from '@/types';

interface HeadlineListProps {
  title?: string;
  articles: ContentArticle[];
  topic?: string;
}

export function HeadlineList({ title, articles, topic = 'sport,action' }: HeadlineListProps) {
  return (
    <section className="bg-white border-b border-content-divider">
      {title ? (
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-body font-bold text-content-primary">{title}</h2>
        </div>
      ) : null}
      <ul className="divide-y divide-content-divider px-4">
        {articles.map((a) => (
          <li key={a.id} className="py-3 flex gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-body font-semibold leading-snug line-clamp-2 text-content-primary">
                {a.title}
              </p>
              <ArticleMeta
                className="mt-1"
                publisher={a.publisher}
                elapsed={a.elapsed}
              />
            </div>
            <Thumbnail
              url={a.thumbnailUrl}
              seed={a.thumbnailSeed}
              topic={topic}
              width={200}
              height={200}
              className="shrink-0 w-[72px] h-[72px] rounded-md"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
