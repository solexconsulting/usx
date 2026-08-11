import React, { useMemo, useState, useEffect } from 'react';

import navigation from "@uswds/uswds/js/usa-header";
import accordion from "@uswds/uswds/js/usa-accordion";
import {
  themeManifest,
  baseColorTokens,
  shadesOf,
  resolveTheme,
  themeToCss,
  hslToHex
} from '../utils/themeDerive.js';


// Showcase components
import Accordion from '../../../core/src/components/accordion/Accordion.jsx';
import Alert from '../../../core/src/components/alert/Alert.tsx';
import Attribution from '../../../core/src/components/attribution/Attribution.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import Block from '../../../core/src/components/block/Block.tsx';
import Button from '../../../core/src/components/button/Button.tsx';
import ButtonGroup from '../../../core/src/components/button-group/ButtonGroup.tsx';
import Checkbox from '../../../core/src/components/checkbox/Checkbox.tsx';
import Clickable from '../../../core/src/components/clickable/Clickable.tsx';
import Code from '../../../core/src/components/code/Code.tsx';
import CopyToClipboard from '../../../core/src/components/copy-to-clipboard/CopyToClipboard.tsx';
import Eyebrow from '../../../core/src/components/eyebrow/Eyebrow.tsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Hero from '../../../core/src/components/hero/Hero.tsx';
import IconList from '../../../core/src/components/icon-list/IconList.tsx';
import Input from '../../../core/src/components/input/Input.tsx';
import Link from '../../../core/src/components/link/Link.tsx';
import MiscBanner from '../../../core/src/components/misc-banner/MiscBanner.tsx';
import RadioButtons from '../../../core/src/components/radio-buttons/RadioButtons.tsx';
import Search from '../../../core/src/components/search/Search.tsx';
import Select from '../../../core/src/components/select/Select.tsx';
import SideNav from '../../../core/src/components/sidenav/SideNav.tsx';
import SiteAlert from '../../../core/src/components/site-alert/SiteAlert.tsx';
import Spinner from '../../../core/src/components/spinner/Spinner.tsx';
import Status from '../../../core/src/components/status/Status.tsx';
import StepIndicator from '../../../core/src/components/step-indicator/StepIndicator.tsx';
import SummaryBox from '../../../core/src/components/summary-box/SummaryBox.tsx';
import Swap from '../../../core/src/components/swap/Swap.tsx';
import Switch from '../../../core/src/components/switch/Switch.tsx';
import Table from '../../../core/src/components/table/Table.jsx';
import Tag from '../../../core/src/components/tag/Tag.tsx';
import TaskList from '../../../core/src/components/task-list/TaskList.tsx';
import TextArea from '../../../core/src/components/text-area/TextArea.tsx';

export default {
  title: 'Foundations/Theme',
  tags: ['USX'],
  parameters: { layout: 'fullscreen' }
};

// ── Presets ──────────────────────────────────────────────────────────────────

