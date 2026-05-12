# I1 · 데일리 다이제스트 {#card-i1}

> 매일 아침/저녁에 그 날의 핵심을 3건 내외로 정리해주는 노트.

## 목적

새소식 피드는 "**원자 단위**"의 정보를 빠르게 흘려보내는 곳. 이슈노트는 그 위에서 **하루 흐름의 의미**를 합성한다. 사용자가 종일 피드를 다 보지 못해도 i1 한 장으로 그날의 키워드 흐름을 잡을 수 있게 한다.

## 변종

- **single (i1a)** — 단일 주제 다이제스트 (예: "오늘 이란 전쟁 핵심 3가지")
- **integrated (i1b)** — 다중 키워드 통합 다이제스트 — 사용자 등록 키워드 N개를 한 노트로 묶음

## 노출 요소

- 헤더: 주제 칩(회색) · 노트 타이틀 · 발행 번호 (`No. 142`) · 생성 시각 · 기반 기사 수
- 접힘 상태: `brief` 3줄 요약
- 펼침 상태: `items[]` 이벤트별 한 줄 (`headline` + `detail` + 출처)
- 푸터: SourceRef 목록 (매체·기사·경과 시간)
- 테마: `default` 흰색 카드뉴스 / `warm` 따뜻한 톤 (특별 강조용)

## 데이터

```ts
DailyDigestData: {
  variant: 'single' | 'integrated'
  theme?: 'default' | 'warm'
  topics: string[], title, issueNo, generatedAt, basedOnCount
  brief                                  // 3줄 요약
  items: [{ headline, detail, sources }]
  integratedKeywordCount?                // 통합형에서 키워드 인덱스
  sources: SourceRef[]
}
```

## 합성 트리거

- 아침 다이제스트: 6~9시 사이 자동
- 저녁 다이제스트: 18~21시 사이 자동
- 기반 기사 수가 너무 적으면(예: 5건 미만) 합성하지 않고 skip
