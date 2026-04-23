import { Thumbnail } from '@/components/ui/Thumbnail';
import { ArticleMeta } from '@/components/ui/ArticleMeta';
import type { ContentArticle } from '@/types';

interface NewsGridProps {
  title?: string;
  articles: ContentArticle[];
  topic?: string;
}

export function NewsGrid({ title, articles, topic = 'sport,action' }: NewsGridProps) {
  return (
    <section className="bg-white border-b border-content-divider">
      {title ? (
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-body font-bold text-content-primary">{title}</h2>
        </div>
      ) : null}
      <ul className="grid grid-cols-2 gap-x-3 gap-y-4 px-4 pt-2 pb-4">
        {articles.map((a) => (
          <li key={a.id}>
            <Thumbnail
              url={a.thumbnailUrl}
              seed={a.thumbnailSeed}
              topic={topic}
              width={320}
              height={240}
              className="rounded-lg w-full aspect-[4/3]"
            />
            <p className="mt-2 text-body-sm font-semibold leading-snug line-clamp-2 text-content-primary">
              {a.title}
            </p>
            <ArticleMeta
              className="mt-1"
              publisher={a.publisher}
              elapsed={a.elapsed}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
