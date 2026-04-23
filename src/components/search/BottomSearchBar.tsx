import { Mic } from 'lucide-react';
import { asset } from '@/lib/asset';

interface BottomSearchBarProps {
  onFocus?: () => void;
}

export function BottomSearchBar({ onFocus }: BottomSearchBarProps) {
  return (
    <div className="shrink-0 bg-white border-t border-gray-100 px-3 py-2.5">
      <button
        type="button"
        onClick={onFocus}
        className="w-full h-10 flex items-center gap-2 bg-gray-100 rounded-full px-4 text-left"
      >
        <img src={asset('/icons/daum-d.svg')} alt="Daum" width={20} height={20} />
        <span className="flex-1 text-[13px] text-gray-500">다른 검색어를 입력하세요</span>
        <Mic size={18} className="text-gray-500" />
      </button>
    </div>
  );
}
