import React from 'react';
import Tree from '../../../../usx-react/src/components/tree/Tree.tsx';
import config from '../../../../usx-react/src/components/tree/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: {
    items: [
      {
        type: 'details',
        summaryProps: { label: 'More application services' },
        items: [
          { type: 'link', href: '#renew-application', text: 'Renew an application' },
          { type: 'link', href: '#get-help', text: 'Get help' },
        ],
      },
      {
        type: 'details',
        summaryProps: { label: 'About these services' },
        text: 'Find applications and support here.',
      },
      {
        type: 'details',
        summaryProps: { label: 'Coming soon' },
        items: [{ type: 'text', text: 'Feature under development' }],
      },
      { type: 'link', href: '#application-status', text: 'Check application status' },
      { type: 'text', text: 'Applications' },
    ],
  },
  Raw: {
    items: [
      {
        type: 'details',
        summaryProps: { label: 'More application services' },
        items: [
          { type: 'link', href: '#renew-application', text: 'Renew an application' },
          { type: 'link', href: '#get-help', text: 'Get help' },
        ],
      },
      {
        type: 'details',
        summaryProps: { label: 'About these services' },
        text: 'Find applications and support here.',
      },
      {
        type: 'details',
        summaryProps: { label: 'Coming soon' },
        items: [{ type: 'text', text: 'Feature under development' }],
      },
      { type: 'link', href: '#application-status', text: 'Check application status' },
      { type: 'text', text: 'Applications' },
    ],
    variant: 'raw',
  },
  Padded: {
    items: [
      {
        type: 'details',
        summaryProps: { label: 'More services' },
        items: [
          { type: 'text', text: 'Forms' },
          { type: 'link', href: '#renew-application', text: 'Renew an application' },
        ],
      },
      { type: 'link', href: '#application-status', text: 'Check application status' },
      { type: 'text', text: 'Applications' },
    ],
    variant: 'padded',
  },
  NestedGroups: {
    items: [
      {
        type: 'details',
        summaryProps: { label: 'Programs' },
        name: 'tree-example-sections',
        items: [
          {
            type: 'details',
            summaryProps: { label: 'Housing' },
            name: 'tree-example-programs',
            items: [{ type: 'link', href: '#housing-support', text: 'Housing support' }],
          },
          {
            type: 'details',
            summaryProps: { label: 'Benefits' },
            name: 'tree-example-programs',
            items: [{ type: 'link', href: '#benefits-support', text: 'Benefits support' }],
          },
        ],
      },
      {
        type: 'details',
        summaryProps: { label: 'Services' },
        name: 'tree-example-sections',
        items: [
          { type: 'link', href: '#service-directory', text: 'Service directory' },
          { type: 'link', href: 'https://google.com', text: 'Other Services', external: true },
        ],
      },
    ],
  },
  EmptyBranch: {
    items: [
      { type: 'details', summaryProps: { label: 'More services' }, items: [] },
      { type: 'link', text: 'Check application status', href: '#application-status' },
    ],
  },
  DetailsLeaf: {
    items: [
      {
        type: 'details',
        summaryProps: { label: 'Help finding your application number' },
        text: 'The number is in your confirmation email.',
      },
    ],
  },
  ResidentServices: {
    variant: 'padded',
    items: [
      {
        type: 'details',
        summaryProps: { label: 'Housing and neighborhoods' },
        items: [
          {
            type: 'details',
            summaryProps: { label: 'Help with housing costs' },
            items: [
              { type: 'link', href: '#rent-assistance', text: 'Apply for rental assistance' },
              {
                type: 'link',
                href: '#utility-assistance',
                text: 'Get help paying energy and water bills',
              },
            ],
          },
          { type: 'link', href: '#find-housing', text: 'Find affordable housing' },
          { type: 'link', href: '#tenant-rights', text: 'Understand your rights as a tenant' },
        ],
      },
      {
        type: 'details',
        summaryProps: { label: 'Transportation' },
        items: [
          { type: 'link', href: '#transit-passes', text: 'Reduced fare transit passes' },
          { type: 'link', href: '#accessible-transit', text: 'Accessible transportation' },
          { type: 'link', href: 'https://google.com', text: 'Other Services', external: true },
        ],
      },
      { type: 'link', href: '#services-overview', text: 'All resident services' },
      { type: 'link', href: '#contact-services', text: 'Contact a service center' },
    ],
  },
  ServiceDirectory: {
    variant: 'padded',
    items: [
      {
        type: 'details',
        summaryProps: { label: 'Start or grow a business' },
        items: [
          { type: 'link', href: '#business-license', text: 'Apply for a business license' },
          { type: 'link', href: '#renew-license', text: 'Renew an existing license' },
          {
            type: 'details',
            summaryProps: { label: 'Before you apply' },
            text: 'Have your business address, contact information, and registration number ready. You can save your application and return to it later.',
          },
        ],
      },
      { type: 'link', href: '#track-request', text: 'Track a service request' },
      { type: 'link', href: '#report-problem', text: 'Report a street or sidewalk problem' },
      { type: 'link', href: '#parking-permit', text: 'Request a residential parking permit' },
      { type: 'link', href: '#service-centers', text: 'Visit a neighborhood service center' },
      { type: 'text', text: 'Popular services' },
      { type: 'text', text: 'Permits and licenses' },
      { type: 'text', text: 'More ways to get help' },
    ],
  },
  DocumentLibrary: {
    variant: 'raw',
    items: [
      {
        type: 'details',
        summaryProps: { label: 'Budget and financial reports' },
        items: [
          {
            type: 'details',
            summaryProps: { label: 'Fiscal year 2026' },
            items: [
              { type: 'link', href: '#2026-adopted-budget', text: 'Adopted budget (PDF, 2.4 MB)' },
              { type: 'link', href: '#2026-budget-summary', text: 'Budget summary (HTML)' },
            ],
          },
          {
            type: 'details',
            summaryProps: { label: 'Fiscal year 2025' },
            items: [
              {
                type: 'link',
                href: '#2025-financial-report',
                text: 'Annual financial report (PDF, 1.8 MB)',
              },
              { type: 'link', href: '#2025-spending', text: 'Spending data (CSV, 320 KB)' },
            ],
          },
        ],
      },
      {
        type: 'details',
        summaryProps: { label: 'Meeting records' },
        items: [
          {
            type: 'details',
            summaryProps: { label: 'Planning commission' },
            items: [
              { type: 'link', href: '#planning-agenda', text: 'October meeting agenda (HTML)' },
              {
                type: 'link',
                href: '#planning-minutes',
                text: 'September meeting minutes (PDF, 180 KB)',
              },
            ],
          },
        ],
      },
      { type: 'link', href: '#records-request', text: 'Request a public record' },
    ],
  },
  ApplicationHelp: {
    variant: 'raw',
    items: [
      {
        type: 'details',
        summaryProps: { label: 'Uploading supporting documents' },
        items: [
          {
            type: 'details',
            summaryProps: { label: 'Which file formats can I upload?' },
            text: 'You can upload PDF, JPG, or PNG files. Each file must be smaller than 10 MB.',
          },
          {
            type: 'details',
            summaryProps: { label: 'What if I do not have a scanner?' },
            text: 'You can use a clear photo of the document. Include all four corners and make sure the text is readable.',
          },
          {
            type: 'link',
            href: '#document-checklist',
            text: 'Read the supporting document checklist',
          },
        ],
      },
      {
        type: 'details',
        summaryProps: { label: 'Where do I find my application number?' },
        text: 'Your application number is in the confirmation email sent after you submitted your application. Check your spam folder if you cannot find the email.',
      },
      {
        type: 'details',
        summaryProps: { label: 'Can someone help me complete the form?' },
        text: 'A service center can help you complete your application. Language assistance is available on request.',
      },
      { type: 'link', href: '#application-support', text: 'Contact the application support team' },
    ],
  },
};

