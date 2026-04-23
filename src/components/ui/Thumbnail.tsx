import { placeholderImg } from '@/lib/img';
import { cn } from '@/lib/cn';

interface ThumbnailProps {
  url?: string;
  seed: string;
  topic?: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
}

/**
 * Renders an image with fallback to placeholderImg when `url` is missing.
 * Size defaults are for loremflickr hinting — rendered dimensions come from `className`.
 */
export function Thumbnail({
  url,
  seed,
  topic = 'sport,stadium',
  width = 320,
  height = 240,
  alt = '',
  className,
}: ThumbnailProps) {
  return (
    <img
      src={url ?? placeholderImg(seed, width, height, topic)}
      alt={alt}
      className={cn('object-cover bg-surface-gap', className)}
      loading="lazy"
    />
  );
}
