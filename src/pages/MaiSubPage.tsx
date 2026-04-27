import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { MAI_SUB_PAGE_TITLES } from '@/mocks/mai';

export function MaiSubPage() {
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const title = MAI_SUB_PAGE_TITLES[id] ?? id;

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 h-12 flex items-center px-3 border-b border-gray-100">
        <button
          type="button"
          aria-label="뒤로"
          onClick={() => navigate(-1)}
          className="p-1.5 -ml-1.5 text-gray-900"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <span className="ml-1 text-[17px] font-bold text-gray-900">{title}</span>
      </header>
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar flex items-center justify-center px-6">
        <p className="text-[13px] text-gray-400">{title} 페이지 (작업 예정)</p>
      </main>
    </div>
  );
}
