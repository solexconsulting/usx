import React from 'react';
import reactSnapshot from '../../../../../../usx-react/src/components/pagination-step-options/pagination-step-options.react-snapshot.html?raw';
import djangoSnapshot from '../../../../../../usx-react/src/components/pagination-step-options/pagination-step-options.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { createAllVariantsPlay, sectionTitle, snapshotId } from '../../../../utils/playHelpers.js';
import { storyDefs } from './PaginationStepOptions.React.stories.jsx';

export default {
  title: 'HTML/USWDS/Pagination/Step Options',
  tags: ['USWDS', 'autodocs'],
};

const play = createAllVariantsPlay(Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), async (section) => {
    const block = section.matches('.usx-pagination__step-options') ? section : section.querySelector('.usx-pagination__step-options');
    const select = block.querySelector('select');
    await expect(select.id).toMatch(snapshotId(def.id));
    await expect(select).toHaveAccessibleName(def.label ?? 'Items per page');
    await expect(select.value).toBe(String(def.pageSize));
    await expect([...select.options].map((option) => option.value)).toEqual(['', ...(def.pageSizeOptions ?? [10, 25, 50, 100]).map(String)]);
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
