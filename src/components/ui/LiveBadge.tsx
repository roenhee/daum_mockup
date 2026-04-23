import { cn } from '@/lib/cn';

export function LiveBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 bg-daum-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded',
        className,
      )}
    >
      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
      LIVE
    </span>
  );
}
