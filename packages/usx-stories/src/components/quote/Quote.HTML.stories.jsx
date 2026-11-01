import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/quote/quote.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/quote/quote.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Quote.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Quote',
  tags: ['USX', 'autodocs'],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);
const bare = (text) => text.replace(/[❝❞]/g, '').trim();

const checkQuote = (def) => async (quote) => {
  await expect(quote).toHaveClass('usx-quote');
  const vertical = def.calloutProps?.orientation === 'vertical';
  await hasClass(quote, 'usx-quote--vertical', vertical);
  // Horizontal quotes lead with a quote icon; vertical ones put the marks around the text instead.
  await expect(quote.querySelector(':scope > .usx-quote__icon') !== null).toBe(!vertical);

  const callout = quote.querySelector(':scope > .usx-callout');
  const { calloutProps = {} } = def;
  await hasClass(callout, 'usx-callout--vertical', vertical);
  if (calloutProps.strokeColor)
    await expect(callout).toHaveClass(`border-${calloutProps.strokeColor}`);
  if (calloutProps.backgroundColor)
    await expect(callout).toHaveClass(`bg-${calloutProps.backgroundColor}`);
  if (calloutProps.indent)
    await expect(callout).toHaveClass(`usx-callout--indent-${calloutProps.indent}`);

  const blockquote = callout.querySelector(
    'figure.usx-quote__body > blockquote.usx-quote__content'
  );
  if (def.blockquoteClassName)
    await expect(blockquote).toHaveClass(...def.blockquoteClassName.split(' '));
  if (def.children === undefined) await expect(bare(blockquote.textContent)).toBe(def.content);
  else await expect(blockquote).not.toHaveTextContent(def.content ?? '\u0000');
  if (def.sourceLinkProps)
    await expect(blockquote).toHaveAttribute('cite', def.sourceLinkProps.href);
  else await expect(blockquote).not.toHaveAttribute('cite');

  // The caption holds the attribution and the source, and exists only when either is given.
  const caption = callout.querySelector('figcaption.usx-quote__attribution');
  const attribution = caption?.querySelector('.usx-attribution');
  // A source link without a title has nothing to show, so it only fills the blockquote's cite attribute.
  const wantsCaption = Boolean(def.attributionProps || def.sourceTitle);
  await expect(caption !== null).toBe(wantsCaption);
  if (def.attributionProps?.primary) {
    await expect(attribution.querySelector('.usx-attribution__primary')).toHaveTextContent(
      def.attributionProps.primary
    );
    await expect(attribution.querySelector('.usx-attribution__secondary')).toHaveTextContent(
      def.attributionProps.secondary
    );
    await expect(attribution.querySelector('.usx-attribution__media') !== null).toBe(
      Boolean(def.attributionProps.avatarProps)
    );
  }
  if (def.sourceTitle) {
    const source = caption.querySelector('cite');
    await expect(source).toHaveTextContent(def.sourceTitle);
    const link = source.querySelector('a');
    await expect(link !== null).toBe(Boolean(def.sourceLinkProps));
    if (link) await expect(link).toHaveAttribute('href', def.sourceLinkProps.href);
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkQuote(def)])
  )
);

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: { code: reactSnapshot },
    },
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: {
    docs: {
      source: {
        code: djangoSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />;
  },
  play,
};
