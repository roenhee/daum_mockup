import { Thumbnail } from '@/components/ui/Thumbnail';
import { ArticleMeta } from '@/components/ui/ArticleMeta';
import type { ContentArticle } from '@/types';

interface MainHeadlineCardProps {
  article: ContentArticle;
  topic?: string;
}

export function MainHeadlineCard({ article, topic = 'sport,stadium,action' }: MainHeadlineCardProps) {
  return (
    <section className="bg-white border-b border-content-divider">
      <article className="px-4 pt-4 pb-4">
        <Thumbnail
          url={article.thumbnailUrl}
          seed={article.thumbnailSeed}
          topic={topic}
          width={800}
          height={450}
          className="rounded-xl w-full aspect-[16/9]"
        />
        <h2 className="mt-3 text-heading font-bold leading-snug text-content-primary line-clamp-2">
          {article.title}
        </h2>
        {article.summary ? (
          <p className="mt-1.5 text-body-sm text-content-secondary leading-snug line-clamp-2">
            {article.summary}
          </p>
        ) : null}
        <ArticleMeta
          className="mt-2"
          size="md"
          showLogo
          publisher={article.publisher}
          publisherLogoSeed={article.publisherLogoSeed}
          elapsed={article.elapsed}
          commentCount={article.commentCount}
        />
      </article>
    </section>
  );
}
