import { cn } from '@/lib/cn';
import { asset } from '@/lib/asset';

interface DaumLogoProps {
  className?: string;
  height?: number;
}

export function DaumLogo({ className, height = 22 }: DaumLogoProps) {
  return (
    <img
      src={asset('/daum-logo.svg')}
      alt="Daum"
      height={height}
      style={{ height }}
      className={cn('w-auto select-none', className)}
      draggable={false}
    />
  );
}
