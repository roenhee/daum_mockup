import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  ACTIVE_RECOMMENDATION,
  ARCHIVE_ITEMS,
  type ArchiveItem,
  type SlotKind,
} from '@/mocks/maiExplore';
import type { CreateSheetPrefill } from './CreateExploreSheet';

export type WizardStep = 1 | 2 | 3;

export interface WizardTimeRange {
  id: string;
  label: string;
  isCustom?: boolean;
}

export interface WizardSelections {
  format?: { kind: SlotKind; label: string; isCustom?: boolean };
  // step 2는 다중 선택
  timeRanges: WizardTimeRange[];
  depth?: { label: string; isCustom?: boolean };
}

interface ExpChatState {
  draft: string;
  // null이면 모달 닫힘. 값 있으면 마법사 진행 상태.
  wizard: {
    initialQuery: string;
    step: WizardStep;
    selections: WizardSelections;
  } | null;
}

const EMPTY_SELECTIONS: WizardSelections = { timeRanges: [] };

interface Ctx {
  items: ArchiveItem[];
  toggleFavorite: (id: string) => void;
  recDismissed: boolean;
  dismissRec: () => void;
  sheetOpen: boolean;
  sheetPrefill: CreateSheetPrefill | null;
  openSheetEmpty: () => void;
  openSheetFromRec: () => void;
  closeSheet: () => void;
  submitSheet: (payload: { text: string; kind: SlotKind | null }) => void;
  // 시안 B (실험 칩) 상태
  experimentalActive: boolean;
  setExperimentalActive: (v: boolean) => void;
  expChat: ExpChatState;
  expSetDraft: (t: string) => void;
  /** 입력값을 받아 마법사 step 1로 진입. 빈 문자열은 무시. */
  expSubmitWith: (text: string) => void;
  /** 사용자 메시지 탭 → 마법사 닫고 draft 복원. */
  expEditQuery: () => void;
  // 선택 (단일/다중 분기)
  expSetFormat: (p: { kind?: SlotKind; label: string; isCustom?: boolean }) => void;
  expToggleTimeRange: (p: WizardTimeRange) => void;
  expSetDepth: (p: { label: string; isCustom?: boolean }) => void;
  /** 단계 이동 (1~3). 범위 밖이면 무시. */
  expGoToStep: (step: WizardStep) => void;
  /** 생성하기 — 현재 selections로 캔버스 진입 + 모달 닫음. */
  expFinalize: () => void;
  /** 건너뛰기 — 현재 단계만 건너뜀. step 1·2면 다음 단계로, step 3이면 finalize. */
  expSkipStep: () => void;
  /** scrim/X 탭 — 모달 닫고 selections 초기화. */
  expCloseModal: () => void;
}

const ExploreCtx = createContext<Ctx | null>(null);

