import React from 'react';
import Drawer from '../../../../usx-react/src/components/drawer/Drawer.tsx';
import Popover from '../../../../usx-react/src/components/popover/Popover.tsx';
import config from '../../../../usx-react/src/components/drawer/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const sides = [
  ['inline-start', 'Start edge'],
  ['inline-end', 'End edge'],
  ['top', 'Top edge'],
  ['bottom', 'Bottom edge'],
];

const sizes = [
  ['compact', 'Compact'],
  ['default', 'Default'],
  ['wide', 'Wide'],
];

export const storyDefs = {
  Default: {
    id: 'drawer-default',
    label: 'Open application details',
    heading: 'Application details',
    description: 'Review the information for your current application.',
    children: <p>Your application was last updated today.</p>,
  },
  Modeless: {
    id: 'drawer-modeless',
    label: 'Open reference guide',
    heading: 'Reference guide',
    modal: false,
    children: (
      <nav aria-label="Reference guide sections">
        <ul className="usa-list usx-list">
          <li>
            <a href="#eligibility">Eligibility</a>
          </li>
          <li>
            <a href="#documents">Documents</a>
          </li>
        </ul>
      </nav>
    ),
  },
  RichForm: {
    id: 'drawer-rich-form',
    label: 'Filter programs',
    heading: 'Filter programs',
    description: 'Choose the programs you want to see.',
    focusHeading: false,
    children: (
      <form id="drawer-filter-form" method="dialog">
        <label className="usa-label usx-label" htmlFor="drawer-search-term">
          Search term
        </label>
        <input className="usa-input usx-input" id="drawer-search-term" name="query" type="search" />
        <fieldset className="usa-fieldset margin-top-2">
          <legend className="usa-legend">Status</legend>
          <div className="usa-checkbox usx-checkbox">
            <input
              className="usa-checkbox__input"
              id="drawer-status-open"
              name="status"
              type="checkbox"
              value="open"
            />
            <label className="usa-checkbox__label" htmlFor="drawer-status-open">
              Open
            </label>
          </div>
        </fieldset>
      </form>
    ),
    footer: (
      <button
        className="usa-button usx-button"
        type="submit"
        form="drawer-filter-form"
        value="apply"
      >
        Apply filters
      </button>
    ),
  },
  NestedPopover: {
    id: 'drawer-nested-popover',
    label: 'Open service details',
    heading: 'Service details',
    children: (
      <>
        <p>Review this service and its related actions.</p>
        <Popover id="drawer-related-actions" label="Related actions" side="bottom">
          <nav aria-label="Related actions">
            <ul className="usa-list usx-list usa-list--unstyled">
              <li>
                <a href="#save-service">Save service</a>
              </li>
              <li>
                <a href="#share-service">Share service</a>
              </li>
            </ul>
          </nav>
          <button
            className="usa-button usx-button usa-button--unstyled"
            type="button"
            data-usx-popover-close="drawer-related-actions"
          >
            Close related actions
          </button>
        </Popover>
      </>
    ),
  },
  LongContent: {
    id: 'drawer-long-content',
    label: 'Browse all programs',
    heading: 'All programs',
    children: (
      <nav aria-label="Programs">
        <ol className="usa-list usx-list">
          {Array.from({ length: 40 }, (_, index) => (
            <li key={index}>
              <a href={`#program-${index + 1}`}>Program {index + 1}</a>
            </li>
          ))}
        </ol>
      </nav>
    ),
  },
  Disabled: {
    id: 'drawer-disabled',
    label: 'Open unavailable information',
    heading: 'Unavailable information',
    disabled: true,
    children: <p>This information is not available yet.</p>,
  },
  IconTrigger: {
    id: 'drawer-icon-trigger',
    label: 'Account details',
    heading: 'Account details',
    triggerAriaLabel: 'Open account details',
    trigger: (
      <svg className="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false">
        <use href="./img/sprite.svg#person" />
      </svg>
    ),
    children: <p>Manage your account details.</p>,
  },
  CustomTrigger: {
    id: 'drawer-custom-trigger',
    label: 'Edit profile',
    heading: 'Edit profile',
    trigger: (
      <>
        <svg className="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false">
          <use href="./img/sprite.svg#edit" />
        </svg>
        <span>Edit profile</span>
      </>
    ),
    children: <p>Update your profile information.</p>,
  },
  Sides: sides.map(([side, name]) => ({
    id: `drawer-${side}`,
    label: `Open ${name.toLowerCase()} drawer`,
    heading: `${name} drawer`,
    side,
    children: <p>This drawer opens from the {name.toLowerCase()}.</p>,
  })),
  Sizes: sizes.map(([size, name]) => ({
    id: `drawer-size-${size}`,
    label: `Open ${name.toLowerCase()} drawer`,
    heading: `${name} drawer`,
    size,
    children: <p>The {name.toLowerCase()} size allows different amounts of content.</p>,
  })),
  Rtl: [
    {
      id: 'drawer-rtl-start',
      label: 'Open start drawer',
      heading: 'Start drawer',
      side: 'inline-start',
      children: <p>The start edge is the right edge in this example.</p>,
    },
    {
      id: 'drawer-rtl-end',
      label: 'Open end drawer',
      heading: 'End drawer',
      side: 'inline-end',
      children: <p>The end edge is the left edge in this example.</p>,
    },
  ],
};

