# UI 패턴 레이어 사전 준비 지침

> Claude Code 에이전트용. 작업 시작 전 프로젝트 루트의 `CLAUDE.md` 를 먼저 읽을 것.
> 이 문서는 `CLAUDE.md` §5 "디렉토리 구조", §9 "디자인 토큰", §11 "코드 품질" 을 전제로 한다.

---

## 1. 이 작업의 목적

앞으로 오너가 **"이 화면의 이 섹션을 슬롯으로 빼줘"** 식으로 구체 요청을 순차적으로 줄 예정이다.
이번 작업은 그 요청을 받을 때 일관된 방식으로 슬롯을 만들 수 있도록 **토대와 컨벤션만** 준비한다.

### ⚠️ 이번 작업에서 구체 슬롯을 만들지 않는다

`MediaRow`, `HScroll` 같은 이름의 실제 파일을 **선제적으로 생성하지 말 것**. 오너가 요청하면 그때 §3 흐름을 따라 만든다.

---

## 2. 이번 작업에서 실제로 할 것

- [ ] `src/components/ui/patterns/` 디렉토리 생성
- [ ] `src/components/ui/patterns/.gitkeep` 추가 (빈 디렉토리 커밋 유지용)
- [ ] `src/components/ui/patterns/index.ts` 빈 barrel 파일 생성 (주석 한 줄 — 슬롯 추가 시 export 라인을 이 파일에 추가)
- [ ] 기존 코드에 영향 없는지 확인 (`tsc --noEmit` 통과)
- [ ] 끝. 이 이상 만들지 말 것.

---

## 3. 슬롯 추가 요청이 들어왔을 때의 흐름

오너 요청 예시:
> "홈탭의 헤드라인 캐러셀 섹션, 슬롯으로 만들어줘"

이때 Claude Code 는 아래 순서로 처리한다.

1. **스펙 확인** — `docs/02_daum_service_spec.md` 에서 해당 화면/섹션을 찾아 외형 파악
2. **이름 결정** — §4 네이밍 규칙에 따라 외형 기반 이름 선정. 도메인 이름(`News*`, `Home*`) 금지
3. **슬롯 구조 결정** — §5 인터페이스 규칙에 따라 `children` + 명명된 슬롯 props 설계
4. **파일 생성** — `src/components/ui/patterns/<Name>.tsx`. §6 템플릿에서 시작
5. **barrel 업데이트** — `src/components/ui/patterns/index.ts` 에 export 한 줄 추가
6. **사용처에 즉시 적용** — 요청받은 섹션에 실제로 import 해 연결
7. **검증** — `tsc --noEmit` 통과 + dev 서버에서 해당 섹션 및 주변 시각 회귀 없음 확인
8. **보고** — 만든 것, 결정한 인터페이스, 적용한 화면을 짧게 요약

---

## 4. 네이밍 규칙

- 파일명: PascalCase (`MediaRow.tsx`, `HScroll.tsx`)
- **외형/구조 기반 이름**. 도메인(서비스 영역) 이름 금지. 패턴은 탭을 가로질러 재사용되어야 함
- 자주 쓰일 suffix 참고:
  - `Row` — 가로 배치된 단일 아이템
  - `Tile` — 세로 배치된 단일 아이템 (그리드 셀)
  - `List` — 수직 리스트 컨테이너
  - `Bar` — 가로 스트립 (`ChipBar`, `ToolBar` 등)
  - `Scroll` / `HScroll` — 스크롤 컨테이너
  - `Header` / `Footer` — 섹션 구분자

**나쁜 이름 예**: `NewsCard`, `ShoppingProductTile`, `HomeHeadlineCarousel`
**좋은 이름 예**: `MediaRow`, `MediaTile`, `HScroll`

---

## 5. 인터페이스 규칙

### 5.1 본문은 항상 `children`

```tsx
interface Props {
  children: ReactNode;
  // ...
}
```

### 5.2 부가 슬롯은 named `ReactNode` prop

