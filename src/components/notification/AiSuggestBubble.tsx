import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Bell, Plus, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const STORAGE_KEY = 'daum-mockup:newsViewStreak';
const DISMISS_KEY = 'daum-mockup:aiSuggestDismissed';

/** 뉴스 뷰에 들어올 때 호출 — 최근 본 카운트를 늘려두면 홈 복귀 시 AI 제안이 노출된다. */
export function markNewsViewed() {
  if (typeof sessionStorage === 'undefined') return;
  const cur = Number(sessionStorage.getItem(STORAGE_KEY) ?? '0');
  sessionStorage.setItem(STORAGE_KEY, String(cur + 1));
  // 새로 기사를 읽기 시작하면 닫힌 상태 초기화 — 다시 노출
  sessionStorage.removeItem(DISMISS_KEY);
}

function shouldShow(): boolean {
  if (typeof sessionStorage === 'undefined') return false;
  if (sessionStorage.getItem(DISMISS_KEY) === '1') return false;
  return Number(sessionStorage.getItem(STORAGE_KEY) ?? '0') > 0;
}

interface AiSuggestBubbleProps {
  /** 추천할 키워드 (사용자 최근 행동 기반 가정) */
  keyword?: string;
  /** 추천 근거 한 줄 */
  reason?: string;
}

export function AiSuggestBubble({
  keyword = '한미정상회담',
  reason = '최근 이 주제 기사를 3건 읽으셨어요',
}: AiSuggestBubbleProps) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [show, setShow] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTarget(document.getElementById('phone-frame-root'));
    if (shouldShow()) setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [show]);

  if (!target || !show) return null;

  const dismissAll = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setShow(false);
  };

  const closeBubble = () => setBubbleOpen(false);

  return createPortal(
    <div
      // 하단 탭바(56px) 바로 위에 띄움. 우측 정렬, 말풍선은 버튼 왼쪽에 배치.
      className="absolute right-3 left-3 z-40 pointer-events-none"
      style={{ bottom: 72 }}
    >
      <div className="flex items-end justify-end gap-2">
        {bubbleOpen ? (
          <div
            className={cn(
              'pointer-events-auto flex-1 max-w-[260px] rounded-2xl rounded-br-sm bg-white border border-gray-200 shadow-xl px-3 py-3 transition-all duration-300 ease-out relative',
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3',
            )}
            role="dialog"
            aria-label="AI 키워드 구독 제안"
          >
            <button
              type="button"
              aria-label="제안 닫기"
              onClick={closeBubble}
              className="absolute top-1 right-1 p-1 text-gray-400 active:text-gray-600"
            >
              <X size={13} />
            </button>
            <div className="pr-4">
              <div className="flex items-center gap-1 text-[10.5px] font-semibold text-daum-blue">
                <Sparkles size={11} strokeWidth={2.5} />
                M:AI · 도와드릴까요?
              </div>
              <p className="mt-1 text-[13px] font-bold text-gray-900 leading-snug">
                #{keyword}, 키워드로 구독하시겠어요?
              </p>
              <p className="mt-0.5 text-[11.5px] text-gray-500 leading-snug">
                {reason}. 새 기사가 나오면 알림으로 알려드릴게요 :)
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                <Link
                  to="/mai/news"
                  onClick={dismissAll}
                  className="inline-flex items-center gap-1 h-8 px-3 rounded-lg bg-daum-blue text-white text-[12px] font-semibold active:bg-daum-blue/90"
                >
                  <Plus size={12} strokeWidth={2.6} />
                  구독하고 알림 받기
                </Link>
                <button
                  type="button"
                  onClick={dismissAll}
                  className="inline-flex items-center h-8 px-3 rounded-lg bg-gray-100 text-gray-700 text-[12px] font-medium active:bg-gray-200"
                >
                  다음에
                </button>
              </div>
            </div>
            {/* 풍선 꼬리 — 오른쪽으로 향해 플로팅 버튼을 가리킴 */}
            <span
              className="absolute bottom-3 -right-1.5 w-3 h-3 bg-white border-t border-r border-gray-200 rotate-45"
              aria-hidden
            />
          </div>
        ) : null}

        <button
          type="button"
          aria-label="AI 제안 다시 열기"
          onClick={() => setBubbleOpen((v) => !v)}
          className={cn(
            'pointer-events-auto relative w-12 h-12 shrink-0 rounded-full text-white flex items-center justify-center shadow-[0_8px_24px_rgba(30,131,255,0.35)] transition-transform active:scale-95',
            'bg-gradient-to-br from-[#5DA0FF] via-[#1E83FF] to-[#0357C4]',
          )}
        >
          <Sparkles size={20} strokeWidth={2.2} />
          {!bubbleOpen ? (
            <span
              className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-daum-red border-2 border-white"
              aria-hidden
            />
          ) : null}
          <span className="sr-only">M:AI 제안</span>
          <span className="absolute inset-0 rounded-full ring-1 ring-white/40 pointer-events-none" />
          <Bell
            size={9}
            strokeWidth={2.6}
            className="absolute bottom-1.5 right-1.5 text-white/80"
            aria-hidden
          />
        </button>
      </div>
    </div>,
    target,
  );
}
