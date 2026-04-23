import { cn } from '@/lib/cn';

interface IconProps {
  src: string;
  size?: number;
  alt?: string;
  className?: string;
}

export function Icon({ src, size = 24, alt = '', className }: IconProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('select-none', className)}
      draggable={false}
      style={{ width: size, height: size }}
    />
  );
}
