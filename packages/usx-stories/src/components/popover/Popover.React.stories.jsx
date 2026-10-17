import React from 'react';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import Popover from '../../../../usx-react/src/components/popover/Popover.tsx';
import PopoverMenu from '../../../../usx-react/src/components/popover/PopoverMenu.tsx';
import Details from '../../../../usx-react/src/components/details/Details.tsx';
import Link from '../../../../usx-react/src/components/link/Link.tsx';
import Tree from '../../../../usx-react/src/components/tree/Tree.tsx';
import config from '../../../../usx-react/src/components/popover/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import { storyDefs as treeStoryDefs } from '../tree/Tree.React.stories.jsx';

// One navigation model drives the Tree and the nested Popovers.
const serviceNavigation = treeStoryDefs.ResidentServices.items;
const resourceLinks = [
  { type: 'link', href: '#eligibility', text: 'Check eligibility' },
  { type: 'link', href: '#documents', text: 'Required documents' },
  { type: 'link', href: '#contact', text: 'Contact support' },
];

// Sibling details share a native group name; each nesting level gets its own.
const withGroupNames = (items, group) =>
  items.map((item, index) =>
    item.type === 'details' && item.items
      ? { ...item, name: group, items: withGroupNames(item.items, `${group}-${index}`) }
      : item
  );

/** A horizontal site navigation row around a Popover dropdown. */
export function NavigationBarLayout({ children }) {
  return (
    <nav aria-label="City website" className="display-flex flex-wrap flex-align-center grid-gap-1">
      <a href="#home" className="usa-button usa-button--unstyled">
        Home
      </a>
      {children}
      <a href="#permits" className="usa-button usa-button--unstyled">
        Permits and licenses
      </a>
      <a href="#contact" className="usa-button usa-button--unstyled">
        Contact us
      </a>
    </nav>
  );
}

const departments = [
  'Animal services',
  'Building and safety',
  'City clerk',
  'Code enforcement',
  'Community development',
  'Economic development',
  'Elections',
  'Emergency management',
  'Finance',
  'Fire',
  'Housing authority',
  'Human resources',
  'Library',
  'Neighborhood services',
  'Parks and recreation',
  'Planning',
  'Police',
  'Public health',
  'Public works',
  'Water and sewer',
];

const placementSides = ['right', 'top', 'bottom', 'left'];
const placementAlignments = ['start', 'center', 'end'];

const placementExamples = placementAlignments.flatMap((align) =>
  placementSides.map((side) => ({
    id: `popover-${side}-${align}`,
    summaryProps: {
      label: `${side} / ${align}`,
      className: 'usa-button usx-button margin-0',
    },
    side,
    align,
    children: `Placed ${side}, aligned ${align}.`,
  }))
);

const rtlPlacementExamples = ['start', 'end'].map((align) => ({
  id: `popover-rtl-${align}`,
  summaryProps: {
    label: `Bottom / ${align} in RTL`,
    className: 'usa-button usx-button margin-0',
  },
  side: 'bottom',
  align,
  children: `In right-to-left content, ${align} follows the reading direction.`,
}));

const headingLevelExample = (id, panelHeading, headingLevel) => ({
  id,
  summaryProps: { label: 'Important dates', className: 'usa-button usx-button margin-0' },
  panelHeading,
  ...(headingLevel ? { headingLevel } : {}),
  showClose: true,
  children: <p className="margin-0">Applications are due by the last business day of the month.</p>,
});

