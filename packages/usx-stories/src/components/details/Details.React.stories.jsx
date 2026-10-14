import React from 'react';
import Details from '../../../../usx-react/src/components/details/Details.tsx';
import Link from '../../../../usx-react/src/components/link/Link.tsx';
import config from '../../../../usx-react/src/components/details/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import { expect, userEvent } from 'storybook/test';

export const storyDefs = {
  Default: config.default || {},
  Open: {
    summary: 'How we use your contact details',
    text: 'We use your email address to send updates about your request.\nWe will contact you if we need more information.',
    open: true,
  },
  RichContent: {
    summary: 'Other ways to find your reference number',
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
    summary: 'Example reference format',
    text: 'Enter the reference exactly as shown:\n  <reference> & <year>\n\nMarkup is displayed as text.',
    open: true,
  },
  Typography: {
    summary: 'Typography example',
    text: 'This content demonstrates the default typography styles applied to the details component.',
    open: true,
    className: 'font-serif-lg text-italic',
    contentClassName: 'font-mono-sm text-muted text-no-italic',
  },
  Colors: {
    summary: 'Supporting information',
    text: 'The marker, summary underline, and content border can each use a different color utility.',
    markerColor: 'error',
    underlineColor: 'secondary',
    contentBorderColor: 'accent-cool',
    open: true,
  },
  MonoColor: {
    summary: 'Mono color example',
    text: 'This example demonstrates using a single color for all decorative elements.',
    markerColor: 'ink',
    underlineColor: 'ink',
    contentBorderColor: 'ink',
    open: true,
  },
  Borderless: {
    summary: 'Help within a compact layout',
    text: 'The content border is removed while the summary underline remains visible.',
    noContentBorder: true,
    contentBorderColor: 'secondary',
    open: true,
  },
  NoSummaryUnderline: {
    summary: 'Supporting documents',
    text: 'The summary has no underline. The native marker and content border remain visible.',
    noSummaryUnderline: true,
    open: true,
  },
  MinimalDecoration: {
    summary: 'Additional information',
    text: 'Both decorations can be removed together. The native marker still indicates the disclosure state.',
    noContentBorder: true,
    noSummaryUnderline: true,
    markerColor: 'ink',
    open: true,
  },
  CustomStyles: {
    summary: 'Request information',
    text: 'Reference: REQUEST-10482\nStatus: Waiting for review',
    open: true,
    className: 'font-family-mono font-mono-sm margin-top-3',
  },
  CustomContentStyles: {
    summary: 'Request information',
    text: 'Reference: REQUEST-10482\nStatus: Waiting for review',
    open: true,
    contentClassName:
      'font-family-mono font-mono-sm bg-surface-inverse text-inverse padding-2 usx-rounded-lg',
  },
  ToughOnTheEyes: {
    summary: 'Tough on the eyes example',
    text: 'This example demonstrates all color utilities applied together for testing visual contrast and readability.',
    open: true,
    markerColor: 'warning',
    underlineColor: 'secondary',
    contentBorderColor: 'accent-cool',
    className: 'bg-violet text-yellow',
    contentClassName: 'bg-green text-info',
  },
  NestedDetails: {
    summary: 'Nested details example',
    noSummaryUnderline: true,
    noContentBorder: true,
    open: true,
    children: (
      <Details
        summary="Nested summary"
        noSummaryUnderline={true}
        noContentBorder={true}
        open={true}
      >
        <Details
          summary="Nested nested summary"
          noSummaryUnderline={true}
          noContentBorder={true}
          open={true}
        >
          <Details
            summary="Nested nested nested summary"
            noSummaryUnderline={true}
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
          'A native details/summary disclosure for supporting information that some users may need. Keep essential instructions visible outside the disclosure. Accepts escaped plain text or composed content and works without JavaScript.',
      },
    },
  },
};

/** A descriptive summary reveals optional help using the browser's native keyboard controls. */
export const Default = {
  args: storyDefs.Default,
  play: async ({ canvasElement, args }) => {
    const disclosure = canvasElement.querySelector('details.usx-details');
    const content = disclosure.querySelector('.usx-details__content');
    await expect(disclosure).not.toHaveAttribute('open');
    await expect(disclosure.querySelector('.usx-details__text').textContent).toBe(args.text);
    await expect(content).not.toBeVisible();
    disclosure.querySelector('summary').focus();
    await userEvent.keyboard('{Enter}');
    await expect(content).toBeVisible();
    await userEvent.keyboard(' ');
    await expect(content).not.toBeVisible();
  },
};

/** The disclosure can start open, and users can close it with the same summary control. */
export const Open = { args: storyDefs.Open };

/** Children can compose paragraphs, lists, links, and other USX components. */
export const RichContent = {
  args: storyDefs.RichContent,
  play: async ({ canvasElement }) => {
    const disclosure = canvasElement.querySelector('details.usx-details');
    const link = disclosure.querySelector('a');
    await expect(link).not.toBeVisible();
    await userEvent.click(disclosure.querySelector('summary'));
    await expect(link).toBeVisible();
    await expect(disclosure.querySelectorAll('li')).toHaveLength(2);
    await expect(disclosure.querySelector('.usx-details__text')).toBeNull();
  },
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

/** noSummaryUnderline removes the dotted underline while retaining the content border. */
export const NoSummaryUnderline = { args: storyDefs.NoSummaryUnderline };

/** The two decoration switches can be combined without changing native disclosure behavior. */
export const MinimalDecoration = { args: storyDefs.MinimalDecoration };

/** className applies font and spacing utilities to the whole disclosure, including its summary. */
export const CustomStyles = { args: storyDefs.CustomStyles };

/** contentClassName styles only the revealed content, leaving the summary's typography unchanged. */
export const CustomContentStyles = { args: storyDefs.CustomContentStyles };

/** Tough on the eyes example demonstrating all color utilities applied together for testing visual contrast and readability. */
export const ToughOnTheEyes = { args: storyDefs.ToughOnTheEyes };

/** A nested disclosure retains its content border when its ancestors are borderless. */
export const NestedDetails = {
  args: storyDefs.NestedDetails,
  play: async ({ canvasElement }) => {
    const disclosures = canvasElement.querySelectorAll('details.usx-details');
    await expect(disclosures).toHaveLength(4);
    for (const disclosure of disclosures) {
      const content = disclosure.querySelector(':scope > .usx-details__content');
      const summaryText = disclosure.querySelector(':scope > summary > .usx-details__summary-text');
      const borderless = disclosure.classList.contains('usx-details--borderless');
      const noUnderline = disclosure.classList.contains('usx-details--no-underline');
      await expect(getComputedStyle(content).borderLeftStyle).toBe(borderless ? 'none' : 'solid');
      await expect(getComputedStyle(summaryText).borderBottomStyle).toBe(
        noUnderline ? 'none' : 'dotted'
      );
    }
  },
};
