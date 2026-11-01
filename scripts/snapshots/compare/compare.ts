import { UserError } from '../errors.ts';
import type { Section, Source } from '../model/types.ts';
import { SOURCES } from '../model/types.ts';
import { collapseUnchanged, diffLines, type DiffGap, type DiffLine } from './diff.ts';
import type { ComponentExpectations } from './expectations.ts';
import { normalizeMarkup } from './normalize.ts';

export type SectionStatus = 'identical' | 'different' | 'react-only' | 'django-only';

export interface SectionComparison {
  readonly title: string;
  readonly status: SectionStatus;
  /** Number of added plus removed lines. */
  readonly changedLines: number;
  /** Present for "different" sections: the changes with a few lines of context. */
  readonly diff?: readonly (DiffLine | DiffGap)[];
  /** Why this difference is intended, when the expectations say so. */
  readonly expected?: string;
}

/**
 * missing: no snapshot exists; incomplete: only one does; match: every section is identical or an
 * expected difference; differs: otherwise.
 */
export type ComponentStatus = 'missing' | 'incomplete' | 'match' | 'differs';

export interface ComponentComparison {
  readonly status: ComponentStatus;
  readonly present: readonly Source[];
  readonly sections: readonly SectionComparison[];
  /** Expectations for sections that are identical or absent, so no longer needed. */
  readonly staleExpectations: readonly string[];
}

const CONTEXT_LINES = 3;

function assertUniqueTitles(source: Source, sections: readonly Section[]): void {
  const seen = new Set<string>();
  for (const { title } of sections) {
    if (seen.has(title))
      throw new UserError(`The ${source} snapshot has two sections titled "${title}".`);
    seen.add(title);
  }
}

function compareSections(
  react: readonly Section[],
  django: readonly Section[],
  ignoreAttributes: ReadonlySet<string>
): SectionComparison[] {
  assertUniqueTitles('react', react);
  assertUniqueTitles('django', django);
  const djangoByTitle = new Map(django.map((section) => [section.title, section]));
  const reactTitles = new Set(react.map((section) => section.title));

  const results: SectionComparison[] = react.map((section) => {
    const counterpart = djangoByTitle.get(section.title);
    if (!counterpart) return { title: section.title, status: 'react-only', changedLines: 0 };
    const diff = diffLines(
      normalizeMarkup(section.html, { source: 'react', ignoreAttributes }),
      normalizeMarkup(counterpart.html, { source: 'django', ignoreAttributes })
    );
    const changedLines = diff.filter((line) => line.kind !== 'same').length;
    return changedLines === 0
      ? { title: section.title, status: 'identical', changedLines }
      : {
          title: section.title,
          status: 'different',
          changedLines,
          diff: collapseUnchanged(diff, CONTEXT_LINES),
        };
  });
  for (const section of django)
    if (!reactTitles.has(section.title))
      results.push({ title: section.title, status: 'django-only', changedLines: 0 });
  return results;
}

export function compareComponent(
  snapshots: Readonly<Partial<Record<Source, readonly Section[]>>>,
  expectations: ComponentExpectations | undefined
): ComponentComparison {
  const present = SOURCES.filter((source) => snapshots[source] !== undefined);
  const { react, django } = snapshots;
  if (!react || !django)
    return {
      status: present.length === 0 ? 'missing' : 'incomplete',
      present,
      sections: [],
      staleExpectations: [],
    };

  const reasons = expectations?.sections ?? {};
  const ignored = new Set(expectations?.ignoreAttributes ?? []);
  const sections = compareSections(react, django, ignored).map((section) => {
    const reason = section.status === 'identical' ? undefined : reasons[section.title];
    return reason === undefined ? section : { ...section, expected: reason };
  });

  const differing = new Set(
    sections.filter((section) => section.status !== 'identical').map((section) => section.title)
  );
  return {
    status: sections.every((section) => section.status === 'identical' || section.expected)
      ? 'match'
      : 'differs',
    present,
    sections,
    staleExpectations: Object.keys(reasons).filter((title) => !differing.has(title)),
  };
}