export const storyDefs = {
  ResponsiveComposition: {
    id: 'site-menu',
    summaryProps: {
      className: 'usa-button usx-button margin-0',
      children: (
        <>
          <svg className="usa-icon margin-right-1" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#menu" />
          </svg>
          <span>Menu</span>
        </>
      ),
    },
    contentClassName: 'margin-0',
    children: (
      <>
        <nav
          aria-label="Resident services"
          className="display-block tablet:display-none"
          data-testid="mobile-tree"
        >
          <Tree variant="padded" items={withGroupNames(serviceNavigation, 'site-menu-tree')} />
        </nav>
        <nav
          aria-label="Resident services"
          className="display-none tablet:display-block"
          data-testid="desktop-flyouts"
        >
          <PopoverMenu items={serviceNavigation} prefix="site-menu-flyouts" />
        </nav>
      </>
    ),
  },
  NavigationBar: {
    id: 'site-nav-services',
    summaryProps: {
      label: 'Resident services',
      className: 'usa-button usx-button usa-button--unstyled margin-0',
    },
    children: (
      <PopoverMenu
        items={serviceNavigation.filter((item) => item.type === 'details')}
        prefix="site-nav"
      />
    ),
  },
  MenuItems: {
    id: 'popover-menu-items',
    summaryProps: { label: 'Resident services', className: 'usa-button usx-button margin-0' },
    menuItems: serviceNavigation,
  },
  WorstCase: {
    id: 'popover-worst-case',
    summaryProps: {
      ariaLabel: 'Account and services, 3 notifications',
      className: 'usa-button usx-button margin-0',
      children: (
        <>
          <svg className="usa-icon margin-right-1" aria-hidden="true" focusable="false">
            <use href="./img/sprite.svg#menu" />
          </svg>
          <span>Account and services</span>
          <span className="usa-tag margin-left-1">3</span>
        </>
      ),
    },
    className: 'margin-left-2',
    side: 'bottom',
    align: 'start',
    panelHeading: 'Account and services',
    panelClassName: 'font-sans-sm',
    showClose: true,
    closeLabel: 'Close account menu',
    menuItems: [
      ...serviceNavigation,
      {
        type: 'link',
        href: '#sign-out',
        text: 'Sign out of your account and return to the city home page',
      },
      { type: 'text', text: 'Offices are closed on public holidays' },
    ],
    children: (
      <>
        <h3 id="popover-worst-case-heading" className="font-heading-md margin-bottom-1">
          Need more help?
        </h3>
        <p className="margin-top-0">Call 311 or visit a service center near you.</p>
        <Details
          summaryProps={{ label: 'What to bring' }}
          text="A photo ID and any letters you received about your case."
        />
      </>
    ),
  },
  Default: {
    id: 'popover-default',
    summaryProps: { label: 'Where is my case number?' },
    className: 'usx-details',
    children: 'Your case number is in the confirmation email we sent after you applied.',
  },
  GroupedSummaryProps: {
    id: 'popover-summary-props',
    summaryProps: {
      label: 'Account options',
      ariaLabel: 'Account options menu',
      className: 'usa-button usx-button margin-0',
    },
    children: 'Manage your account settings.',
  },
  AuthoredTrigger: {
    id: 'popover-authored-trigger',
    summaryProps: {
      className: 'display-flex flex-align-center padding-2 bg-surface-2 text-ink usx-rounded-lg',
      children: (
        <>
          <svg
            className="usa-icon usa-icon--size-3 margin-right-2"
            aria-hidden="true"
            focusable="false"
          >
            <use href="./img/sprite.svg#folder" />
          </svg>
          <span>
            <span className="display-block text-bold">Application 10482</span>
            <span className="display-block font-sans-xs">View status and next steps</span>
          </span>
        </>
      ),
    },
    children: (
      <>
        <p className="margin-top-0">Your application is ready for review.</p>
        <Link href="#application-10482">Review application</Link>
      </>
    ),
  },
  Navigation: {
    id: 'popover-navigation',
    summaryProps: { label: 'Resources', className: 'usa-button usx-button margin-0' },
    children: (
      <nav aria-label="Resource links">
        <PopoverMenu items={resourceLinks} prefix="popover-navigation" />
      </nav>
    ),
  },
  Actions: {
    id: 'popover-actions',
    summaryProps: { label: 'Record actions', className: 'usa-button usx-button margin-0' },
    menuItems: [
      {
        type: 'link',
        text: 'Save for later',
      },
      {
        type: 'link',
        text: 'Share record',
      },
    ],
  },
  RichForm: {
    id: 'popover-rich-form',
    summaryProps: { label: 'Filter results', className: 'usa-button usx-button margin-0' },
    showClose: true,
    children: (
      <form method="get" action="#results">
        <h3 id="popover-filters-heading" className="font-heading-md margin-top-0">
          Filter results
        </h3>
        <label className="usa-label usx-label" htmlFor="popover-search-term">
          Search term
        </label>
        <input className="usa-input usx-input" id="popover-search-term" name="query" />
        <fieldset className="usa-fieldset margin-top-2">
          <legend className="usa-legend">Status</legend>
          <div className="usa-checkbox usx-checkbox">
            <input
              className="usa-checkbox__input"
              id="popover-status-open"
              name="status"
              type="checkbox"
              value="open"
            />
            <label className="usa-checkbox__label" htmlFor="popover-status-open">
              Open
            </label>
          </div>
        </fieldset>
        <Details
          summaryProps={{ label: 'How these filters work' }}
          text="Combine a search term and status to narrow your results."
          className="margin-top-2"
        />
        <button className="usa-button usx-button margin-top-2" type="submit">
          Apply filters
        </button>
      </form>
    ),
  },
  LongContent: {
    id: 'popover-long-content',
    summaryProps: { label: 'City departments', className: 'usa-button usx-button margin-0' },
    scrollable: true,
    children: (
      <nav aria-label="City departments">
        <ul className="usx-popover__menu">
          {departments.map((department) => (
            <li key={department}>
              <Link
                href={`#${department.toLowerCase().replace(/\W+/g, '-')}`}
                text={department}
                className="usx-no-visited"
              />
            </li>
          ))}
        </ul>
      </nav>
    ),
  },
  HeadingLevelDefault: headingLevelExample('popover-heading-default', 'Filing deadlines'),
  HeadingLevelH3: headingLevelExample('popover-heading-h3', 'Filing deadlines', 'h3'),
  HeadingLevelH5: headingLevelExample('popover-heading-h5', 'Filing deadlines', 'h5'),
  Placements: placementExamples,
  RtlPlacements: rtlPlacementExamples,
};
export default {
  decorators: [
    (Story) => (
      <div className="height-viewport">
        <Alert
          variant="warning"
          heading="Experimental — do not use in production"
          className="margin-bottom-3"
        >
          This component is for evaluation while browser and assistive technology validation is
          completed.
        </Alert>
        <Story />
        <p>This content following the popover should be covered when it opens.</p>
      </div>
    ),
  ],
  title: 'React/USX/Popover',
  component: Popover,
  tags: ['USX', 'autodocs'],
  excludeStories: ['storyDefs', 'NavigationBarLayout'],
  argTypes: {
    ...buildArgTypes(config.props || {}),
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Popover positions a native `<details>` panel beside its summary. Configure the summary through `summaryProps`. Content is arbitrary semantic markup. Choose `side` and `align` with enough room for the panel. Import `@solexllc/usx/js/start` or call `popover.on(root)` for outside dismissal and Escape with focus return.\n\nFor site navigation, put a Tree or a list inside Popover. The Responsive Composition story builds one Menu from a single list of items: a padded Tree for inline navigation at small widths, and nested Popovers that open to the right from the tablet breakpoint (640px by default). Keep markup IDs and native `name` groups distinct between the two hidden views.',
      },
    },
  },
};

