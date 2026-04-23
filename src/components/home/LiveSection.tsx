import type { LiveContent } from '@/types';
import { LiveBadge } from '@/components/ui/LiveBadge';
import { SectionHeader, MoreLink } from '@/components/ui/SectionHeader';

interface LiveSectionProps {
  items: LiveContent[];
}

export function LiveSection({ items }: LiveSectionProps) {
  return (
    <section className="bg-white border-b border-gray-100">
      <SectionHeader title="실시간 라이브" right={<MoreLink label="라이브 더보기" />} />
      <div className="overflow-x-auto no-scrollbar">
        <ul className="flex gap-3 px-4 pb-4 min-w-max">
          {items.map((item) => (
            <li key={item.id} className="w-[240px] shrink-0">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  className="w-full aspect-video object-cover bg-gray-100"
                  loading="lazy"
                />
                <LiveBadge className="absolute top-2 left-2" />
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                  {formatViewers(item.viewerCount)} 시청
                </span>
              </div>
              <p className="mt-2 text-[13px] font-medium leading-snug line-clamp-2">
                {item.title}
              </p>
              <p className="mt-0.5 text-[11px] text-gray-500">{item.channelName}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function formatViewers(n: number) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천`;
  return n.toString();
}
