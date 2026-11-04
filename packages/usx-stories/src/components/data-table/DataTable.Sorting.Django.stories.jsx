import React, { useEffect, useState } from 'react';
import dataTableMeta from './DataTable.Django.stories.jsx';
import { storyDefs } from './DataTable.React.stories.jsx';
import { createDjangoStory } from '../../utils/storyHelpers.jsx';

export default { ...dataTableMeta, title: 'Django/USX/DataTable/Sorting' };

const createStory = createDjangoStory({ componentName: 'data-table' });

export const Sortable = createStory(storyDefs.Sortable);
export const SortableAll = {
  name: 'Sortable (all columns)',
  ...createStory(storyDefs.SortableAll),
};
export const InitialSortDescending = {
  name: 'Initial sort (first column descending)',
  ...createStory(storyDefs.InitialSortDescending),
};

const sortEventsStory = createStory({
  ...storyDefs.SortableAll,
  id: 'sortable-events',
  sort: { key: 'name', direction: 'asc' },
});
export const SortEvents = {
  name: 'Sort events',
  ...sortEventsStory,
  render: (args) => {
    const [sort, setSort] = useState({ key: 'name', direction: 'asc' });
    useEffect(() => {
      const update = (event) => {
        if (event.target.querySelector('table')?.id === 'sortable-events') setSort(event.detail);
      };
      document.addEventListener('usx:data-table:sort', update);
      return () => document.removeEventListener('usx:data-table:sort', update);
    }, []);
    return (
      <div>
        <p>
          Sort: {sort.key} {sort.direction}
        </p>
        {sortEventsStory.render(args)}
      </div>
    );
  },
};