const exampleMetadata = {
  ResidentServices: {
    heading: 'Resident services',
    intro: 'Explore programs and services for people who live in our community.',
    description:
      'A section navigation with an expanded path into housing services. Other branches open independently, so people can compare services without losing their place.',
    navigationLabel: 'Resident services',
  },
  ServiceDirectory: {
    heading: 'Find a service',
    intro: 'Choose a service to apply online or learn what you need before you start.',
    description:
      'A directory mixes category labels, direct links, expandable services, and application guidance. The padded variant gives each link and disclosure a roomy target.',
  },
  DocumentLibrary: {
    heading: 'Public document library',
    intro: 'Browse adopted budgets, financial reports, and public meeting records.',
    description:
      'A document hierarchy uses raw styling and keeps several years expanded for comparison. File links include their format and size in the visible text.',
    navigationLabel: 'Public documents',
  },
  ApplicationHelp: {
    heading: 'Help with your application',
    intro: 'Find answers to common questions about submitting your application.',
    description:
      'A help panel uses raw Details styling for answers, with a nested group for supporting documents. Disclosure items can contain text without linking to another page.',
  },
};

export const examples = Object.fromEntries(
  Object.entries(exampleMetadata).map(([name, metadata]) => [
    name,
    { ...metadata, args: storyDefs[name] },
  ])
);