데이터를 직접 받지 말고 **조립된 노드**를 받는다. 그래야 호출자가 `<Thumbnail>`, `<ArticleMeta>`, `<Badge>` 같은 기존 atom 을 자유롭게 꽂을 수 있다.

```tsx
// ❌ 나쁨: 데이터를 직접 받음 → props 폭발의 시작
thumbnailUrl: string;
thumbnailRatio: '4/3' | '1/1' | '16/9';
thumbnailWidth: number;

// ✅ 좋음: 조립된 노드 수령
thumbnail: ReactNode;
```

관례적 슬롯 이름:
- `thumbnail` — 미디어 슬롯
- `leading` / `trailing` — 좌/우 보조 슬롯
- `header` / `footer` — 상/하단 보조
- `action` — 액션 버튼 슬롯

### 5.3 표준 props

모든 슬롯 공통:
- `className?: string` — 외부에서 override 가능
- `onClick?: () => void` — 필요 시

### 5.4 boolean variant 는 최대 2개

`reverse`, `compact`, `noDivider` 같은 boolean flag 는 1~2개까지 허용. 3개 이상 분기가 필요하면 **슬롯을 분리**하거나 **별도 패턴으로 분리**.

### 5.5 `any` 금지

CLAUDE.md §11 준수. 제네릭이 필요하면 제네릭 사용.

---

## 6. 파일 템플릿

새 슬롯을 만들 때 아래에서 시작한다.

```tsx
/**
 * <SlotName>
 *
 * 용도: (한 줄)
 * 사용처: (해당 화면/섹션 나열. 최초 추가 시 1곳이어도 OK, 이후 재사용마다 추가)
 * 참조: docs/02_daum_service_spec.md §...
 *
 * 사용 예:
 * ```tsx
 * <SlotName thumbnail={<Thumbnail src="..." ratio="4/3" />}>
 *   <h3 className="text-[15px] font-medium line-clamp-2">제목</h3>
 *   <ArticleMeta source="..." time="..." />
 * </SlotName>
 * ```
 */
import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SlotNameProps {
  children: ReactNode;
  // 필요한 명명된 슬롯들
  className?: string;
  onClick?: () => void;
}

export function SlotName({ children, className, onClick }: SlotNameProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        // 기본 레이아웃 클래스
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
}
```

---

## 7. 금지사항

- ❌ **이번 작업에서 구체 슬롯 선제 생성** — 오너 요청 후에만
- ❌ 도메인 이름 사용 (`NewsCard`, `ShoppingTile`)
- ❌ 데이터를 직접 받는 props (`title: string`, `thumbnailUrl: string` 등)
- ❌ boolean variant 3개 이상
- ❌ 기존 `components/contents/*Card.tsx` 류 수정·삭제 (별도 지시 전까지 그대로 둠)
- ❌ 일괄 `sed`/치환 (CLAUDE.md §9)
- ❌ `any`

---

## 8. 이번 작업 완료 기준

- [ ] `src/components/ui/patterns/` 디렉토리 생성됨
- [ ] `.gitkeep` 존재
- [ ] `index.ts` 빈 barrel 파일 존재 (주석 한 줄만)
- [ ] `tsc --noEmit` 통과 (기존 코드에 영향 없음)
- [ ] dev 서버 기동 시 기존 화면 영향 없음
- [ ] "다음 슬롯 요청을 받을 준비 완료" 라고 보고

---

## 9. 애매할 때는 오너에게 질문

- 요청받은 슬롯이 기존 atom (`Thumbnail`, `ArticleMeta` 등) 과 역할이 겹칠 때
- 이름을 외형 기반으로 짓기 어렵고 도메인성이 강해 보일 때
- `docs/02_daum_service_spec.md` 와 현재 구현이 어긋날 때 (스펙 우선 — CLAUDE.md §13)

---

## 10. 현재 등록된 슬롯 (registry)

슬롯이 추가·수정될 때마다 이 섹션을 업데이트한다. 소비 위치 목록과 변형 선택 기준을 같이 적어 두면 다음 세션에서도 규약이 유지된다.

