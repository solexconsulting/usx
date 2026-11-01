import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/error-page/error-page.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/error-page/error-page.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './ErrorPage.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle, snapshotId } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/ErrorPage',
  tags: ['USX', 'autodocs'],
};

// The Cats demo puts a note ahead of the page.
const checkPage = (def) => async (first) => {
  const page = first.matches('main') ? first : first.nextElementSibling;
  await expect(page.tagName).toBe('MAIN');
  await expect(page).toHaveClass('usx-page', 'usx-error-page');
  await expect(page.id).toMatch(snapshotId(def.id ?? 'main-content'));

  // The page is named by its one h1, which carries the matching id.
  const title = page.querySelector('h1.usx-page__title');
  await expect(page.getAttribute('aria-labelledby')).toBe(title.id);
  await expect(title.id).toBe(`${page.id}-title`);
  await expect(page).toHaveAccessibleName(title.textContent.trim());
  if (def.title) await expect(title).toHaveTextContent(def.title);
  await expect(page.querySelectorAll('h1')).toHaveLength(1);

  const body = page.querySelector('.usx-error-page__body');
  if (def.description)
    await expect(body.querySelector('.usx-error-page__description')).toHaveTextContent(
      def.description
    );
  if (def.guidance)
    await expect(body.querySelector('.usx-error-page__content')).toHaveTextContent(def.guidance);

  // Actions are links styled as buttons, in the order given.
  const actions = [...page.querySelectorAll('.usx-error-page__actions a')];
  await expect(actions).toHaveLength(def.actions?.length ?? actions.length);
  for (const [index, action] of (def.actions ?? []).entries()) {
    await expect(actions[index]).toHaveAttribute('href', action.href);
    await expect(actions[index]).toHaveTextContent(action.label);
    await expect(actions[index]).toHaveClass(`usa-button--${action.variant}`);
  }

  // Support details only appear when given: heading, text, links, error code and reference id.
  for (const text of [
    def.supportHeading,
    def.supportText,
    def.errorCode && String(def.errorCode),
    def.referenceId,
  ]) {
    if (text) await expect(page).toHaveTextContent(text);
  }
  for (const link of def.supportLinks ?? []) {
    await expect(page.querySelector(`a[href="${link.href}"]`)).toHaveTextContent(link.label);
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkPage(def)])
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
