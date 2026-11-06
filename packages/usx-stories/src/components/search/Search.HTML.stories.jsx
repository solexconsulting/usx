import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/search/search.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/search/search.django-snapshot.html?raw';
import { expect, userEvent } from 'storybook/test';
import { storyDefs } from './Search.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle, snapshotId } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Search',
  tags: ['USWDS', 'autodocs'],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkSearch = (def) => async (section) => {
  const label = def.label ?? 'Search';
  const form = section.querySelector('form');
  const input = form.querySelector('input');
  const button = form.querySelector('button');
  const icon = button.querySelector('svg');

  await expect(section.tagName).toBe('SECTION');
  await expect(section).toHaveAccessibleName(def.ariaLabel ?? label);
  await expect(form).toHaveAttribute('role', 'search');
  await expect(form).toHaveAttribute('method', 'get');
  await expect(form.id).toBe(`${input.id}-form`);
  await expect(input.id).toMatch(snapshotId(def.id));
  await hasClass(form, 'usa-search--big', Boolean(def.big));
  await hasClass(form, 'usa-search--small', Boolean(def.iconOnly && !def.big));
  if (def.action) await expect(form).toHaveAttribute('action', def.action);
  else await expect(form).not.toHaveAttribute('action');

  // The input is labelled by a screen-reader-only label.
  await expect(input).toHaveAttribute('type', 'search');
  await expect(input).toHaveAttribute('name', def.searchKey ?? 'q');
  await expect(input).toHaveAccessibleName(label);
  if (def.placeholder) await expect(input).toHaveAttribute('placeholder', def.placeholder);
  await expect(input).toHaveValue(def.value ?? def.defaultValue ?? '');

  await expect(button).toHaveAttribute('type', 'submit');
  await expect(button).toHaveClass(`usa-button--${def.buttonVariant ?? 'primary'}`);
  await expect(icon.querySelector('use').getAttribute('href')).toMatch(
    new RegExp(`#${def.icon ?? 'search'}$`)
  );
  // Like USWDS, an icon-only button is named by its icon's alt text rather than visible text.
  await expect(button.querySelector('.usa-search__submit-text') === null).toBe(
    Boolean(def.iconOnly)
  );
  if (def.iconOnly) await expect(icon).toHaveAttribute('aria-label', label);
  await expect(button).toHaveAccessibleName(label);
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkSearch(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Submitting', async () => {
    const section = context.canvasElement.querySelector('section[aria-label]');
    const form = section.querySelector('form');
    let submitted = null;
    // Stop the form navigating away and record what it would have sent.
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitted = new FormData(form).get('q');
    });
    await userEvent.type(form.querySelector('input'), 'solar panels');
    await userEvent.click(form.querySelector('button'));
    await expect(submitted).toBe('solar panels');
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
