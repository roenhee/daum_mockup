import type { CommunityPost } from '@/types';
import { SectionHeader, SectionMoreButton } from '@/components/ui/SectionHeader';
import { MessageCircle } from 'lucide-react';

interface CommunitySectionProps {
  title: string;
  posts: CommunityPost[];
  showCategory?: boolean;
  moreLabel?: string;
  timestamp?: string;
}

export function CommunitySection({
  title,
  posts,
  showCategory = true,
  moreLabel = '커뮤니티 더보기',
  timestamp,
}: CommunitySectionProps) {
  return (
    <section className="bg-white">
      <SectionHeader title={title} right={timestamp} />
      <ul className="divide-y divide-gray-100">
        {posts.map((p) => (
          <li key={p.id} className="px-4 py-3">
            <div className="flex items-center gap-2 text-[12px] text-gray-500">
              <img
                src={p.author.avatarUrl}
                alt=""
                className="w-5 h-5 rounded-full object-cover bg-gray-100"
                loading="lazy"
              />
              {showCategory && p.category ? (
                <span className="text-[11px] font-semibold text-gray-700">
                  {p.category}
                </span>
              ) : null}
              <span className="truncate">{p.author.name}</span>
              <span className="shrink-0">· {p.createdAt}</span>
            </div>
            <p className="mt-1.5 text-[14px] leading-snug line-clamp-2 text-gray-900">
              {p.content}
            </p>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-500">
              <MessageCircle size={12} />
              <span>{p.comments}</span>
            </div>
          </li>
        ))}
      </ul>
      <SectionMoreButton label={moreLabel} />
    </section>
  );
}
