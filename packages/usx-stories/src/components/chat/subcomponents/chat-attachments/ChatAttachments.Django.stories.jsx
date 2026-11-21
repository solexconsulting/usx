import { buildArgTypes, createDjangoStory } from '../../../../utils/storyHelpers.jsx';
import config from '../../../../../../usx-react/src/components/chat-attachments/config.json';
import meta, { storyDefs } from './ChatAttachments.React.stories.jsx';

export default {
  title: 'Django/USX/Chat/Attachments',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props),
  parameters: meta.parameters,
};

export const Default = {
  ...createDjangoStory({ componentName: 'chat-attachments' })(storyDefs.Default),
  name: 'Attachments',
};
