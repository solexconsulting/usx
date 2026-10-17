import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/avatar/avatar.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/avatar/avatar.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Avatar.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Avatar',
  tags: ['USX', 'autodocs'],
};

const linkOf = (section) => (section.matches('a') ? section : section.querySelector('a'));
const radiusOf = (el) => parseFloat(getComputedStyle(el).borderTopLeftRadius);

const checkAvatar = (def) => async (section) => {
  const link = linkOf(section);
  await expect(link).toHaveAttribute('href', def.href);

  if (def.variant === 'initials' || def.variant === 'icon') {
    const content = link.querySelector('.usx-avatar__content');
    await expect(link).toHaveAccessibleName(def.alt);
    await expect(content).toHaveClass(...def.contentClassName.split(' '));
    if (def.variant === 'initials') await expect(content).toHaveTextContent(def.value);
    else
      await expect(content.querySelector('use')).toHaveAttribute(
        'href',
        expect.stringMatching(new RegExp(`#${def.value}$`))
      );
    await expect(content).toHaveClass('usx-circle');
  } else {
    const img = link.querySelector('img.usx-avatar__img');
    await expect(img).toHaveAttribute('src', def.src);
    await expect(link).toHaveAccessibleName(def.alt);
    const shapes = ['circle', 'rounded-md', 'rounded-lg'];
    for (const shape of shapes) {
      const expectation = expect(img);
      await (shape === def.shape ? expectation : expectation.not).toHaveClass(`usx-${shape}`);
    }
  }

  if (def.className) await expect(link).toHaveClass(def.className);
  // Avatars stay square whatever the size or shape.
  const { width, height } = link.getBoundingClientRect();
  await expect(Math.abs(width - height)).toBeLessThan(1);

  if (def.tooltip) {
    await expect(section).toHaveClass('usx-tooltip');
    await expect(section.querySelector('[role="tooltip"]')).toHaveTextContent(def.tooltip);
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkAvatar(def)])
);

const widthOf = (canvasElement, key) =>
  linkOf(sectionFor(canvasElement, sectionTitle(key))).getBoundingClientRect().width;

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Sizes and shapes scale', async () => {
    const { canvasElement } = context;
    for (const kind of ['ImageAvatar', 'InitialsAvatar']) {
      const widths = ['Medium', 'Large', 'ExtraLarge'].map((size) =>
        widthOf(canvasElement, `${kind}${size}`)
      );
      await expect(widths[0]).toBeLessThan(widths[1]);
      await expect(widths[1]).toBeLessThan(widths[2]);
    }
    await expect(widthOf(canvasElement, 'InitialsAvatarSmall')).toBeLessThan(
      widthOf(canvasElement, 'InitialsAvatarMedium')
    );
    await expect(widthOf(canvasElement, 'IconAvatarLarge')).toBeGreaterThan(
      widthOf(canvasElement, 'IconAvatarPerson')
    );

    const img = (key) => linkOf(sectionFor(canvasElement, sectionTitle(key))).querySelector('img');
    await expect(radiusOf(img('BasicAvatar'))).toBe(0);
    await expect(radiusOf(img('MediumRoundedAvatar'))).toBeGreaterThan(0);
    await expect(radiusOf(img('LargeRoundedAvatar'))).toBeGreaterThan(
      radiusOf(img('MediumRoundedAvatar'))
    );
    await expect(radiusOf(img('CircleAvatar'))).toBeGreaterThanOrEqual(
      widthOf(canvasElement, 'CircleAvatar') / 2
    );
  });
};

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
