import type { Headline } from '@/mocks/contentsNews';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TextList, TextListItem } from '@/components/ui/patterns';

interface MoreHeadlinesProps {
  title: string;
  headlines: Headline[];
  timestamp?: string;
}

export function MoreHeadlines({ title, headlines, timestamp }: MoreHeadlinesProps) {
  return (
    <section className="bg-white">
      <SectionHeader title={title} right={timestamp} />
      <TextList>
        {headlines.map((it) => (
          <TextListItem key={it.id} to={`/news/${it.id}`} className="font-medium">
            {it.title}
          </TextListItem>
        ))}
      </TextList>
    </section>
  );
}
