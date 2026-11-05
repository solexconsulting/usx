import React from 'react';
import Popover from '../../../../usx-react/src/components/popover/Popover.tsx';
import PopoverMenu from '../../../../usx-react/src/components/popover/PopoverMenu.tsx';
import Details from '../../../../usx-react/src/components/details/Details.tsx';
import Link from '../../../../usx-react/src/components/link/Link.tsx';
import Tree from '../../../../usx-react/src/components/tree/Tree.tsx';
import config from '../../../../usx-react/src/components/popover/config.json';
import { buildArgTypes, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs as treeStoryDefs } from '../tree/Tree.React.stories.jsx';

// One navigation model drives the Tree and the nested Popovers.
const serviceNavigation = treeStoryDefs.ResidentServices.items;

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
    <nav aria-label="City website" className="grid-row">
      <a href="#home" className="padding-2 bg-surface-2 border-left-1px border-right-1px usa-button usx-button usa-button--unstyled">
        Home
      </a>
      {children}
      <a href="#permits" className="padding-2 bg-surface-2 border-left-1px border-right-1px usa-button usx-button usa-button--unstyled">
        Permits and licenses
      </a>
      <a href="#contact" className="padding-2 bg-surface-2 border-left-1px border-right-1px usa-button usx-button usa-button--unstyled">
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
      className: 'usa-button usx-button usa-button--primary margin-0',
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
    className: 'usa-button usx-button usa-button--primary margin-0',
  },
  side: 'bottom',
  align,
  children: `In right-to-left content, ${align} follows the reading direction.`,
}));

const headingAsExample = (id, panelHeading, headingAs) => ({
  id,
  summaryProps: { label: 'Important dates', className: 'usa-button usx-button usa-button--primary margin-0' },
  panelHeading,
  ...(headingAs ? { headingAs } : {}),
  showClose: true,
  children: <p className="margin-0">Applications are due by the last business day of the month.</p>,
});

const panelShapeExample = (panelShape) => ({
  id: `popover-panel-${panelShape}`,
  summaryProps: {
    label: `${panelShape === 'rounded' ? 'Rounded' : 'Square'} panel`,
    className: 'usa-button usx-button usa-button--primary margin-0',
  },
  panelShape,
  children: 'The panel shape changes its corners and outer padding.',
});

const menuItemsExample = {
  id: 'popover-menu-items',
  summaryProps: { label: 'Resident services', className: 'usa-button usx-button usa-button--primary margin-0' },
  menuItems: serviceNavigation,
};

