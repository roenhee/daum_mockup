import { Fragment } from 'react';
import { MAI_NEWS_FEED } from '@/mocks/maiNews';
import {
  N1ArticleMulti,
  N1ArticleSingle,
  N4KeywordRec,
  N8Followup,
  N9AssetAnomaly,
  N9EnvAnomaly,
  N11IssueSpike,
  N14Trending,
  N17DailyBriefing,
  N18Flash,
  N19LocalPopular,
  N20CohortNewSub,
  N20CohortPopular,
} from './MaiNewsCards';

const ARTICLE_KINDS = new Set(['n1a', 'n1b']);

export function MaiNewsFeed() {
  return (
    <div className="bg-white">
      <div className="px-3 pt-3 pb-2 space-y-2.5">
        {MAI_NEWS_FEED.slice(0, 2).map((item, i) => (
          <Fragment key={`top-${i}`}>{renderItem(item)}</Fragment>
        ))}
      </div>
      <div className="border-t border-gray-100">
        {MAI_NEWS_FEED.slice(2).map((item, i) => {
          const isArticle = ARTICLE_KINDS.has(item.kind);
          if (isArticle) {
            return (
              <Fragment key={`feed-${i}`}>
                {renderItem(item)}
                <div className="h-px bg-gray-100 mx-4" />
              </Fragment>
            );
          }
          return (
            <div
              key={`feed-${i}`}
              className="px-3 py-3 bg-gray-50/40 border-b border-gray-100"
            >
              {renderItem(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderItem(item: (typeof MAI_NEWS_FEED)[number]) {
  switch (item.kind) {
    case 'n17':
      return <N17DailyBriefing data={item.data} />;
    case 'n11':
      return <N11IssueSpike data={item.data} />;
    case 'n1a':
      return <N1ArticleSingle data={item.data} />;
    case 'n1b':
      return <N1ArticleMulti data={item.data} />;
    case 'n9a':
      return <N9EnvAnomaly data={item.data} />;
    case 'n9b':
      return <N9AssetAnomaly data={item.data} />;
    case 'n18':
      return <N18Flash data={item.data} />;
    case 'n8a':
    case 'n8b':
      return <N8Followup data={item.data} />;
    case 'n4':
      return <N4KeywordRec data={item.data} />;
    case 'n19':
      return <N19LocalPopular data={item.data} />;
    case 'n20a':
      return <N20CohortPopular data={item.data} />;
    case 'n20b':
      return <N20CohortNewSub data={item.data} />;
    case 'n14':
      return <N14Trending data={item.data} />;
  }
}
