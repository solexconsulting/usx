import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/header/header.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/header/header.django-snapshot.html?raw';
import { expect, userEvent } from 'storybook/test';
import { borderRoleVars, storyDefs } from './Header.React.stories.jsx';
import { createAllVariantsPlay, sectionElements, sectionTitle, snapshotId } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Header',
  tags: ['USWDS', 'autodocs'],
};

const checkHeader = (def, key) => async (section, context) => {
  const elements = sectionElements(context.canvasElement, sectionTitle(key));
  const header = section.matches('header') ? section : section.querySelector('header');
  const nav = header.querySelector('nav.usa-nav') ?? elements.find((el) => el.matches('nav.usa-nav')) ?? section.querySelector('nav.usa-nav');
  await expect(header.getAttribute('id')).toMatch(snapshotId(def.id));
  await expect(header).toHaveClass('usa-header', 'usx-header', `usa-header--${def.extended ? 'extended' : 'basic'}`);
  await expect(nav).toHaveAccessibleName('Primary navigation');
  if (!def.extended && window.matchMedia('(min-width: 64em)').matches) {
    await expect(getComputedStyle(nav).backgroundColor).toBe('rgba(0, 0, 0, 0)');
  }

  const brand = header.querySelector('.usa-logo');
  if (def.branding?.logo) {
    const images = [...brand.querySelectorAll('.usx-logo__image img')];
    await expect(images).toHaveLength(2);
    for (const image of images) await expect(image).toHaveAttribute('alt', def.branding.title);
  } else {
    await expect(brand.querySelector('.usx-logo__title')).toHaveTextContent(def.branding?.title ?? '');
  }
  if (def.projectUrl) await expect(brand.querySelector('a')).toHaveAttribute('href', def.projectUrl);
  await expect(brand.querySelectorAll('.usx-logo__symbol')).toHaveLength(def.branding?.symbol ? 2 : 0);

  const menu = header.querySelector('.usa-menu-btn');
  await expect(menu).not.toBeNull();
  await expect(Boolean(menu.querySelector('use[href$="#menu"]'))).toBe(Boolean(def.useMenuIcon));
  const items = [...nav.querySelectorAll('.usa-nav__primary > .usa-nav__primary-item')];
  await expect(items).toHaveLength(def.navSections.length);
  for (const [index, item] of items.entries()) {
    const expected = def.navSections[index];
    if (expected.links?.length) {
      const button = item.querySelector(':scope > button.usa-accordion__button');
      await expect(button).toHaveTextContent(expected.title);
      await expect(button).toHaveAttribute('aria-expanded', 'false');
      const submenu = item.querySelector(`#${button.getAttribute('aria-controls')}`);
      await expect(submenu).toHaveAttribute('hidden');
      await expect(submenu.querySelectorAll('a')).toHaveLength(expected.links.length);
      await expect(submenu.querySelector('a')).toHaveAttribute('href', expected.links[0].href);
      await expect([...submenu.querySelectorAll('a')].at(-1)).toHaveTextContent(expected.links.at(-1).text);
      await expect(Boolean(item.querySelector('.usa-megamenu'))).toBe(Boolean(def.megamenu));
    } else {
      const link = item.querySelector(':scope > a');
      await expect(link).toHaveAttribute('href', expected.href);
      await expect(link).toHaveTextContent(expected.title);
      if (expected.external) await expect(link.querySelector('.usa-sr-only')).toHaveTextContent('External');
    }
  }

  const secondary = [...nav.querySelectorAll('.usa-nav__secondary-links > li > a')];
  const expectedSecondary = def.extended ? def.secondaryLinks ?? [] : [];
  await expect(secondary).toHaveLength(expectedSecondary.length);
  for (const [index, link] of secondary.entries()) await expect(link).toHaveAttribute('href', expectedSecondary[index].href);
  const search = nav.querySelector('form.usa-search');
  await expect(Boolean(search)).toBe(Boolean(def.searchProps));
  if (search) {
    await expect(search).toHaveAttribute('action', def.searchProps.action);
    await expect(search.querySelector('input[type="search"]')).toHaveAccessibleName(def.searchProps.label);
  }

  if (key === 'ExtensibilitySlots') {
    await expect(nav.querySelector('.usx-nav__utility a[href="https://example.com/sign-in"]')).toHaveTextContent('Sign In');
    const picker = nav.querySelector('.usx-nav__end-slot .usx-theme-picker');
    await expect(picker.querySelector('select')).toHaveAccessibleName('Theme');
    await expect([...picker.querySelectorAll('option')].map((option) => option.textContent)).toEqual(['Light', 'Dark']);
  }
  if (key === 'BorderRoles') {
    for (const [property, value] of Object.entries(borderRoleVars)) await expect(section.style.getPropertyValue(property)).toBe(value);
  }
  if (key === 'Default') {
    const button = items[0].querySelector('button.usa-accordion__button');
    const submenu = items[0].querySelector(`#${button.getAttribute('aria-controls')}`);
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(submenu).not.toHaveAttribute('hidden');
    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    button.blur();
  }
};

const checks = Object.fromEntries(Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkHeader(def, key)]));
checks['Border Roles'] = checkHeader({ ...storyDefs.Extended, id: 'header-border-roles', searchProps: { ...storyDefs.Extended.searchProps, id: 'header-border-roles-search' } }, 'BorderRoles');
const play = createAllVariantsPlay(checks);

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
