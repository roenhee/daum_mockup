import { Pencil } from 'lucide-react';
import { cn } from '@/lib/cn';

interface EditChipProps {
  active: boolean;
  onClick: () => void;
}

export function EditChip({ active, onClick }: EditChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors',
        active
          ? 'border-daum-blue bg-daum-blue text-white'
          : 'border-daum-blue/60 bg-daum-blue/5 text-daum-blue',
      )}
    >
      <Pencil size={12} strokeWidth={2.4} />
      {active ? '완료' : '편집'}
    </button>
  );
}
