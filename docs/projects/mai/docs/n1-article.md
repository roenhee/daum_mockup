# N1 · 뉴스 기사 카드 {#card-n1}

> 가장 표준적인 뉴스 카드. 단일 매체(n1a) 또는 여러 매체(n1b) 두 가지 변종.

## 목적

피드의 기본 단위. 사용자가 관심사 기반으로 받아본 개별 기사를 한 장의 카드로 표현.

## 변종

### n1a — 단일 매체 기사 {#card-n1a}

- 한 매체에서 단독 보도한 기사 1건
- 노출 요소: 매체 로고·이름, 경과 시간, 키워드 칩, 제목, 요약 1~2줄, 썸네일 1장
- 옵션: `contextTag` (예: "단독", "현장")가 있으면 매체명 옆에 배지로 표시

### n1b — 다매체 묶음 기사 {#card-n1b}

- 같은 사건을 다룬 N개 매체를 한 카드로 번들
- 대표 매체(lead) + "외 N개 매체" 라벨
- 카드 클릭 시 bottom sheet 열고 다른 매체들의 헤드라인 리스트 표시 (`otherPublishers[]`)

## 데이터 (`maiNews.ts`)

```ts
ArticleSingleData: { publisher, elapsed, keywords[], title, summary, contextTag?, thumbnail* }
ArticleMultiData:  { leadPublisher, otherCount, elapsed, keywords[], title, summary,
                     otherPublishers[]?, thumbnail* }
```

## 노출 규칙

- 피드에서는 **stream(가로 스트림)** 으로 2~3개 묶어 보여주는 경우가 많음 (UI 패턴: `MaiNewsCards.tsx` stream mode)
- 단독 노출 시 full-width 카드

## 상호작용

- 카드 탭 → 뉴스 상세 `/news/:id`
- `저장` 액션 → `history.saved`
- `공유` → OS share sheet
