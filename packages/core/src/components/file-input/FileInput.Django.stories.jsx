
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/FileInput',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'file-input', props: config.default || {} })
      }
    }
  },
  render: djangoComponent({ componentName: 'file-input' })
};
