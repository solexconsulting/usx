import config from '../../../../usx-react/src/components/{{kebab}}/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './{{Name}}.React.stories.jsx';

export default {
  title: 'Django/USX/{{Name}}',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: '{{kebab}}' });

export const Default = createStory(storyDefs.Default);
