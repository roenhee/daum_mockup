import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Pencil,
  X,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { PLACEHOLDER_ROTATION, type SlotKind } from '@/mocks/maiExplore';
import { useExplore, type WizardStep } from './ExploreContext';

// 시안 B (Confluence HomeX/313295007) — 플로팅 채팅 입력 + 동적 선택지 모달
// 실험 칩에서만 활성화되는 진입로 변형. 자산 surface(아카이브 카드)는 동일하게 유지된다.

interface FormatOption {
  id: string;
  kind: SlotKind;
  label: string;
  subtitle: string;
}

// step 1 — 사용자 입력에서 파생되는 동적 선택지 (mock 휴리스틱)
function buildFormatOptions(query: string): FormatOption[] {
  const lower = query.toLowerCase();
  const head = query.length > 16 ? query.slice(0, 16) + '…' : query || '입력 주제';
  const has = (...keys: string[]) => keys.some((k) => lower.includes(k));

  const opts: FormatOption[] = [];

  if (has('관계', '영향', '상관', '연관')) {
    opts.push({
      id: 'opt-corr',
      kind: 'correlation',
      label: '시기별 상관도 분석',
      subtitle: `${head} — 영향 라인`,
    });
  }
  if (has('비교', 'vs', '차이', '대비')) {
    opts.push({
      id: 'opt-cmp',
      kind: 'compare',
      label: '비교 매트릭스',
      subtitle: `${head} — 항목별 한눈 비교`,
    });
  }
  if (has('추이', '시기', '일지', '타임라인', '변화', '흐름')) {
    opts.push({
      id: 'opt-time',
      kind: 'timeline',
      label: '타임라인',
      subtitle: `${head} — 사건별 일자 정렬`,
    });
  }
  if (has('인물', '사람', '프로필', '이력', '발언')) {
    opts.push({
      id: 'opt-prof',
      kind: 'profile',
      label: '인물·기관 프로파일',
      subtitle: `${head} — 발언/일정/시장 영향 정리`,
    });
  }
  if (has('시나리오', '만약', '봉쇄', '리스크')) {
    opts.push({
      id: 'opt-scn',
      kind: 'scenario',
      label: '시나리오 분석',
      subtitle: `${head} — 기본/상승/하락 3안`,
    });
  }

  const defaults: FormatOption[] = [
    {
      id: 'opt-corr-d',
      kind: 'correlation',
      label: '시기별 상관도 분석',
      subtitle: `${head} — 영향 라인`,
    },
    {
      id: 'opt-cmp-d',
      kind: 'compare',
      label: '비교 매트릭스',
      subtitle: `${head} — 핵심 차이`,
    },
    {
      id: 'opt-time-d',
      kind: 'timeline',
      label: '타임라인',
      subtitle: `${head} — 사건 일지`,
    },
  ];
  for (const d of defaults) {
    if (opts.length >= 4) break;
    if (!opts.find((o) => o.kind === d.kind)) opts.push(d);
  }

  opts.push({
    id: 'opt-audio',
    kind: 'audio',
    label: '팟캐스트 형태로 듣기',
    subtitle: `${head} — 31분 위클리 딥다이브`,
  });

  return opts.slice(0, 5);
}

// step 2 — 기간/관점 (다중 선택)
const TIME_OPTIONS: { id: string; label: string; subtitle: string }[] = [
  { id: 'time-24h', label: '직후 (24시간)', subtitle: '이벤트 직후 즉각 반응' },
  { id: 'time-1w', label: '1주일', subtitle: '단기 시장 반응' },
  { id: 'time-1m', label: '1개월', subtitle: '중기 흐름과 패턴' },
  { id: 'time-1y', label: '1년', subtitle: '장기 추이와 구조 변화' },
];

// step 3 — 결과 깊이 (단일 선택)
const DEPTH_OPTIONS: { id: string; label: string; subtitle: string }[] = [
  { id: 'depth-summary', label: '요약', subtitle: '3줄 핵심만' },
  { id: 'depth-std', label: '표준', subtitle: '1쪽 정리 + 표' },
  { id: 'depth-deep', label: '심층', subtitle: '5쪽 + 차트 + 인용' },
];