const PRESETS = {
  Default: {},
  Forest: {
    'color-primary': '#2e7d32',
    'color-secondary': '#00695c',
    'color-accent-cool': '#81c784',
    'color-accent-warm': '#ffb300',
    'color-dark-bg': '#0b1f0c',
    'color-base-200': '#f4faf4'
  },
  Sunset: {
    'color-primary': '#d84315',
    'color-secondary': '#6a1b9a',
    'color-accent-cool': '#ff8a65',
    'color-accent-warm': '#ffd54f',
    'color-dark-bg': '#1f0d05',
    'color-base-200': '#fdf6f1'
  },
  Ocean: {
    'color-primary': '#0891b2',
    'color-secondary': '#4338ca',
    'color-accent-cool': '#67e8f9',
    'color-accent-warm': '#fb923c',
    'color-dark-bg': '#031f2b',
    'color-base-200': '#f0f9fb'
  },
  // Dark themes: unlike the light presets above (which only nudge the page
  // background), these also flip the surface/border/text tokens so cards,
  // dividers and copy stay legible against a dark page.
  Midnight: {
    'color-primary': '#60a5fa',
    'color-secondary': '#a78bfa',
    'color-accent-cool': '#38bdf8',
    'color-accent-warm': '#fbbf24',
    'color-base-100': '#1e293b',
    'color-base-200': '#0f172a',
    'color-base-300': '#334155',
    'color-text': '#e2e8f0',
    'color-dark-bg': '#020617',
    'usx-summary-box-background-color': '#0f1b2e',
    'usx-summary-box-border-color': '#60a5fa',
    'usx-link-visited-color': '#b39ddb'
  },
  Carbon: {
    'color-primary': '#fb923c',
    'color-secondary': '#22d3ee',
    'color-accent-cool': '#38bdf8',
    'color-accent-warm': '#facc15',
    'color-base-100': '#1c1c1e',
    'color-base-200': '#121214',
    'color-base-300': '#3a3a3d',
    'color-text': '#e5e5e5',
    'color-dark-bg': '#000000',
    'usx-summary-box-background-color': '#241a10',
    'usx-summary-box-border-color': '#fb923c',
    'usx-link-visited-color': '#b39ddb'
  }
};

// Main palette shown as prominent swatches; the rest live in "More colors".
const MAIN_COLORS = [
  'color-primary',
  'color-secondary',
  'color-accent-cool',
  'color-accent-warm',
  'color-base',
  'color-info',
  'color-warning',
  'color-success',
  'color-error',
  'color-emergency',
  'color-base-100',
  'color-border',
  'color-dark-bg'
];

const RANDOMIZED = ['color-primary', 'color-secondary', 'color-accent-cool', 'color-accent-warm', 'color-base-100'];

function randomPalette() {
  const overrides = {};
  let base100Lightness = 100;
  RANDOMIZED.forEach((name) => {
    const l = Math.random() * 100;
    if (name === 'color-base-100') base100Lightness = l;
    overrides[name] = hslToHex({ h: Math.random() * 360, s: Math.random() * 100, l });
  });
  // Dark surface → the default dark ink (color-text) would be unreadable, so
  // swap in a light color instead. Same reasoning for secondary/muted text
  // (color-text-base) and visited links (usx-link-visited-color) — their
  // light-mode defaults are just as illegible against a dark surface.
  if (base100Lightness < 50) {
    overrides['color-text'] = '#ffffff';
    overrides['color-text-base'] = '#b9b9bb';
    overrides['usx-link-visited-color'] = '#b39ddb';
  }
  return overrides;
}

// ── Small UI helpers (playground chrome only — intentionally not themed) ─────