/** Context belongs to the example; Tree only receives its item data and variant. */
export function TreeExample({ heading, intro, navigationLabel, children }) {
  return (
    <div style={{ maxWidth: '28rem' }}>
      <h2 className="margin-top-0">{heading}</h2>
      <p>{intro}</p>
      {navigationLabel ? <nav aria-label={navigationLabel}>{children}</nav> : children}
    </div>
  );
}

export default {
  title: 'React/USX/Tree',
  component: Tree,
  tags: ['USX', 'autodocs'],
  excludeStories: ['storyDefs', 'examples', 'TreeExample'],
  argTypes: {
    ...buildArgTypes(config.props || {}),
  },
  parameters: {
    docs: {
      description: {
        component:
          'Pass `items` as nested data. Every item sets `type`: `link` renders a Link (`href`, `text`), `details` renders a Details configured through `summaryProps` and either nested `items` or paragraph `text`, and `text` renders a label in a span. The default `raw` variant keeps Details styling; `padded` adds full-width rows with spacing and hover surfaces. Use `<nav aria-label="…">` around the Tree when it provides navigation. Keyboard users move through controls with Tab and toggle branches with Enter or Space. This is a disclosure list, so it does not use ARIA treeview or menu roles.',
      },
    },
  },
};

/** Labels, links, and expandable branches keep their native semantics. */
export const Default = {
  args: storyDefs.Default,
};

/** Explicit raw styling leaves the Link and Details appearance to those components. */
export const Raw = {
  args: storyDefs.Raw,
};

export const EmptyBranch = { args: storyDefs.EmptyBranch };
export const DetailsLeaf = { args: storyDefs.DetailsLeaf };

/** Padded rows align labels and links with disclosure text at each depth. */
export const Padded = {
  args: storyDefs.Padded,
};

/** Native name groups close sibling branches while preserving the open ancestor. */
export const NestedGroups = {
  args: storyDefs.NestedGroups,
};

const createExampleStory = (example) => ({
  args: example.args,
  parameters: { docs: { description: { story: example.description } } },
  render: (args) => (
    <TreeExample {...example}>
      <Tree {...args} />
    </TreeExample>
  ),
});

export const ResidentServices = createExampleStory(examples.ResidentServices);
export const ServiceDirectory = createExampleStory(examples.ServiceDirectory);
export const DocumentLibrary = createExampleStory(examples.DocumentLibrary);
export const ApplicationHelp = createExampleStory(examples.ApplicationHelp);
