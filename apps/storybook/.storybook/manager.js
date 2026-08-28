import React from 'react';
import { addons } from 'storybook/manager-api';
import solexTheme from './solexTheme';
import './technologyToggle.jsx';

// Classification badges shown in the sidebar, driven by story/meta `tags`.
// Home tags (USWDS / USWDS-Inspired / USX) are set on component metas; the
// `USX` tag can also be set at the story level to badge USX-variant stories of
// an otherwise-USWDS component. Tags are part of story metadata, so badges
// remain visible even on direct/deep links.
const BADGES = {
  USWDS: { label: 'USWDS', bg: '#005ea2', fg: '#ffffff' },
  'USWDS-Inspired': { label: 'USWDS-Inspired', bg: '#00bde3', fg: '#1b1b1b' },
  USX: { label: 'USX', bg: '#e66f0e', fg: '#ffffff' },
};

// Precedence when an item carries multiple classification tags (a USWDS
// component with a USX-variant story). Show the most specific one.
const PRECEDENCE = ['USX', 'USWDS-Inspired', 'USWDS'];

function pickBadge(tags) {
  if (!Array.isArray(tags)) return null;
  for (const key of PRECEDENCE) {
    if (tags.includes(key)) return BADGES[key];
  }
  return null;
}

function renderLabel(item) {
  const badge = pickBadge(item.tags);
  if (!badge) return item.name;
  return React.createElement(
    'span',
    { style: { display: 'inline-flex', alignItems: 'center', gap: 6 } },
    item.name,
    React.createElement(
      'span',
      {
        style: {
          fontSize: 9,
          lineHeight: '14px',
          fontWeight: 700,
          letterSpacing: 0.3,
          textTransform: 'uppercase',
          padding: '0 6px',
          borderRadius: 8,
          background: badge.bg,
          color: badge.fg,
          whiteSpace: 'nowrap',
        },
      },
      badge.label,
    ),
  );
}

addons.setConfig({
  theme: solexTheme,
  sidebar: {
    renderLabel,
  },
});