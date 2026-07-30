import { djangoComponent } from '../../utils/djangoComponent.js';
import config from '../../../../core/src/components/in-page-nav/config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/InPageNav',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'in-page-nav', props: config.default || {} })
      }
    }
  },
  render: djangoComponent({ componentName: 'in-page-nav' })
};