export const storyDefs = {
  ResponsiveComposition: {
    id: 'site-menu',
    summaryProps: {
      className: 'usa-button usx-button usa-button--primary margin-0',
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
      className: 'padding-2 bg-surface-2 border-left-1px border-right-1px usa-button usx-button usa-button--unstyled margin-0',
    },
    panelShape: 'square',
    menuItems: serviceNavigation,
  },
  MenuItems: menuItemsExample,
  SquareMenuItems: {
    ...menuItemsExample,
    id: 'popover-square-menu-items',
    panelShape: 'square',
  },
  WorstCase: {
    id: 'popover-worst-case',
    summaryProps: {
      ariaLabel: 'Account and services, 3 notifications',
      className: 'usa-button usx-button usa-button--primary margin-0',
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
  Default: config.default,
  Unenhanced: {
    ...config.default, id: 'popover-unenhanced', showClose: true,
    children: 'Without JavaScript enhancement, clicking outside this popover will not close it. Click the trigger again to close it.',
    extraAttributes: { 'usx-data-enhanced': 'true' },
  },
  RoundedPanel: panelShapeExample('rounded'),
  SquarePanel: panelShapeExample('square'),
  GroupedSummaryProps: {
    id: 'popover-summary-props',
    summaryProps: {
      label: 'Account options',
      ariaLabel: 'Account options menu',
      className: 'usa-button usx-button usa-button--primary margin-0',
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
  Links: {
    id: 'popover-links',
    summaryProps: { label: 'Record links', className: 'usa-button usx-button usa-button--primary margin-0' },
    menuItems: [
      {
        type: 'link',
        href: '#saved-records',
        text: 'Saved records',
      },
      {
        type: 'link',
        href: '#sharing-options',
        text: 'Sharing options',
      },
    ],
  },
  RichForm: {
    id: 'popover-rich-form',
    summaryProps: { label: 'Filter results', className: 'usa-button usx-button usa-button--primary margin-0' },
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
        <button className="usa-button usx-button usa-button--primary margin-top-2" type="submit">
          Apply filters
        </button>
      </form>
    ),
  },
  LongContent: {
    id: 'popover-long-content',
    summaryProps: { label: 'City departments', className: 'usa-button usx-button usa-button--primary margin-0' },
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
  HeadingAsDefault: headingAsExample('popover-heading-default', 'Filing deadlines'),
  HeadingAsH3: headingAsExample('popover-heading-h3', 'Filing deadlines', 'h3'),
  HeadingAsH5: headingAsExample('popover-heading-h5', 'Filing deadlines', 'h5'),
  Placements: placementExamples,
  RtlPlacements: rtlPlacementExamples,
};
export default {
  decorators: [
    ...componentInit('popover'),
    (Story) => (
      <div className="height-viewport">
        <Story />
        <p>This content following the popover should be covered when it opens.</p>
      </div>
    ),
  ],
  title: 'React/USX/Popover',
  component: Popover,
  tags: ['USX', 'autodocs'],
  excludeStories: ['storyDefs', 'NavigationBarLayout', 'Unenhanced'],
  argTypes: {
    ...buildArgTypes(config.props || {}),
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A native `<details>` disclosure with a positioned panel. Use `summaryProps` for its trigger and `children` or `menuItems` for panel content. The summary toggles without JavaScript; `@solexllc/usx/js/start` adds outside dismissal, Escape, and the optional close button.',
      },
    },
  },
};

/** A classless summary retains its native appearance and disclosure semantics. */
export const Default = {
  args: storyDefs.Default,
};
export const Unenhanced = { args: storyDefs.Unenhanced, parameters: { docs: { description: { story: 'Native details behavior still opens and closes the panel when its trigger is clicked. Without USX JavaScript, outside clicks, Escape, and the optional Close button do not dismiss it.' } } } };

/** Original rounded panel with extra vertical padding. */
export const RoundedPanel = {
  args: storyDefs.RoundedPanel,
};

/** Square panel with equal outer padding on all sides. */
export const SquarePanel = {
  args: storyDefs.SquarePanel,
};

/** An existing item becomes the trigger by using summary with its own classes. */
export const AuthoredTrigger = {
  args: storyDefs.AuthoredTrigger,
  parameters: {
    docs: {
      description: {
        story:
          'Pass the application item’s classes through `summaryProps.className`. Popover leaves the summary unstyled.',
      },
    },
  },
};

/** Summary configuration is grouped and passed directly to the shared Summary component. */
export const GroupedSummaryProps = {
  args: storyDefs.GroupedSummaryProps,
};

/** Pass `menuItems` to render a stacked menu in the panel; `details` rows open flyouts to the right. */
export const MenuItems = {
  args: storyDefs.MenuItems,
  parameters: {
    docs: {
      description: {
        story:
          'Link rows navigate; `details` rows open nested flyouts. Native `name` groups make sibling flyouts mutually exclusive.',
      },
    },
  },
};

/** The same nested menu in a square panel. */
export const SquareMenuItems = {
  args: storyDefs.SquareMenuItems,
};

/** Every panel feature at once: menu, children, close button, custom trigger. */
export const WorstCase = {
  args: storyDefs.WorstCase,
  parameters: {
    docs: {
      description: {
        story:
          'Combines nested menu items, rich content, a close button, and a custom trigger.',
      },
    },
  },
};

/** Menu link rows have real destinations. */
export const Links = {
  args: storyDefs.Links,
};

/** A form popover with a nested Details and a close button. */
export const RichForm = {
  args: storyDefs.RichForm,
};

/** Without `headingAs`, `panelHeading` renders as an h2. */
export const HeadingAsDefault = {
  args: storyDefs.HeadingAsDefault,
};

/** Set `headingAs` so the panel heading fits the outline of the page that contains it. */
export const HeadingAsH3 = {
  args: storyDefs.HeadingAsH3,
};

/** Heading levels are independent of visual size; use `panelClassName` or utilities to restyle. */
export const HeadingAsH5 = {
  args: storyDefs.HeadingAsH5,
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
          'The same items render as a padded Tree on small screens and nested Popovers from the tablet breakpoint.',
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
