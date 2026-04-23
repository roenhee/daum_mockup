import { Children, Fragment, isValidElement, type ReactNode } from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';

interface SubtabSectionsProps {
  children: ReactNode;
}

/**
 * Inserts a 4px gray gap between each section and appends a SiteFooter at the end.
 * Null/false children are skipped. Keeps subtab definitions concise.
 */
export function SubtabSections({ children }: SubtabSectionsProps) {
  const items = Children.toArray(children).filter((c) => isValidElement(c) || typeof c === 'string' || typeof c === 'number');
  return (
    <>
      {items.map((child, i) => (
        <Fragment key={i}>
          {child}
          {i < items.length - 1 ? <Gap /> : null}
        </Fragment>
      ))}
      <SiteFooter />
    </>
  );
}

function Gap() {
  return <div className="h-1 bg-surface-gap shrink-0" aria-hidden />;
}
