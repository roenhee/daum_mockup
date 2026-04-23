import type { ChannelPost } from '@/mocks/channelView';

interface ChannelPostBodyProps {
  post: ChannelPost;
}

export function ChannelPostBody({ post }: ChannelPostBodyProps) {
  return (
    <article className="bg-white px-4 pt-5 pb-6">
      <div className="space-y-5 text-[15px] leading-relaxed text-gray-900">
        {post.body.map((block, i) => {
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
                className="rounded-lg bg-amber-50 border-l-2 border-amber-400 px-4 py-3 text-[14px] text-gray-700 whitespace-pre-line"
              >
                {block.text}
              </blockquote>
            );
          }
          return (
            <p key={i} className="whitespace-pre-line">
              {block.text}
            </p>
          );
        })}
      </div>

      <p className="mt-6 text-[11px] text-gray-500">{post.copyright}</p>
    </article>
  );
}
