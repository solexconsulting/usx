import React from 'react';
import Details from '../../../../usx-react/src/components/details/Details.tsx';
import Link from '../../../../usx-react/src/components/link/Link.tsx';
import config from '../../../../usx-react/src/components/details/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: config.default || {},
  Open: {
    summaryProps: { label: 'How we use your contact details' },
    text: 'We use your email address to send updates about your request.\nWe will contact you if we need more information.',
    open: true,
  },
  RichContent: {
    summaryProps: { label: 'Other ways to find your reference number' },
    text: 'This fallback is replaced by the composed children.',
    children: (
      <>
        <p>You can find your reference number in:</p>
        <ul>
          <li>The subject line of your confirmation email</li>
          <li>The letter we sent after receiving your request</li>
        </ul>
        <p>
          If you still need help,{' '}
          <Link href="mailto:help@example.gov">contact the support team</Link>.
        </p>
      </>
    ),
  },
  PlainText: {
    summaryProps: { label: 'Example reference format' },
    text: 'Enter the reference exactly as shown:\n  <reference> & <year>\n\nMarkup is displayed as text.',
    open: true,
  },
  Typography: {
    summaryProps: { label: 'Typography example' },
    text: 'This content demonstrates the default typography styles applied to the details component.',
    open: true,
    className: 'font-serif-lg text-italic',
    contentClassName: 'font-mono-sm text-muted text-no-italic',
  },
  Colors: {
    summaryProps: {
      label: 'Supporting information',
      markerColor: 'error',
      underlineColor: 'secondary',
    },
    text: 'The marker, summary underline, and content border can each use a different color utility.',
    contentBorderColor: 'accent-cool',
    open: true,
  },
  MonoColor: {
    summaryProps: { label: 'Mono color example', markerColor: 'ink', underlineColor: 'ink' },
    text: 'This example demonstrates using a single color for all decorative elements.',
    contentBorderColor: 'ink',
    open: true,
  },
  Borderless: {
    summaryProps: { label: 'Help within a compact layout' },
    text: 'The content border is removed while the summary underline remains visible.',
    noContentBorder: true,
    contentBorderColor: 'secondary',
    open: true,
  },
  NoMarker: {
    summaryProps: { label: 'No marker example', noMarker: true },
    text: 'The native marker is removed while the summary underline and content border remain visible.',
    open: true,
  },
  NoSummaryUnderline: {
    summaryProps: { label: 'Supporting documents', noUnderline: true },
    text: 'The summary has no underline. The native marker and content border remain visible.',
    open: true,
  },
  MinimalDecoration: {
    summaryProps: {
      label: 'Additional information',
      noUnderline: true,
      markerColor: 'ink',
    },
    text: 'Both decorations can be removed together. The native marker still indicates the disclosure state.',
    noContentBorder: true,
    open: true,
  },
  CustomStyles: {
    summaryProps: { label: 'Request information' },
    text: 'Reference: REQUEST-10482\nStatus: Waiting for review',
    open: true,
    className: 'font-family-mono font-mono-sm margin-top-3',
  },
  CustomContentStyles: {
    summaryProps: { label: 'Request information' },
    text: 'Reference: REQUEST-10482\nStatus: Waiting for review',
    open: true,
    contentClassName:
      'font-family-mono font-mono-sm bg-surface-inverse text-inverse padding-2 usx-rounded-lg',
  },
  ButtonClasses: {
    summaryProps: {
      label: 'Click Me!',
      noUnderline: true,
      className: 'usa-button usx-button usa-button--primary',
    },
    text: 'This <summary> element looks like a button.',
    open: true,
  },
  GroupedSummaryProps: {
    summaryProps: {
      label: 'Summary configured through summaryProps',
      markerColor: 'error',
      underlineColor: 'secondary',
      className: 'font-family-mono',
      textClassName: 'text-bold',
    },
    text: 'The Summary props are passed through to the shared Summary component.',
    open: true,
  },
  ToughOnTheEyes: {
    summaryProps: {
      label: 'Tough on the eyes example',
      markerColor: 'warning',
      underlineColor: 'secondary',
    },
    text: 'This example demonstrates all color utilities applied together for testing visual contrast and readability.',
    open: true,
    contentBorderColor: 'accent-cool',
    className: 'bg-violet text-yellow',
    contentClassName: 'bg-green text-info',
  },
  NestedDetails: {
    summaryProps: { label: 'Nested details example', noUnderline: true },
    noContentBorder: true,
    open: true,
    children: (
      <Details
        summaryProps={{ label: 'Nested summary', noUnderline: true }}
        noContentBorder={true}
        open={true}
      >
        <Details
          summaryProps={{ label: 'Nested nested summary', noUnderline: true }}
          noContentBorder={true}
          open={true}
        >
          <Details
            summaryProps={{ label: 'Nested nested nested summary', noUnderline: true }}
            contentBorderColor="secondary"
            open={true}
          >
            Deeply nested content
          </Details>
        </Details>
      </Details>
    ),
  },
};

export default {
  title: 'React/USX/Details',
  component: Details,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component:
          'A native details/summary disclosure for supporting information that some users may need. Keep essential instructions visible outside the disclosure. Use summaryProps to configure the Summary component. Accepts escaped plain text or composed content and works without JavaScript.',
      },
    },
  },
};

/** A descriptive summary reveals optional help using the browser's native keyboard controls. */
export const Default = {
  args: storyDefs.Default,
};

/** The disclosure can start open, and users can close it with the same summary control. */
export const Open = { args: storyDefs.Open };

/** Children can compose paragraphs, lists, links, and other USX components. */
export const RichContent = {
  args: storyDefs.RichContent,
};

/** Plain text preserves line breaks and indentation, and displays markup literally. */
export const PlainText = { args: storyDefs.PlainText };

/** Typography example demonstrating custom font and text styles for the summary and content. */
export const Typography = { args: storyDefs.Typography };

/** Color utility names independently style the marker, dotted underline, and content border. */
export const Colors = { args: storyDefs.Colors };

/** Mono color example uses a single color for all decorative elements. */
export const MonoColor = { args: storyDefs.MonoColor };

/** noContentBorder removes the left border and suppresses the contentBorderColor utility. */
export const Borderless = { args: storyDefs.Borderless };

/** No marker example removes the native marker while keeping the summary underline and content border. */
export const NoMarker = { args: storyDefs.NoMarker };

/** summaryProps.noUnderline removes the dotted underline while retaining the content border. */
export const NoSummaryUnderline = { args: storyDefs.NoSummaryUnderline };

/** The two decoration switches can be combined without changing native disclosure behavior. */
export const MinimalDecoration = { args: storyDefs.MinimalDecoration };

/** className applies font and spacing utilities to the whole disclosure, including its summary. */
export const CustomStyles = { args: storyDefs.CustomStyles };

/** contentClassName styles only the revealed content, leaving the summary's typography unchanged. */
export const CustomContentStyles = { args: storyDefs.CustomContentStyles };

/** summaryProps.className applies button styles to the summary element. */
export const ButtonClasses = { args: storyDefs.ButtonClasses };
export const GroupedSummaryProps = {
  args: storyDefs.GroupedSummaryProps,
};

/** Tough on the eyes example demonstrating all color utilities applied together for testing visual contrast and readability. */
export const ToughOnTheEyes = { args: storyDefs.ToughOnTheEyes };

/** A nested disclosure retains its content border when its ancestors are borderless. */
export const NestedDetails = {
  args: storyDefs.NestedDetails,
};
