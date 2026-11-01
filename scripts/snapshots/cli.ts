#!/usr/bin/env node
import { check } from './commands/check.ts';
import type { Command } from './commands/command.ts';
import { generate } from './commands/generate.ts';
import { plays } from './commands/plays.ts';
import { refresh } from './commands/refresh.ts';
import { report } from './commands/report.ts';
import { UserError } from './errors.ts';

const COMMANDS: readonly Command[] = [generate, plays, refresh, check, report];

const helpText = (): string =>
  [
    'Usage: pnpm snapshots <command> [options]',
    '',
    ...COMMANDS.flatMap((command) => [`  ${command.usage}`, `      ${command.summary}`, '']),
    'Environment: DJANGO_RENDER_URL and STORYBOOK_URL stand in for --django-url and --storybook-url;',
    'PLAYWRIGHT_CHROMIUM_PATH names the Chromium executable to run plays in.',
    '',
  ].join('\n');

async function main(argv: readonly string[]): Promise<number> {
  const [name, ...rest] = argv;
  const command = COMMANDS.find((candidate) => candidate.name === name);
  if (!command) {
    process.stderr.write(helpText());
    return name === undefined || name === 'help' ? 0 : 1;
  }
  try {
    return await command.run(rest, (text) => process.stdout.write(text));
  } catch (error) {
    if (!(error instanceof UserError)) throw error;
    process.stderr.write(`${error.message}\n`);
    return 1;
  }
}

process.exitCode = await main(process.argv.slice(2));
