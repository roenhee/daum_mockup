import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Pause, Play, X } from 'lucide-react';

interface PlayerTrack {
  title: string;
  duration: string;
  variant?: 'morning' | 'evening' | 'flash';
}

interface PlayerCtxValue {
  track: PlayerTrack | null;
  playing: boolean;
  play: (track: PlayerTrack) => void;
  toggle: () => void;
  stop: () => void;
}

const PlayerCtx = createContext<PlayerCtxValue | null>(null);

export function MaiPlayerProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<PlayerTrack | null>(null);
  const [playing, setPlaying] = useState(false);

  const value: PlayerCtxValue = {
    track,
    playing,
    play: (t) => {
      setTrack(t);
      setPlaying(true);
    },
    toggle: () => setPlaying((p) => !p),
    stop: () => {
      setTrack(null);
      setPlaying(false);
    },
  };

  return <PlayerCtx.Provider value={value}>{children}</PlayerCtx.Provider>;
}

export function useMaiPlayer() {
  return useContext(PlayerCtx);
}

const VARIANT_EMOJI: Record<NonNullable<PlayerTrack['variant']>, string> = {
  morning: '🌅',
  evening: '🌙',
  flash: '⚡',
};

const VARIANT_BG: Record<NonNullable<PlayerTrack['variant']>, string> = {
  morning: '#FFEFC9',
  evening: '#D9E1F1',
  flash: '#E0E0E0',
};

export function MaiMiniPlayer() {
  const ctx = useContext(PlayerCtx);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [ctx?.track?.title]);

  useEffect(() => {
    if (!ctx?.playing) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 1));
    }, 350);
    return () => clearInterval(id);
  }, [ctx?.playing, ctx?.track?.title]);

  if (!ctx?.track) return null;
  const { track, playing, toggle, stop } = ctx;
  const variant = track.variant ?? 'morning';

  return (
    <div className="shrink-0 border-t border-gray-100 bg-white px-3 py-2 flex items-center gap-2.5">
      <div
        className="w-9 h-9 rounded-md flex items-center justify-center text-[18px] shrink-0"
        style={{ backgroundColor: VARIANT_BG[variant] }}
        aria-hidden
      >
        {VARIANT_EMOJI[variant]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-gray-900 truncate">{track.title}</p>
        <div className="mt-1 flex items-center gap-1.5">
          <div className="flex-1 h-[3px] bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-900" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[10px] text-gray-400 tabular-nums shrink-0">{track.duration}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? '일시정지' : '재생'}
        className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center shrink-0"
      >
        {playing ? <Pause size={13} fill="white" /> : <Play size={12} fill="white" className="ml-0.5" />}
      </button>
      <button
        type="button"
        onClick={stop}
        aria-label="플레이어 닫기"
        className="p-1 -mr-1 text-gray-500 shrink-0"
      >
        <X size={16} />
      </button>
    </div>
  );
}
