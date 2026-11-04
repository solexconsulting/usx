import { useEffect, useState } from 'react';
import { parseReport } from '../../../../../scripts/snapshots/report/schema.ts';
import { SOURCES } from './labels.js';

export const normalizeTitle = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Story ids by component, source and normalized story name, from Storybook's own index. */
function storyIdsFrom(entries) {
  const ids = {};
  for (const entry of entries) {
    const match = entry.type === 'story' && entry.importPath.match(/\/components\/([^/]+)\/[^/]+\.(React|Django)\.stories\./);
    if (!match) continue;
    const component = (ids[match[1]] ??= Object.fromEntries(SOURCES.map((source) => [source, {}])));
    component[match[2].toLowerCase()][normalizeTitle(entry.name)] = entry.id;
  }
  return ids;
}

/** Loads the report and Storybook's story index: { status: 'loading' | 'ready' | 'error', ... }. */
export default function useReport() {
  const [state, setState] = useState({ status: 'loading' });
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [reportResponse, indexResponse] = await Promise.all([fetch('./reports/snapshot-report.json'), fetch('./index.json')]);
        if (!reportResponse.ok) throw new Error('No report found. Run "pnpm snapshots report" and restart Storybook.');
        const report = parseReport(await reportResponse.json());
        const entries = indexResponse.ok ? Object.values((await indexResponse.json()).entries) : [];
        if (active) setState({ status: 'ready', report, storyIds: storyIdsFrom(entries) });
      } catch (error) {
        if (active) setState({ status: 'error', message: error.message });
      }
    })();
    return () => {
      active = false;
    };
  }, []);
  return state;
}
