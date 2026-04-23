import { BizBoard } from '@/components/ui/BizBoard';
import { ShortsSection } from '@/components/home/ShortsSection';
import { ScoreBoardSection } from '@/components/contents/ScoreBoardSection';
import { HeadlineList } from '@/components/contents/HeadlineList';
import { SportsVideosSection } from '@/components/contents/SportsVideosSection';
import { TextArticleList } from '@/components/contents/TextArticleList';
import { SportsSubmenuBar } from '@/components/contents/SportsSubmenuBar';
import { SubtabSections } from '@/components/contents/SubtabSections';
import {
  SPORT_CATEGORIES,
  SPORTS_MATCHES,
  SPORTS_NEWS_GRID,
  SPORTS_HEADLINES,
  SPORTS_VIDEOS,
  SPORTS_TEXT_NEWS,
  SPORTS_BOTTOM_HEADLINES,
  SPORTS_SUBMENU,
  SPORTS_EXTRA_THUMBS,
  SPORTS_EXTRA_TEXTS,
  SPORTS_LOOP_SHORTS,
  SPORTS_FINAL_ARTICLES,
} from '@/mocks/sports';

export function SportsSubtab() {
  return (
    <SubtabSections>
      <BizBoard compact />
      <ScoreBoardSection matches={SPORTS_MATCHES} categories={SPORT_CATEGORIES} />
      <TextArticleList articles={SPORTS_TEXT_NEWS} />
      <HeadlineList articles={SPORTS_NEWS_GRID} />
      <HeadlineList articles={SPORTS_HEADLINES} />
      <SportsSubmenuBar items={SPORTS_SUBMENU} />
      <BizBoard compact />
      <SportsVideosSection videos={SPORTS_VIDEOS} />
      <HeadlineList title="스포츠 헤드라인" articles={SPORTS_BOTTOM_HEADLINES} />
      <HeadlineList articles={SPORTS_EXTRA_THUMBS} />
      <TextArticleList articles={SPORTS_EXTRA_TEXTS} />
      <ShortsSection items={SPORTS_LOOP_SHORTS} title="오늘의 루프" moreLabel="루프 더보기" />
      <HeadlineList articles={SPORTS_FINAL_ARTICLES} />
    </SubtabSections>
  );
}