// Scoped stylesheet for the playground's own chrome (interactive states that
// inline styles can't express: hover, focus-visible, the <details> marker).
// This is presentation for the tool itself, not themed USX output.
const PLAYGROUND_CSS = `
.usx-pg { --pg-line: #e5e7eb; --pg-muted: #6b7280; --pg-accent: #2563eb; --pg-accent-soft: rgba(37,99,235,.12); }
.usx-pg-btn {
  font: inherit; font-size: .78rem; font-weight: 500; line-height: 1;
  padding: .45rem .75rem; border-radius: 999px; border: 1px solid var(--pg-line);
  background: #fff; color: #1f2937; cursor: pointer; transition: all .12s ease;
}
.usx-pg-btn:hover { background: #f3f4f6; border-color: #d1d5db; }
.usx-pg-btn:active { transform: translateY(1px); }
.usx-pg-btn:focus-visible { outline: 2px solid var(--pg-accent); outline-offset: 2px; }
.usx-pg-btn.is-active { background: var(--pg-accent); border-color: var(--pg-accent); color: #fff; }
.usx-pg-btn.is-ghost { background: transparent; }
.usx-pg-section { border-bottom: 1px solid var(--pg-line); }
.usx-pg-section:last-child { border-bottom: none; }
.usx-pg-summary {
  display: flex; align-items: center; justify-content: space-between; gap: .5rem;
  list-style: none; cursor: pointer; user-select: none; padding: .7rem .1rem;
  font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em;
  color: #374151; transition: color .12s ease;
}
.usx-pg-summary::-webkit-details-marker { display: none; }
.usx-pg-summary:hover { color: var(--pg-accent); }
.usx-pg-summary::after {
  content: ''; width: .5rem; height: .5rem; flex-shrink: 0;
  border-right: 2px solid #9ca3af; border-bottom: 2px solid #9ca3af;
  transform: rotate(-45deg); transition: transform .15s ease; margin-right: .2rem;
}
.usx-pg-section[open] > .usx-pg-summary::after { transform: rotate(45deg); }
.usx-pg-count {
  font-weight: 500; font-size: .68rem; text-transform: none; letter-spacing: normal;
  color: var(--pg-muted); background: #f3f4f6; border-radius: 999px; padding: .1rem .45rem;
  margin-right: auto; margin-left: .4rem;
}
.usx-pg-row { display: flex; align-items: center; gap: .55rem; padding: .3rem .1rem; border-radius: 6px; transition: background .12s ease; }
.usx-pg-row:hover { background: #f9fafb; }
.usx-pg-row.is-overridden { background: var(--pg-accent-soft); }
.usx-pg-row.is-overridden:hover { background: var(--pg-accent-soft); }
.usx-pg-swatch {
  width: 1.75rem; height: 1.75rem; border-radius: 50%; padding: 0; cursor: pointer;
  border: 2px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.15); background: none;
  transition: box-shadow .12s ease, transform .12s ease; flex-shrink: 0;
}
.usx-pg-swatch:hover { transform: scale(1.08); box-shadow: 0 0 0 1px rgba(0,0,0,.25), 0 0 0 3px var(--pg-accent-soft); }
.usx-pg-swatch:focus-visible { outline: none; box-shadow: 0 0 0 1px rgba(0,0,0,.25), 0 0 0 3px var(--pg-accent); }
.usx-pg-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .78rem; color: #1f2937; }
.usx-pg-value { font-size: .7rem; opacity: .65; font-family: ui-monospace, Menlo, monospace; }
.usx-pg-input {
  width: 6rem; font: inherit; font-size: .78rem; font-family: ui-monospace, Menlo, monospace;
  padding: .3rem .45rem; border-radius: 6px; border: 1px solid var(--pg-line); background: #fff;
  transition: border-color .12s ease, box-shadow .12s ease;
}
.usx-pg-input:focus { outline: none; border-color: var(--pg-accent); box-shadow: 0 0 0 3px var(--pg-accent-soft); }
.usx-pg-reset {
  width: 1.3rem; height: 1.3rem; flex-shrink: 0; border: none; border-radius: 50%; cursor: pointer;
  display: flex; align-items: center; justify-content: center; font-size: .85rem; line-height: 1;
  background: transparent; color: var(--pg-muted); transition: all .12s ease;
}
.usx-pg-reset:hover { background: #fee2e2; color: #dc2626; }
.usx-pg-shades-toggle { cursor: pointer; font-size: .7rem; color: var(--pg-accent); opacity: .85; margin: .15rem 0 .3rem 2.3rem; }
.usx-pg-shades-toggle:hover { opacity: 1; text-decoration: underline; }
.usx-pg-shades-toggle::-webkit-details-marker { display: none; }
.usx-pg-textarea {
  width: 100%; height: 9rem; font: .72rem/1.5 ui-monospace, Menlo, monospace; box-sizing: border-box;
  padding: .6rem; border-radius: 8px; border: 1px solid #2d3339; background: #1e2227; color: #d4d8de; resize: vertical;
}
.usx-pg-textarea:focus { outline: none; border-color: var(--pg-accent); }
.usx-pg-container { display: flex; align-items: flex-start; }
.usx-pg-sidebar { width: 21rem; flex-shrink: 0; height: 100vh; position: sticky; top: 0; }
.usx-pg-sidebar-body { flex: 1; min-height: 0; overflow-y: auto; }
.usx-pg-main { padding: 1.5rem; min-height: 100vh; }
@media (max-width: 720px) {
  .usx-pg-container { flex-direction: column; }
  .usx-pg-sidebar {
    width: 100%; height: auto; position: static; top: auto;
    border-right: none; border-bottom: 1px solid var(--pg-line);
  }
  .usx-pg-sidebar-body { flex: none; overflow-y: visible; }
  .usx-pg-main { padding: 1rem; min-height: 0; }
}
`;