/** A classless summary retains its native appearance and disclosure semantics. */
export const Default = {
  args: storyDefs.Default,
};

/** An existing item becomes the trigger by using summary with its own classes. */
export const AuthoredTrigger = {
  args: storyDefs.AuthoredTrigger,
  parameters: {
    docs: {
      description: {
        story:
          'The application item owns its appearance. Its utility classes are passed directly to the summary using `summaryProps.className`; Popover adds no summary classes or styles. In authored HTML, wrap the item in `<details class="usx-popover">` and change its element from `<div>` to `<summary>`, retaining its classes and noninteractive content. This example uses the same keyboard activation and dismissal as the unstyled Default story.',
      },
    },
  },
};

/** Summary configuration is grouped and passed directly to the shared Summary component. */
export const GroupedSummaryProps = {
  args: storyDefs.GroupedSummaryProps,
};

/** A labelled navigation landmark keeps links in their familiar semantics and tab order. */
export const Navigation = {
  args: storyDefs.Navigation,
};

/** Pass `menuItems` to render a stacked menu in the panel; `details` rows open flyouts to the right. */
export const MenuItems = {
  args: storyDefs.MenuItems,
  parameters: {
    docs: {
      description: {
        story:
          'Link rows are plain links; `details` rows are nested Popovers with a chevron, aligned with their row. Each level has its own native `name` group, so opening one flyout closes its siblings. Nesting can continue to any depth.',
      },
    },
  },
};

