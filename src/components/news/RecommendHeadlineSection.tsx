import type { RecommendHeadline } from '@/mocks/newsDetail';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TextList, TextListItem } from '@/components/ui/patterns';

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
