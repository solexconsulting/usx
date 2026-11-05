import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/language-selector/language-selector.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/language-selector/language-selector.django-snapshot.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './LanguageSelector.React.stories.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/LanguageSelector',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`languageSelector.init()`'),
      },
    },
  },
  decorators: [...componentInit('languageSelector')],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkSelector = (def) => async (nav) => {
  await expect(nav.tagName).toBe('NAV');
  await expect(nav).toHaveClass('usx-language-selector');
  await expect(nav).toHaveAccessibleName('Language selection');
  const container = nav.querySelector('.usa-language-container');
  await hasClass(container, 'usa-language--small', Boolean(def.small));

  if (def.variant === 'two') {
    // Two languages need no menu: one button offers the language that is not current.
    const other = def.languages.find((language) => !language.current);
    const button = container.querySelector('button');
    await expect(nav.querySelectorAll('button')).toHaveLength(1);
    await expect(button).toHaveClass('usa-button--primary');
    await expect(button.querySelector('[lang]')).toHaveAttribute('lang', other.code);
    await expect(button).toHaveTextContent(other.label);
    return;
  }

  const button = container.querySelector('button.usa-language__link');
  const submenu = nav.querySelector('.usa-language__submenu');
  await expect(button).toHaveTextContent(def.label);
  await hasClass(button, 'usa-button--unstyled', Boolean(def.unstyled));
  await hasClass(button, 'usa-button--primary', !def.unstyled);
  await expect(button).toHaveAttribute('aria-controls', submenu.id);
  await expect(submenu.id).toMatch(snapshotId(def.id));
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(submenu).not.toBeVisible();

  // Each language is a link in its own tongue, with its English name in brackets; the current one is marked.
  const items = [...submenu.querySelectorAll(':scope > li')];
  await expect(items).toHaveLength(def.languages.length);
  for (const [index, language] of def.languages.entries()) {
    const link = items[index].querySelector('a');
    await expect(link).toHaveTextContent(language.label);
    if (language.description) await expect(link).toHaveTextContent(`(${language.description})`);
    if (language.plain) await expect(link.querySelector('[lang]')).toBeNull();
    else await expect(link.querySelector('[lang]')).toHaveAttribute('lang', language.code);
    if (language.current) await expect(link).toHaveAttribute('aria-current', 'true');
    else await expect(link).not.toHaveAttribute('aria-current');
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).filter(([key]) => !key.startsWith('Unenhanced')).map(([key, def]) => [sectionTitle(key), checkSelector(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Opening the menu', async () => {
    const nav = sectionFor(context.canvasElement, 'Many Languages');
    const button = nav.querySelector('button.usa-language__link');
    const submenu = nav.querySelector('.usa-language__submenu');
    await userEvent.click(button);
    await waitFor(() => expect(button).toHaveAttribute('aria-expanded', 'true'));
    await expect(submenu).toBeVisible();
    // The menu opens beneath its button.
    await expect(submenu.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      button.getBoundingClientRect().bottom - 1
    );
    await userEvent.click(button);
    await waitFor(() => expect(button).toHaveAttribute('aria-expanded', 'false'));
    await expect(submenu).not.toBeVisible();
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
