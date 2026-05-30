import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/MemorableDate',
  tags: ['autodocs'],
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
