import { storyDefaultArgs } from '../../utils/storyHelpers.jsx';
import React from 'react';
import Drawer from '../../../../usx-react/src/components/drawer/Drawer.tsx';
import Tree from '../../../../usx-react/src/components/tree/Tree.tsx';
import Search from '../../../../usx-react/src/components/search/Search.tsx';
import Avatar from '../../../../usx-react/src/components/avatar/Avatar.tsx';
import Link from '../../../../usx-react/src/components/link/Link.tsx';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import SummaryBox from '../../../../usx-react/src/components/summary-box/SummaryBox.tsx';
import Tag from '../../../../usx-react/src/components/tag/Tag.tsx';
import Input from '../../../../usx-react/src/components/input/Input.tsx';
import Checkbox from '../../../../usx-react/src/components/checkbox/Checkbox.tsx';
import TaskList from '../../../../usx-react/src/components/task-list/TaskList.tsx';
import config from '../../../../usx-react/src/components/drawer/config.json';
import { buildArgTypes, componentInit } from '../../utils/storyHelpers.jsx';

// Native command attributes are not in React's known-property list.
const closeAction = { commandfor: 'drawer-action-required', command: 'close' };

const navigationItems = [
  { type: 'link', href: '#services-overview', text: 'Services overview' },
  {
    type: 'details',
    summaryProps: { label: 'Benefits and assistance' },
    open: true,
    items: [
      {
        type: 'details',
        summaryProps: { label: 'Housing support' },
        open: true,
        items: [
          {
            type: 'details',
            summaryProps: { label: 'Rental assistance' },
            open: true,
            items: [
              { type: 'link', href: '#apply-rental-assistance', text: 'Apply for rental assistance' },
              { type: 'link', href: '#rental-eligibility', text: 'Check eligibility' },
            ],
          },
          { type: 'link', href: '#find-housing', text: 'Find affordable housing' },
        ],
      },
      {
        type: 'details',
        summaryProps: { label: 'Food assistance' },
        items: [
          { type: 'link', href: '#food-benefits', text: 'Apply for food benefits' },
          { type: 'link', href: '#food-programs', text: 'Find local food programs' },
        ],
      },
    ],
  },
  {
    type: 'details',
    summaryProps: { label: 'Records and permits' },
    items: [
      { type: 'link', href: '#public-records', text: 'Request a public record' },
      { type: 'link', href: '#parking-permit', text: 'Apply for a parking permit' },
    ],
  },
  { type: 'link', href: '#contact-services', text: 'Contact a service center' },
];

