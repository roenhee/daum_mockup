import { useEffect, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useDragScroll } from '@/lib/useDragScroll';
import {
  PLACEHOLDER_ROTATION,
  SLOT_KIND_META,
  TEMPLATE_CHIPS,
  type SlotKind,
} from '@/mocks/maiExplore';
import { MaiMiniPlayer, useMaiPlayer } from '../news/MaiPlayer';

export interface CreateSheetPrefill {
  text?: string;
  kind?: SlotKind;
}

interface Props {
  open: boolean;
  prefill: CreateSheetPrefill | null;
  onClose: () => void;
  onSubmit: (payload: { text: string; kind: SlotKind | null }) => void;
}

// 콘텐츠 생성 바텀시트 (FAB →)
// 스펙: 적응형 높이(~50%), 자유 textarea + 템플릿 칩 태그 부착 패턴
export function CreateExploreSheet({ open, prefill, onClose, onSubmit }: Props) {
  const [text, setText] = useState('');
  const [kind, setKind] = useState<SlotKind | null>(null);
  const [phIndex, setPhIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const player = useMaiPlayer();

  // 시트가 열린 동안 기본 위치 미니플레이어를 숨기고, 패널 위에 같이 띄운다.
  useEffect(() => {
    if (!open || !player) return;
    player.setSuppressDefault(true);
    return () => player.setSuppressDefault(false);
  }, [open, player]);

  useEffect(() => {
    if (!open) return;
    setText(prefill?.text ?? '');
    setKind(prefill?.kind ?? null);
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, [open, prefill]);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(
      () => setPhIndex((i) => (i + 1) % PLACEHOLDER_ROTATION.length),
      3500,
    );
    return () => clearInterval(id);
  }, [open]);

  // textarea 자동 그로우 (3줄 한도)
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 92) + 'px';
  }, [text]);

  if (!open) return null;

  const verb = kind ? TEMPLATE_CHIPS.find((c) => c.id === kind)?.verb ?? '탐구' : '탐구';
  const canSubmit = text.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ text: text.trim(), kind });
  };

  return (
    <div className="absolute inset-0 z-40">
      {/* scrim — 패널 뒤까지 풀커버. 둥근 모서리 뒤로 흰배경이 비치는 이슈 차단. */}
      <button
        type="button"
        aria-label="시트 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 mai-sheet-scrim"
      />
      {/* 패널 + 미니플레이어를 같이 슬라이드업. 미니플레이어는 패널 위에 떠있다. */}
      <div className="absolute left-0 right-0 bottom-0 mai-sheet-panel">
        {player?.track ? (
          <MaiMiniPlayer forceRender />
        ) : null}
        <div
          className="bg-white rounded-t-[20px] shadow-[0_-8px_24px_rgba(0,0,0,0.12)] relative"
          role="dialog"
          aria-label="새 탐구 시작"
        >
        <div className="pt-2 pb-1 flex flex-col items-center">
          <span className="w-9 h-1 rounded-full bg-gray-300" aria-hidden />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-3 top-3 p-1.5 text-gray-400"
        >
          <X size={18} />
        </button>

        <div className="px-4 pt-2 pb-5">
          <h2 className="text-[16px] font-bold text-gray-900">
            무엇을 <span className="text-[#3D6EE0]">{verb}</span>할까요?
          </h2>

          {kind ? (
            <div
              className="mt-2.5 inline-flex items-center gap-1.5 pl-2 pr-1 py-1 rounded-full border"
              style={{
                borderColor: SLOT_KIND_META[kind].color,
                background: SLOT_KIND_META[kind].tint,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: SLOT_KIND_META[kind].color }}
                aria-hidden
              />
              <span
                className="text-[11.5px] font-semibold"
                style={{ color: SLOT_KIND_META[kind].color }}
              >
                {SLOT_KIND_META[kind].label} 형식
              </span>
              <button
                type="button"
                onClick={() => setKind(null)}
                aria-label="형식 해제"
                className="w-4 h-4 rounded-full bg-white/70 flex items-center justify-center"
                style={{ color: SLOT_KIND_META[kind].color }}
              >
                <X size={10} />
              </button>
            </div>
          ) : null}

          {/* 입력창 — items-end로 textarea가 여러 줄로 그로우해도 CTA가 바닥에 고정.
             single-line 일 때 textarea 높이(36px)와 CTA 버튼(36px) 정렬 → placeholder 세로 중앙 정렬 효과. */}
          <div className="mt-3 flex items-end gap-2 rounded-[14px] border border-gray-200 bg-white pl-3.5 pr-2 py-1.5">
            <textarea
              ref={inputRef}
              rows={1}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={PLACEHOLDER_ROTATION[phIndex]}
              className="flex-1 resize-none bg-transparent text-[14px] leading-[20px] py-1.5 text-gray-900 placeholder-gray-400 focus:outline-none no-scrollbar"
              style={{ maxHeight: 92 }}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              aria-label="시작"
              className={cn(
                'shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                canSubmit ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400',
              )}
            >
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="mt-3 text-[11px] text-gray-400 px-0.5">
            형식 선택 <span className="text-gray-300">(선택)</span>
          </p>
          <TemplateChips selected={kind} onSelect={(k) => setKind(kind === k ? null : k)} />
        </div>
        </div>
      </div>
    </div>
  );
}

function TemplateChips({
  selected,
  onSelect,
}: {
  selected: SlotKind | null;
  onSelect: (k: SlotKind) => void;
}) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      {...handlers}
      className={cn(
        'mt-1.5 -mx-4 px-4 overflow-x-auto no-scrollbar select-none touch-pan-x',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
      )}
    >
      <div className="flex items-center gap-1.5 min-w-max">
        {TEMPLATE_CHIPS.map((c) => {
          const active = selected === c.id;
          const meta = SLOT_KIND_META[c.id];
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              aria-pressed={active}
              className={cn(
                'h-8 px-3 rounded-full text-[12px] font-medium border shrink-0 inline-flex items-center gap-1.5 transition-colors',
                active ? 'text-white' : 'bg-white text-gray-700 border-gray-200',
              )}
              style={
                active ? { background: meta.color, borderColor: meta.color } : undefined
              }
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: active ? '#fff' : meta.color }}
                aria-hidden
              />
              {c.label}
              {active ? <span className="text-white/90 text-[10px]">✓</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
