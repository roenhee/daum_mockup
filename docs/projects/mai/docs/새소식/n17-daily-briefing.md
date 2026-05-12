# N17 · 데일리 브리핑 카드 {#card-n17}

> 아침/저녁 정기 브리핑. 음성 재생 가능한 N분짜리 요약.

## 목적

피드를 매번 훑지 않고도 하루 중 한 번 정리된 요약을 제공. AI 어시스턴트의 가장 명시적인 가치 노출 지점.

## 변종

- **morning** — 아침 7~9시 노출. 어젯밤 + 오늘 아침 이슈 묶음
- **evening** — 저녁 7~9시 노출. 하루 동안의 핵심 요약

## 노출 요소

- 그라데이션 액센트 배경 (variant별 컬러)
- 제목 + duration ("3분", "5분")
- 키워드 칩 ×N
- 요약 텍스트 2~3줄
- 큰 ▶ 재생 버튼 (M:AI Player 호출)
- 텍스트로 보기 옵션
- 푸터: 기반 기사 수, 다음 브리핑 라벨

## 데이터

```ts
BriefingData: { variant, title, duration, keywords[], summary, basedOnCount, nextLabel, thumbnailSeed? }
```

## 상호작용

- 재생 버튼 탭 → `MaiPlayer` 띄움 (mini player로 축소 가능)
- 텍스트로 보기 → 새 라우트 또는 인앱 시트로 풀텍스트 노출 (미구현)
