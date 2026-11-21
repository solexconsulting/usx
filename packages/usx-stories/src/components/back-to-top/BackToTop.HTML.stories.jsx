import { hostClickDemo } from './backToTopDemo.jsx';
import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/back-to-top/back-to-top.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/back-to-top/back-to-top.django-snapshot.html?raw';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './BackToTop.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  decorators: [hostClickDemo],
  title: 'HTML/USX/BackToTop',
  tags: ['USX', 'autodocs'],
};

// With a label the icon sits on the requested side of the text; without one only the icon remains.
const checkControl = async (
  control,
  {
    label,
    href = '#top',
    onClick,
    variant = 'primary',
    ghost = true,
    iconPosition = 'right',
    iconSize,
  }
) => {
  await expect(control).toHaveClass('usa-button', 'usx-button', `usa-button--${variant}`);
  await expect(control).not.toHaveClass('usa-link', 'usx-link');
  await (ghost ? expect(control) : expect(control).not).toHaveClass('usx-button--ghost');
  if (!onClick) {
    await expect(control.tagName).toBe('A');
    await expect(control).toHaveAttribute('href', href);
  } else {
    await expect(control.tagName).toBe('BUTTON');
    await expect(control).toHaveAttribute('type', 'button');
  }

  const icon = control.querySelector('svg.usa-icon');
  await expect(icon.querySelector('use')).toHaveAttribute(
    'href',
    expect.stringMatching(/#arrow_upward$/)
  );
  await expect(icon).toHaveClass(`usa-icon--size-${iconSize}`);
  await expect(control.textContent.trim()).toBe(label ?? '');
  // Icon-only controls are named by the default aria-label.
  await expect(control).toHaveAccessibleName(label ?? 'Back to top');
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
  'All Variants': async (gallery) => {
    await expect(gallery).toHaveClass('display-flex', 'flex-wrap');
    await expect(gallery.children).toHaveLength(2);
    await expect(gallery.children[1]).toHaveClass('flex-align-end', 'margin-left-auto');
    for (const [index, iconPosition] of ['right', 'left'].entries()) {
      const column = gallery.children[index];
      await expect(column).toHaveClass('display-flex', 'flex-column');
      await expect(column.querySelector('h4')).toHaveTextContent(`Button (icon ${iconPosition})`);
      const controls = [...column.querySelectorAll('.usa-button')];
      const variants = [
        { ...storyDefs.Default, iconPosition },
        { ...storyDefs.Default, iconPosition, variant: 'primary', ghost: false },
        { ...storyDefs.IconOnlySmall, variant: 'primary' },
        { ...storyDefs.IconOnlyLarge, variant: 'primary' },
        {
          ...storyDefs.CustomHref,
          label: 'Back to top',
          iconPosition,
          variant: 'unstyled',
          ghost: false,
        },
        { ...storyDefs.Default, iconPosition, inverse: true },
      ];
      await expect(controls).toHaveLength(variants.length);
      for (const [index, props] of variants.entries()) await checkControl(controls[index], props);
      await expect(controls[5].parentElement).toHaveClass('bg-surface-inverse');
      await expect(controls[5]).toHaveClass('usa-button--inverse');
    }
    await expect(gallery.querySelectorAll('a')).toHaveLength(12);
    await expect(gallery.querySelector('button')).toBeNull();
  },
  'Link On Dark': async (wrapper) => {
    const link = wrapper.querySelector('a');
    await expect(wrapper).toHaveClass('bg-surface-inverse');
    await expect(link).toHaveClass('usa-button--inverse');
    await checkControl(link, { label: 'Back to top', href: '#top', iconSize: 2 });
    await expect(getComputedStyle(link).color).toBe('rgb(255, 255, 255)');
  },
};

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Icon-only sizes', async () => {
    const widthOf = (key) =>
      sectionFor(context.canvasElement, sectionTitle(key)).getBoundingClientRect().width;
    await expect(widthOf('IconOnlyLarge')).toBeGreaterThan(widthOf('IconOnlySmall'));
  });
  await context.step('Native links navigate without enhancement', async () => {
    const originalUrl = window.location.href;
    try {
      for (const key of ['Default', 'CustomHref']) {
        const link = sectionFor(context.canvasElement, sectionTitle(key));
        await expect(link).not.toHaveAttribute('data-enhanced');
        link.focus();
        await userEvent.keyboard('{Enter}');
        await waitFor(() => expect(window.location.hash).toBe(link.getAttribute('href')));
      }
    } finally {
      window.history.replaceState(null, '', originalUrl);
    }
  });
  await context.step('The host handles button activation', async () => {
    const button = sectionFor(context.canvasElement, 'With On Click');
    const scrollTo = window.scrollTo;
    const calls = [];
    window.scrollTo = (options) => calls.push(options);
    try {
      await expect(button).not.toHaveAttribute('href');
      await expect(button).not.toHaveAttribute('onclick');
      await expect(button).not.toHaveAttribute('data-enhanced');
      button.focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.click(button);
      await expect(calls).toEqual([{ top: 0 }, { top: 0 }]);
    } finally {
      button.blur();
      window.scrollTo = scrollTo;
    }
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