const ui = {
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #e5e7eb',
    background: '#fff',
    boxSizing: 'border-box',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '0.85rem'
  },
  sidebarHeader: {
    flexShrink: 0,
    padding: '1.1rem 1.1rem 0.9rem',
    borderBottom: '1px solid #e5e7eb',
    background: '#fafbfc'
  },
  sidebarBody: {
    padding: '0.2rem 1.1rem 1.1rem'
  },
  chipRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.35rem 0' },
  card: {
    background: 'var(--usx-color-base-100, #ffffff)',
    border: '1px solid var(--usx-color-base-300, #e2e8f0)',
    borderRadius: '10px',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    minWidth: 0
  },
  cardTitle: { margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }
};

function Section({ title, children, open = false, count }) {
  return (
    <details open={open} className="usx-pg-section">
      <summary className="usx-pg-summary">
        <span>{title}</span>
        {count !== undefined && <span className="usx-pg-count">{count}</span>}
      </summary>
      <div style={{ paddingBottom: '0.6rem' }}>{children}</div>
    </details>
  );
}

function ColorControl({ token, value, isOverridden, onChange, onClear }) {
  return (
    <div className={`usx-pg-row${isOverridden ? ' is-overridden' : ''}`}>
      <input
        type="color"
        aria-label={token.name}
        value={value}
        onChange={(e) => onChange(token.name, e.target.value)}
        className="usx-pg-swatch"
      />
      <span className="usx-pg-label" title={token.cssVar}>
        {token.name.replace(/^color-|^usx-/, '')}
      </span>
      <code className="usx-pg-value">{value}</code>
      {isOverridden && (
        <button type="button" className="usx-pg-reset" title="Reset to default" onClick={() => onClear(token.name)}>
          ×
        </button>
      )}
    </div>
  );
}

function TextControl({ token, value, isOverridden, onChange, onClear }) {
  return (
    <div className={`usx-pg-row${isOverridden ? ' is-overridden' : ''}`}>
      <span className="usx-pg-label" title={token.cssVar}>{token.name}</span>
      <input
        type="text"
        aria-label={token.name}
        value={value}
        onChange={(e) => onChange(token.name, e.target.value)}
        className="usx-pg-input"
      />
      {isOverridden && (
        <button type="button" className="usx-pg-reset" title="Reset to default" onClick={() => onClear(token.name)}>
          ×
        </button>
      )}
    </div>
  );
}

// ── Showcase fixtures ────────────────────────────────────────────────────────

const accordionItems = [
  { id: 'theme-acc-1', title: 'First section', content: <p>Content of the first section.</p> },
  { id: 'theme-acc-2', title: 'Second section', content: <p>Content of the second section.</p> }
];

const sideNavItems = [
  { text: 'Current page', href: '#', current: true },
  { text: 'Parent link', href: '#', children: [{ text: 'Child link', href: '#' }] },
  { text: 'Another page', href: '#' }
];

const headerNavSections = [
  { title: 'Section one', href: '#' },
  {
    title: 'Section two',
    links: [
      { text: 'Sub-link one', href: '#' },
      { text: 'Sub-link two', href: '#' }
    ]
  },
  { title: 'Section three', href: '#' }
];

const footerNavLinks = [
  { text: 'Primary link', href: '#' },
  { text: 'Primary link', href: '#' },
  { text: 'Primary link', href: '#' },
  { text: 'Primary link', href: '#' }
];

