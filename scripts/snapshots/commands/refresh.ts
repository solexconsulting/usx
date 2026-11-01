import { parseArgs } from 'node:util';
import { UserError } from '../errors.ts';
import type { Command } from './command.ts';
import { generate } from './generate.ts';
import { plays } from './plays.ts';

/** Regenerate snapshots first, then run the matching plays and update the report. */
export const refresh: Command = {
  name: 'refresh',
  summary: 'Regenerate snapshots, rerun their plays and rebuild the report.',
  usage: 'refresh <component...>|--all [--django-url <url>] [--storybook-url <url>]',
  async run(argv, write) {
    const { values, positionals } = parseArgs({
      args: [...argv],
      options: {
        all: { type: 'boolean' },
        'django-url': { type: 'string' },
        'storybook-url': { type: 'string' },
      },
      allowPositionals: true,
    });
    if (!values.all && positionals.length === 0)
      throw new UserError('Name at least one component, or pass --all.');
    if (values.all && positionals.length)
      throw new UserError('Pass component names or --all, not both.');

    const selection = values.all ? ['--all'] : positionals;
    const generateArgs = [
      ...selection,
      ...(values['django-url'] ? ['--django-url', values['django-url']] : []),
    ];
    const generated = await generate.run(generateArgs, write);
    if (generated !== 0) return generated;

    const playArgs = [
      ...selection,
      ...(values['storybook-url'] ? ['--storybook-url', values['storybook-url']] : []),
    ];
    return plays.run(playArgs, write);
  },
};
