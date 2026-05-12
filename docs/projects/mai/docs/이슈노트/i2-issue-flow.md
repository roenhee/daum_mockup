# I2 · 이슈 흐름 정리 {#card-i2}

> 진행 중인 이슈의 시간순 흐름을 정리한 노트. "지금 어디까지 왔지?"에 답한다.

## 목적

큰 이슈는 여러 날에 걸쳐 진행되어 사용자가 중간부터 끼어들기 어렵다. i2는 **타임라인** 형태로 시작부터 현재까지의 전개를 보여줘서 새로 진입한 사용자도 맥락을 따라잡을 수 있게 한다.

## 변종

- **ongoing (i2a)** — 현재 진행 중인 이슈. 마지막 단계가 "현재 상태"로 표시
- **closed (i2b)** — 일단락된 이슈. 종결 메모 (`postscript`) 추가

## 노출 요소

- 헤더: 주제 칩 · 타이틀 · 기간 라벨 (`최근 5일` / `4월 8일~17일(9박 10일)`)
- `brief`: 흐름 한 줄 개요
- `steps[]`: 시간순 단계 — `marker` (D-N / W-N / 날짜), 제목, 상세, confidence
- 푸터: 현재 상태 라벨 (ongoing) 또는 종결 메모 (closed)
- SourceRef 목록

## 데이터

```ts
IssueFlowData: {
  variant: 'ongoing' | 'closed'
  rangeLabel: string
  brief: string
  steps: [{ marker, date?, title, detail?, confidence? }]
  statusLabel: string                    // ongoing: 현재 / closed: 종결
  postscript?: string                    // closed에서 후일담
  sources: SourceRef[]
}
```

## 정책

- step 당 confidence 표시 (L1~L5)
- 진행 단계가 1개뿐이면 노트 생성하지 않음 (i1으로 충분)
