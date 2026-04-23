import { MoreHorizontal } from 'lucide-react';
import { DaumLogo } from '@/components/ui/DaumLogo';

export function DaumChannelHeader() {
  return (
    <header className="shrink-0 h-12 flex items-center gap-2 px-4 bg-white border-b border-gray-100">
      <DaumLogo height={18} />
      <span className="text-[15px] font-bold text-gray-900">채널</span>
      <button aria-label="더보기" className="ml-auto p-2 text-gray-700">
        <MoreHorizontal size={20} />
      </button>
    </header>
  );
}
