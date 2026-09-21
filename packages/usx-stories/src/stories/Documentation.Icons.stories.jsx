import React, { useMemo, useState } from 'react';
// @uswds/uswds's package.json `exports` map only exposes `dist/*`, and its
// own icon browser's `usa-icons.config.js` is CommonJS (breaks as an ESM
// import via Vite's raw `/@fs/` dev-mode loading). `usa-icon.json` is plain
// JSON — safe to import either way — and covers every icon except two
// (`chevron_left`/`chevron_right`, added below) that have no `meta` entry.
import iconData from '../../../../node_modules/@uswds/uswds/packages/usa-icon/src/usa-icon.json';
import usxIconData from '../../../usx/src/img/usx-icons.json';

const EXTRA_USWDS_ICONS = [
  { name: 'chevron_left', meta: 'navigation direction arrow back' },
  { name: 'chevron_right', meta: 'navigation direction arrow forward' },
];

const uswdsIcons = [
  ...iconData.icons.items.map((item) => ({ name: item.name, meta: item.meta || '' })),
  ...EXTRA_USWDS_ICONS,
].map((icon) => ({ ...icon, source: 'uswds' }));

const usxIcons = usxIconData.items.map((item) => ({
  name: item.name,
  meta: item.meta || '',
  source: 'usx',
}));

const allIcons = [...usxIcons, ...uswdsIcons];

const SOURCE_BADGES = {
  uswds: { label: 'USWDS', bg: '#005ea2', fg: '#ffffff' },
  usx: { label: 'USX', bg: '#e66f0e', fg: '#ffffff' },
};

// Matches if the query is a substring of the icon's own name, or a substring
// of any single keyword in its `meta` list — e.g. "spi" finds "spinner" and
// "lo" finds a "loading" keyword.
function matchesQuery(icon, query) {
  if (!query) return true;
  if (icon.name.toLowerCase().includes(query)) return true;
  return icon.meta.toLowerCase().split(/\s+/).filter(Boolean).some((term) => term.includes(query));
}

function IconTile({ icon }) {
  const [copied, setCopied] = useState(false);
  const base = (typeof window !== 'undefined' && window.usxBaseUrl) || '/';
  const spriteFile = icon.source === 'usx' ? 'usx-sprite.svg' : 'sprite.svg';
  const href = `${base}img/${spriteFile}#${icon.name}`;
  const badge = SOURCE_BADGES[icon.source];

  const copy = () => {
    const snippet = `<svg class="usa-icon" aria-hidden="true" focusable="false"><use href="${href}" /></svg>`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={icon.meta ? `${icon.name} — ${icon.meta}` : icon.name}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25rem',
        width: '7rem',
        height: '7rem',
        border: '1px solid #dfe1e2',
        background: 'transparent',
        cursor: 'pointer',
      }}
    >
      {icon.source !== 'uswds' ? (
        <span
            style={{
            position: 'absolute',
            top: 4,
            right: 4,
            fontSize: 12,
            lineHeight: '14px',
            fontWeight: 700,
            letterSpacing: 0.3,
            textTransform: 'uppercase',
            padding: '2px 6px',
            borderRadius: 12,
            background: badge.bg,
            color: badge.fg,
            }}
        >
            {badge.label}
        </span>
      ) : null}
      <svg className="usa-icon" aria-hidden="true" focusable="false" style={{ width: '2rem', height: '2rem' }}>
        <use href={href} />
      </svg>
      <span style={{ fontSize: '0.7rem', textAlign: 'center', wordBreak: 'break-word' }}>
        {copied ? 'Copied!' : icon.name}
      </span>
    </button>
  );
}

export default {
  title: 'Documentation/Icons',
  tags: ['autodocs'],
};

export const Icons = {
  render: () => {
    const [query, setQuery] = useState('');
    const normalized = query.trim().toLowerCase();
    const filtered = useMemo(() => allIcons.filter((icon) => matchesQuery(icon, normalized)), [normalized]);

    return (
      <div className="usa-prose usx-prose">
        <h1>Icons</h1>
        <p>
          Every icon available to USX components: USWDS's own icon set, plus a
          small number of custom <strong>USX</strong> icons for things USWDS
          doesn't ship (currently just <code>spinner</code>). Click an icon to
          copy its <code>&lt;svg&gt;</code> snippet.
        </p>

        <label htmlFor="usx-icon-filter" className="usa-label">Filter icons</label>
        <input
          id="usx-icon-filter"
          type="text"
          className="usa-input"
          style={{ maxWidth: '20rem' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name or keyword, e.g. spi, clock, loading"
        />
        <p aria-live="polite">
          {filtered.length} of {allIcons.length} icons.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {filtered.map((icon) => (
            <IconTile key={`${icon.source}-${icon.name}`} icon={icon} />
          ))}
        </div>
      </div>
    );
  },
};
