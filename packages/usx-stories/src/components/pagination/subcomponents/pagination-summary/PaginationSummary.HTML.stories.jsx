import React from 'react';
import reactSnapshot from '../../../../../../usx-react/src/components/pagination-summary/pagination-summary.react-snapshot.html?raw';
import djangoSnapshot from '../../../../../../usx-react/src/components/pagination-summary/pagination-summary.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { createAllVariantsPlay, sectionTitle } from '../../../../utils/playHelpers.js';
import { storyDefs } from './PaginationSummary.React.stories.jsx';

export default {
  title: 'HTML/USWDS/Pagination/Summary',
  tags: ['USWDS', 'autodocs'],
};

const play = createAllVariantsPlay(Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), async (section) => {
    const summary = section.matches('.usx-pagination__summary') ? section : section.querySelector('.usx-pagination__summary');
    const first = def.totalItems === 0 ? 0 : (def.currentPage - 1) * def.pageSize + 1;
    const last = Math.min(def.currentPage * def.pageSize, def.totalItems);
    await expect(summary).toHaveAttribute('aria-live', 'polite');
    await expect(summary).toHaveAttribute('aria-atomic', 'true');
    await expect(summary).toHaveTextContent(`Showing ${first}–${last} of ${def.totalItems} ${def.itemLabel ?? 'items'}`);
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
