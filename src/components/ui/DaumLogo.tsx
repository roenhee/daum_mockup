import { cn } from '@/lib/cn';

interface DaumLogoProps {
  className?: string;
  height?: number;
}

export function DaumLogo({ className, height = 22 }: DaumLogoProps) {
  return (
    <img
      src="/daum-logo.svg"
      alt="Daum"
      height={height}
      style={{ height }}
      className={cn('w-auto select-none', className)}
      draggable={false}
    />
  );
}
