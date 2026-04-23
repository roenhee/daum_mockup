import { useState } from 'react';
import { RefreshCw, SlidersHorizontal } from 'lucide-react';
import type { Headline } from '@/mocks/contentsNews';
import { TextHeadlineList } from '@/components/ui/TextHeadlineList';

interface MajorHeadlinesProps {
  headlines: Headline[];
  totalPages?: number;
}

export function MajorHeadlines({ headlines, totalPages = 8 }: MajorHeadlinesProps) {
  const [page, setPage] = useState(1);

  return (
    <section className="bg-white">
      <TextHeadlineList items={headlines} />
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <button
          type="button"
          onClick={() => setPage((p) => (p % totalPages) + 1)}
          className="flex-1 h-10 rounded-lg border border-gray-200 bg-white inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-gray-700"
        >
          <RefreshCw size={14} className="text-gray-500" />
          새로운 주요 뉴스 {page}/{totalPages}
        </button>
        <button
          type="button"
          aria-label="필터"
          className="h-10 w-10 rounded-lg border border-gray-200 bg-white inline-flex items-center justify-center text-gray-700"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </section>
  );
}
