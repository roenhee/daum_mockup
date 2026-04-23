/**
 * ThumbRow
 *
 * 용도: 썸네일 + 텍스트 컬럼(제목)이 가로로 배치되고, 그 아래 전체 너비 메타 행을
 *       옵션으로 갖는 카드. 뉴스·연예·스포츠·머니·채널 등 콘텐츠 피드의 기본 row.
 * 사용처: home/NewsFeed, contents/HeadlineList
 * 참조: docs/02_daum_service_spec.md §2-1 홈탭, §2-2 콘텐츠탭
 *
 * 레이아웃 보장:
 * - 상단 row: 텍스트 컬럼(flex-1) + 썸네일 72×72 (오른쪽)
 * - 하단 row(옵셔널): footer 슬롯이 상단 row 아래 전체 너비로 렌더링
 * - 아이템 하단 구분선 (마지막 아이템에도 적용)
 * - Link 래핑 (전체 영역 클릭 가능)
 *
 * 타이틀 스타일은 children 호출자 책임 (관례: text-[14px] semibold line-clamp-2).
 * Footer 슬롯은 매체명·발행시간·더보기 등 메타 정보 용도.
 *
 * 사용 예:
 * ```tsx
 * <ThumbRow
 *   to={`/news/${article.id}`}
 *   thumbnail={<img src={article.thumbnailUrl} className="w-full h-full object-cover" alt="" />}
 *   footer={<ArticleMeta publisher={article.publisher} elapsed={article.elapsed} />}
 * >
 *   <h3 className="text-[14px] leading-snug font-semibold line-clamp-2 text-gray-900">
 *     {article.title}
 *   </h3>
 * </ThumbRow>
 * ```
 */
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

interface ThumbRowProps {
  children: ReactNode;
  to: string;
  thumbnail: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function ThumbRow({ children, to, thumbnail, footer, className }: ThumbRowProps) {
  return (
    <Link
      to={to}
      className={cn(
        'block px-4 py-3 border-b border-gray-100',
        className,
      )}
    >
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">{children}</div>
        <div className="shrink-0 w-[72px] h-[72px] rounded-md overflow-hidden bg-gray-100">
          {thumbnail}
        </div>
      </div>
      {footer ? <div className="mt-2">{footer}</div> : null}
    </Link>
  );
}