export const storyDefs = {
  Default: storyDefaultArgs(config.default),
  Unenhanced: {
    ...storyDefaultArgs({
      ...config.default,
      id: 'drawer-unenhanced',
      label: 'Open application details without JavaScript',
      children: config.default.children.replaceAll('drawer-application-summary', 'drawer-unenhanced-summary'),
    }),
    extraAttributes: { 'usx-data-enhanced': 'true' },
  },
  MenuIconTrigger: {
    id: 'drawer-menu-icon-trigger',
    label: 'Open site menu',
    triggerAriaLabel: 'Open site menu',
    triggerClassName: 'usa-button usx-button usa-button--primary display-block margin-0',
    trigger: (
      <svg className="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img">
        <use href="/img/sprite.svg#menu" />
      </svg>
    ),
    heading: 'Site menu',
    side: 'inline-start',
    size: 'compact',
    children: (
      <nav aria-label="Site menu">
        <Tree
          variant="padded"
          items={[
            { type: 'link', href: '#home', text: 'Home' },
            {
              type: 'details',
              summaryProps: { label: 'Services' },
              items: [
                { type: 'link', href: '#apply', text: 'Apply for a service' },
                { type: 'link', href: '#track', text: 'Track a request' },
              ],
            },
            { type: 'link', href: '#contact', text: 'Contact us' },
          ]}
        />
      </nav>
    ),
  },
  RichForm: {
    id: 'drawer-rich-form',
    label: 'Filter programs',
    triggerClassName: 'usa-button usx-button usa-button--outline margin-0',
    heading: 'Filter programs',
    description: 'Choose the programs you want to see.',
    focusHeading: false,
    children: (
      <form id="drawer-filter-form" method="dialog">
        <Input
          id="drawer-search-term"
          name="query"
          label="Search term"
          placeholder="Program name or keyword"
          autoFocus
        />
        <fieldset className="usa-fieldset margin-top-2">
          <legend className="usa-legend">Status</legend>
          <Checkbox id="drawer-status-open" name="status" value="open" label="Open" />
          <Checkbox
            id="drawer-status-accepting"
            name="status"
            value="accepting"
            label="Accepting applications"
          />
        </fieldset>
      </form>
    ),
    footer: (
      <button
        className="usa-button usx-button usa-button--primary"
        type="submit"
        form="drawer-filter-form"
        value="apply"
      >
        Apply filters
      </button>
    ),
  },
  ServiceNavigation: {
    id: 'drawer-service-navigation',
    label: 'Browse services',
    triggerClassName: 'usa-button usx-button usa-button--secondary margin-0',
    heading: 'Services',
    size: 'wide',
    children: (
      <>
        <Search
          id="drawer-service-search"
          label="Search"
          big={true}
          ariaLabel="Search services"
          placeholder="Find a service"
          action="/search"
        />
        <nav aria-label="Service sections" className="margin-top-3">
          <Tree items={navigationItems} variant="padded" />
        </nav>
      </>
    ),
    footer: (
      <div className="display-flex flex-align-center">
        <Avatar
          href="#account"
          variant="initials"
          value="ML"
          alt="Morgan Lee account"
          contentClassName="bg-primary-lighter text-primary-darker"
        />
        <Link className="margin-left-1" href="#account">Morgan Lee</Link>
      </div>
    ),
  },
  Rounded: {
    id: 'drawer-rounded',
    label: 'Get support',
    triggerClassName: 'usa-button usx-button usa-button--primary margin-0',
    heading: 'Contact support',
    rounded: true,
    children: (
      <>
        <Alert
          variant="info"
          heading="Talk to a specialist"
          text="A service representative can help you understand your next steps."
        />
        <p>Check the support center for answers before starting a new request.</p>
        <Link href="#support-center">Visit the support center</Link>
      </>
    ),
  },
  ActionRequired: {
    id: 'drawer-action-required',
    label: 'Review terms',
    triggerClassName: 'usa-button usx-button usa-button--primary margin-0',
    heading: 'Review the terms',
    description: 'Choose an option to continue.',
    actionRequired: true,
    children: (
      <>
        <SummaryBox id="drawer-terms-summary" heading="Before you continue">
          <ul>
            <li>Your information is used to process this request.</li>
            <li>You can return to review your submission later.</li>
          </ul>
        </SummaryBox>
        <p><Link href="#privacy-notice">Read the privacy notice</Link></p>
      </>
    ),
    footer: (
      <>
        <button
          className="usa-button usx-button usa-button--outline"
          type="button"
          {...closeAction}
        >
          Decline
        </button>
        <button className="usa-button usx-button usa-button--primary" type="button" {...closeAction}>
          Accept
        </button>
      </>
    ),
  },
  Disabled: {
    id: 'drawer-disabled',
    label: 'View annual account statement',
    triggerClassName: 'usa-button usx-button usa-button--primary margin-0',
    heading: 'Annual account statement',
    description: 'Available once year-end processing is complete.',
    disabled: true,
    children: (
      <Alert
        variant="info"
        heading="Statement being prepared"
        text="Your statement will be available here after processing is complete."
      />
    ),
  },
  Sides: [
    {
      id: 'drawer-inline-start',
      label: 'Browse departments',
      heading: 'Departments',
      side: 'inline-start',
      triggerClassName: 'usa-button usx-button usa-button--outline margin-0',
      children: (
        <nav aria-label="Departments">
          <Tree
            variant="padded"
            items={[
              { type: 'link', href: '#housing', text: 'Housing' },
              { type: 'link', href: '#transportation', text: 'Transportation' },
              { type: 'link', href: '#public-health', text: 'Public health' },
            ]}
          />
        </nav>
      ),
    },
    {
      id: 'drawer-inline-end',
      label: 'Review service request',
      heading: 'Service request',
      side: 'inline-end',
      triggerClassName: 'usa-button usx-button usa-button--outline margin-0',
      children: (
        <>
          <Tag value="Submitted" color="success" />
          <SummaryBox id="drawer-request-summary" heading="Streetlight repair">
            <p>Request number: SR-5284</p>
            <p>The maintenance team has received your report.</p>
          </SummaryBox>
          <Link href="#request-history">View request history</Link>
        </>
      ),
    },
    {
      id: 'drawer-top',
      label: 'View service notice',
      heading: 'Service notice',
      side: 'top',
      triggerClassName: 'usa-button usx-button usa-button--outline margin-0',
      children: (
        <>
          <Alert
            variant="warning"
            heading="Online payments are temporarily unavailable"
            text="You can still review balances and save forms while payment service is restored."
          />
          <p><Link href="#service-updates">Check service updates</Link></p>
        </>
      ),
    },
    {
      id: 'drawer-bottom',
      label: 'View saved services',
      heading: 'Saved services',
      side: 'bottom',
      triggerClassName: 'usa-button usx-button usa-button--outline margin-0',
      children: (
        <TaskList
          tasks={[
            { name: 'Renew parking permit', href: '#renew-parking', hint: 'Continue your draft', tagProps: { value: 'In-Progress', color: 'info' } },
            { name: 'Track streetlight repair', href: '#track-streetlight', hint: 'Request SR-5284', tagProps: { value: 'Not started', outline: true } },
          ]}
        />
      ),
    },
  ],
  Sizes: [
    {
      id: 'drawer-size-compact',
      label: 'Open account shortcuts',
      heading: 'Account shortcuts',
      size: 'compact',
      triggerClassName: 'usa-button usx-button usa-button--outline margin-0',
      children: (
        <nav aria-label="Account shortcuts">
          <Tree
            variant="padded"
            items={[
              { type: 'link', href: '#profile', text: 'Profile' },
              { type: 'link', href: '#saved-services', text: 'Saved services' },
              { type: 'link', href: '#notifications', text: 'Notifications' },
            ]}
          />
        </nav>
      ),
    },
    {
      id: 'drawer-size-default',
      label: 'Review appointment',
      heading: 'Appointment details',
      size: 'default',
      triggerClassName: 'usa-button usx-button usa-button--outline margin-0',
      children: (
        <>
          <SummaryBox id="drawer-appointment-summary" heading="Service center visit">
            <p>Bring a photo ID and your confirmation number.</p>
          </SummaryBox>
          <p><Link href="#reschedule-appointment">Reschedule appointment</Link></p>
        </>
      ),
    },
    {
      id: 'drawer-size-wide',
      label: 'Review application checklist',
      heading: 'Application checklist',
      size: 'wide',
      triggerClassName: 'usa-button usx-button usa-button--outline margin-0',
      children: (
        <TaskList
          tasks={[
            { name: 'Confirm your address', href: '#confirm-address', tagProps: { value: 'Completed', color: 'success' } },
            { name: 'Upload income documents', href: '#upload-income', tagProps: { value: 'Incomplete', color: 'warning' } },
            { name: 'Review and submit', href: '#review-submit', tagProps: { value: 'In-Progress', color: 'info' } },
          ]}
        />
      ),
    },
  ],
};

