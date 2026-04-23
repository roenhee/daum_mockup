import { Thumbnail } from '@/components/ui/Thumbnail';
import { ArticleMeta } from '@/components/ui/ArticleMeta';
import { ThumbRow } from '@/components/ui/patterns';
import type { ContentArticle } from '@/types';

interface HeadlineListProps {
  title?: string;
  articles: ContentArticle[];
  topic?: string;
}

export function HeadlineList({ title, articles, topic = 'sport,action' }: HeadlineListProps) {
  return (
    <section className="bg-white">
      {title ? (
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-body font-bold text-content-primary">{title}</h2>
        </div>
      ) : null}
      {articles.map((a) => (
        <ThumbRow
          key={a.id}
          to={`/news/${a.id}`}
          thumbnail={
            <Thumbnail
              url={a.thumbnailUrl}
              seed={a.thumbnailSeed}
              topic={topic}
              width={200}
              height={200}
              className="w-full h-full"
            />
          }
        >
          <div className="h-full flex flex-col justify-between">
            <h3 className="text-[14px] leading-snug font-semibold line-clamp-2 text-gray-900">
              {a.title}
            </h3>
            <ArticleMeta publisher={a.publisher} elapsed={a.elapsed} />
          </div>
        </ThumbRow>
      ))}
    </section>
  );
}
