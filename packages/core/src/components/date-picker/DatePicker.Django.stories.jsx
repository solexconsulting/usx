
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/DatePicker',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'date-picker', props: config.default || {} })
      }
    }
  },
  render: djangoComponent({ componentName: 'date-picker' })
};
