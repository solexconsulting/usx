import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/in-page-nav/in-page-nav.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/in-page-nav/in-page-nav.django-snapshot.html?raw';
import { expect, waitFor } from 'storybook/test';
import { storyDefs } from './InPageNav.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle, snapshotId } from '../../utils/playHelpers.js';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/InPageNav',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`inPageNavigation.init()`'),
      },
    },
  },
  decorators: [...componentInit('inPageNavigation')],
};

const expectedLinks = {
  Default: ['Introduction', 'Getting started', 'Prerequisites', 'Installation', 'Advanced usage', 'Conclusion'],
  CustomHeadingElements: ['Introduction', 'Getting started', 'Advanced usage', 'Conclusion'],
  CustomTitle: ['Introduction', 'Getting started', 'Prerequisites', 'Conclusion'],
  CustomContentSelector: ['Introduction', 'Getting started', 'Prerequisites'],
};

const checkNav = (key) => async (section) => {
  const def = storyDefs[key];
  const aside = section.querySelector(':scope > aside.usa-in-page-nav');
  await expect(aside.id).toMatch(snapshotId(def.id));
  await expect(aside).toHaveAttribute('data-heading-elements', def.headingElements ?? 'h2 h3');
  await expect(aside).toHaveAttribute('data-title-heading-level', def.titleAs ?? 'h4');
  await expect(aside).toHaveAttribute('data-title-text', def.titleText ?? 'On this page');
  await expect(aside).toHaveAttribute('data-minimum-heading-count', String(def.minimumHeadingCount ?? 2));

  const content = section.querySelector(':scope > .usx-in-page-nav__content');
  await expect(content.id).toMatch(snapshotId(`${def.id}-content`));
  const selector = aside.dataset.mainContentSelector;
  const observed = section.querySelector(selector);
  await expect(observed).not.toBeNull();
  if (key === 'CustomContentSelector') {
    await expect(observed).not.toBe(content);
    await expect(content.querySelector('h3').textContent).toBe('Heading outside the observed region');
  } else {
    await expect(observed).toBe(content);
  }

  if (key === 'BelowMinimumHeadingCount') {
    await expect(content.querySelectorAll('h2')).toHaveLength(2);
    await expect(aside.querySelector('nav')).toBeNull();
    await expect(aside).not.toHaveAttribute('data-enhanced');
    return;
  }

  await waitFor(() => expect(aside).toHaveAttribute('data-enhanced', 'true'));
  const nav = aside.querySelector('nav.usa-in-page-nav__nav');
  await expect(nav).toHaveAccessibleName(def.titleText ?? 'On this page');
  await expect(nav.querySelector(`${def.titleAs ?? 'h4'}.usa-in-page-nav__heading`)).toHaveTextContent(
    def.titleText ?? 'On this page'
  );

  const links = [...nav.querySelectorAll('.usa-in-page-nav__list > li > a.usa-in-page-nav__link')];
  await expect(links.map((link) => link.textContent)).toEqual(expectedLinks[key]);
  const headings = [...observed.querySelectorAll(def.headingElements ?? 'h2, h3')];
  await expect(headings.map((heading) => heading.textContent)).toEqual(expectedLinks[key]);
  for (const [index, link] of links.entries()) {
    const anchor = headings[index].querySelector(':scope > a.usa-anchor');
    await expect(anchor).not.toBeNull();
    await expect(link).toHaveAttribute('href', `#${anchor.id}`);
    await expect(link.parentElement).toHaveClass('usa-in-page-nav__item');
    await (headings[index].tagName === 'H2' ? expect(link.parentElement) : expect(link.parentElement).not)
      .toHaveClass('usa-in-page-nav__item--primary');
  }
};

const checks = Object.fromEntries(
  Object.keys(storyDefs).map((key) => [sectionTitle(key), checkNav(key)])
);

const play = async (context) => {
  await waitFor(() => expect(context.canvasElement.ownerDocument.body).toHaveAttribute('data-usx-ready', 'true'));
  await createAllVariantsPlay(checks)(context);
  await context.step('Active link follows scroll', async () => {
    const defaultSection = sectionFor(context.canvasElement, 'Default');
    const customSection = sectionFor(context.canvasElement, 'Custom Content Selector');
    const activeLink = (section) => section.querySelector('.usa-in-page-nav__link.usa-current');
    const checkActive = async (section) => {
      await waitFor(() => expect(activeLink(section)).not.toBeNull(), { timeout: 4000 });
      const link = activeLink(section);
      const anchor = context.canvasElement.ownerDocument.getElementById(link.hash.slice(1));
      await expect(anchor).not.toBeNull();
      await expect(anchor.getBoundingClientRect().top).toBeGreaterThanOrEqual(0);
      await expect(anchor.getBoundingClientRect().bottom).toBeLessThanOrEqual(window.innerHeight);
      return link.hash;
    };

    window.scrollTo({ top: 0, behavior: 'instant' });
    const firstHash = await checkActive(defaultSection);
    customSection.scrollIntoView({ block: 'start', behavior: 'instant' });
    const secondHash = await checkActive(customSection);
    await expect(secondHash).not.toBe(firstHash);
    await expect(activeLink(defaultSection)).toBeNull();
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
