import React, { useEffect, useState } from 'react';
import Avatar from '../../../../usx-react/src/components/avatar/Avatar.tsx';
import Button from '../../../../usx-react/src/components/button/Button.tsx';
import dataTableMeta from './DataTable.Django.stories.jsx';
import { storyDefs } from './DataTable.React.stories.jsx';
import { alignedContentExample } from './alignedContentExample.js';
import { createDjangoStory } from '../../utils/storyHelpers.jsx';

export default { ...dataTableMeta, title: 'Django/USX/DataTable/Selection' };

const createStory = createDjangoStory({ componentName: 'data-table' });

export const CheckboxSelection = createStory(storyDefs.CheckboxSelection);
export const CheckboxSelectionRight = {
  name: 'Checkbox (right)',
  ...createStory(storyDefs.CheckboxSelectionRight),
};
export const RadioSelection = createStory(storyDefs.RadioSelection);
export const DisabledRows = createStory(storyDefs.DisabledRows);
export const TopAlignedSelection = createStory(storyDefs.TopAlignedSelection);

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
        if (event.target.querySelector('table')?.id === 'checkbox-events')
          setSelected(event.detail.selectedKeys);
      };
      document.addEventListener('usx:data-table:select', update);
      return () => document.removeEventListener('usx:data-table:select', update);
    }, []);
    return (
      <div>
        <p>Selected: {selected.join(', ')}</p>
        {selectionEventsStory.render(args)}
      </div>
    );
  },
};

// The story helper serializes these Avatar and Button nodes for Django to render.
export const AlignedContent = {
  name: 'Aligned content',
  ...createStory({
    ...alignedContentExample,
    data: alignedContentExample.data.map((row) => ({
      ...row,
      avatar: (
        <Avatar
          variant="initials"
          value={row.initials}
          alt={row.name}
          contentClassName={row.avatarContentClassName}
        />
      ),
      topAction: (
        <Button
          variant="unstyled"
          extraAttributes={{ 'aria-label': `Delete ${row.name}` }}
          iconProps={[{ name: 'delete' }]}
        />
      ),
      middleAction: (
        <Button
          variant="unstyled"
          extraAttributes={{ 'aria-label': `Delete ${row.name}` }}
          iconProps={[{ name: 'delete' }]}
        />
      ),
    })),
  }),
};
