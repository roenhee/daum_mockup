#!/usr/bin/env node
/**
 * 빌드 타임에 docs/ 하위 모든 파일의 git log 를 static JSON 으로 덤프한다.
 * 결과: public/__axiom__/git-history.json
 *
 * 형태: { "<path>": [{ hash, date, author, subject }, ...], ... }
 *
 * dev 서버는 vite.config.ts 의 dev 미들웨어 (/__axiom__/git-log?path=...) 가 직접 처리.
 * prod 빌드는 이 정적 JSON 을 fetch.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', '__axiom__');
const OUT_FILE = path.join(OUT_DIR, 'git-history.json');

const SEP = ''; // 안전한 구분자 (commit message 에 거의 안 들어감)
const COMMIT_MARK = 'COMMIT' + SEP;

let raw = '';
try {
  raw = execFileSync(
    'git',
    [
      'log',
      '--pretty=format:' + COMMIT_MARK + '%h' + SEP + '%ad' + SEP + '%an' + SEP + '%s',
      '--date=short',
      '--name-only',
      '--',
      'docs',
    ],
    { cwd: ROOT, encoding: 'utf8', maxBuffer: 1024 * 1024 * 4 },
  );
} catch (e) {
  console.warn('[dump-git-history] git log 실패. 빈 JSON 생성:', e?.message ?? e);
}

const byFile = new Map();
let current = null;
for (const line of raw.split('\n')) {
  if (line.startsWith(COMMIT_MARK)) {
    const rest = line.slice(COMMIT_MARK.length);
    const [hash, date, author, ...subjParts] = rest.split(SEP);
    current = { hash, date, author, subject: subjParts.join(SEP) };
    continue;
  }
  const file = line.trim();
  if (!file || !current) continue;
  if (!byFile.has(file)) byFile.set(file, []);
  byFile.get(file).push(current);
}

mkdirSync(OUT_DIR, { recursive: true });
const json = Object.fromEntries(byFile);
writeFileSync(OUT_FILE, JSON.stringify(json));
console.log(
  `[dump-git-history] ${byFile.size} files, ${
    Object.values(json).reduce((acc, arr) => acc + arr.length, 0)
  } commit entries → ${path.relative(ROOT, OUT_FILE)}`,
);
