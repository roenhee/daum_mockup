import type { LiveContent } from '@/types';
import { LiveBadge } from '@/components/ui/LiveBadge';
import { SectionHeader, SectionMoreButton } from '@/components/ui/SectionHeader';
import { asset } from '@/lib/asset';

interface PublisherLiveSectionProps {
  publisherName: string;
  item: LiveContent;
}

export function PublisherLiveSection({ publisherName, item }: PublisherLiveSectionProps) {
  return (
    <section className="bg-white">
      <SectionHeader title={`구독한 ${publisherName} 라이브`} />
      <div className="px-4 pb-3">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={asset(item.thumbnailUrl)}
            alt=""
            className="w-full aspect-video object-cover bg-gray-100"
            loading="lazy"
          />
          <LiveBadge className="absolute top-2 left-2" />
          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
            {formatViewers(item.viewerCount)} 시청
          </span>
        </div>
        <p className="mt-2 text-[14px] font-semibold leading-snug line-clamp-2">
          {item.title}
        </p>
        <p className="mt-1 text-[11px] text-gray-500">
          {item.channelName} · {formatViewers(item.viewerCount)} 시청 중
        </p>
      </div>
      <SectionMoreButton label="라이브 더보기" />
    </section>
  );
}

function formatViewers(n: number) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천`;
  return n.toString();
}
