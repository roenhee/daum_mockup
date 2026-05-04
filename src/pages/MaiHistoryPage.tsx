import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { SubTabBar } from '@/components/ui/SubTabBar';
import { MAI_HISTORY_SUBTABS } from '@/mocks/mai';
import { RecentSubtab } from '@/components/mai/history/RecentSubtab';
import { ReactionSubtab } from '@/components/mai/history/ReactionSubtab';
import { CommentSubtab } from '@/components/mai/history/CommentSubtab';
import { SavedSubtab } from '@/components/mai/history/SavedSubtab';

export function MaiHistoryPage() {
  const navigate = useNavigate();
  const { tab = 'recent' } = useParams<{ tab?: string }>();
  const label = MAI_HISTORY_SUBTABS.find((t) => t.id === tab)?.label ?? tab;

  return (
    <div className="relative flex flex-col h-full bg-white">
      <header className="shrink-0 h-12 flex items-center px-3 border-b border-gray-100">
        <button
          type="button"
          aria-label="MAI로 이동"
          onClick={() => navigate('/mai')}
          className="p-1.5 -ml-1.5 text-gray-900"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <span className="ml-1 text-[17px] font-bold text-gray-900">히스토리</span>
      </header>
      <SubTabBar tabs={MAI_HISTORY_SUBTABS} />
      {tab === 'recent' ? (
        <RecentSubtab />
      ) : tab === 'reaction' ? (
        <ReactionSubtab />
      ) : tab === 'comments' ? (
        <CommentSubtab />
      ) : tab === 'saved' ? (
        <SavedSubtab />
      ) : (
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar flex items-center justify-center px-6">
          <p className="text-[13px] text-gray-400">{label} 영역 (작업 예정)</p>
        </main>
      )}
    </div>
  );
}
