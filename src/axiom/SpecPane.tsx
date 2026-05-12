import { Children, isValidElement, useEffect, useMemo, useRef, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { AxiomDoc } from './types';
import { loadDoc } from './docContent';
import { useAxiomContext } from './AxiomContext';
import { useGitHistory } from './useGitHistory';

export function SpecPane({ doc }: { doc: AxiomDoc | undefined }) {
  const content = doc ? loadDoc(doc.path) : undefined;
  const ctx = useAxiomContext();
  const articleRef = useRef<HTMLDivElement>(null);
  const activeAnchor = ctx?.activeAnchor ?? null;
  const history = useGitHistory(doc?.path);

  const components = useMemo<Components>(
    () => createHeadingComponents(ctx?.highlightAnchor),
    [ctx?.highlightAnchor],
  );

  // 목업에서 호버 발생 → 해당 헤딩으로 스크롤 + 좌측 하이라이트 줄
  useEffect(() => {
    if (!activeAnchor || !articleRef.current) return;
    const target = articleRef.current.querySelector<HTMLElement>(`#${CSS.escape(activeAnchor)}`);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.classList.add('axiom-active-heading');
    return () => {
      target.classList.remove('axiom-active-heading');
    };
  }, [activeAnchor]);

  if (!doc) {
    return (
      <section className="flex items-center justify-center rounded-lg border border-gray-200 bg-white text-[12px] text-gray-400">
        No document selected.
      </section>
    );
  }
  if (!content) {
    return (
      <section className="overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 text-[12px] text-gray-500">
        파일을 찾지 못함: <code>{doc.path}</code>
      </section>
    );
  }

  return (
    <section className="overflow-y-auto rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-6 py-3">
        <div className="text-[11px] uppercase tracking-wide text-gray-400">Doc</div>
        <div className="text-[14px] font-semibold text-gray-900">{doc.label}</div>
        <div className="text-[11px] text-gray-400">{doc.path}</div>
      </div>
      <article ref={articleRef} className="prose-axiom px-6 py-5">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {content}
        </ReactMarkdown>
      </article>
      <footer className="border-t border-gray-100 bg-gray-50 px-6 py-3">
        <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1.5">
          최근 변경
        </div>
        {history.loading ? (
          <div className="text-[11px] text-gray-400">불러오는 중…</div>
        ) : history.error ? (
          <div className="text-[11px] text-red-500">{history.error}</div>
        ) : history.commits.length === 0 ? (
          <div className="text-[11px] text-gray-400">변경 이력 없음</div>
        ) : (
          <ul className="space-y-1">
            {history.commits.slice(0, 5).map((c) => (
              <li key={c.hash} className="flex items-baseline gap-2 text-[11.5px] font-mono">
                <span className="text-gray-400 shrink-0 w-[68px]">{c.date}</span>
                <span className="text-gray-500 shrink-0 w-[52px]">{c.hash}</span>
                <span className="text-gray-700 truncate font-sans" title={`${c.author} · ${c.subject}`}>
                  {c.subject}
                </span>
              </li>
            ))}
          </ul>
        )}
      </footer>
    </section>
  );
}

/** `## 헤딩 {#anchor-id}` 패턴을 잡아내서 DOM id 부여 + 클릭 시 mockup highlight. */
function createHeadingComponents(onAnchorClick: ((id: string) => void) | undefined): Components {
  const heading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    return ({ children, ...rest }: { children?: ReactNode }) => {
      const { id, cleaned } = extractAnchor(children);
      const Tag = `h${level}` as const;
      const cls = HEADING_CLS[level];
      const clickable = id && onAnchorClick;
      return (
        <Tag
          id={id}
          className={cls + (clickable ? ' cursor-pointer hover:text-blue-600' : '')}
          onClick={clickable ? () => onAnchorClick(id) : undefined}
          title={clickable ? '클릭하면 목업의 해당 영역이 강조됩니다' : undefined}
          {...rest}
        >
          {cleaned}
        </Tag>
      );
    };
  };
  return {
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),
    h5: heading(5),
    h6: heading(6),
    p: ({ children }) => <p className="mt-2 text-[13px] leading-relaxed text-gray-700">{children}</p>,
    ul: ({ children }) => <ul className="mt-2 ml-5 list-disc text-[13px] leading-relaxed text-gray-700">{children}</ul>,
    ol: ({ children }) => <ol className="mt-2 ml-5 list-decimal text-[13px] leading-relaxed text-gray-700">{children}</ol>,
    li: ({ children }) => <li className="mt-1">{children}</li>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 text-[12px] font-mono text-gray-800">{children}</code>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-3 border-l-3 border-gray-200 pl-3 text-[13px] text-gray-500">{children}</blockquote>
    ),
    table: ({ children }) => (
      <table className="mt-3 w-full border-collapse text-[12.5px]">{children}</table>
    ),
    th: ({ children }) => (
      <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700">{children}</th>
    ),
    td: ({ children }) => (
      <td className="border-b border-gray-100 px-2 py-1.5 text-gray-700 align-top">{children}</td>
    ),
    hr: () => <hr className="my-5 border-gray-200" />,
    a: ({ children, href }) => (
      <a href={href} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
        {children}
      </a>
    ),
  };
}

const HEADING_CLS: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'mt-1 text-[20px] font-bold text-gray-900 scroll-mt-4',
  2: 'mt-6 text-[16px] font-bold text-gray-900 scroll-mt-4',
  3: 'mt-5 text-[14px] font-bold text-gray-800 scroll-mt-4',
  4: 'mt-4 text-[13px] font-bold text-gray-700 scroll-mt-4',
  5: 'mt-3 text-[12.5px] font-semibold text-gray-700 scroll-mt-4',
  6: 'mt-3 text-[12px] font-semibold text-gray-600 scroll-mt-4',
};

function extractAnchor(children: ReactNode): { id: string | undefined; cleaned: ReactNode } {
  const arr = Children.toArray(children);
  if (arr.length === 0) return { id: undefined, cleaned: children };
  const last = arr[arr.length - 1];
  if (typeof last !== 'string' && !(isValidElement(last) && typeof (last as { props: { children?: ReactNode } }).props.children === 'string')) {
    return { id: undefined, cleaned: children };
  }
  const lastStr =
    typeof last === 'string'
      ? last
      : ((last as { props: { children: string } }).props.children);
  const m = lastStr.match(/^(.*?)\s*\{#([\w.-]+)\}\s*$/);
  if (!m) return { id: undefined, cleaned: children };
  const trimmed = m[1];
  const id = m[2];
  const rest = arr.slice(0, -1);
  const cleaned: ReactNode = trimmed ? [...rest, trimmed] : rest;
  return { id, cleaned };
}
