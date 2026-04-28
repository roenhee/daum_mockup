import { Fragment, useState } from 'react';
import { Check } from 'lucide-react';
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

type FeedItem = (typeof MAI_NEWS_FEED)[number];
type Group =
  | { mode: 'stream'; items: FeedItem[] }
  | { mode: 'card'; item: FeedItem };

function groupItems(items: FeedItem[]): Group[] {
  const groups: Group[] = [];
  for (const item of items) {
    if (ARTICLE_KINDS.has(item.kind)) {
      const last = groups[groups.length - 1];
      if (last && last.mode === 'stream') {
        last.items.push(item);
        continue;
      }
      groups.push({ mode: 'stream', items: [item] });
    } else {
      groups.push({ mode: 'card', item });
    }
  }
  return groups;
}

export function MaiNewsFeed() {
  const groups = groupItems(MAI_NEWS_FEED);
  const [overrides, setOverrides] = useState<Map<number, boolean>>(new Map());
  const isRead = (idx: number) => overrides.get(idx) ?? idx >= 5;
  const toggleRead = (idx: number) => {
    setOverrides((prev) => {
      const next = new Map(prev);
      next.set(idx, !isRead(idx));
      return next;
    });
  };

  let itemIdx = 0;
  return (
    <div className="bg-white">
      {groups.map((g, gi) => {
        const showSeparator = gi > 0;
        if (g.mode === 'stream') {
          return (
            <Fragment key={gi}>
              {showSeparator ? <SlotSeparator /> : null}
              <section>
                {g.items.map((item, ii) => {
                  const idx = itemIdx++;
                  return (
                    <Fragment key={ii}>
                      <div className="relative">
                        <SlotStatus
                          read={isRead(idx)}
                          onToggle={() => toggleRead(idx)}
                        />
                        {renderItem(item)}
                      </div>
                      {ii < g.items.length - 1 ? (
                        <div className="h-px bg-gray-100 mx-4" />
                      ) : null}
                    </Fragment>
                  );
                })}
              </section>
            </Fragment>
          );
        }
        const idx = itemIdx++;
        return (
          <Fragment key={gi}>
            {showSeparator ? <SlotSeparator /> : null}
            <div className="relative px-3 py-3">
              <SlotStatus
                read={isRead(idx)}
                inset
                onToggle={() => toggleRead(idx)}
              />
              {renderItem(g.item)}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

function SlotSeparator() {
  return (
    <div className="px-4 py-1" aria-hidden>
      <div className="h-px bg-gray-100" />
    </div>
  );
}

function SlotStatus({
  read,
  inset = false,
  onToggle,
}: {
  read: boolean;
  inset?: boolean;
  onToggle?: () => void;
}) {
  const position = inset ? 'top-5 right-5' : 'top-3 right-4';
  return (
    <button
      type="button"
      aria-label={read ? '읽음 — 눌러서 새 소식으로' : '새 소식 — 눌러서 읽음 표시'}
      aria-pressed={read}
      onClick={(e) => {
        e.stopPropagation();
        onToggle?.();
      }}
      className={`absolute ${position} z-10 inline-flex items-center justify-center w-5 h-5 rounded-full active:bg-gray-100`}
    >
      {read ? (
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-100 text-gray-400">
          <Check size={10} strokeWidth={3} />
        </span>
      ) : (
        <span className="relative inline-flex w-2.5 h-2.5">
          <span className="absolute inset-0 rounded-full bg-daum-red opacity-50 animate-ping" />
          <span className="relative w-2.5 h-2.5 rounded-full bg-daum-red" />
        </span>
      )}
    </button>
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
