import { djangoComponent } from '../../utils/djangoComponent.js';
import config from '../../../../core/src/components/range-slider/config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/RangeSlider',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'range-slider', props: config.default || {} })
      }
    }
  },
  render: djangoComponent({ componentName: 'range-slider' })
};
