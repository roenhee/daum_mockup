# N8 · 후속 콘텐츠 연결 카드 {#card-n8}

> 사용자가 이미 본 기사의 후속 기사를 연결해주는 카드.

## 목적

뉴스 소비의 **연속성** 확보. 시리즈 기사나 같은 기자의 새 기사를 자동으로 묶어 보여주면 사용자가 흩어진 정보를 따라가기 쉽다.

## 변종

- **series (n8a)** — 같은 시리즈/주제 흐름의 후속편
- **byline (n8b)** — 사용자가 반응했던 기자(byline)의 새 기사

## 노출 요소

- 상단 `observation` — "이 기사를 5/10에 보셨네요" 같은 회상 텍스트
- 원본 기사 카드 (작은 thumbnail + sourceTitle + sourceMeta)
- 수직 타임라인 라인
- 추천 후속 기사 (publisher / byline / title / elapsed)

## 데이터

```ts
FollowupData: { variant, observation, sourceTitle?, sourceMeta?, publisher, byline?, title, elapsed }
```

## 상호작용

- 카드 탭 → 후속 기사 상세
- 회상 헤더의 원본 기사 탭 → 원본 기사 상세