const STEP_TITLE: Record<WizardStep, string> = {
  1: '어떤 형태로 보여드릴까요?',
  2: '어떤 기간으로 살펴볼까요?',
  3: '결과의 깊이는 어느 정도가 좋을까요?',
};

const STEP_MULTI: Record<WizardStep, boolean> = {
  1: false,
  2: true, // 기간은 다중 선택
  3: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// Chat input — 메인 페이지 하단에 떠있는 입력
// ─────────────────────────────────────────────────────────────────────────────

export function ExperimentalChatInput() {
  const ctx = useExplore();
  const [phIndex, setPhIndex] = useState(0);
  const [isMulti, setIsMulti] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 폴링 속도 늦춤: 3.5s → 6s
  useEffect(() => {
    const id = setInterval(
      () => setPhIndex((i) => (i + 1) % PLACEHOLDER_ROTATION.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 92) + 'px';
    setIsMulti(el.scrollHeight > 40);
  }, [ctx.expChat.draft]);

  if (!ctx.experimentalActive) return null;
  if (ctx.expChat.wizard) return null;

  const placeholder = PLACEHOLDER_ROTATION[phIndex].replace(/^예: /, '');
  // 입력이 있으면 입력 사용, 없으면 placeholder 사용 — 항상 활성
  const handleSubmit = () => {
    const text = ctx.expChat.draft.trim() || placeholder;
    ctx.expSubmitWith(text);
  };

  return (
    <div className="absolute left-0 right-0 bottom-0 pointer-events-auto z-30 bg-white/60 backdrop-blur-sm py-3 px-3">
      <div className="flex items-end gap-2">
        <div
          className={cn(
            'flex-1 bg-white border border-gray-200 shadow-[0_4px_14px_rgba(0,0,0,0.08)] px-4 flex items-center min-h-[44px]',
            isMulti ? 'rounded-[18px]' : 'rounded-full',
          )}
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={ctx.expChat.draft}
            onChange={(e) => ctx.expSetDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={placeholder}
            className="w-full resize-none bg-transparent text-[14px] leading-[20px] py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none no-scrollbar"
            style={{ maxHeight: 92 }}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          aria-label="전송"
          className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-gray-900 text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
        >
          <ArrowRight size={18} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 라디오/체크박스 컨트롤
// ─────────────────────────────────────────────────────────────────────────────

function RadioDot({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        'shrink-0 w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-colors',
        checked ? 'border-gray-900' : 'border-gray-300 bg-white',
      )}
      aria-hidden
    >
      {checked ? <span className="w-[9px] h-[9px] rounded-full bg-gray-900" /> : null}
    </span>
  );
}

function CheckBox({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        'shrink-0 w-[18px] h-[18px] rounded-[5px] border-[1.5px] flex items-center justify-center transition-colors',
        checked ? 'border-gray-900 bg-gray-900' : 'border-gray-300 bg-white',
      )}
      aria-hidden
    >
      {checked ? <Check size={11} strokeWidth={3.5} className="text-white" /> : null}
    </span>
  );
}

function SelectControl({ multi, checked }: { multi: boolean; checked: boolean }) {
  return multi ? <CheckBox checked={checked} /> : <RadioDot checked={checked} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Modal — 3단계 마법사
// ─────────────────────────────────────────────────────────────────────────────

export function ExperimentalModal() {
  const ctx = useExplore();
  const [customStep, setCustomStep] = useState<WizardStep | null>(null);
  const [customText, setCustomText] = useState('');

  // 단계 전환/모달 열릴 때마다 기타 입력 영역 초기화
  useEffect(() => {
    setCustomStep(null);
    setCustomText('');
  }, [ctx.expChat.wizard?.step, ctx.expChat.wizard === null]);

  if (!ctx.experimentalActive) return null;
  if (!ctx.expChat.wizard) return null;

  const { initialQuery, step, selections } = ctx.expChat.wizard;
  const title = STEP_TITLE[step];
  const isMulti = STEP_MULTI[step];

  const isSelected = (optionLabel: string) => {
    if (step === 1) return selections.format?.label === optionLabel;
    if (step === 2) return selections.timeRanges.some((t) => t.label === optionLabel);
    return selections.depth?.label === optionLabel;
  };

  const goPrev = () => ctx.expGoToStep((step - 1) as WizardStep);
  const goNext = () => ctx.expGoToStep((step + 1) as WizardStep);

  const handleSelect = (label: string, kind?: SlotKind, id?: string) => {
    if (step === 1) {
      // 라디오(단일) — 클릭 즉시 다음 단계로 자동 진행
      ctx.expSetFormat({ kind, label });
      ctx.expGoToStep(2);
    } else if (step === 2) {
      // 체크박스(다중) — 토글만, 진행은 하단 "다음 선택" 버튼으로
      ctx.expToggleTimeRange({ id: id ?? label, label });
    } else {
      // step 3 라디오(단일) — 마지막 단계라 next page 없음. 생성하기 버튼으로 finalize.
      ctx.expSetDepth({ label });
    }
  };

  const submitCustom = () => {
    const v = customText.trim();
    if (!v) return;
    if (step === 1) {
      ctx.expSetFormat({ label: v, isCustom: true });
    } else if (step === 2) {
      ctx.expToggleTimeRange({ id: `time-custom-${Date.now()}`, label: v, isCustom: true });
    } else {
      ctx.expSetDepth({ label: v, isCustom: true });
    }
    setCustomStep(null);
    setCustomText('');
  };

  const renderOptionsList = () => {
    if (step === 1) {
      const opts = buildFormatOptions(initialQuery);
      return opts.map((o) => ({
        id: o.id,
        label: o.label,
        subtitle: o.subtitle,
        kind: o.kind,
      }));
    }
    if (step === 2) return TIME_OPTIONS.map((o) => ({ ...o, kind: undefined }));
    return DEPTH_OPTIONS.map((o) => ({ ...o, kind: undefined }));
  };

  const optionRows = renderOptionsList();
  const customCheckedForRow =
    customStep === step ? customText.trim().length > 0 : false;

  return (
    <div className="absolute inset-0 z-50">
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={ctx.expCloseModal}
        className="absolute inset-0 bg-black/40 mai-sheet-scrim"
      />
      <div className="absolute left-0 right-0 bottom-0 mai-sheet-panel">
        <div
          className="bg-[#F2F4F7] rounded-t-[20px] shadow-[0_-8px_24px_rgba(0,0,0,0.15)] overflow-hidden relative"
          role="dialog"
          aria-label="에이전트 선택지"
        >
          {/* 사용자 메시지 — 라이트 톤. 모달(#F2F4F7)보다 약간 어두운 배경. */}
          <div className="px-4 py-4 flex items-center gap-2 bg-[#E6E9EE]">
            <button
              type="button"
              onClick={ctx.expEditQuery}
              className="flex-1 min-w-0 flex items-center gap-1.5 text-left group"
            >
              <span className="shrink-0 text-[13px]" aria-hidden>
                💬
              </span>
              <span className="flex-1 min-w-0 text-[13px] text-gray-800 leading-snug break-words">
                {initialQuery}
              </span>
              <Pencil
                size={12}
                className="shrink-0 text-gray-500 group-hover:text-gray-700"
              />
            </button>
            <button
              type="button"
              onClick={ctx.expCloseModal}
              aria-label="닫기"
              className="shrink-0 w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-700 active:bg-gray-100"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* 질문 + 좌우 nav + 진행 표시 */}
          <div className="px-4 pt-3.5 pb-2.5 flex items-center gap-2">
            <p className="flex-1 text-[14.5px] font-bold text-gray-900">{title}</p>
            <div className="shrink-0 inline-flex items-center gap-1">
              <button
                type="button"
                onClick={goPrev}
                disabled={step === 1}
                aria-label="이전 단계"
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center transition-colors',
                  step === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-700 active:bg-gray-200/60',
                )}
              >
                <ChevronLeft size={16} strokeWidth={2.4} />
              </button>
              <span className="px-2 py-0.5 rounded-full bg-gray-900/[0.06] text-[11px] font-medium text-gray-600 tabular-nums">
                3개 중 {step}개
              </span>
              <button
                type="button"
                onClick={goNext}
                disabled={step === 3}
                aria-label="다음 단계"
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center transition-colors',
                  step === 3
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-700 active:bg-gray-200/60',
                )}
              >
                <ChevronRight size={16} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          {/* 옵션 리스트 — 흰 카드 + divider, 라디오/체크박스 */}
          <div className="mx-3 bg-white rounded-[14px] overflow-hidden">
            {optionRows.map((o) => {
              const checked = isSelected(o.label);
              return (
                <div key={o.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(o.label, o.kind, o.id)}
                    className="w-full px-3.5 py-3 flex items-center gap-3 text-left active:bg-gray-50 transition-colors"
                  >
                    <SelectControl multi={isMulti} checked={checked} />
                    <span className="flex-1 min-w-0">
                      <span className="block text-[13.5px] font-semibold text-gray-900 leading-snug">
                        {o.label}
                      </span>
                      <span className="block mt-0.5 text-[11.5px] text-gray-500 leading-snug truncate">
                        {o.subtitle}
                      </span>
                    </span>
                  </button>
                  <div className="ml-12 border-b border-gray-100" />
                </div>
              );
            })}

            {/* 기타 직접 입력 row — 컨트롤은 유지하고 우측만 텍스트 영역으로 확장 */}
            <div>
              {customStep === step ? (
                <div className="w-full px-3.5 py-2.5 flex items-center gap-3">
                  <SelectControl multi={isMulti} checked={customCheckedForRow} />
                  <div className="flex-1 flex items-end gap-2 rounded-[12px] border border-gray-200 bg-white pl-3 pr-1.5 py-1">
                    <textarea
                      autoFocus
                      rows={1}
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          submitCustom();
                        }
                      }}
                      placeholder="원하는 답을 직접 적어주세요"
                      className="flex-1 resize-none bg-transparent text-[13px] leading-[20px] py-1.5 text-gray-900 placeholder-gray-400 focus:outline-none no-scrollbar"
                      style={{ maxHeight: 92 }}
                    />
                    <button
                      type="button"
                      onClick={submitCustom}
                      disabled={!customText.trim()}
                      aria-label="기타 입력 적용"
                      className={cn(
                        'shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors mb-0.5',
                        customText.trim()
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-400',
                      )}
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCustomStep(step)}
                  className="w-full px-3.5 py-3 flex items-center gap-3 text-left active:bg-gray-50 transition-colors"
                >
                  <SelectControl multi={isMulti} checked={false} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13.5px] font-semibold text-gray-700 leading-snug">
                      기타 직접 입력
                    </span>
                    <span className="block mt-0.5 text-[11.5px] text-gray-500 leading-snug">
                      이 단계의 답을 직접 적어주세요
                    </span>
                  </span>
                </button>
              )}
              {/* 기타 row 하단 divider — 건너뛰기와 구분 */}
              <div className="ml-12 border-b border-gray-100" />
            </div>

            {/* 건너뛰기 — 리스트의 마지막 row. 현재 단계만 건너뜀. */}
            <button
              type="button"
              onClick={ctx.expSkipStep}
              className="w-full px-3.5 py-3 flex items-center gap-3 text-left active:bg-gray-50 transition-colors"
            >
              <span className="shrink-0 w-[18px] h-[18px]" aria-hidden />
              <span className="flex-1 min-w-0">
                <span className="block text-[13.5px] font-semibold text-gray-500 leading-snug">
                  건너뛰기
                </span>
                <span className="block mt-0.5 text-[11.5px] text-gray-400 leading-snug">
                  {step === 3
                    ? '이 단계 건너뛰고 바로 생성'
                    : '이 단계 건너뛰고 다음으로'}
                </span>
              </span>
            </button>
          </div>

          {/* 하단 CTA — 다중 선택 단계엔 "선택 완료", 마지막 단계엔 "생성하기" */}
          {step === 3 ? (
            <div className="px-3 pt-3 pb-3">
              <button
                type="button"
                onClick={ctx.expFinalize}
                className="w-full h-12 rounded-[14px] bg-gray-900 text-white text-[14px] font-bold active:bg-gray-800 shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
              >
                생성하기
              </button>
            </div>
          ) : isMulti ? (
            <div className="px-3 pt-3 pb-3">
              <button
                type="button"
                onClick={() => ctx.expGoToStep((step + 1) as WizardStep)}
                className="w-full h-12 rounded-[14px] bg-white text-gray-800 text-[14px] font-semibold active:bg-gray-100"
              >
                다음 선택
              </button>
            </div>
          ) : (
            // 단일 선택 단계는 리스트만 — 시각 여백
            <div className="h-3" />
          )}
        </div>
      </div>
    </div>
  );
}
