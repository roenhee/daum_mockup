import { Link } from 'react-router-dom';

interface HeadlineItem {
  id: string;
  title: string;
}

interface TextHeadlineListProps {
  items: HeadlineItem[];
}

export function TextHeadlineList({ items }: TextHeadlineListProps) {
  return (
    <section className="bg-white">
      <ul className="divide-y divide-gray-100 px-4">
        {items.map((it) => (
          <li key={it.id}>
            <Link
              to={`/news/${it.id}`}
              className="block py-3 text-[14px] leading-snug font-medium text-gray-900 truncate"
            >
              {it.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
