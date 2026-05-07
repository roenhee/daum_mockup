import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Bell, X } from 'lucide-react';
import { asset } from '@/lib/asset';
import { cn } from '@/lib/cn';

// 푸시 알림 카탈로그 — 클릭 시 랜덤으로 하나 띄움
interface PushTemplate {
  title: string;
  body: string;
  /** 토스트 탭 시 이동할 라우트 */
  to: string;
  /** 좌측 아이콘 영역에 띄울 카테고리 라벨 */
  category: string;
}

const PUSH_TEMPLATES: PushTemplate[] = [
  {
    category: '새소식',
    title: '구독 키워드 새 기사가 도착했어요',
    body: '#반도체 키워드 기사 3건이 새로 발행됐어요. 새소식 탭에서 확인해보세요.',
    to: '/mai/news',
  },
  {
    category: '이슈 노트',
    title: '이란 전쟁 이슈 리포트가 발행됐어요',
    body: '오늘의 데일리 다이제스트가 준비됐어요. 이슈 노트 탭에서 흐름을 확인하세요.',
    to: '/mai/issue',
  },
  {
    category: 'AI 탐구',
    title: '요청하신 콘텐츠 제작이 완료됐어요',
    body: '[트럼프 발언 × 코스피·유가] 상관도 분석이 준비됐어요. AI 탐구 탭에서 확인하세요.',
    to: '/mai/explore',
  },
];

interface PushContextValue {
  trigger: () => void;
}

const PushContext = createContext<PushContextValue | null>(null);

export function usePushNotification() {
  const ctx = useContext(PushContext);
  if (!ctx) throw new Error('usePushNotification은 PushNotificationProvider 내부에서만 사용 가능');
  return ctx;
}

interface ActiveToast extends PushTemplate {
  id: number;
}

const AUTO_DISMISS_MS = 5500;

export function PushNotificationProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ActiveToast | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 직전에 띄운 템플릿 인덱스 — 같은 알림이 연달아 뜨지 않도록 제외
  const lastIndexRef = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    setToast(null);
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
  }, []);

  const trigger = useCallback(() => {
    const candidates = PUSH_TEMPLATES.map((_, i) => i).filter(
      (i) => i !== lastIndexRef.current,
    );
    const idx = candidates[Math.floor(Math.random() * candidates.length)];
    const tpl = PUSH_TEMPLATES[idx];
    lastIndexRef.current = idx;
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setToast({ ...tpl, id: Date.now() });
    dismissTimer.current = setTimeout(() => {
      setToast(null);
      dismissTimer.current = null;
    }, AUTO_DISMISS_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  return (
    <PushContext.Provider value={{ trigger }}>
      {children}
      <PushToast toast={toast} onDismiss={dismiss} />
    </PushContext.Provider>
  );
}

function PushToast({
  toast,
  onDismiss,
}: {
  toast: ActiveToast | null;
  onDismiss: () => void;
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTarget(document.getElementById('phone-frame-root'));
  }, []);

  // 약간의 지연 후 슬라이드 인 트랜지션 트리거
  useEffect(() => {
    if (toast) {
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }
    setMounted(false);
  }, [toast?.id]);

  if (!target || !toast) return null;

  const handleTap = () => {
    onDismiss();
    navigate(toast.to);
  };

  return createPortal(
    <div
      // 상태바(z-60) 아래, 다른 오버레이(z-50) 위
      className="absolute left-3 right-3 z-[55] pointer-events-none"
      style={{ top: 44 }}
    >
      <div
        className={cn(
          'pointer-events-auto rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-xl px-3 py-3 transition-all duration-300 ease-out',
          mounted
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4',
        )}
        role="alert"
      >
        <button
          type="button"
          onClick={handleTap}
          className="w-full flex items-start gap-2.5 text-left"
        >
          <span className="shrink-0 w-9 h-9 rounded-[10px] bg-white flex items-center justify-center overflow-hidden border border-gray-100">
            <img
              src={asset('/icons/daum-d.svg')}
              alt=""
              draggable={false}
              className="w-7 h-7 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[10.5px] text-gray-500">
              <Bell size={11} className="text-gray-400" />
              <span className="font-semibold tracking-tight">Daum</span>
              <span className="text-gray-300">·</span>
              <span>{toast.category}</span>
              <span className="text-gray-300">·</span>
              <span>지금</span>
            </div>
            <p className="mt-0.5 text-[13.5px] font-bold text-gray-900 leading-snug">
              {toast.title}
            </p>
            <p className="mt-0.5 text-[12px] text-gray-700 leading-snug line-clamp-2">
              {toast.body}
            </p>
          </div>
          <span
            className="shrink-0 -mr-0.5 -mt-0.5 p-1 text-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            role="button"
            aria-label="알림 닫기"
          >
            <X size={14} />
          </span>
        </button>
      </div>
    </div>,
    target,
  );
}
