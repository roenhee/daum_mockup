# I30 · 위클리 딥다이브 오디오 {#card-i30}

> 일주일치 이슈를 10분 내외 오디오로 만들어주는 노트. M:AI Player 재생.

## 목적

텍스트 노트(i1·i4)로 정리되는 흐름과 별개로, **이동 중·운전 중·운동 중**에도 흡수할 수 있는 형태가 필요. i30은 일주일 분량을 오디오 챕터로 묶어준다.

## 변종

- **single (i30a)** — 단일 주제 딥다이브
- **integrated (i30b)** — 등록 키워드 N개 통합 딥다이브

## 노출 요소

- 헤더: 주제 칩 · 타이틀 · `weekLabel` ("4월 4주차")
- `totalDuration`: 전체 분량 ("약 11분")
- `chapters[]`: 챕터 리스트 — `title`, `duration` (예: "2:10")
- `brief`: 한 줄 요약
- 큰 ▶ 재생 버튼 (M:AI Player 호출, mini player 자동 표시)
- 챕터별 점프 가능

## 데이터

```ts
DeepdiveAudioData: {
  variant: 'single' | 'integrated'
  weekLabel, totalDuration
  chapters: [{ title, duration }]
  brief
}
```

## 합성 트리거

- 매주 금요일 또는 토요일 자동
- 챕터 수 5~7개가 적정. 12개 넘으면 분할 발행
- 오디오 합성은 별도 TTS 백엔드. 실패 시 텍스트 폴백
