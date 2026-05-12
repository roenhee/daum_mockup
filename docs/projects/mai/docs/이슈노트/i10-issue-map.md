# I10 · 쟁점 구조도 노트 {#card-i10}

> 사회 이슈 안에서 다양한 입장을 2축 평면에 배치해 보여주는 노트.

## 목적

복잡한 사회 쟁점은 "찬/반"의 단순 구도로 환원하면 잃는 정보가 많다. i10는 두 개의 축 (예: 경제 영향 ↔ 안보 영향)을 정의하고 각 입장을 사분면에 배치해서 **입장의 다양성**을 시각화한다.

## 변종

- **policy (i10a)** — 정책 쟁점. 보통 정부·야당·시민 단체 등의 입장 배치
- **value (i10b)** — 가치 충돌형. 자유 vs 안전 같은 가치 축

## 노출 요소

- 헤더: 주제 칩 · 타이틀
- `question`: 쟁점 한 줄 (예: "AI 규제, 어떻게 그어야 하나?")
- `brief`: 개요
- 2축 라벨:
  - `axisX: { high, low }` 가로축 양극
  - `axisY: { high, low }` 세로축 양극
- `positions[]`: 사분면별 입장 (`quadrant: 1|2|3|4`, `label`, `detail`)
- `unresolvedQuestions[]`: 노트가 답하지 못한 열린 질문 목록 (정직성 장치)
- SourceRef 목록

## 데이터

```ts
IssueMapData: {
  variant: 'policy' | 'value'
  question, brief
  axisX: { high, low }, axisY: { high, low }
  positions: [{ quadrant, label, detail }]
  unresolvedQuestions: string[]
  sources: SourceRef[]
}
```

## 정책

- 입장이 한쪽에 몰려있으면(예: 모든 positions가 사분면 1) 노트 생성하지 않음 (i3 다매체 비교가 더 적합)
- 자동 생성된 axis 라벨은 사용자가 한 번 검토 후 발행하는 흐름 (편집자 게이팅 — 미구현, 단기 정책)
