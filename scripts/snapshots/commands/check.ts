import { parseArgs } from 'node:util';
import { compareComponent, type ComponentComparison } from '../compare/compare.ts';
import type { DiffGap, DiffLine } from '../compare/diff.ts';
import { loadExpectations } from '../compare/expectations.ts';
import { listComponents, requireComponents } from '../model/catalog.ts';
import type { ComponentName } from '../model/types.ts';
import { readSnapshot } from '../snapshotStore.ts';
import type { Command } from './command.ts';

const MAX_DIFF_LINES = 24;

const renderDiff = (diff: readonly (DiffLine | DiffGap)[]): string[] => {
  const rendered = diff.map((line) => {
    if (line.kind === 'gap') return `      ... ${line.count} unchanged lines`;
    const marker = { same: ' ', removed: '-', added: '+' }[line.kind];
    return `    ${marker} ${line.text}`;
  });
  return rendered.length > MAX_DIFF_LINES
    ? [
        ...rendered.slice(0, MAX_DIFF_LINES),
        `      ... ${rendered.length - MAX_DIFF_LINES} more lines`,
      ]
    : rendered;
};

/** What is wrong with a component's snapshots, as printable lines; empty when nothing is. */
export function findProblems(comparison: ComponentComparison): string[] {
  if (comparison.status === 'missing') return ['  no snapshots exist'];
  if (comparison.status === 'incomplete')
    return [`  only the ${comparison.present.join(', ')} snapshot exists`];

  const problems = comparison.sections
    .filter((section) => section.status !== 'identical' && section.expected === undefined)
    .flatMap((section) => [
      `  "${section.title}" is ${section.status}`,
      ...renderDiff(section.diff ?? []),
    ]);
  const stale = comparison.staleExpectations.map(
    (title) => `  the expectation for "${title}" is no longer needed`
  );
  return [...problems, ...stale];
}

export const check: Command = {
  name: 'check',
  summary: 'Compare the React and Django snapshots; exit 1 on unexpected differences.',
  usage: 'check [component...]',
  async run(argv, write) {
    const { positionals } = parseArgs({ args: [...argv], allowPositionals: true });
    const components: ComponentName[] = positionals.length
      ? requireComponents(positionals)
      : listComponents();
    const expectations = loadExpectations();

    let failing = 0;
    for (const component of components) {
      const comparison = compareComponent(
        { react: readSnapshot(component, 'react'), django: readSnapshot(component, 'django') },
        expectations.get(component)
      );
      const problems = findProblems(comparison);
      if (problems.length === 0) continue;
      failing++;
      write(`${component}\n${problems.join('\n')}\n`);
    }
    write(`${components.length} component(s) checked, ${failing} with problems.\n`);
    return failing === 0 ? 0 : 1;
  },
};
