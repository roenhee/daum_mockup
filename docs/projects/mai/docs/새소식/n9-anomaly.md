# N9 · 이상 신호 카드 {#card-n9}

> 환경(날씨·교통·미세먼지) 또는 자산(주가·코인) 가격에서 이상치가 감지될 때 노출.

## 목적

뉴스 피드 안에서 사용자에게 즉시 행동이 필요한 신호를 분리해서 강조. 기사 카드와 다른 시각 톤(emoji + 강한 색)으로 구분.

## 변종

### n9a — 환경 이상 {#card-n9a}

- 비/교통/미세먼지/한파/폭염 등 `tone` 으로 색감 구분
- 노출: emoji, headline, detail, action suggestion ("우산 챙기세요" 등), source

### n9b — 자산 가격 이상 {#card-n9b}

- 주식·암호화폐 가격 급변
- 노출: 자산명, 방향 화살표(up/down), 변동률 라벨, 스파크라인 그래프, 관측 문구, source

## 데이터

```ts
EnvAnomalyData:   { context, emoji, tone?, headline, detail, action, source }
AssetAnomalyData: { context, asset, direction, changeLabel, detail, observation, source, spark: number[] }
```

## 노출 규칙

- 피드 흐름 중간에 inline. 너무 자주 노출되면 피로감 → 백엔드에서 빈도 제한 필요 (현재 mock 데이터에선 미반영)
- 색감 tone 매핑 표는 `MaiNewsCards.tsx` 의 `ENV_TONE_PALETTE` 참조