/** Every panel feature at once: menu, children, close button, custom trigger. */
export const WorstCase = {
  args: storyDefs.WorstCase,
  parameters: {
    docs: {
      description: {
        story:
          'A stress test combining `menuItems` (three levels, a text row, and a long link), `children` with a heading, a nested Details, `showClose`, a rich trigger with `summaryProps.ariaLabel`, and custom wrapper and panel classes.',
      },
    },
  },
};

/** Menu rows render as links. */
export const Actions = {
  args: storyDefs.Actions,
};

/** A form popover with a nested Details and a close button. */
export const RichForm = {
  args: storyDefs.RichForm,
};

/** Without `headingLevel`, `panelHeading` renders as an h2. */
export const HeadingLevelDefault = {
  args: storyDefs.HeadingLevelDefault,
};

/** Set `headingLevel` so the panel heading fits the outline of the page that contains it. */
export const HeadingLevelH3 = {
  args: storyDefs.HeadingLevelH3,
};

/** Heading levels are independent of visual size; use `panelClassName` or utilities to restyle. */
export const HeadingLevelH5 = {
  args: storyDefs.HeadingLevelH5,
};

/** All four sides and three alignments are available from the same API. */
export const AllPlacements = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(12rem, 1fr))',
        gap: '6rem 3rem',
      }}
    >
      {storyDefs.Placements.map((args) => (
        <div key={args.id}>
          <Popover {...args} />
        </div>
      ))}
    </div>
  ),
};

/** Start and end alignment follow reading direction in right-to-left content. */
export const RtlPlacements = {
  render: () => (
    <div
      dir="rtl"
      style={{ display: 'flex', justifyContent: 'center', gap: '8rem', padding: '6rem 3rem' }}
    >
      {storyDefs.RtlPlacements.map((args) => (
        <Popover key={args.id} {...args} />
      ))}
    </div>
  ),
};

/** Long leaf content has an explicit scrolling area so other panels can host flyouts. */
export const LongContent = {
  args: storyDefs.LongContent,
};

/** One Menu popover shows a padded Tree on small screens and nested Popovers on large screens. */
export const ResponsiveComposition = {
  args: storyDefs.ResponsiveComposition,
  parameters: {
    docs: {
      description: {
        story:
          'Both presentations are built from the same list of items. Below the tablet breakpoint, the Menu opens a padded Tree for inline navigation. From the tablet breakpoint, each branch becomes a nested Popover that opens to the right.',
      },
    },
  },
};

/** A dropdown in a horizontal site navigation row, with flyouts for deeper levels. */
export const NavigationBar = {
  render: () => (
    <NavigationBarLayout>
      <Popover {...storyDefs.NavigationBar} />
    </NavigationBarLayout>
  ),
};
