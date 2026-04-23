import { useEffect, useState, type RefObject } from 'react';
import { cn } from '@/lib/cn';

interface ScrollIndicatorProps {
  targetRef: RefObject<HTMLElement>;
}

export function ScrollIndicator({ targetRef }: ScrollIndicatorProps) {
  const [hovered, setHovered] = useState(false);
  const [thumb, setThumb] = useState({ top: 0, height: 0, visible: false });

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollHeight <= clientHeight) {
        setThumb((t) => ({ ...t, visible: false }));
        return;
      }
      const ratio = clientHeight / scrollHeight;
      const height = Math.max(24, clientHeight * ratio);
      const maxTop = clientHeight - height;
      const top = (scrollTop / (scrollHeight - clientHeight)) * maxTop;
      setThumb({ top, height, visible: true });
    };

    update();

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    el.addEventListener('scroll', update, { passive: true });
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', update);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      resizeObserver.disconnect();
    };
  }, [targetRef]);

  if (!thumb.visible) return null;

  return (
    <div
      aria-hidden
      className={cn(
        'absolute right-1 w-1 rounded-full bg-black/30 transition-opacity duration-200 pointer-events-none',
        hovered ? 'opacity-100' : 'opacity-0',
      )}
      style={{ top: thumb.top, height: thumb.height }}
    />
  );
}
