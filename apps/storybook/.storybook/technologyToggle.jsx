import React, { useCallback, useEffect } from 'react';
import {
  addons,
  types,
  useStorybookApi,
  useGlobals,
} from 'storybook/manager-api';

/**
 * "Render As" technology board toggle.
 *
 * Instead of re-rendering a single story, this switches the ENTIRE board
 * between the React / Django / HTML story trees:
 *  - The sidebar is filtered to show only the active technology's components
 *    (Documentation and Patterns are technology-agnostic and always shown).
 *  - Toggling navigates the current story to the equivalent story in the target
 *    technology (same component + story name). If that specific story does not
 *    exist, it falls back to the component's Docs page, then to the first story
 *    of the target technology.
 *
 * The active technology is stored as a Storybook global, so it persists in the
 * URL and survives deep links / reloads.
 */

const ADDON_ID = 'usx/technology';
const TOOL_ID = `${ADDON_ID}/tool`;
const GLOBAL_KEY = 'technology';
const ALL = 'all';
const DEFAULT_TECH = ALL;

const TECHS = [
  { value: ALL, label: 'All' },
  { value: 'react', label: 'React' },
  { value: 'django', label: 'Django' },
  { value: 'html', label: 'HTML' },
];
// Actual story-tree id prefixes (excludes the synthetic "all" option).
const TECH_PREFIXES = ['react', 'django', 'html'];

const techOf = (id) => (id || '').split('-')[0];
const isTechId = (id) => TECH_PREFIXES.includes(techOf(id));

/** Show only the active technology's tree; keep non-technology sections. */
const makeFilter = (tech) => (item) => {
  if (tech === ALL) return true;
  const first = techOf(item.id);
  if (TECH_PREFIXES.includes(first)) {
    return first === tech;
  }
  return true;
};

/**
 * `api.getIndex()` returns the prepared index shaped `{ v, entries }`, where
 * `entries` is the flat map keyed by story/docs id. Normalize to that map.
 */
const entriesOf = (index) => (index && index.entries) || {};

/** First selectable story id belonging to a technology tree. */
function firstOfTech(index, tech) {
  const entries = entriesOf(index);
  const ids = Object.keys(entries);
  const prefix = `${tech}-`;
  const story = ids.find((id) => id.startsWith(prefix) && entries[id].type === 'story');
  return story || ids.find((id) => id.startsWith(prefix)) || null;
}

/**
 * Map the current entry to its counterpart in the target technology:
 *   same story -> component Docs page -> first story of tech.
 */
function computeTarget(index, current, newTech) {
  const entries = entriesOf(index);
  if (!Object.keys(entries).length) return null;
  if (!current || !isTechId(current.id)) return null; // on Documentation/Patterns: stay put

  const currentTech = techOf(current.id);
  if (currentTech === newTech) return null;

  const rest = current.id.slice(currentTech.length + 1); // e.g. "button--default" or "button"

  const sameStory = `${newTech}-${rest}`;
  if (entries[sameStory]) return sameStory;

  const compRest = rest.split('--')[0]; // e.g. "button"
  const docsId = `${newTech}-${compRest}--docs`;
  if (entries[docsId]) return docsId;

  return firstOfTech(index, newTech);
}

const btnBase = {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '20px',
  padding: '0 8px',
  borderRadius: 4,
  color: 'inherit',
};

function Tool() {
  const api = useStorybookApi();
  const [globals, updateGlobals] = useGlobals();

  // Reflects the user's explicit choice; defaults to "all" (shows everything),
  // so deep links are always visible without deducing tech from the URL.
  const active = (globals && globals[GLOBAL_KEY]) || DEFAULT_TECH;

  // Keep the sidebar filtered to the active technology ("all" shows everything).
  useEffect(() => {
    api.experimental_setFilter(ADDON_ID, makeFilter(active));
  }, [api, active]);

  const select = useCallback(
    (tech) => {
      if (tech === active) return;

      if (tech === ALL) {
        api.experimental_setFilter(ADDON_ID, makeFilter(ALL));
        updateGlobals({ [GLOBAL_KEY]: ALL });
        return;
      }

      let current = null;
      try {
        current = api.getCurrentStoryData();
      } catch {
        current = null;
      }
      const index = api.getIndex ? api.getIndex() : undefined;
      const target = computeTarget(index, current, tech);

      api.experimental_setFilter(ADDON_ID, makeFilter(tech));
      updateGlobals({ [GLOBAL_KEY]: tech });
      if (target) {
        api.selectStory(target);
      }
    },
    [active, api, updateGlobals],
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        marginLeft: 6,
        paddingLeft: 8,
        borderLeft: '1px solid rgba(0,0,0,0.1)',
      }}
      title="Switch the whole board between rendering technologies"
    >
      <span style={{ fontSize: 11, opacity: 0.6, marginRight: 4 }}>Filter by technology:</span>
      {TECHS.map((t) => {
        const isActive = t.value === active;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => select(t.value)}
            aria-pressed={isActive}
            style={{
              ...btnBase,
              background: isActive ? '#1ea7fd' : 'transparent',
              color: isActive ? '#ffffff' : 'inherit',
              opacity: isActive ? 1 : 0.7,
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Render As',
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => <Tool />,
  });
});