export default {
  title: 'React/USX/Drawer',
  component: Drawer,
  tags: ['USX', 'autodocs'],
  excludeStories: ['storyDefs', 'Unenhanced'],
  argTypes: {
    ...buildArgTypes(config.props || {}),
    children: { control: false },
    footer: { control: false },
    trigger: { control: false },
  },
  decorators: [...componentInit('drawer')],
  parameters: {
    docs: {
      description: {
        component:
          'A modal `<dialog>` for tasks, forms, and navigation. Provide a unique `id`, visible `heading`, and trigger label. Native dialog commands open and close it; `@solexllc/usx/js/start` adds backdrop dismissal and support for browsers without those commands. Set `actionRequired` only when the content provides its own close action.',
      },
    },
  },
};

/** A named modal drawer opens with heading focus and restores focus when closed. */
export const Default = {
  args: storyDefs.Default,
};
export const Unenhanced = { args: storyDefs.Unenhanced, parameters: { docs: { description: { story: 'Native dialog commands still open and close the drawer. USX JavaScript adds dismissal when the backdrop outside the dialog panel is clicked.' } } } };

/** An icon-only menu button uses the trigger slot and an explicit accessible name. */
export const MenuIconTrigger = {
  args: storyDefs.MenuIconTrigger,
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

/** Account shortcuts, an appointment, and a checklist show useful content at each size. */
export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {storyDefs.Sizes.map((args) => (
        <Drawer key={args.id} {...args} />
      ))}
    </div>
  ),
};

/** A task form can focus its first field and use `method="dialog"` to finish. */
export const RichForm = {
  args: storyDefs.RichForm,
};

/** Deeply nested navigation, search, and an account footer in a wide drawer. */
export const ServiceNavigation = {
  args: storyDefs.ServiceNavigation,
};

/** Rounded corners are opt-in; edges are square by default. */
export const Rounded = {
  args: storyDefs.Rounded,
};

/** With no close button, the drawer closes only through its own actions. */
export const ActionRequired = {
  args: storyDefs.ActionRequired,
};

/** The disabled trigger leaves its drawer closed. */
export const Disabled = {
  args: storyDefs.Disabled,
};
