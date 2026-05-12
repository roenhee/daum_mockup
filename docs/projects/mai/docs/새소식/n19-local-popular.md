# N19 · 지역 인기 기사 카드 {#card-n19}

> 사용자 위치 또는 등록 지역에서 인기 있는 기사 묶음.

## 목적

뉴스 소비가 거시 이슈에 편중되지 않도록 지역 이슈를 일부 노출. 광역(metro)과 동네(neighborhood) 두 스코프.

## 변종

- **neighborhood** — 등록한 동네 (예: "잠실동") 기준
- **metro** — 광역시도 (예: "서울") 기준

## 노출 요소

- 헤더: 지역명 + 스코프 라벨
- 기사 리스트 ×N (보통 3건)
  - emoji + 제목 + 매체명 + 경과시간
  - `trending: true` 인 기사에는 "급상승" 배지

## 데이터

```ts
LocalPopularData: {
  region, scope, items: [{ emoji, title, publisher, elapsed, trending? }]
}
```

## 상호작용

- 기사 탭 → 뉴스 상세
- 헤더 탭 → 지역 채널뷰 (미구현)