export default {
  title: 'React/USX/Drawer',
  component: Drawer,
  tags: ['USX', 'autodocs'],
  excludeStories: ['storyDefs'],
  argTypes: {
    ...buildArgTypes(config.props || {}),
    children: { control: false },
    footer: { control: false },
    trigger: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A native `<dialog>` drawer for task panels, forms, navigation, and other structured content. The default modal drawer makes the rest of the page inert and keeps keyboard focus inside until it closes. Give each drawer a unique `id`, a descriptive `heading`, and a visible trigger label. The browser handles opening, Escape, focus return, and the Close control through native commands. Set `modal={false}` for a modeless panel that can be dismissed by clicking outside. `side` uses logical inline edges so start and end follow the reading direction. The visible Close button comes last in DOM order and is positioned in the header by CSS. `focusHeading={false}` lets the first control in the content receive initial focus.',
      },
    },
  },
};

/** A named modal drawer opens with heading focus and restores focus when closed. */
export const Default = {
  args: storyDefs.Default,
};

/** Open each physical edge; inline edges follow the document direction. */
export const AllSides = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {storyDefs.Sides.map((args) => (
        <Drawer key={args.id} {...args} />
      ))}
    </div>
  ),
};

/** Compact, default, and wide sizing use the same content structure. */
export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {storyDefs.Sizes.map((args) => (
        <Drawer key={args.id} {...args} />
      ))}
    </div>
  ),
};

/** A modeless drawer keeps other page tasks focusable and closes declaratively. */
export const Modeless = {
  args: storyDefs.Modeless,
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Drawer {...args} />
      <button className="usa-button usa-button--outline" type="button">
        Other page task
      </button>
    </div>
  ),
};

/** A task form can focus its first field and use `method="dialog"` to finish. */
export const RichForm = {
  args: storyDefs.RichForm,
};

/** A popover inside a modal drawer closes independently of the dialog. */
export const NestedPopover = {
  args: storyDefs.NestedPopover,
};

/** A long navigation list exercises the drawer's internal scrolling region. */
export const LongContent = {
  args: storyDefs.LongContent,
};

/** Logical start and end are demonstrated in a right-to-left context. */
export const Rtl = {
  render: () => (
    <div dir="rtl" style={{ display: 'flex', gap: '1rem' }}>
      {storyDefs.Rtl.map((args) => (
        <Drawer key={args.id} {...args} />
      ))}
    </div>
  ),
};

/** The disabled trigger leaves its drawer closed. */
export const Disabled = {
  args: storyDefs.Disabled,
};

/** An icon-only trigger needs a plain-text accessible name. */
export const IconTrigger = {
  args: storyDefs.IconTrigger,
};

/** Visible custom trigger text remains part of its accessible name. */
export const CustomTrigger = {
  args: storyDefs.CustomTrigger,
};
