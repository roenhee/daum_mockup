/**
 * TextList / TextListItem
 *
 * 용도: 구분선으로 나뉜 텍스트 한 줄짜리 세로 리스트 컨테이너 + 아이템.
 *       탭을 가로질러 재사용되는 범용 슬롯.
 * 사용처: contents/MajorHeadlines, contents/MoreHeadlines,
 *        contents/TextArticleList, news/RecommendHeadlineSection
 * 참조: docs/02_daum_service_spec.md §2-2, §2-2-3 (스포츠/연예/머니 서브탭), §3-1
 *
 * 사용 예:
 * ```tsx
 * // 클릭 가능한 헤드라인 (Bold)
 * <TextList>
 *   {items.map((it) => (
 *     <TextListItem key={it.id} to={`/news/${it.id}`} className="font-medium">
 *       {it.title}
 *     </TextListItem>
 *   ))}
 * </TextList>
 *
 * // 비클릭 텍스트 리스트 (Regular)
 * <TextList>
 *   {items.map((it) => (
 *     <TextListItem key={it.id}>{it.title}</TextListItem>
 *   ))}
 * </TextList>
 * ```
 */
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

interface TextListProps {
  children: ReactNode;
  className?: string;
}

export function TextList({ children, className }: TextListProps) {
  return (
    <ul className={cn('divide-y divide-gray-100 px-4', className)}>
      {children}
    </ul>
  );
}

interface TextListItemProps {
  children: ReactNode;
  to?: string;
  className?: string;
}

export function TextListItem({ children, to, className }: TextListItemProps) {
  const rowClass = cn(
    'block py-[11px] text-[14px] leading-snug text-gray-900 truncate',
    className,
  );
  return (
    <li>
      {to ? (
        <Link to={to} className={rowClass}>
          {children}
        </Link>
      ) : (
        <span className={rowClass}>{children}</span>
      )}
    </li>
  );
}
