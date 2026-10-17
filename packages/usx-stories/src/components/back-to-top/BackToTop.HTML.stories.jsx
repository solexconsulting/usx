import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/back-to-top/back-to-top.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/back-to-top/back-to-top.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './BackToTop.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/BackToTop',
  tags: ['USX', 'autodocs'],
};

// With a label the icon sits on the requested side of the text; without one only the icon remains.
const checkControl = async (
  control,
  { label, href, variant, iconPosition = 'right', iconSize }
) => {
  if (href) {
    await expect(control.tagName).toBe('A');
    await expect(control).toHaveAttribute('href', href);
    await expect(control).toHaveClass('usx-link');
  } else {
    await expect(control.tagName).toBe('BUTTON');
    await expect(control).toHaveAttribute('type', 'button');
    await (variant === 'primary' ? expect(control) : expect(control).not).toHaveClass(
      'usa-button--primary'
    );
  }

  const icon = control.querySelector('svg.usa-icon');
  await expect(icon.querySelector('use')).toHaveAttribute(
    'href',
    expect.stringMatching(/#arrow_upward$/)
  );
  await expect(icon).toHaveClass(`usa-icon--size-${iconSize}`);
  await expect(control.textContent.trim()).toBe(label ?? '');
  if (label) {
    const iconFirst = Boolean(icon.nextSibling?.textContent.trim());
    await expect(iconFirst).toBe(iconPosition === 'left');
  }
};

const checkDef = (def) => async (control) => checkControl(control, def);

const checks = {
  ...Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkDef(def)])
  ),
  'Link On Dark': async (wrapper) => {
    const link = wrapper.querySelector('a');
    await expect(wrapper).toHaveClass('bg-primary-darkest');
    await checkControl(link, { label: 'Back to top', href: '#back-to-top', iconSize: 2 });
    await expect(getComputedStyle(link).color).toBe('rgb(255, 255, 255)');
  },
  'All Variants': async (section) => {
    const [right, left] = section.children;
    for (const [column, iconPosition] of [
      [right, 'right'],
      [left, 'left'],
    ]) {
      const controls = [...column.querySelectorAll('button, a')];
      await expect(controls).toHaveLength(6);
      await expect(column.querySelector('h4')).toHaveTextContent(`Button (icon ${iconPosition})`);
      for (const control of controls) {
        if (control.textContent.trim())
          await checkControl(control, {
            label: 'Back to top',
            href: control.getAttribute('href') ?? undefined,
            iconPosition,
            iconSize: 2,
            variant: control.classList.contains('usa-button--primary') ? 'primary' : undefined,
          });
      }
    }
  },
};

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Icon-only sizes', async () => {
    const widthOf = (key) =>
      sectionFor(context.canvasElement, sectionTitle(key)).getBoundingClientRect().width;
    await expect(widthOf('IconOnlyLarge')).toBeGreaterThan(widthOf('IconOnlySmall'));
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
