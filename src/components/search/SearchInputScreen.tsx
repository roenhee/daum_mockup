import { Clock, X } from 'lucide-react';
import type { RecentKeyword } from '@/mocks/searchResult';

interface SearchInputScreenProps {
  recent: RecentKeyword[];
  onSelect: (keyword: string) => void;
}

export function SearchInputScreen({ recent, onSelect }: SearchInputScreenProps) {
  return (
    <section className="flex-1 bg-white">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-gray-900">최근 검색어</span>
        <button type="button" className="text-[12px] text-gray-400">전체 삭제</button>
      </div>
      <ul className="px-2">
        {recent.map((r) => (
          <li
            key={r.id}
            className="flex items-center gap-2 px-2 py-2.5 text-[14px]"
          >
            <Clock size={16} className="text-gray-400 shrink-0" />
            <button
              type="button"
              onClick={() => onSelect(r.keyword)}
              className="flex-1 text-left truncate text-gray-900"
            >
              {r.keyword}
            </button>
            <span className="text-[11px] text-gray-400 shrink-0">{r.date}</span>
            <button aria-label="삭제" className="p-1 text-gray-400">
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-2 px-4 py-3 border-t border-gray-100 flex items-center gap-4 text-[12px] text-gray-500">
        <button type="button">최근 검색어 끄기</button>
        <span className="text-gray-300">|</span>
        <button type="button">전체 삭제</button>
        <button type="button" className="ml-auto">닫기</button>
      </div>
    </section>
  );
}
