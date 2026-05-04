import { SLOT_KIND_META, type SlotKind } from '@/mocks/maiExplore';

// 슬롯 타입별 미니 시각 — 스펙: "상관도=점, 비교=칸, 타임라인=선, 오디오=웨이브폼 등"
// `bare`가 true이면 컬러 틴트 박스 없이 SVG만 렌더(메타 행의 인라인 아이콘 용도).
export function SlotThumbnail({
  kind,
  size = 64,
  bare = false,
}: {
  kind: SlotKind;
  size?: number;
  bare?: boolean;
}) {
  const meta = SLOT_KIND_META[kind];
  const viz = (
    <>
      {kind === 'compare' && <CompareViz color={meta.color} />}
      {kind === 'correlation' && <CorrelationViz color={meta.color} />}
      {kind === 'timeline' && <TimelineViz color={meta.color} />}
      {kind === 'profile' && <ProfileViz color={meta.color} />}
      {kind === 'scenario' && <ScenarioViz color={meta.color} />}
      {kind === 'audio' && <AudioViz color={meta.color} />}
    </>
  );
  if (bare) {
    return (
      <span
        className="inline-flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
        aria-hidden
      >
        {viz}
      </span>
    );
  }
  return (
    <div
      className="rounded-card flex items-center justify-center shrink-0 overflow-hidden"
      style={{ width: size, height: size, background: meta.tint }}
      aria-hidden
    >
      {viz}
    </div>
  );
}

function CompareViz({ color }: { color: string }) {
  // 2x2 비교 매트릭스 미니
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <rect x="6" y="6" width="13" height="13" rx="2" fill={color} opacity="0.85" />
      <rect x="21" y="6" width="13" height="13" rx="2" fill={color} opacity="0.35" />
      <rect x="6" y="21" width="13" height="13" rx="2" fill={color} opacity="0.35" />
      <rect x="21" y="21" width="13" height="13" rx="2" fill={color} opacity="0.85" />
    </svg>
  );
}

function CorrelationViz({ color }: { color: string }) {
  // 산점도 — 점들의 우상향 분포
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <line x1="6" y1="34" x2="34" y2="34" stroke={color} strokeOpacity="0.25" strokeWidth="1" />
      <line x1="6" y1="34" x2="6" y2="6" stroke={color} strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="11" cy="29" r="2" fill={color} />
      <circle cx="16" cy="24" r="2" fill={color} />
      <circle cx="20" cy="20" r="2" fill={color} />
      <circle cx="24" cy="16" r="2" fill={color} opacity="0.7" />
      <circle cx="29" cy="11" r="2" fill={color} />
      <circle cx="14" cy="20" r="1.6" fill={color} opacity="0.5" />
      <circle cx="26" cy="22" r="1.6" fill={color} opacity="0.5" />
    </svg>
  );
}

function TimelineViz({ color }: { color: string }) {
  // 가로 타임라인 + 노드
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <line x1="4" y1="20" x2="36" y2="20" stroke={color} strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="9" cy="20" r="3" fill={color} />
      <circle cx="20" cy="20" r="3" fill={color} />
      <circle cx="31" cy="20" r="3" fill={color} />
      <line x1="9" y1="20" x2="9" y2="11" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <line x1="20" y1="20" x2="20" y2="29" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <line x1="31" y1="20" x2="31" y2="13" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
    </svg>
  );
}

function ProfileViz({ color }: { color: string }) {
  // 인물 실루엣 + 둘레 정보 점
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <circle cx="20" cy="16" r="5" fill={color} opacity="0.85" />
      <path d="M10 32 Q 20 22 30 32 Z" fill={color} opacity="0.85" />
      <circle cx="6" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="34" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="6" cy="32" r="1.5" fill={color} opacity="0.5" />
      <circle cx="34" cy="32" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function ScenarioViz({ color }: { color: string }) {
  // 갈래 길 — 한 점에서 3가지로 분기
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <circle cx="8" cy="20" r="2.5" fill={color} />
      <path d="M10 20 L 28 8" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
      <path d="M10 20 L 30 20" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
      <path d="M10 20 L 28 32" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
      <circle cx="30" cy="8" r="2.5" fill={color} opacity="0.85" />
      <circle cx="32" cy="20" r="2.5" fill={color} opacity="0.85" />
      <circle cx="30" cy="32" r="2.5" fill={color} opacity="0.85" />
    </svg>
  );
}

function AudioViz({ color }: { color: string }) {
  // 웨이브폼
  const heights = [10, 18, 26, 14, 22, 30, 16, 12, 24, 18, 8];
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={3 + i * 3.2}
          y={20 - h / 2}
          width="2"
          height={h}
          rx="1"
          fill={color}
          opacity={0.6 + (i % 3) * 0.13}
        />
      ))}
    </svg>
  );
}
