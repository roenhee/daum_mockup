import { useMemo } from 'react';
import { ChevronDown, FileText, Folder } from 'lucide-react';
import { cn } from '@/lib/cn';
import { getProjectBasePath } from '../../axiom.config';
import type { AxiomDoc, AxiomProject } from './types';

interface FileTreePaneProps {
  project: AxiomProject;
  activeDoc: AxiomDoc | undefined;
  onSelect: (doc: AxiomDoc) => void;
}

interface TreeNode {
  folderName: string | null; // null = 루트 (직속 docs)
  docs: AxiomDoc[];
}

export function FileTreePane({ project, activeDoc, onSelect }: FileTreePaneProps) {
  const tree = useMemo(() => buildTree(project), [project]);

  return (
    <aside className="overflow-y-auto rounded-lg border border-gray-200 bg-white">
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="text-[11px] uppercase tracking-wide text-gray-500">Project</div>
        <div className="text-[13px] font-semibold text-gray-900 truncate">{project.name}</div>
      </div>
      <nav className="py-1">
        <div className="px-3 pt-2 pb-1 text-[11px] uppercase tracking-wide text-gray-400">
          Files
        </div>
        <ul className="space-y-0.5">
          {tree.map((node) => (
            <TreeFolder
              key={node.folderName ?? '__root__'}
              node={node}
              activeDoc={activeDoc}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function TreeFolder({
  node,
  activeDoc,
  onSelect,
}: {
  node: TreeNode;
  activeDoc: AxiomDoc | undefined;
  onSelect: (doc: AxiomDoc) => void;
}) {
  if (node.folderName === null) {
    return (
      <>
        {node.docs.map((doc) => (
          <FileRow key={doc.path} doc={doc} active={activeDoc?.path === doc.path} onSelect={onSelect} />
        ))}
      </>
    );
  }
  return (
    <li>
      <div className="flex items-center gap-1.5 px-3 py-1 text-[11.5px] font-semibold text-gray-600">
        <ChevronDown size={12} className="text-gray-400" />
        <Folder size={13} className="text-gray-400" />
        <span>{node.folderName}/</span>
      </div>
      <ul className="ml-3 border-l border-gray-100 pl-2">
        {node.docs.map((doc) => (
          <FileRow
            key={doc.path}
            doc={doc}
            active={activeDoc?.path === doc.path}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </li>
  );
}

function FileRow({
  doc,
  active,
  onSelect,
}: {
  doc: AxiomDoc;
  active: boolean;
  onSelect: (doc: AxiomDoc) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(doc)}
        className={cn(
          'w-full text-left flex items-center gap-2 px-3 py-1.5 text-[12.5px]',
          active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50',
        )}
      >
        <FileText size={13} className={active ? 'text-blue-500' : 'text-gray-400'} />
        <span className="flex-1 truncate">{doc.label}</span>
        {doc.primary ? <span className="text-[10px] text-gray-400">primary</span> : null}
      </button>
    </li>
  );
}

/** AxiomDoc[]을 폴더별로 묶는다. base path 이후 첫 segment 가 폴더 이름. */
function buildTree(project: AxiomProject): TreeNode[] {
  const base = getProjectBasePath(project.id);
  const folderMap = new Map<string | null, AxiomDoc[]>();

  for (const doc of project.docs) {
    let folderName: string | null = null;
    if (doc.path.startsWith(base)) {
      const rel = doc.path.slice(base.length);
      const parts = rel.split('/');
      if (parts.length > 1) folderName = parts[0];
    }
    const list = folderMap.get(folderName) ?? [];
    list.push(doc);
    folderMap.set(folderName, list);
  }

  // 정렬: 루트 직속 먼저, 그다음 폴더는 prd → docs → 알파벳 순
  const folderOrder = ['prd', 'docs'];
  const result: TreeNode[] = [];
  if (folderMap.has(null)) {
    result.push({ folderName: null, docs: folderMap.get(null)! });
  }
  for (const name of folderOrder) {
    if (folderMap.has(name)) {
      result.push({ folderName: name, docs: folderMap.get(name)! });
    }
  }
  // 그 외 폴더 (예상 외 케이스)
  for (const [name, docs] of folderMap.entries()) {
    if (name === null || folderOrder.includes(name)) continue;
    result.push({ folderName: name, docs });
  }
  return result;
}
