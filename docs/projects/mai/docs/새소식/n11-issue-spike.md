# N11 · 이슈 보도량 급증 카드 {#card-n11}

> 특정 키워드 또는 새 키워드의 보도량이 평소 대비 급증했을 때 노출.

## 목적

세상에서 지금 "터지고 있는" 이슈를 빠르게 감지하게 한다. 단순 인기 순위가 아니라 **보도량 변화**가 신호.

## 변종

- **volume** — 기존 키워드의 보도량 급증 (예: "호르무즈, 평소 ×4.6 배")
- **newKeyword** — 신규 키워드 등장 (예: "새 키워드: 호르무즈 통항")

## 노출 요소

- 키워드 + 배율(or 신규 라벨)
- 스파크 막대 그래프 (`spark: number[]`)
- 원인 추정 (`cause`) + confidence 레벨 (L2/L3/L4)
- 관련 기사 수

## 데이터

```ts
SpikeData: { mode, keyword, multiplier?, baseline?, newKeyword?, newCount?,
             cause, causeConfidence, articleCount, spark: number[] }
```

## 상호작용

- 카드 탭 → 해당 키워드 채널뷰 (이슈 묶음 자동 적용)
- `causeConfidence === 'L2'` 일 때 안내 텍스트 "추정 정확도 낮음" 표시 (정책 협의 중)