### 10.1 `TextList` / `TextListItem`
**파일**: `src/components/ui/patterns/TextList.tsx`

**용도**: 구분선으로 나뉜 한 줄 텍스트 세로 리스트. 탭을 가로질러 재사용되는 범용 슬롯.

**레이아웃 보장**:
- 컨테이너: `<ul>` + `divide-y divide-gray-100 px-4`
- 각 아이템: `<li>` + 내부 링크/텍스트 `block py-[11px] text-[14px] leading-snug text-gray-900 truncate`
- `TextListItem`의 `to` 있으면 `<Link>`, 없으면 `<span>` (비클릭)

**호출자 조립 규칙**:
- 굵은 제목(뉴스 헤드라인 류)에는 `className="font-medium"` 주입
- 일반 텍스트(스포츠/연예/머니 속보 리스트 류)에는 className 생략

**사용처**:
- `components/contents/MajorHeadlines.tsx` — 뉴스 서브탭 주요 뉴스 (bold, clickable)
- `components/contents/MoreHeadlines.tsx` — 뉴스 서브탭 많이 본 뉴스 (bold, clickable)
- `components/news/RecommendHeadlineSection.tsx` — 뉴스 상세 이 시각 추천뉴스 (bold, clickable)
- `components/contents/TextArticleList.tsx` — 스포츠/연예/머니 서브탭의 텍스트 리스트 4곳 (regular, non-clickable)

### 10.2 `ThumbRow`
**파일**: `src/components/ui/patterns/ThumbRow.tsx`

**용도**: 썸네일 + 텍스트 컬럼(제목) 가로 배치 + 옵셔널 footer 행. 뉴스·연예·스포츠·머니 등 콘텐츠 피드의 기본 row.

**레이아웃 보장**:
- 외곽: `<Link>` + `block px-4 py-3 border-b border-gray-100`
- 상단 row: `flex gap-4` — 텍스트 컬럼(`flex-1 min-w-0`) + 썸네일(`shrink-0 w-[72px] h-[72px] rounded-md overflow-hidden`)
- 하단 row (옵셔널): `footer` 슬롯이 전체 너비로 `mt-2`에 렌더

**타이틀 관례 (호출자 책임)**:
- `text-[14px] leading-snug font-semibold line-clamp-2 text-gray-900`

**변형 선택 기준** ⚠️:

두 가지 변형이 있으며, **새 위치 추가 시 반드시 하나를 선택**해야 한다.

#### 변형 A — 홈 스타일 (footer prop)
```tsx
<ThumbRow to="..." thumbnail={...} footer={<메타 행 (전체 너비)>}>
  <h3>제목</h3>
</ThumbRow>
```
매체명·시간·더보기 등 메타가 **썸네일 아래 전체 너비 row**로 따로 감.

**쓰는 기준**: 홈탭처럼 피드가 주인공이고 공간감·가독성이 우선일 때.

#### 변형 B — 콘텐츠탭 스타일 (children 내부)
```tsx
<ThumbRow to="..." thumbnail={...}>
  <div className="h-full flex flex-col justify-between">
    <h3>제목</h3>
    <ArticleMeta ... />
  </div>
</ThumbRow>
```
메타가 **텍스트 컬럼 내부에 pin**되어 **이미지 하단 edge와 정렬**됨. 카드가 더 compact.

**쓰는 기준**: 서브탭/리스트 맥락에서 여러 섹션이 겹쳐 있어 정보 밀도가 중요할 때.

**사용처**:
- `components/home/NewsFeed.tsx` — 홈탭 피드 4곳 (변형 A, 채널 뱃지·MoreIcon 포함)
- `components/contents/HeadlineList.tsx` — 콘텐츠탭 연예/스포츠/머니 서브탭 10곳 (변형 B)

### 10.3 신규 슬롯 등록 시 체크리스트
- [ ] 이 섹션에 용도·레이아웃 보장·호출자 관례·사용처 추가
- [ ] 변형이 2개 이상이면 선택 기준 명시
- [ ] 기존 슬롯과 역할이 겹치지 않는지 확인
