
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from '../../../../core/src/components/date-picker/config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/DatePicker',
  tags: ['USWDS', 'autodocs'],
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