const taskListTasks = [
  { name: 'Submit application', href: '#', tag: { value: 'Done', color: 'success-light', icon: 'check' } },
  { name: 'Upload documents', href: '#', tag: { value: 'In progress', color: 'warning-light' } }
];

const codeLines = [
  { code: 'npm install @solexllc/usx', prefix: '$' },
  { code: 'Done!', prefix: '>', className: 'text-success' }
];

const tableColumns = [
  { key: 'name', header: 'Document', primary: true, sortable: true },
  { key: 'year', header: 'Year', align: 'right', sortable: true },
  { key: 'status', header: 'Status', sortable: true }
];

const tableData = [
  { id: 1, name: 'Declaration of Independence', year: 1776, status: 'Signed', era: 'Founding' },
  { id: 2, name: 'Constitution', year: 1787, status: 'Ratified', era: 'Founding' },
  { id: 3, name: 'Bill of Rights', year: 1791, status: 'Ratified', era: 'Founding' },
  { id: 4, name: 'Emancipation Proclamation', year: 1863, status: 'Signed', era: 'Civil War' },
  { id: 5, name: '13th Amendment', year: 1865, status: 'Ratified', era: 'Civil War' },
  { id: 6, name: '19th Amendment', year: 1920, status: 'Ratified', era: 'Modern' }
];

