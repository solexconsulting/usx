import React from 'react';
import reactSnapshot from '../../../../../../usx-react/src/components/pagination-navigation/pagination-navigation.react-snapshot.html?raw';
import djangoSnapshot from '../../../../../../usx-react/src/components/pagination-navigation/pagination-navigation.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { createAllVariantsPlay, sectionTitle } from '../../../../utils/playHelpers.js';
import { storyDefs } from './PaginationNavigation.React.stories.jsx';

export default {
  title: 'HTML/USWDS/Pagination/Navigation',
  tags: ['USWDS', 'autodocs'],
};

const ellipsis = '…';
const pageSequences = {
  Default: [1, 2, 3],
  Bounded: [1, ellipsis, 9, 10, 11, ellipsis, 24],
  Unbounded: [1, ellipsis, 9, 10, 11, ellipsis],
  IconOnly: [1, ellipsis, 4, 5, 6, ellipsis, 20],
  UnboundedIconOnly: [1, ellipsis, 4, 5, 6, ellipsis],
};

const play = createAllVariantsPlay(Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), async (section) => {
    const nav = section.matches('nav') ? section : section.querySelector('nav');
    await expect(nav).toHaveClass('usa-pagination', 'usx-pagination__nav');
    await expect(nav).toHaveAccessibleName('Pagination');
    await expect(nav).toHaveAttribute('data-usx-pagination-current-page', String(def.currentPage));
    const links = [...nav.querySelectorAll('.usa-pagination__page-no a')];
    await expect(links.find((link) => link.getAttribute('aria-current') === 'page')).toHaveTextContent(String(def.currentPage));
    await expect([...nav.querySelectorAll('.usa-pagination__list > li')].slice(1, -1).map((item) =>
      item.classList.contains('usa-pagination__overflow') ? ellipsis : Number(item.textContent)
    )).toEqual(pageSequences[key]);
    await expect(nav.querySelector('.usa-pagination__previous-page').getAttribute('aria-disabled') === 'true').toBe(def.currentPage === 1);
    await expect(nav.querySelector('.usa-pagination__next-page').getAttribute('aria-disabled') === 'true').toBe(def.totalPages === def.currentPage);
    await expect(nav.querySelector('.usa-pagination__link-text').classList.contains('usa-sr-only')).toBe(Boolean(def.hideLinkText));
  }])
));

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play,
};
