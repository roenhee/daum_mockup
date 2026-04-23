import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X, Mic } from 'lucide-react';
import { asset } from '@/lib/asset';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
  showBack?: boolean;
}

export function SearchBar({ value, onChange, onSubmit, autoFocus, showBack = true }: SearchBarProps) {
  const navigate = useNavigate();

  return (
    <header className="shrink-0 flex items-center gap-2 px-3 pt-4 pb-2 bg-white">
      {showBack ? (
        <button
          aria-label="뒤로"
          onClick={() => navigate(-1)}
          className="p-2 -ml-1 text-gray-700"
        >
          <ChevronLeft size={22} />
        </button>
      ) : null}
      <div className="flex-1 h-10 flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4">
        <img src={asset('/icons/daum-d.svg')} alt="Daum" width={20} height={20} className="shrink-0" />
        <input
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit?.();
          }}
          placeholder="검색어를 입력하세요"
          className="flex-1 min-w-0 bg-transparent text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
        {value ? (
          <button
            aria-label="지우기"
            onClick={() => onChange('')}
            className="text-gray-500"
          >
            <X size={18} />
          </button>
        ) : null}
        <button aria-label="음성 검색" className="text-gray-500 shrink-0">
          <Mic size={18} />
        </button>
      </div>
    </header>
  );
}
