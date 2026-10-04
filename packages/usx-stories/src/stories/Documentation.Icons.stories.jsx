import React, { useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Button from '../../../usx-react/src/components/button/Button.tsx';
import Icon from '../../../usx-react/src/components/icon/Icon.tsx';
import Input from '../../../usx-react/src/components/input/Input.tsx';
import Tag from '../../../usx-react/src/components/tag/Tag.tsx';
import Label from '../../../usx-react/src/components/label/Label.tsx';
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
  const badge = SOURCE_BADGES[icon.source];

  const copy = () => {
    const snippet = renderToStaticMarkup(<Icon name={icon.name} source={icon.source} size={2} />);
    if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      type="button"
      ghost={true}
      onClick={copy}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="text-ink border width-card height-card margin-0"
    >
      {icon.source !== 'uswds' ? (
        <Tag
            style={{
            position: 'absolute',
            top: 4,
            right: 4,
            background: badge.bg,
            color: badge.fg,
            }}
        >
            {badge.label}
        </Tag>
      ) : null}
      <Icon name={icon.name} source={icon.source} size={4} />
      <Label className="font-sans-3xs margin-top-105" style={{ textAlign: 'center', wordBreak: 'break-word' }}>
        {copied ? 'Copied!' : icon.name}
      </Label>
    </Button>
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

        <Input
          id="usx-icon-filter"
          label="Filter icons"
          formGroup={false}
          type="text"
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
