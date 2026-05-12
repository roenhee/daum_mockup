import { useEffect, useState } from 'react';

export interface GitCommit {
  hash: string;
  date: string;
  author: string;
  subject: string;
}

interface State {
  loading: boolean;
  commits: GitCommit[];
  error: string | null;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const PROD_HISTORY_URL = `${BASE}/__axiom__/git-history.json`;

// prod 정적 JSON 은 한 번 fetch 후 모든 path 조회에 재사용.
let prodHistoryPromise: Promise<Record<string, GitCommit[]>> | null = null;
function loadProdHistory(): Promise<Record<string, GitCommit[]>> {
  if (!prodHistoryPromise) {
    prodHistoryPromise = fetch(PROD_HISTORY_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .catch((e) => {
        prodHistoryPromise = null; // 재시도 가능하게 reset
        throw e;
      });
  }
  return prodHistoryPromise;
}

export function useGitHistory(path: string | undefined): State {
  const [state, setState] = useState<State>({ loading: true, commits: [], error: null });

  useEffect(() => {
    if (!path) {
      setState({ loading: false, commits: [], error: null });
      return;
    }
    let cancelled = false;
    setState({ loading: true, commits: [], error: null });

    const fetcher = import.meta.env.DEV
      ? // dev: vite 미들웨어가 path 별로 응답 — { commits: [...] }
        fetch(`/__axiom__/git-log?path=${encodeURIComponent(path)}`)
          .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
          .then((d: { commits: GitCommit[] }) => d.commits ?? [])
      : // prod: 정적 JSON 한 번 로드 후 path 키로 조회
        loadProdHistory().then((map) => map[path] ?? []);

    fetcher
      .then((commits) => {
        if (cancelled) return;
        setState({ loading: false, commits, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({ loading: false, commits: [], error: String(err) });
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return state;
}
