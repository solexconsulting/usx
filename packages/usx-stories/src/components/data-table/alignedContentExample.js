// Shared table data; each story supplies its own renderer for the Avatar and action cells.
export const alignedContentExample = {
  id: 'aligned-content',
  caption: 'Compact controls and avatars aligned inside padded cells',
  selectionMode: 'checkbox',
  columns: [
    { key: 'name', header: 'Person', primary: true },
    { key: 'description', header: 'Description' },
    { key: 'avatar', header: 'Avatar', align: 'center', verticalAlign: 'middle', filterable: false },
    { key: 'topAction', header: 'Top aligned', align: 'center', filterable: false },
    { key: 'middleAction', header: 'Middle aligned', align: 'center', verticalAlign: 'middle', filterable: false },
  ],
  data: [
    {
      id: 1,
      name: 'Ada Lovelace',
      initials: 'AL',
      description: 'A long description that makes this row taller than its controls.',
      avatarContentClassName: 'bg-primary-lighter text-primary-darker',
    },
    {
      id: 2,
      name: 'Grace Hopper',
      initials: 'GH',
      description: 'Another longer description to show vertical placement within a table row.',
      avatarContentClassName: 'bg-primary-lighter text-primary-darker',
    },
  ],
};
