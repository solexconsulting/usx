import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/image/image.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/image/image.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Image.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Image',
  tags: ['USX', 'autodocs'],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);
const radius = (element) => parseFloat(getComputedStyle(element).borderTopLeftRadius);
const assetUrl = (path, base) =>
  base ? `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}` : path;

const checkImage = (def) => async (wrapper) => {
  await expect(wrapper).toHaveClass('usx-image');
  await hasClass(wrapper, 'usx-image--rounded', Boolean(def.rounded));
  await hasClass(wrapper, 'usx-image--circular', Boolean(def.circular));
  const img = wrapper.querySelector('img');
  await expect(img).toHaveAttribute('alt', def.alt);

  if (typeof def.src === 'string') {
    await expect(img).toHaveAttribute('src', def.src);
  } else {
    // A responsive image offers its sources largest first, with the fallback on the img.
    await expect(img).toHaveAttribute('src', assetUrl(def.src.fallback, def.staticBaseUrl));
    const sources = [...wrapper.querySelectorAll('picture > source')];
    await expect(sources.map((source) => [source.media, source.getAttribute('srcset')])).toEqual(
      def.src.sources.map((source) => [source.media, assetUrl(source.srcSet, def.staticBaseUrl)])
    );
  }

  const caption = wrapper.querySelector('figcaption');
  await expect(wrapper.tagName).toBe(def.caption ? 'FIGURE' : 'DIV');
  if (def.caption) {
    await expect(caption).toHaveClass('usx-image--caption');
    await expect(caption).toHaveTextContent(def.caption);
    await hasClass(caption, 'usa-sr-only', Boolean(def.hideCaption));
    if (def.hideCaption) await expect(caption.getBoundingClientRect().right).toBeLessThan(0);
  } else {
    await expect(caption).toBeNull();
  }

  const link = wrapper.querySelector('a');
  if (def.href) {
    await expect(link).toHaveAttribute('href', def.href);
    await expect(link.querySelector('img')).toBe(img);
  } else {
    await expect(link).toBeNull();
  }

  await hasClass(wrapper, `usx-object-fit-${def.objectFit}`, Boolean(def.objectFit));
  if (def.objectFit) await expect(getComputedStyle(img).objectFit).toBe(def.objectFit);
  if (def.maxWidth)
    await expect(img.getBoundingClientRect().width).toBeLessThanOrEqual(
      parseFloat(def.maxWidth) + 1
    );
  if (def.maxHeight)
    await expect(img.getBoundingClientRect().height).toBeLessThanOrEqual(
      parseFloat(def.maxHeight) + 1
    );
  // Rounded corners are a fixed radius; circular ones are half the size.
  if (def.rounded) await expect(radius(wrapper.querySelector('img') ?? wrapper)).toBeGreaterThan(0);
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkImage(def)])
  )
);

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />;
  },
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
