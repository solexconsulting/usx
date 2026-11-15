import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/avatar/avatar.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/avatar/avatar.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Avatar.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Avatar',
  tags: ['USX', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use `border-05` and `border-{color}` utility classes for a status ring. Include the host-supplied `statusLabel` in `aria-label`; use the Tooltip component to display it on hover.',
      },
    },
  },
};

const linkOf = (section) => (section.matches('a') ? section : section.querySelector('a'));
const radiusOf = (el) => parseFloat(getComputedStyle(el).borderTopLeftRadius);

const checkAvatar = (def) => async (section) => {
  const statusLabel = def.statusLabel?.trim();
  const statusRingColor = def.statusRingColor?.trim();
  const accessibleName = statusLabel ? `${def.alt ? `${def.alt}, ` : ''}${statusLabel}` : def.alt;
  const link = !def.href
    ? section.matches('.usx-avatar')
      ? section
      : section.querySelector('.usx-avatar')
    : linkOf(section);
  if (!def.href) {
    await expect(link.tagName).toBe('SPAN');
    await expect(link).not.toHaveAttribute('href');
  } else await expect(link).toHaveAttribute('href', def.href);

  if (def.variant === 'initials' || def.variant === 'icon') {
    const content = link.querySelector('.usx-avatar__content');
    await expect(link).toHaveAccessibleName(accessibleName);
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
    await expect(link).toHaveAccessibleName(accessibleName);
    const shapes = ['circle', 'rounded-md', 'rounded-lg'];
    for (const shape of shapes) {
      const expectation = expect(img);
      await (shape === def.shape ? expectation : expectation.not).toHaveClass(`usx-${shape}`);
    }
  }

  if (def.className) await expect(link).toHaveClass(def.className);
  if (statusRingColor) {
    await expect(link).toHaveClass('border-05', `border-${statusRingColor}`);
    await expect(getComputedStyle(link).borderTopWidth).toBe('4px');
    await expect(getComputedStyle(link).borderTopStyle).toBe('solid');
  } else {
    await expect(link).not.toHaveClass('border-05');
  }
  if (statusLabel && !def.href) await expect(link).toHaveAttribute('role', 'img');
  if (statusLabel) await expect(link).not.toHaveAttribute('title');
  // Avatars stay square whatever the size or shape.
  const { width, height } = link.getBoundingClientRect();
  await expect(Math.abs(width - height)).toBeLessThan(1);

  if (def.tooltipProps) {
    await expect(section).toHaveClass('usx-tooltip');
    await expect(section.querySelector('[role="tooltip"]')).toHaveTextContent(
      def.tooltipProps.label
    );
    await expect(section.querySelector('[role="tooltip"]')).toHaveClass(
      `usa-tooltip__body--${def.tooltipProps.position ?? 'top'}`
    );
    if (def.tooltipProps.className) await expect(section).toHaveClass(def.tooltipProps.className);
    if (def.tooltipProps.bodyClassName)
      await expect(section.querySelector('[role="tooltip"]')).toHaveClass(
        def.tooltipProps.bodyClassName
      );
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
    await expect(radiusOf(img('Default'))).toBe(0);
    await expect(radiusOf(img('MediumRoundedAvatar'))).toBeGreaterThan(0);
    await expect(radiusOf(img('LargeRoundedAvatar'))).toBeGreaterThan(
      radiusOf(img('MediumRoundedAvatar'))
    );
    await expect(radiusOf(img('CircleAvatar'))).toBeGreaterThanOrEqual(
      widthOf(canvasElement, 'CircleAvatar') / 2
    );
    const avatarFor = (title) => {
      const section = sectionFor(canvasElement, title);
      return section.matches('.usx-avatar') ? section : section.querySelector('.usx-avatar');
    };
    const statusCircle = avatarFor('Status Success');
    const statusRounded = avatarFor('Status Neutral');
    await expect(radiusOf(statusCircle)).toBeGreaterThanOrEqual(
      statusCircle.getBoundingClientRect().width / 2
    );
    await expect(radiusOf(statusRounded)).toBeGreaterThan(0);
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
