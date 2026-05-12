# I3 · 다매체 논조 비교 {#card-i3}

> 같은 사건을 다룬 여러 매체의 시각을 한 화면에 나란히 보여준다.

## 목적

언론사마다 같은 사실을 다르게 프레임한다. i3는 그 차이를 **fact**와 **framing**으로 분리해서 보여줘 사용자가 편향 없이 사건을 이해할 수 있게 한다.

## 노출 요소

- 헤더: 주제 칩 · 타이틀
- `factHeadline`: 매체들이 공통으로 인정한 사실 한 줄
- `crossCheckRatio`: "교차 확인 8/8" — 몇 개 매체가 같은 사실을 보도했는지
- `brief`: 차이의 핵심 한 줄
- `stances[]`: 매체별 시각
  - 매체 로고 · 매체명
  - `framing` 한 줄: 매체의 관점
  - `quote`: 매체에서 따온 짧은 인용
- SourceRef 목록

## 데이터

```ts
MultiOutletData: {
  factHeadline: string
  crossCheckRatio: string
  brief: string
  stances: [{ outlet, outletLogoSeed, framing, quote }]
  sources: SourceRef[]
}
```

## 정책

- 매체 3개 이상에서 보도된 사건만 합성 대상
- framing 텍스트는 매체의 톤을 평가하지 않고 **있는 그대로 인용·요약**한다 (편향 평가는 노트 작성 범위 밖)
