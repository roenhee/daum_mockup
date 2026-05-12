import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projects } from '../../axiom.config';
import type { AxiomProject } from './types';

export function AxiomHeader({ project }: { project: AxiomProject }) {
  const navigate = useNavigate();
  return (
    <header className="shrink-0 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-2">
      <button
        type="button"
        onClick={() => navigate(project.mockupEntry)}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12.5px] text-gray-700 hover:bg-gray-100"
        title="목업 단독 화면으로 돌아갑니다"
      >
        <ArrowLeft size={14} />
        <span>목업으로</span>
      </button>
      <span className="text-gray-300">|</span>
      <span className="text-[13px] font-bold tracking-tight text-gray-900">axiom</span>
      <span className="text-gray-300">/</span>
      <select
        value={project.id}
        onChange={(e) => navigate(`/axiom/${e.target.value}`)}
        className="text-[13px] font-medium text-gray-900 bg-transparent outline-none cursor-pointer hover:text-blue-600"
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <span className="ml-1 text-[12px] text-gray-500 truncate">{project.description}</span>
      <div className="ml-auto flex items-center gap-2">
        {project.links.figma ? (
          <a
            href={project.links.figma}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] text-gray-700 hover:border-gray-300 hover:bg-gray-50"
          >
            <FigmaGlyph />
            <span>Figma</span>
            <ExternalLink size={12} className="text-gray-400" />
          </a>
        ) : null}
        {project.links.github ? (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] text-gray-700 hover:border-gray-300 hover:bg-gray-50"
          >
            <Github size={12} />
            <span>GitHub</span>
            <ExternalLink size={12} className="text-gray-400" />
          </a>
        ) : null}
      </div>
    </header>
  );
}

function FigmaGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 38 57" fill="none" aria-hidden>
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}
