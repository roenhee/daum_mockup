# I6 · 교차 이슈 분석 {#card-i6}

> 두 개의 이슈가 교차하는 지점을 분석. 보통은 따로 다루지만 영향을 주고받는 관계를 드러낸다.

## 목적

이슈는 고립되어 있지 않다. "이란 전쟁"과 "국제 유가", "AI 규제"와 "반도체 수출" 같은 교차점을 i6가 명시적으로 묶어준다. 사용자가 단일 키워드 시야에 갇히지 않도록.

## 변종

- **direct (i6a)** — A × B 교차. 동시에 영향 주고받는 관계
- **transition (i6b)** — A → B 전이. A에서 B로 옮겨가는 흐름

## 노출 요소

- 헤더: 주제 칩 (보통 2개) · 타이틀
- `topicA` × `topicB` 또는 → (variant에 따라)
- `intersection`: 교차점 한 줄
- `brief`: 통합 개요
- `flow[]`: 사이드 별 본문
  - `side: 'a' | 'cross' | 'b'`
  - A 입장 → 교차점 → B 입장 순서
- `implication`: 통합 시사점
- `confidence`: 전체 노트 확신도
- SourceRef 목록

## 데이터

```ts
CrossIssueData: {
  variant: 'direct' | 'transition'
  topicA, topicB, intersection, brief
  flow: [{ side, label, body }]
  implication
  confidence
  sources: SourceRef[]
}
```

## 정책

- 두 주제가 같은 기사에서 동시 언급된 횟수가 일정 임계 이상일 때만 자동 합성
- 사용자가 직접 두 키워드를 선택해 요청할 수도 있음 (AI 탐구 탭 경로)
