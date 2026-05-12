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

export function useGitHistory(path: string | undefined): State {
  const [state, setState] = useState<State>({ loading: true, commits: [], error: null });

  useEffect(() => {
    if (!path) {
      setState({ loading: false, commits: [], error: null });
      return;
    }
    let cancelled = false;
    setState({ loading: true, commits: [], error: null });
    // Vite middleware는 base 무시하고 root에 등록되므로 절대 경로로 호출.
    fetch(`/__axiom__/git-log?path=${encodeURIComponent(path)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { commits: GitCommit[] }) => {
        if (cancelled) return;
        setState({ loading: false, commits: data.commits ?? [], error: null });
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
