import { djangoComponent } from '../../utils/djangoComponent.js';
import config from '../../../../core/src/components/memorable-date/config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/MemorableDate',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'memorable-date', props: config.default || {} })
      }
    }
  },
  render: djangoComponent({ componentName: 'memorable-date' })
};
