import type { RecommendHeadline } from '@/mocks/newsDetail';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TextHeadlineList } from '@/components/ui/TextHeadlineList';

interface RecommendHeadlineSectionProps {
  headlines: RecommendHeadline[];
  timestamp?: string;
}

export function RecommendHeadlineSection({
  headlines,
  timestamp,
}: RecommendHeadlineSectionProps) {
  return (
    <section className="bg-white">
      <SectionHeader title="이 시각 추천뉴스" right={timestamp} />
      <TextHeadlineList items={headlines} />
    </section>
  );
}
