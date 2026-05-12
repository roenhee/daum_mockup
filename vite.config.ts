import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);

export default defineConfig({
  // GitHub Pages 호스팅 경로와 일치. 프로젝트 이름 변경 시 같이 수정.
  base: '/daum_mockup/',
  plugins: [
    react(),
    {
      // axiom dev 전용: 임의 파일의 최근 git 로그를 JSON으로 반환.
      // 빌드 산출물에는 영향 없음 (dev only).
      name: 'axiom-git-log',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use('/__axiom__/git-log', async (req, res) => {
          const url = new URL(req.url ?? '', 'http://localhost');
          const target = url.searchParams.get('path') ?? '';
          // 경로 검증: ../ 같은 트래버설 차단
          if (!target || target.includes('..') || target.startsWith('/')) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'invalid path' }));
            return;
          }
          try {
            const { stdout } = await execFileP(
              'git',
              [
                'log',
                '-n',
                '10',
                '--pretty=format:%h|%ad|%an|%s',
                '--date=short',
                '--',
                target,
              ],
              { cwd: __dirname, maxBuffer: 1024 * 256 },
            );
            const commits = stdout
              .split('\n')
              .filter(Boolean)
              .map((line) => {
                const [hash, date, author, ...subjectParts] = line.split('|');
                return { hash, date, author, subject: subjectParts.join('|') };
              });
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ commits }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err) }));
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
