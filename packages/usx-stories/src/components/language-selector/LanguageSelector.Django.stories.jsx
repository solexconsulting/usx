import { djangoComponent } from '../../utils/djangoComponent.js';
import config from '../../../../core/src/components/language-selector/config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/LanguageSelector',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'language-selector', props: config.default || {} })
      }
    }
  },
  render: djangoComponent({ componentName: 'language-selector' })
};
