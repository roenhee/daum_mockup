# N20 · 코호트 기반 카드 {#card-n20}

> 나와 비슷한 관심사를 가진 사용자 그룹(cohort)이 보는 콘텐츠.

## 목적

알고리즘 추천의 "왜?"에 답을 주는 카드. 단순 "당신이 좋아할 만한"이 아니라 **"비슷한 관심사를 가진 N명이 이번 주 새로 본"** 처럼 cohort 근거를 명시.

## 변종

### n20a — 코호트 인기 기사 {#card-n20a}

- 같은 관심사 cohort 가 이번 주 가장 많이 본 기사
- 헤더에 cohort 정의 ("호르무즈 + 호르무즈해협 키워드를 함께 구독한 1.2k명") + 표본 수

### n20b — 코호트 신규 구독 {#card-n20b}

- 같은 cohort 가 이번 주 새로 구독한 키워드
- 키워드 칩 ×N + add count ("이번 주 +340명")

## 데이터

```ts
CohortPopularData: { cohortLabel, sampleSize, items: ArticleRefs[] }
CohortNewSubData:  { cohortLabel, sampleSize, keywords: [{ keyword, addCount }] }
```

## 정책

- cohort 정의는 사용자에게 항상 노출 (블랙박스 추천 회피)
- 표본 수가 50명 미만이면 카드를 노출하지 않음 (개인 식별 우려)
