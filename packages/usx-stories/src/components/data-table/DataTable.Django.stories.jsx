import React, { useEffect, useState } from 'react';
import { storyDefs } from './DataTable.React.stories.jsx';
import { componentInit, createDjangoStory } from '../../utils/storyHelpers.jsx';

export default {
  title: 'Django/USX/DataTable',
  tags: ['USX', 'autodocs'],
  decorators: componentInit('dataTable'),
  parameters: {
    renderer: 'django',
    docs: {
      description: {
        component: 'Django DataTable component - consumes React storyDefs',
      },
    },
  },
};

const createStory = createDjangoStory({ componentName: 'data-table' });

export const Default = createStory(storyDefs.Default);
export const Striped = createStory(storyDefs.Striped);
export const Borderless = createStory(storyDefs.Borderless);
export const Compact = createStory(storyDefs.Compact);
export const ScrollableHorizontal = {
  name: 'Scrollable (horizontal)',
  ...createStory(storyDefs.ScrollableHorizontal),
};
export const ScrollableVertical = {
  name: 'Scrollable (vertical)',
  ...createStory(storyDefs.ScrollableVertical),
};
export const StickyFirstColumn = createStory(storyDefs.StickyFirstColumn);
export const ResponsiveStacked = createStory(storyDefs.ResponsiveStacked);
export const ResponsiveStackedHeader = createStory(storyDefs.ResponsiveStackedHeader);
export const Sortable = createStory(storyDefs.Sortable);
export const SortableAll = {
  name: 'Sortable (all columns)',
  ...createStory(storyDefs.SortableAll),
};
const sortEventsStory = createStory({
  ...storyDefs.Sortable,
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
    return <div><p>Sort: {sort.key} {sort.direction}</p>{sortEventsStory.render(args)}</div>;
  },
};
export const CheckboxSelection = createStory(storyDefs.CheckboxSelection);
export const CheckboxSelectionRight = {
  name: 'Checkbox (right)',
  ...createStory(storyDefs.CheckboxSelectionRight),
};
const selectionEventsStory = createStory({
  ...storyDefs.CheckboxSelection,
  id: 'checkbox-events',
  select: [1, 3],
});
export const SelectionEvents = {
  name: 'Selection events',
  ...selectionEventsStory,
  render: (args) => {
    const [selected, setSelected] = useState([1, 3]);
    useEffect(() => {
      const update = (event) => {
        if (event.target.querySelector('table')?.id === 'checkbox-events') setSelected(event.detail.selectedKeys);
      };
      document.addEventListener('usx:data-table:select', update);
      return () => document.removeEventListener('usx:data-table:select', update);
    }, []);
    return <div><p>Selected: {selected.join(', ')}</p>{selectionEventsStory.render(args)}</div>;
  },
};
export const RadioSelection = createStory(storyDefs.RadioSelection);
export const DisabledRows = createStory(storyDefs.DisabledRows);
export const TopAlignedSelection = createStory(storyDefs.TopAlignedSelection);
export const AlignedContent = {
  name: 'Aligned content',
  ...createStory({
    id: 'aligned-content',
    caption: 'Compact labels aligned inside padded cells',
    selectionMode: 'checkbox',
    columns: [
      { key: 'name', header: 'Person', primary: true },
      { key: 'description', header: 'Description' },
      { key: 'initials', header: 'Initials', align: 'center', verticalAlign: 'middle' },
      { key: 'topAction', header: 'Top aligned', align: 'center' },
      { key: 'middleAction', header: 'Middle aligned', align: 'center', verticalAlign: 'middle' },
    ],
    data: [
      { id: 1, name: 'Ada Lovelace', initials: 'AL', topAction: 'Remove', middleAction: 'Remove',
        description: 'A long description that makes this row taller than its compact labels.' },
      { id: 2, name: 'Grace Hopper', initials: 'GH', topAction: 'Remove', middleAction: 'Remove',
        description: 'Another longer description to show vertical placement within a table row.' },
    ],
  }),
};
export const GroupedRows = createStory(storyDefs.GroupedRows);
export const GroupedCollapsedByDefault = {
  name: 'Grouped (collapsed)',
  ...createStory(storyDefs.GroupedCollapsedByDefault),
};
export const SpanningCells = createStory(storyDefs.SpanningCells);
export const GroupedMatrix = createStory(storyDefs.GroupedMatrix);
export const SearchablePaginated = createStory(storyDefs.SearchablePaginated);
export const RowDetails = createStory({
  ...storyDefs.RowDetails,
  data: storyDefs.RowDetails.data.map((row) => ({ ...row, detail: `${row.name} is in the ${row.region} region.` })),
  rowDetails: { enabled: true },
  rowDetailField: 'detail',
});
export const Footer = createStory(storyDefs.Footer);
