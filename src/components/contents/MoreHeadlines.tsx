import type { Headline } from '@/mocks/contentsNews';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TextHeadlineList } from '@/components/ui/TextHeadlineList';

interface MoreHeadlinesProps {
  title: string;
  headlines: Headline[];
  timestamp?: string;
}

export function MoreHeadlines({ title, headlines, timestamp }: MoreHeadlinesProps) {
  return (
    <section className="bg-white">
      <SectionHeader title={title} right={timestamp} />
      <TextHeadlineList items={headlines} />
    </section>
  );
}
