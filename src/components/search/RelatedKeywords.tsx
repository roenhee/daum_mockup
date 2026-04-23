import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/cn';

interface RelatedKeywordsProps {
  query: string;
  keywords: string[];
}

export function RelatedKeywords({ query, keywords }: RelatedKeywordsProps) {
  const [expanded, setExpanded] = useState(false);

  const stripped = keywords
    .map((k) => k.replace(query, '').trim())
    .filter((k) => k.length > 0);

  if (stripped.length === 0) return null;

  return (
    <section className="bg-white px-4 py-3 border-b border-gray-100">
      <div className="flex items-start gap-2">
        <span className="shrink-0 mt-0.5 text-[13px] font-bold text-gray-900">관련</span>
        <p
          className={cn(
            'flex-1 min-w-0 text-[14px] leading-7 text-gray-700',
            !expanded && 'line-clamp-2',
          )}
        >
          {stripped.map((k, i) => (
            <span key={k}>
              {i > 0 ? <span className="mx-2 text-gray-300">·</span> : null}
              <button type="button" className="text-gray-700">
                {k}
              </button>
            </span>
          ))}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? '접기' : '펼치기'}
          className="shrink-0 mt-1 text-gray-400"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </section>
  );
}
