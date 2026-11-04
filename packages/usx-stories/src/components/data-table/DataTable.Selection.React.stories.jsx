import React, { useEffect, useState } from 'react';
import DataTable from '../../../../usx-react/src/components/data-table/DataTable.tsx';
import Avatar from '../../../../usx-react/src/components/avatar/Avatar.tsx';
import Button from '../../../../usx-react/src/components/button/Button.tsx';
import dataTableMeta, { storyDefs } from './DataTable.React.stories.jsx';
import { alignedContentExample } from './alignedContentExample.js';

export default { ...dataTableMeta, title: 'React/USX/DataTable/Selection' };

export const CheckboxSelection = { args: storyDefs.CheckboxSelection };
export const CheckboxSelectionRight = {
  name: 'Checkbox (right)',
  args: storyDefs.CheckboxSelectionRight,
};
export const RadioSelection = { args: storyDefs.RadioSelection };
export const DisabledRows = { args: storyDefs.DisabledRows };
export const TopAlignedSelection = { args: storyDefs.TopAlignedSelection };

export const SelectionEvents = {
  name: 'Selection events',
  render: () => {
    const [selected, setSelected] = useState([1, 3]);
    useEffect(() => {
      const update = (event) => {
        if (event.target.querySelector('table')?.id === 'checkbox-events')
          setSelected(event.detail.selectedKeys);
      };
      document.addEventListener('usx:data-table:select', update);
      return () => document.removeEventListener('usx:data-table:select', update);
    }, []);
    return (
      <div>
        <p>Selected: {selected.join(', ')}</p>
        <DataTable {...storyDefs.CheckboxSelection} id="checkbox-events" select={[1, 3]} />
      </div>
    );
  },
};

// React renders rich cells through each column's render callback.
export const AlignedContent = {
  name: 'Aligned content',
  args: {
    ...alignedContentExample,
    columns: alignedContentExample.columns.map((column) => {
      if (column.key === 'avatar') {
        return {
          ...column,
          render: (row) => (
            <Avatar
              variant="initials"
              value={row.initials}
              alt={row.name}
              contentClassName={row.avatarContentClassName}
            />
          ),
        };
      }
      if (column.key === 'topAction' || column.key === 'middleAction') {
        return {
          ...column,
          render: (row) => (
            <Button
              variant="unstyled"
              aria-label={`Delete ${row.name}`}
              iconProps={[{ name: 'delete' }]}
            />
          ),
        };
      }
      return column;
    }),
  },
};
