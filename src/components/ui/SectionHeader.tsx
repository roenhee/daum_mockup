import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  title: ReactNode;
  right?: ReactNode;
  meta?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, right, meta, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 pt-5 pb-2',
        className,
      )}
    >
      <div className="flex items-baseline gap-2 min-w-0">
        <h2 className="text-[15px] font-bold truncate">{title}</h2>
        {meta ? <span className="text-[11px] text-gray-400">{meta}</span> : null}
      </div>
      {right ? <div className="shrink-0 text-[11px] text-gray-400">{right}</div> : null}
    </div>
  );
}

export function MoreLink({ label = '더보기' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {label}
      <ChevronRight size={14} />
    </span>
  );
}

interface SectionMoreButtonProps {
  label: string;
  className?: string;
}

export function SectionMoreButton({ label, className }: SectionMoreButtonProps) {
  return (
    <div className={cn('px-4 pb-4 pt-1', className)}>
      <button
        type="button"
        className="w-full h-10 rounded-lg border border-gray-200 bg-white text-[13px] font-medium text-gray-700 inline-flex items-center justify-center gap-1"
      >
        {label}
        <ChevronRight size={14} className="text-gray-400" />
      </button>
    </div>
  );
}