function Showcase() {
  // Pre-select a row so `usx-table-selected-bg` is visible without user
  // interaction; `groupBy` + `onClickRow` exercise the grouped-row and
  // hover-row color tokens too.
  const [tableSelection, setTableSelection] = useState([2]);

  useEffect(() => {
    accordion.off();
    navigation.off();
    // Turn on USWDS enhanced components using <component>.on()
    accordion.on();
    navigation.on();

    return () => {
      // Clean up USWDS components when the component unmounts
      accordion.off();
      navigation.off();
    }
  }, []);

  return (
    <div style={{ columnWidth: '22rem', columnGap: '1rem' }}>

      <div style={{ ...ui.card, gap: 0, padding: 0, overflow: 'visible', breakInside: 'avoid', columnSpan: 'all', marginBottom: '1rem' }}>
        <Banner tld=".gov" />
        <MiscBanner tone="test" badgeText="test" message="You are viewing a test site." importantLinkText="Production site" importantLinkHref="https://www.google.com" />
        <MiscBanner tone="dev" badgeText="dev" message="You are viewing a dev site." importantLinkText="Production site" importantLinkHref="https://www.google.com" />
        <MiscBanner tone="beta" badgeText="beta" message="You are viewing a beta site." importantLinkText="Production site" importantLinkHref="https://www.google.com" />
        <MiscBanner tone="error" badgeText="oops" message="This banner has no links." />
        <Header
          branding={{ title: 'Project name' }}
          navSections={headerNavSections}
          megamenu={true}
          extended={true}
          secondaryLinks={[{ text: 'Secondary Link', href: '#' }]}
          searchConfig={{ id: 'theme-header-search' }}
        />
        <SiteAlert variant="info" alertHeading="Site-wide notice" alertText="Bringing something to your attention politely." />
        <Hero
          title="A hero heading"
          callout="Bring attention to a project priority"
          backgroundImage="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
          paragraph="Support the callout with some short explanatory text."
          button={{ href: '#', text: 'Call to action' }}
          overlay
        />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Buttons</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <Button label="Primary" variant="primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Accent cool" variant="accent-cool" />
          <Button label="Accent warm" variant="accent-warm" />
          <Button label="Base" variant="base" />
          <Button label="Outline" variant="outline" />
        </div>
        <ButtonGroup
          segmented
          items={[
            { label: 'Map', variant: 'primary' },
            { label: 'Satellite', variant: 'primary' },
            { label: 'Hybrid', variant: 'primary' }
          ]}
        />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Alerts</h3>
        <Alert variant="info" slim text="An informative status update." />
        <Alert variant="warning" slim text="Something needs your attention." />
        <Alert variant="success" slim text="The task completed successfully." />
        <Alert variant="error" slim text="Something went wrong." />
        <Alert variant="emergency" slim text="Urgent: immediate action required." />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Table</h3>
        <div style={{ overflowX: 'auto' }}>
          <Table
            columns={tableColumns}
            data={tableData}
            striped
            groupBy="era"
            selectionMode="checkbox"
            select={tableSelection}
            onSelect={setTableSelection}
            onClickRow={() => {}}
            caption="Founding documents — grouped, sortable, selectable rows"
          />
        </div>
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Forms</h3>
        <Input id="theme-input" label="Text input" placeholder="Type something…" />
        <Input id="theme-input-err" label="With error" error="This field is required" />
        <Select
          id="theme-select"
          label="Dropdown"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' }
          ]}
        />
        <TextArea id="theme-textarea" label="Text area" placeholder="Longer text…" />
        <Checkbox
          id="theme-check-1"
          name="theme-check-1"
          value="1"
          label="Normal checkbox option"
          checked={true}
        />
        <Checkbox
          id="theme-check-2"
          name="theme-check-2"
          value="1"
          label="Tile checkbox option"
          checked={true}
          tile={true}
          description="A checkbox with a description and tile styling."
        />
        <RadioButtons
          name="theme-radios"
          options={[
            { value: 'r1', label: 'Radio A' },
            { value: 'r2', label: 'Radio B' }
          ]}
          defaultValue='r1'
        />
        <RadioButtons
          name="theme-radios-tile"
          tile={true}
          options={[
            { value: 'r1', label: 'Radio A', description: 'This radio button\'s description is appended with "A".' },
            { value: 'r2', label: 'Radio B', description: 'This radio button\'s description is appended with "B".' }
          ]}
          defaultValue='r1'
        />
        <Search id="theme-search" placeholder="Search…" />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Navigation</h3>
        <SideNav items={sideNavItems} />
        <StepIndicator
          steps={[{ label: 'Personal info' }, { label: 'Documents' }, { label: 'Review' }]}
          currentStep={2}
          variant="counters"
        />
        <p>
          <Link href="javascript:void(0);">A standard link</Link> and a <Link href="javascript:void(0);" visited>visited link</Link>.
        </p>
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Indicators</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <Tag color="primary">Primary</Tag>
          <Tag color="secondary">Secondary</Tag>
          <Tag color="accent-cool">Cool</Tag>
          <Tag color="accent-warm">Warm</Tag>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Status color="primary" size="md" />
          <Status color="success" size="md" animation="ping" />
          <Status color="warning" size="md" />
          <Status color="error" size="md" />
          <Spinner size={3} label="Loading…" />
          <Switch id="theme-switch" variant="primary" defaultChecked />
          <Switch id="theme-switch-off" variant="primary" />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Swap onContent="ON" offContent="OFF" />
          <Swap variant="rotate" onContent="Hello" offContent="Goodbye" />
          <Swap variant="flip" onContent="😊" offContent="😞" />
        </div>
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Content</h3>
        <Accordion
          bordered={true}
          items={accordionItems}
        />
        <h4 style={{ margin: 0 }}>
          <Eyebrow>Featured</Eyebrow>
          Section heading
        </h4>
        <SummaryBox heading="Program summary" content="A 12-week initiative to modernize service delivery." />
        <Block variant="callout" color="primary">
          A callout block with themed accents.
        </Block>
        <IconList
          primary
          items={[
            { iconName: 'thumb_up_alt', content: 'No wait times' },
            { iconName: 'verified', content: 'Trusted information' }
          ]}
        />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Tasks &amp; utility</h3>
        <TaskList tasks={taskListTasks} />
        <Attribution primary="George Washington" secondary="First President" />
        <Code lines={codeLines} />
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <CopyToClipboard copyText="Example text" tooltip="Copy" copiedTooltip="Copied" label="Copy example" />
        </div>
        <Clickable href="#" className="display-flex flex-column padding-2 border">
          Everything taking up space in this box is clickable, but only the text below appears as a link.
          <Clickable.Link>I look clickable</Clickable.Link>
        </Clickable>
      </div>

      <div style={{ ...ui.card, gap: 0, padding: 0, overflow: 'hidden', breakInside: 'avoid', columnSpan: 'all' }}>
        <Footer
          variant="medium"
          navLinks={footerNavLinks}
          branding={{ title: 'Project name' }}
          contactHeading="Agency name"
          contactPhone="(800) 555-0100"
          contactEmail="info@example.gov"
        />
      </div>
    </div>
  );
}

