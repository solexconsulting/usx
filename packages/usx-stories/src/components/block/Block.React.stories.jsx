import React from 'react';
import Block from '../../../../core/src/components/block/Block.tsx';
import config from '../../../../core/src/components/block/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

const sampleText = 'This is a block of content distinguished from the surrounding text through a left border and padding. Use blocks to call attention to important information or to visually separate content on a page.';

const georgeAttribution = {
  avatar: {
    href: '#',
    src: './george_washington.png',
    alt: 'George Washington',
    shape: 'circle',
  },
  primary: 'George Washington',
  secondary: 'First President of the United States',
};

const simpleAttribution = {
  primary: 'George Washington',
  secondary: 'First President of the United States',
};

export const storyDefs = {
  Default: { children: sampleText },
  Callout: { variant: 'callout', children: sampleText },
  Dedent: { dedent: true, children: sampleText },
  IndentSm: { indent: 'sm', children: sampleText },
  IndentMd: { indent: 'md', children: sampleText },
  IndentLg: { indent: 'lg', children: sampleText },
  IndentXl: { indent: 'xl', children: sampleText },
  Big: { big: true, children: sampleText },
  DedentBig: { dedent: true, big: true, children: sampleText },
  ColorPrimary: { color: 'primary', children: 'This block uses the primary color for its left border.' },
  ColorError: { color: 'error', children: 'This block uses the error color for its left border.' },
  ColorWarning: { color: 'warning', children: 'This block uses the warning color for its left border.' },
  ColorSuccess: { color: 'success', children: 'This block uses the success color for its left border.' },
  ColorInfo: { color: 'info', children: 'This block uses the info color for its left border.' },
  AddressBlock: {
    indent: 'sm',
    color: 'primary',
    children: <>Department of Veterans Affairs Claims Intake Center<br/>Attention: C-123 Claims<br/>PO Box 5088<br/>Janesville, WI 53547-5088</>,
  },
  QuoteBlock: {
    big: true,
    indent: 'sm',
    quote: true,
    color: 'info',
    contentClassName: 'maxw-tablet',
    children: <p className="font-serif-lg text-italic margin-0">The time is always right to do what is right.</p>,
    attribution: simpleAttribution,
  },
  QuoteWithAvatar: {
    big: true,
    indent: 'sm',
    quote: true,
    color: 'info',
    contentClassName: 'maxw-tablet',
    children: <p className="font-serif-lg text-italic margin-0">The time is always right to do what is right.</p>,
    attribution: georgeAttribution,
  },
  CalloutQuote: {
    variant: 'callout',
    color: 'info',
    children: <p className="font-serif-lg margin-0">❝The time is always right to do what is right.❞</p>,
    attribution: georgeAttribution,
  },
  WithAttribution: {
    color: 'primary',
    children: 'This block is attributed to a specific author. Use this pattern when citing or crediting a source alongside your content.',
    attribution: georgeAttribution,
  },
};

export default {
  title: 'React/USX/Block',
  component: Block,
  tags: ['USX', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const Callout = { args: storyDefs.Callout };
export const Dedent = { args: storyDefs.Dedent };
export const IndentSm = { args: storyDefs.IndentSm };
export const IndentMd = { args: storyDefs.IndentMd };
export const IndentLg = { args: storyDefs.IndentLg };
export const IndentXl = { args: storyDefs.IndentXl };
export const Big = { args: storyDefs.Big };
export const DedentBig = { args: storyDefs.DedentBig };
export const ColorPrimary = { args: storyDefs.ColorPrimary };
export const ColorError = { args: storyDefs.ColorError };
export const ColorWarning = { args: storyDefs.ColorWarning };
export const ColorSuccess = { args: storyDefs.ColorSuccess };
export const ColorInfo = { args: storyDefs.ColorInfo };

// ── Use cases ───────────────────────────────────────────────────────────────

export const AddressBlock = {
  name: 'Address block',
  args: storyDefs.AddressBlock,
};

export const QuoteBlock = {
  name: 'Quote with attribution',
  args: storyDefs.QuoteBlock,
};

export const QuoteWithAvatar = {
  name: 'Quote with avatar attribution',
  args: storyDefs.QuoteWithAvatar,
};

export const CalloutQuote = {
  name: 'Callout quote with attribution',
  args: storyDefs.CalloutQuote,
  render: (args) => (
    <Block
      {...args}
      attribution={args.attribution}
    >
      <p className="font-serif-lg maxw-tablet margin-0">❝The time is always right to do what is right.❞</p>
    </Block>
  ),
};

export const WithAttribution = {
  name: 'Content block with attribution',
  args: storyDefs.WithAttribution,
};
