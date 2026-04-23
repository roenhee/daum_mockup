import type { ContentArticle } from '@/types';
import { TextList, TextListItem } from '@/components/ui/patterns';

interface TextArticleListProps {
  articles: ContentArticle[];
}

export function TextArticleList({ articles }: TextArticleListProps) {
  return (
    <section className="bg-white border-b border-content-divider">
      <TextList className="divide-content-divider">
        {articles.map((a) => (
          <TextListItem key={a.id}>{a.title}</TextListItem>
        ))}
      </TextList>
    </section>
  );
}
