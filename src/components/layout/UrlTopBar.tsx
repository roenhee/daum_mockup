import { useNavigate } from 'react-router-dom';
import { ChevronLeft, RotateCcw } from 'lucide-react';

interface UrlTopBarProps {
  url?: string;
  tabCount?: number;
  onBack?: () => void;
}

export function UrlTopBar({ url = 'v.daum.net', tabCount = 2, onBack }: UrlTopBarProps) {
  const navigate = useNavigate();
  return (
    <header className="shrink-0 h-11 flex items-center gap-2 px-2 bg-white border-b border-gray-200">
      <button
        aria-label="뒤로"
        onClick={onBack ?? (() => navigate(-1))}
        className="p-2 text-gray-700"
      >
        <ChevronLeft size={22} />
      </button>
      <div className="flex-1 h-8 px-1 flex items-center text-[12px] text-gray-500">
        <span className="truncate">{url}</span>
        <button aria-label="새로고침" className="ml-auto p-1 text-gray-500">
          <RotateCcw size={14} />
        </button>
      </div>
      <button
        aria-label="탭"
        className="mr-2 h-7 min-w-7 px-1.5 rounded border border-gray-400 text-[11px] font-semibold text-gray-700"
      >
        {tabCount}
      </button>
    </header>
  );
}
