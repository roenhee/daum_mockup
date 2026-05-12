# I4 · 주간 리포트 {#card-i4}

> 일주일 단위로 정리하는 더 두꺼운 노트. 일별 다이제스트(i1) 보다 한 단계 위.

## 목적

i1·i2가 짧은 시간 단위라면 i4는 **일주일을 통째로 회고**한다. 주간 보도량 추이, 주요 단계, 다음 주 관전 포인트까지 한 노트로.

## 변종

- **single (i4a)** — 단일 주제 주간 리포트
- **portfolio (i4b)** — 사용자 등록 키워드 N개를 한눈에 보는 매트릭스형 리포트

## 노출 요소

- 헤더: 주제 칩 · 타이틀 · `weekLabel` ("4월 4주차")
- `brief`: 주간 흐름 한 줄
- `sections[]`: 섹션 단위 본문
  - `heading`, `body`
  - `chart?`: 보도량 미니 차트 (7일치)
  - `confidence`: 섹션별 확신도
- `matrix?` (portfolio 전용): 키워드별 한 줄
  - `keyword`, `volumeChange`, `tone: up/flat/down`, `series: number[]` (일별)
- SourceRef 목록

## 데이터

```ts
WeeklyReportData: {
  variant: 'single' | 'portfolio'
  weekLabel: string
  brief: string
  sections: [{ heading, body, chart?, confidence? }]
  matrix?: [{ keyword, volumeChange, tone, series }]
  sources: SourceRef[]
}
```

## 합성 트리거

- 매주 일요일 저녁 또는 월요일 새벽 자동 생성
- 주간 기사 수 50건 이상인 키워드에 대해서만 생성
