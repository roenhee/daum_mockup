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

interface FolderNode {
  type: 'folder';
  name: string;
  children: TreeNode[];
}
interface FileNode {
  type: 'file';
  doc: AxiomDoc;
}
type TreeNode = FolderNode | FileNode;

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
          {tree.map((node, i) => (
            <TreeRow
              key={nodeKey(node, i)}
              node={node}
              depth={0}
              activeDoc={activeDoc}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function nodeKey(n: TreeNode, idx: number): string {
  return n.type === 'folder' ? `f:${n.name}:${idx}` : `d:${n.doc.path}`;
}

function TreeRow({
  node,
  depth,
  activeDoc,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  activeDoc: AxiomDoc | undefined;
  onSelect: (doc: AxiomDoc) => void;
}) {
  if (node.type === 'file') {
    return <FileRow depth={depth} doc={node.doc} active={activeDoc?.path === node.doc.path} onSelect={onSelect} />;
  }
  return (
    <li>
      <div
        className="flex items-center gap-1.5 py-1 text-[11.5px] font-semibold text-gray-600"
        style={{ paddingLeft: 12 + depth * 12 }}
      >
        <ChevronDown size={12} className="text-gray-400" />
        <Folder size={13} className="text-gray-400" />
        <span>{node.name}/</span>
      </div>
      <ul>
        {node.children.map((c, i) => (
          <TreeRow
            key={nodeKey(c, i)}
            node={c}
            depth={depth + 1}
            activeDoc={activeDoc}
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
  depth,
}: {
  doc: AxiomDoc;
  active: boolean;
  onSelect: (doc: AxiomDoc) => void;
  depth: number;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(doc)}
        style={{ paddingLeft: 12 + depth * 12 }}
        className={cn(
          'w-full text-left flex items-center gap-2 py-1.5 pr-3 text-[12.5px]',
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

/** AxiomDoc[] 을 경로 기반 재귀 트리로 변환. base path 이후 segment 들로 폴더 중첩. */
function buildTree(project: AxiomProject): TreeNode[] {
  const base = getProjectBasePath(project.id);
  const rootChildren: TreeNode[] = [];
  // folderName → FolderNode 캐시 (해당 depth 의 부모 노드 단위로 키 구분 안 해도 — 같은 path 구조라 충돌 없음)
  const folderCache = new Map<string, FolderNode>();

  function getFolder(absKey: string, parts: string[]): FolderNode {
    let cached = folderCache.get(absKey);
    if (cached) return cached;
    cached = { type: 'folder', name: parts[parts.length - 1], children: [] };
    folderCache.set(absKey, cached);
    // 부모에 등록
    if (parts.length === 1) {
      rootChildren.push(cached);
    } else {
      const parentKey = parts.slice(0, -1).join('/');
      const parent = folderCache.get(parentKey);
      if (parent) parent.children.push(cached);
    }
    return cached;
  }

  for (const doc of project.docs) {
    let folderParts: string[] = [];
    if (doc.path.startsWith(base)) {
      const rel = doc.path.slice(base.length);
      const segs = rel.split('/');
      folderParts = segs.slice(0, -1); // 마지막은 파일명
    }

    if (folderParts.length === 0) {
      rootChildren.push({ type: 'file', doc });
      continue;
    }
    // 폴더 트리 보장
    for (let i = 1; i <= folderParts.length; i++) {
      getFolder(folderParts.slice(0, i).join('/'), folderParts.slice(0, i));
    }
    const leafFolderKey = folderParts.join('/');
    const leafFolder = folderCache.get(leafFolderKey);
    if (leafFolder) leafFolder.children.push({ type: 'file', doc });
  }

  // 정렬: 루트에서 prd → docs → 그 외 알파벳; 같은 레벨 폴더끼리도 동일 규칙
  const folderOrder = ['prd', 'docs', '새소식', '이슈노트'];
  const sortNodes = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'file' ? -1 : 1; // 파일 먼저 (루트 직속)
      if (a.type === 'folder' && b.type === 'folder') {
        const ai = folderOrder.indexOf(a.name);
        const bi = folderOrder.indexOf(b.name);
        if (ai === -1 && bi === -1) return a.name.localeCompare(b.name);
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      }
      return 0;
    });
    for (const n of nodes) {
      if (n.type === 'folder') sortNodes(n.children);
    }
  };
  sortNodes(rootChildren);

  return rootChildren;
}
