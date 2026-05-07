import { Filter, Volume2, Sparkles, Type, MessageCircle, Headphones } from 'lucide-react';
import type { ArticleDetail } from '@/mocks/newsDetail';
import { BizBoard } from '@/components/ui/BizBoard';
import { ArticleKeywordTags } from './NewsKeywordSlots';

interface ArticleBodyProps {
  article: ArticleDetail;
  commentCount: number;
  keywords?: string[];
}

export function ArticleBody({ article, commentCount, keywords }: ArticleBodyProps) {
  return (
    <article className="bg-white px-4 pt-5 pb-6">
      <h1 className="text-[22px] font-bold leading-snug text-gray-900">
        {article.title}
      </h1>
      {keywords ? <ArticleKeywordTags keywords={keywords} /> : null}
      <div className="mt-3 flex items-center gap-1.5 text-[12px] text-gray-500">
        <span>{article.reporter}</span>
        <span className="text-gray-300">·</span>
        <span>{article.publishedAt}</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-gray-400">
        <span className="inline-flex items-center gap-1 text-[11px]">
          <MessageCircle size={12} />
          <span>댓글 {commentCount.toLocaleString()}</span>
        </span>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            aria-label="팟캐스트로 듣기"
            className="inline-flex items-center gap-1 h-7 px-2 rounded-md text-[11.5px] font-semibold text-daum-blue bg-daum-blue/10 mr-0.5"
          >
            <Headphones size={12} strokeWidth={2.4} />
            팟캐스트
          </button>
          <ToolBtn aria-label="필터">
            <Filter size={16} />
          </ToolBtn>
          <ToolBtn aria-label="음성으로 듣기">
            <Volume2 size={16} />
          </ToolBtn>
          <ToolBtn aria-label="AI 요약">
            <Sparkles size={16} />
          </ToolBtn>
          <ToolBtn aria-label="글꼴 크기">
            <Type size={16} />
          </ToolBtn>
        </div>
      </div>

      <div className="-mx-4 mt-4">
        <BizBoard />
      </div>

      <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-gray-900">
        {article.body.map((block, i) => {
          if (block.type === 'image') {
            return (
              <figure key={i} className="-mx-4">
                <img
                  src={block.src}
                  alt={block.caption ?? ''}
                  className="w-full aspect-[3/2] object-cover bg-gray-100"
                  loading="lazy"
                />
                {block.caption ? (
                  <figcaption className="mt-1.5 px-4 text-[11px] text-gray-500 leading-relaxed">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }
          if (block.type === 'quote') {
            return (
              <blockquote
                key={i}
                className="border-l-2 border-daum-blue bg-gray-50 px-3 py-2.5 text-[14px] text-gray-700 whitespace-pre-line"
              >
                {block.text}
              </blockquote>
            );
          }
          if (block.type === 'ad') {
            return <InlineAd key={i} />;
          }
          return (
            <p key={i} className="whitespace-pre-line">
              {block.text}
            </p>
          );
        })}
      </div>
      <div className="mt-6 text-[12px] text-gray-500">
        <p>
          <span className="font-semibold">{article.reporter}</span>{' '}
          <span className="text-gray-400">({article.reporterEmail})</span>
        </p>
        <p className="mt-1">{article.copyright}</p>
      </div>
    </article>
  );
}

function ToolBtn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className="p-1.5 text-gray-500" />;
}

function InlineAd() {
  return (
    <div className="-mx-4 my-2 relative">
      <img
        src="https://picsum.photos/seed/inline-ad-01/800/240"
        alt=""
        className="w-full aspect-[10/3] object-cover bg-gray-100"
        loading="lazy"
      />
      <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
        AD
      </span>
    </div>
  );
}
