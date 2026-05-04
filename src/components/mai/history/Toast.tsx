import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onDismiss: () => void;
  durationMs?: number;
}

export function Toast({ message, onDismiss, durationMs = 2200 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(t);
  }, [durationMs, onDismiss]);

  return (
    <div
      role="status"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 text-white text-[13px] px-5 py-3 rounded-full shadow-lg whitespace-nowrap pointer-events-none"
    >
      {message}
    </div>
  );
}
