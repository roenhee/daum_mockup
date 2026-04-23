# Daum Service Mockup

Daum 모바일 앱의 웹 기반 인터랙티브 목업. 신규 AI 기능 기획·리뷰용으로 사용.

## 핵심 특징

- 🖥 **데스크탑**: 화면 중앙에 폰 프레임이 뜨고, 그 안에서 Daum 앱이 동작
- 📱 **모바일**: 폰 프레임 없이 풀스크린 웹뷰로 바로 동작
- ⚛️ Vite + React + TypeScript + Tailwind CSS

## 시작하기

```bash
# 의존성 설치 (처음 한 번만)
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

개발 서버가 뜨면 `http://localhost:5173` 에서 확인.

- 브라우저 창을 넓게(1024px+) → 폰 프레임 뷰
- 브라우저 창을 좁게(~1023px) 또는 실제 모바일에서 접속 → 풀스크린 뷰

## 프로젝트가 아직 초기화되지 않았다면

Claude Code가 `CLAUDE.md` §4 "초기 세팅"을 참조해 프로젝트를 스캐폴딩한다.

## 문서 구조

- `CLAUDE.md` — **Claude Code 에이전트가 먼저 읽는 가이드**
- `docs/01_daum_context.md` — Daum 서비스 전체 컨텍스트
- `docs/02_daum_service_spec.md` — 화면별 UI 스펙 (Ground Truth)
- `docs/mockup_plan.md` — 이 목업 프로젝트의 구현 계획

## Claude Code 시작하기

프로젝트 루트에서:

```bash
claude
```

Claude Code가 자동으로 `CLAUDE.md`를 읽어 프로젝트 맥락을 파악한다.
첫 프롬프트 예시:

> "CLAUDE.md를 읽고 프로젝트를 초기 세팅한 뒤, 홈탭부터 만들어줘."

## 작업 우선순위

`CLAUDE.md` §7 "구현 우선순위" 참조. 기본 순서:

1. PhoneFrame 컴포넌트 (반응형 래퍼)
2. AppShell + BottomTabBar
3. 홈탭
4. 콘텐츠탭 (뉴스 서브탭)
5. 뉴스 기사 상세
6. 검색, 채널뷰, 나머지 탭들

## 라이선스

내부 기획용. 외부 공개 금지.
