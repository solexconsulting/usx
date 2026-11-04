import ReactMeta, { storyDefs } from './DataTable.React.stories.jsx';
import { componentInit, createDjangoStory } from '../../utils/storyHelpers.jsx';

export default {
  title: 'Django/USX/DataTable',
  tags: ['USX', 'autodocs'],
  argTypes: ReactMeta.argTypes,
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
export const SpanningCells = createStory(storyDefs.SpanningCells);
export const SearchablePaginated = createStory(storyDefs.SearchablePaginated);
export const RowDetails = createStory({
  ...storyDefs.RowDetails,
  data: storyDefs.RowDetails.data.map((row) => ({ ...row, detail: `${row.name} is in the ${row.region} region.` })),
  rowDetails: { enabled: true },
  rowDetailField: 'detail',
});
