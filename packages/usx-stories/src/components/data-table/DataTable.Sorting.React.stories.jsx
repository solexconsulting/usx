import React, { useEffect, useState } from 'react';
import DataTable from '../../../../usx-react/src/components/data-table/DataTable.tsx';
import dataTableMeta, { storyDefs } from './DataTable.React.stories.jsx';

export default { ...dataTableMeta, title: 'React/USX/DataTable/Sorting' };

export const Sortable = { args: storyDefs.Sortable };
export const SortableAll = { name: 'Sortable (all columns)', args: storyDefs.SortableAll };
export const InitialSortDescending = {
  name: 'Initial sort (first column descending)',
  args: storyDefs.InitialSortDescending,
};

export const SortEvents = {
  name: 'Sort events',
  render: () => {
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
        <DataTable
          {...storyDefs.SortableAll}
          id="sortable-events"
          sort={{ key: 'name', direction: 'asc' }}
        />
      </div>
    );
  },
};
