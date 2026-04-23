import { ChevronRight, Play, Star } from 'lucide-react';
import {
  SHORTCUT,
  POWERLINK,
  SEARCH_NEWS,
  CAFE_POSTS,
  BLOG_POSTS,
  WEB_DOCS,
  IMAGE_RESULTS,
  VIDEO_RESULTS,
  ENCYCLOPEDIA,
  SHOPPING,
  type SearchNewsItem,
  type CafeBlogItem,
} from '@/mocks/searchResult';
import { SectionMoreButton } from '@/components/ui/SectionHeader';

interface QueryHighlightProps {
  text: string;
  query: string;
}

function QueryHighlight({ text, query }: QueryHighlightProps) {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'gi'));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="text-daum-blue">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function SectionTitle({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="px-4 pt-4 pb-2 flex items-center justify-between">
      <h2 className="text-[14px] font-bold text-gray-900">{title}</h2>
      {right}
    </div>
  );
}

export function ShortcutSection() {
  return (
    <section className="bg-white border-b border-gray-100">
      <SectionTitle title="바로가기" />
      <div className="mx-4 mb-3 p-3 border border-gray-200 rounded-xl flex items-center gap-3">
        <img
          src={SHORTCUT.icon}
          alt=""
          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-gray-900">
            {SHORTCUT.title}
          </p>
          <p className="mt-0.5 text-[12px] text-daum-red font-semibold">
            {SHORTCUT.subtitle}
          </p>
          <p className="mt-0.5 text-[11px] text-gray-400 truncate">{SHORTCUT.url}</p>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </section>
  );
}