// ── Playground ───────────────────────────────────────────────────────────────

function ThemePlayground() {
  const [overrides, setOverrides] = useState({});
  const [autoDerive, setAutoDerive] = useState(true);
  const [changedOnly, setChangedOnly] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState('Default');

  const autoDeriveMap = useMemo(() => {
    const map = {};
    for (const t of baseColorTokens()) map[t.name] = autoDerive;
    return map;
  }, [autoDerive]);

  const resolved = useMemo(() => resolveTheme(overrides, autoDeriveMap), [overrides, autoDeriveMap]);
  // Applied as a `:root` rule (not inline styles on a descendant) so that
  // chained custom properties (e.g. `--usx-button-radius: var(--usx-radius-field)`)
  // re-resolve correctly — CSS substitutes var() chains at the declaring
  // element, so overriding a base token from a descendant element would
  // never reach dependents declared on `:root` in theme.css.
  const liveThemeCss = useMemo(() => themeToCss(resolved, { changedOnly: true }), [resolved]);
  const exportCss = useMemo(() => themeToCss(resolved, { changedOnly }), [resolved, changedOnly]);

  const setToken = (name, value) => {
    setActivePreset(null);
    setOverrides((prev) => ({ ...prev, [name]: value }));
  };
  const clearToken = (name) => {
    setActivePreset(null);
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const applyPreset = (preset) => {
    setActivePreset(preset);
    setOverrides({ ...PRESETS[preset] });
  };
  const applyRandom = () => {
    setActivePreset(null);
    setOverrides(randomPalette());
  };
  const resetAll = () => {
    setActivePreset('Default');
    setOverrides({});
  };

  const overrideCount = Object.keys(overrides).length;

  const copyCss = async () => {
    await navigator.clipboard.writeText(exportCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadCss = () => {
    const blob = new Blob([exportCss], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usx-theme.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const colorTokensByName = useMemo(() => new Map(themeManifest.map((t) => [t.name, t])), []);
  const mainColors = MAIN_COLORS.map((n) => colorTokensByName.get(n));
  const moreColors = baseColorTokens().filter((t) => !MAIN_COLORS.includes(t.name));
  const componentColors = themeManifest.filter((t) => t.group === 'component');

  const renderColor = (t) => (
    <React.Fragment key={t.name}>
      <ColorControl
        token={t}
        value={resolved[t.name]}
        isOverridden={overrides[t.name] !== undefined}
        onChange={setToken}
        onClear={clearToken}
      />
      {shadesOf(t.name).filter((s) => !MAIN_COLORS.includes(s.name)).length > 0 && (
        <details style={{ marginBottom: '0.25rem' }}>
          <summary className="usx-pg-shades-toggle">shades</summary>
          {shadesOf(t.name).filter((s) => !MAIN_COLORS.includes(s.name)).map((s) => (
            <ColorControl
              key={s.name}
              token={s}
              value={resolved[s.name]}
              isOverridden={overrides[s.name] !== undefined}
              onChange={setToken}
              onClear={clearToken}
            />
          ))}
        </details>
      )}
    </React.Fragment>
  );

  const renderText = (t) => (
    <TextControl
      key={t.name}
      token={t}
      value={resolved[t.name]}
      isOverridden={overrides[t.name] !== undefined}
      onChange={setToken}
      onClear={clearToken}
    />
  );

  const radiusGroup = themeManifest.filter((t) => t.group === 'radius' && t.name.startsWith('radius-'));
  const radiusAdvanced = themeManifest.filter((t) => t.group === 'radius-advanced');
  const radiusUtility = themeManifest.filter((t) => t.group === 'radius' && t.name.startsWith('r-'));
  const spacingTokens = themeManifest.filter((t) => t.group === 'spacing');
  const borderTokens = themeManifest.filter((t) => t.group === 'border');
  const typographyTokens = themeManifest.filter((t) => t.group === 'typography');

  return (
    <div className="usx-pg usx-pg-container">
      <style>{PLAYGROUND_CSS}</style>
      <aside className="usx-pg-sidebar" style={ui.sidebar}>
        <div style={ui.sidebarHeader}>
          <h2 style={{ margin: '0 0 0.2rem', fontSize: '1.05rem' }}>Theme generator</h2>
          <p style={{ margin: '0 0 0.85rem', fontSize: '0.75rem', color: '#6b7280' }}>
            Live-edit tokens and export the resulting CSS.
            {overrideCount > 0 && ` · ${overrideCount} changed`}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.7rem' }}>
            {Object.keys(PRESETS).map((p) => (
              <button
                key={p}
                type="button"
                className={`usx-pg-btn${activePreset === p ? ' is-active' : ''}`}
                onClick={() => applyPreset(p)}
              >
                {p}
              </button>
            ))}
            <button type="button" className="usx-pg-btn is-ghost" onClick={applyRandom}>
              🎲 Random
            </button>
            <button type="button" className="usx-pg-btn is-ghost" onClick={resetAll}>
              ↺ Reset
            </button>
          </div>

          <label style={{ ...ui.chipRow, cursor: 'pointer', margin: 0 }}>
            <input type="checkbox" checked={autoDerive} onChange={(e) => setAutoDerive(e.target.checked)} />
            <span className="usx-pg-label">Auto-derive shades from base colors</span>
          </label>
        </div>

        <div className="usx-pg-sidebar-body" style={ui.sidebarBody}>
          <Section title="Colors" open count={mainColors.length}>
            {mainColors.map(renderColor)}
          </Section>

          <Section title="More colors" count={moreColors.length}>{moreColors.map(renderColor)}</Section>

          <Section title="Radius" count={radiusGroup.length}>
            {radiusGroup.map(renderText)}
          </Section>

          <Section title="Advanced radius" count={radiusAdvanced.length}>
            {radiusAdvanced.map(renderText)}
          </Section>

          <Section title="Utility radius" count={radiusUtility.length}>
            {radiusUtility.map(renderText)}
          </Section>

          <Section title="Spacing" count={spacingTokens.length}>
            {spacingTokens.map(renderText)}
          </Section>

          <Section title="Border" count={borderTokens.length}>
            {borderTokens.map(renderText)}
          </Section>

          <Section title="Typography" count={typographyTokens.length}>
            {typographyTokens.map(renderText)}
          </Section>

          <Section title="Component colors" count={componentColors.length}>{componentColors.map(renderColor)}</Section>

          <Section title="CSS export" open>
            <label style={{ ...ui.chipRow, cursor: 'pointer' }}>
              <input type="checkbox" checked={changedOnly} onChange={(e) => setChangedOnly(e.target.checked)} />
              <span className="usx-pg-label">Changed values only</span>
            </label>
            <textarea readOnly value={exportCss} className="usx-pg-textarea" />
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
              <button type="button" className="usx-pg-btn is-active" onClick={copyCss}>
                {copied ? '✓ Copied!' : 'Copy CSS'}
              </button>
              <button type="button" className="usx-pg-btn" onClick={downloadCss}>
                Download
              </button>
            </div>
          </Section>
        </div>
      </aside>

      <style>{liveThemeCss}</style>
      <main
        className="usx-pg-main"
        style={{
          flex: 1,
          minWidth: 0,
          background: resolved['color-base-200'],
          color: resolved['color-text'],
          boxSizing: 'border-box'
        }}
      >
        <Showcase />
      </main>
    </div>
  );
}

export const Playground = {
  render: () => <ThemePlayground />
};
