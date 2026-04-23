import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchInputScreen } from '@/components/search/SearchInputScreen';
import { SearchTabBar } from '@/components/search/SearchTabBar';
import { RelatedKeywords } from '@/components/search/RelatedKeywords';
import { AiSummarySection } from '@/components/search/AiSummarySection';
import { SiteFooter } from '@/components/layout/SiteFooter';
import {
  PowerlinkSection,
  NewsSection,
  EncyclopediaSection,
  CafeSection,
  BlogSection,
  ShoppingSection,
  WebDocSection,
  ImageSection,
  VideoSection,
} from '@/components/search/ResultSections';
import { ShortsSection } from '@/components/home/ShortsSection';
import { RealtimeTrendStrip } from '@/components/search/RealtimeTrendStrip';
import { ScrollIndicator } from '@/components/layout/ScrollIndicator';
import { UrlTopBar } from '@/components/layout/UrlTopBar';
import { InAppBrowserBar } from '@/components/layout/InAppBrowserBar';
import {
  RECENT_KEYWORDS,
  SEARCH_TABS,
  SUGGESTED_KEYWORDS,
} from '@/mocks/searchResult';
import { REALTIME_TRENDS } from '@/mocks/trends';
import { HOME_SHORTS } from '@/mocks/shorts';

function Gap() {
  return <div className="h-1 bg-gray-100 shrink-0" aria-hidden />;
}

export function SearchPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [query, setQuery] = useState<string | null>(null);
  const [tab, setTab] = useState('all');
  const mainRef = useRef<HTMLElement>(null);

  const submit = (keyword?: string) => {
    const k = (keyword ?? value).trim();
    if (!k) return;
    setValue(k);
    setQuery(k);
  };

  const showUrlBar = query !== null;

  return (
    <div className="flex flex-col h-full bg-white">
      {showUrlBar ? (
        <UrlTopBar url={`search.daum.net/?q=${query!.replace(/ /g, '+')}`} />
      ) : null}
      <SearchBar
        value={value}
        onChange={setValue}
        onSubmit={() => submit()}
        autoFocus={query === null}
        showBack={!showUrlBar}
      />

      {query === null ? (
        <SearchInputScreen recent={RECENT_KEYWORDS} onSelect={(k) => submit(k)} />
      ) : (
        <>
          <SearchTabBar tabs={SEARCH_TABS} activeId={tab} onChange={setTab} />
          <div className="flex-1 min-h-0 relative">
            <main
              ref={mainRef}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden no-scrollbar"
            >
              <div className="bg-gray-100 flex flex-col">
                <RealtimeTrendStrip trends={REALTIME_TRENDS} />
                <RelatedKeywords query={query} keywords={SUGGESTED_KEYWORDS} />
                <Gap />
                <AiSummarySection query={query} />
                <Gap />
                <PowerlinkSection />
                <Gap />
                <NewsSection query={query} />
                <Gap />
                <EncyclopediaSection query={query} />
                <Gap />
                <CafeSection query={query} />
                <Gap />
                <BlogSection query={query} />
                <Gap />
                <ShoppingSection />
                <Gap />
                <WebDocSection query={query} />
                <Gap />
                <ImageSection />
                <Gap />
                <VideoSection />
                <Gap />
                <ShortsSection
                  items={HOME_SHORTS}
                  title="다음 루프"
                  moreLabel="루프 더보기"
                />
                <Gap />
                <SiteFooter />
              </div>
            </main>
            <ScrollIndicator targetRef={mainRef} />
          </div>
          <InAppBrowserBar onHome={() => navigate('/')} />
        </>
      )}
    </div>
  );
}
