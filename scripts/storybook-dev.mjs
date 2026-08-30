import { spawn } from 'node:child_process';

const commands = [
  ['tokens', 'pnpm', ['--filter', '@solexllc/usx-theme', 'run', 'dev']],
  ['usx', 'pnpm', ['--filter', '@solexllc/usx', 'run', 'dev']],
  ['storybook', 'pnpm', ['--filter', '@agency-ui-platform/storybook', 'run', 'dev']]
];

const children = new Set();
let shuttingDown = false;

function startChild([name, command, args]) {
  const child = spawn(command, args, {
    stdio: ['inherit', 'pipe', 'pipe'],
    env: process.env,
    detached: true
  });
  children.add(child);

  const prefix = `\u001b[36m${name}\u001b[0m`;
  for (const stream of [child.stdout, child.stderr]) {
    stream.on('data', (chunk) => {
      for (const line of chunk.toString().split(/\r?\n/)) {
        if (line) process.stdout.write(`${prefix} │ ${line}\n`);
      }
    });
  }

  child.on('exit', (code, signal) => {
    children.delete(child);
    if (!shuttingDown && (code !== 0 || signal)) {
      process.stderr.write(`${name} stopped (${signal || `exit ${code}`})\n`);
      shutdown(code || 1);
    }
  });
}

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    try {
      process.kill(-child.pid, 'SIGTERM');
    } catch {
      child.kill('SIGTERM');
    }
  }
  setTimeout(() => process.exit(code), 500);
}

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

for (const command of commands) startChild(command);