export function PowerlinkSection() {
  return (
    <section className="bg-white border-b border-gray-100">
      <SectionTitle
        title="파워링크"
        right={<span className="text-[11px] text-gray-400">관련 광고</span>}
      />
      <ul className="divide-y divide-gray-100 px-4">
        {POWERLINK.map((p) => (
          <li key={p.id} className="py-3">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <span className="font-semibold text-gray-700">{p.advertiser}</span>
              <span className="text-gray-300">·</span>
              <span className="truncate">{p.url}</span>
              <span className="ml-auto text-[10px] font-semibold bg-gray-100 px-1 py-0.5 rounded">
                AD
              </span>
            </div>
            <div className="mt-1 flex gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-gray-900 line-clamp-1">
                  {p.title}
                </p>
                <p className="mt-1 text-[12px] text-gray-500 line-clamp-2 leading-snug">
                  {p.description}
                </p>
              </div>
              <img
                src={p.thumbnailUrl}
                alt=""
                className="shrink-0 w-[72px] h-[72px] rounded-md object-cover bg-gray-100"
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NewsSection({ query }: { query: string }) {
  return (
    <section className="bg-white border-b border-gray-100">
      <SectionTitle
        title="뉴스"
        right={
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <span className="font-semibold text-gray-900">정확도순</span>
            <span>최신순</span>
          </div>
        }
      />
      <ul className="divide-y divide-gray-100 px-4">
        {SEARCH_NEWS.map((n) => (
          <NewsRow key={n.id} item={n} query={query} />
        ))}
      </ul>
      <SectionMoreButton label="뉴스 더보기" />
    </section>
  );
}

function NewsRow({ item, query }: { item: SearchNewsItem; query: string }) {
  return (
    <li className="py-3">
      <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
        <img
          src={item.publisherLogo}
          alt=""
          className="w-4 h-4 rounded-full object-cover bg-gray-100"
        />
        <span className="font-medium text-gray-700">{item.publisher}</span>
        <span className="ml-auto">{item.publishedAt}</span>
      </div>
      <div className="mt-1.5 flex gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold leading-snug line-clamp-2 text-gray-900">
            <QueryHighlight text={item.title} query={query} />
          </p>
          <p className="mt-1 text-[12px] text-gray-500 line-clamp-2 leading-snug">
            <QueryHighlight text={item.summary} query={query} />
          </p>
        </div>
        <img
          src={item.thumbnailUrl}
          alt=""
          className="shrink-0 w-[72px] h-[72px] rounded-md object-cover bg-gray-100"
          loading="lazy"
        />
      </div>
    </li>
  );
}

export function CafeSection({ query }: { query: string }) {
  return <CafeBlogSection title="카페글" items={CAFE_POSTS} moreLabel="카페글 검색 더보기" query={query} />;
}

export function BlogSection({ query }: { query: string }) {
  return <CafeBlogSection title="블로그" items={BLOG_POSTS} moreLabel="블로그 검색 더보기" query={query} />;
}

function CafeBlogSection({
  title,
  items,
  moreLabel,
  query,
}: {
  title: string;
  items: CafeBlogItem[];
  moreLabel: string;
  query: string;
}) {
  return (
    <section className="bg-white border-b border-gray-100">
      <SectionTitle title={title} />
      <ul className="divide-y divide-gray-100 px-4">
        {items.map((it) => (
          <li key={it.id} className="py-3">
            <p className="text-[11px] text-gray-500">{it.source}</p>
            <div className="mt-1 flex gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold leading-snug line-clamp-2 text-gray-900">
                  <QueryHighlight text={it.title} query={query} />
                </p>
                <p className="mt-1 text-[12px] text-gray-500 line-clamp-2 leading-snug">
                  {it.summary}
                </p>
                <p className="mt-1 text-[11px] text-gray-400">{it.publishedAt}</p>
              </div>
              {it.thumbnailUrl ? (
                <img
                  src={it.thumbnailUrl}
                  alt=""
                  className="shrink-0 w-[72px] h-[72px] rounded-md object-cover bg-gray-100"
                  loading="lazy"
                />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <SectionMoreButton label={moreLabel} />
    </section>
  );
}

export function WebDocSection({ query }: { query: string }) {
  return (
    <section className="bg-white border-b border-gray-100">
      <SectionTitle title="웹문서" />
      <ul className="divide-y divide-gray-100 px-4">
        {WEB_DOCS.map((d) => (
          <li key={d.id} className="py-3">
            <p className="text-[11px] text-gray-500 truncate">{d.url}</p>
            <p className="mt-1 text-[14px] font-semibold leading-snug line-clamp-2 text-gray-900">
              <QueryHighlight text={d.title} query={query} />
            </p>
            <p className="mt-1 text-[12px] text-gray-500 line-clamp-2 leading-snug">
              {d.summary}
            </p>
            <p className="mt-1 text-[11px] text-gray-400">{d.date}</p>
          </li>
        ))}
      </ul>
      <SectionMoreButton label="웹문서 검색 더보기" />
    </section>
  );
}

export function ImageSection() {
  return (
    <section className="bg-white border-b border-gray-100">
      <SectionTitle title="이미지" />
      <div className="grid grid-cols-3 gap-1 px-4 pb-3">
        {IMAGE_RESULTS.map((im) => (
          <div key={im.id} className="aspect-square overflow-hidden rounded-md bg-gray-100">
            <img
              src={im.url}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <SectionMoreButton label="이미지 더보기" />
    </section>
  );
}

export function EncyclopediaSection({ query }: { query: string }) {
  const enc = ENCYCLOPEDIA;
  return (
    <section className="bg-white border-b border-gray-100">
      <SectionTitle title="백과사전" />
      <div className="px-4 pb-4 flex gap-3">
        {enc.imageUrl ? (
          <img
            src={enc.imageUrl}
            alt=""
            className="shrink-0 w-[88px] h-[116px] rounded-md object-cover bg-gray-100"
            loading="lazy"
          />
        ) : null}
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-gray-900">
            <QueryHighlight text={enc.term} query={query} />
            <span className="ml-1 text-[12px] font-normal text-gray-500">
              ({enc.category})
            </span>
          </p>
          <p className="mt-1 text-[12px] leading-snug text-gray-700 line-clamp-4">
            {enc.summary}
          </p>
          <p className="mt-1.5 text-[11px] text-gray-400">출처 · {enc.source}</p>
        </div>
      </div>
    </section>
  );
}

export function ShoppingSection() {
  return (
    <section className="bg-white border-b border-gray-100">
      <SectionTitle
        title="쇼핑"
        right={<span className="text-[11px] text-gray-400">제휴</span>}
      />
      <ul className="grid grid-cols-2 gap-x-3 gap-y-4 px-4 pb-3">
        {SHOPPING.map((p) => (
          <li key={p.id}>
            <div className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
              <img
                src={p.thumbnailUrl}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {p.ad ? (
                <span className="absolute top-1 left-1 text-[10px] font-semibold bg-black/60 text-white px-1 rounded">
                  AD
                </span>
              ) : null}
            </div>
            <p className="mt-1.5 text-[12px] leading-snug line-clamp-2 text-gray-900">
              {p.title}
            </p>
            <div className="mt-0.5 flex items-baseline gap-1">
              {p.discountPct ? (
                <span className="text-[13px] font-bold text-daum-red">
                  {p.discountPct}%
                </span>
              ) : null}
              <span className="text-[13px] font-bold text-gray-900">
                {p.price.toLocaleString()}원
              </span>
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500">
              <span className="truncate">{p.shop}</span>
              <span className="text-gray-300">·</span>
              <Star size={10} className="text-daum-yellow fill-current" />
              <span>{p.rating.toFixed(1)}</span>
              <span className="text-gray-400">({p.reviews})</span>
            </div>
          </li>
        ))}
      </ul>
      <SectionMoreButton label="쇼핑 더보기" />
    </section>
  );
}

export function VideoSection() {
  return (
    <section className="bg-white border-b border-gray-100">
      <SectionTitle title="동영상" />
      <ul className="grid grid-cols-2 gap-3 px-4 pb-3">
        {VIDEO_RESULTS.map((v) => (
          <li key={v.id}>
            <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-900">
              <img
                src={v.thumbnailUrl}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-8 h-8 rounded-full bg-black/50 text-white inline-flex items-center justify-center">
                  <Play size={14} fill="currentColor" />
                </span>
              </div>
              <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] font-medium px-1 rounded">
                {v.duration}
              </span>
            </div>
            <p className="mt-1.5 text-[12px] font-medium leading-snug line-clamp-2 text-gray-900">
              {v.title}
            </p>
            <p className="mt-0.5 text-[11px] text-gray-500 truncate">
              {v.platform} · {v.channel}
            </p>
            <p className="text-[11px] text-gray-400">{v.uploadedAt}</p>
          </li>
        ))}
      </ul>
      <SectionMoreButton label="동영상 더보기" />
    </section>
  );
}