export function ExploreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ArchiveItem[]>(ARCHIVE_ITEMS);
  const [recDismissed, setRecDismissed] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetPrefill, setSheetPrefill] = useState<CreateSheetPrefill | null>(null);
  const [experimentalActive, setExperimentalActive] = useState(false);
  const [expChat, setExpChat] = useState<ExpChatState>({ draft: '', wizard: null });

  const finalize = (initialQuery: string, selections: WizardSelections) => {
    const formatKind = selections.format?.kind ?? 'compare';
    const formatLabel = selections.format?.label ?? '비교 매트릭스';
    const timeLabels = selections.timeRanges.map((t) => t.label);
    const depthLabel = selections.depth?.label;

    const tags = [...timeLabels, depthLabel].filter(Boolean) as string[];

    const newItem: ArchiveItem = {
      id: `a-exp-${Date.now()}`,
      kind: formatKind,
      title: formatLabel.length > 40 ? formatLabel.slice(0, 40) + '…' : formatLabel,
      snippet: `시안 B 합성 시작 — "${initialQuery}"`,
      body: [
        {
          heading: '입력 요약',
          text: `질문: "${initialQuery}". 형식: ${formatLabel}. 기간: ${
            timeLabels.length > 0 ? timeLabels.join(', ') : '미지정'
          }. 깊이: ${depthLabel ?? '미지정'}.`,
        },
      ],
      tags,
      createdAt: '방금',
      sourceCount: 0,
      favorited: false,
      inProgress: true,
      hasUpdate: false,
      recencyRank: 999,
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const value = useMemo<Ctx>(
    () => ({
      items,
      recDismissed,
      sheetOpen,
      sheetPrefill,
      toggleFavorite: (id) =>
        setItems((prev) =>
          prev.map((i) => (i.id === id ? { ...i, favorited: !i.favorited } : i)),
        ),
      dismissRec: () => setRecDismissed(true),
      openSheetEmpty: () => {
        setSheetPrefill(null);
        setSheetOpen(true);
      },
      openSheetFromRec: () => {
        setSheetPrefill({
          text: ACTIVE_RECOMMENDATION.prefill,
          kind: ACTIVE_RECOMMENDATION.prefillKind,
        });
        setSheetOpen(true);
      },
      closeSheet: () => setSheetOpen(false),
      submitSheet: ({ text, kind }) => {
        const newItem: ArchiveItem = {
          id: `a-new-${Date.now()}`,
          kind: kind ?? 'compare',
          title: text.length > 40 ? text.slice(0, 40) + '…' : text,
          snippet: '슬롯 캔버스에서 합성을 시작합니다…',
          body: [{ text: `요청 입력: "${text}". 캔버스에서 곧 결과를 합성합니다.` }],
          tags: [],
          createdAt: '방금',
          sourceCount: 0,
          favorited: false,
          inProgress: true,
          hasUpdate: false,
          recencyRank: 999,
        };
        setItems((prev) => [newItem, ...prev]);
        setSheetOpen(false);
      },
      experimentalActive,
      setExperimentalActive,
      expChat,
      expSetDraft: (t) => setExpChat((s) => ({ ...s, draft: t })),
      expSubmitWith: (text) =>
        setExpChat((s) => {
          const t = text.trim();
          if (!t) return s;
          return {
            draft: '',
            wizard: { initialQuery: t, step: 1, selections: { ...EMPTY_SELECTIONS } },
          };
        }),
      expEditQuery: () =>
        setExpChat((s) => {
          if (!s.wizard) return s;
          return { draft: s.wizard.initialQuery, wizard: null };
        }),
      expSetFormat: (p) =>
        setExpChat((s) => {
          if (!s.wizard) return s;
          return {
            ...s,
            wizard: {
              ...s.wizard,
              selections: {
                ...s.wizard.selections,
                format: {
                  kind: p.kind ?? 'compare',
                  label: p.label,
                  isCustom: p.isCustom,
                },
              },
            },
          };
        }),
      expToggleTimeRange: (p) =>
        setExpChat((s) => {
          if (!s.wizard) return s;
          const cur = s.wizard.selections.timeRanges;
          const exists = cur.find((t) => t.id === p.id);
          const next = exists ? cur.filter((t) => t.id !== p.id) : [...cur, p];
          return {
            ...s,
            wizard: {
              ...s.wizard,
              selections: { ...s.wizard.selections, timeRanges: next },
            },
          };
        }),
      expSetDepth: (p) =>
        setExpChat((s) => {
          if (!s.wizard) return s;
          return {
            ...s,
            wizard: {
              ...s.wizard,
              selections: {
                ...s.wizard.selections,
                depth: { label: p.label, isCustom: p.isCustom },
              },
            },
          };
        }),
      expGoToStep: (step) =>
        setExpChat((s) => {
          if (!s.wizard) return s;
          if (step < 1 || step > 3) return s;
          return { ...s, wizard: { ...s.wizard, step: step as WizardStep } };
        }),
      expFinalize: () =>
        setExpChat((s) => {
          if (!s.wizard) return s;
          finalize(s.wizard.initialQuery, s.wizard.selections);
          return { draft: '', wizard: null };
        }),
      expSkipStep: () =>
        setExpChat((s) => {
          if (!s.wizard) return s;
          const { step } = s.wizard;
          if (step === 3) {
            finalize(s.wizard.initialQuery, s.wizard.selections);
            return { draft: '', wizard: null };
          }
          return {
            ...s,
            wizard: { ...s.wizard, step: (step + 1) as WizardStep },
          };
        }),
      expCloseModal: () => setExpChat((s) => ({ ...s, wizard: null })),
    }),
    [items, recDismissed, sheetOpen, sheetPrefill, experimentalActive, expChat],
  );

  return <ExploreCtx.Provider value={value}>{children}</ExploreCtx.Provider>;
}

export function useExplore(): Ctx {
  const c = useContext(ExploreCtx);
  if (!c) throw new Error('useExplore must be used inside ExploreProvider');
  return c;
}
