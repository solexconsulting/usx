import { componentInit, buildArgTypes } from '../../../../utils/storyHelpers.jsx';
import config from '../../../../../../usx-react/src/components/chat-composer/config.json';
import { djangoPartStory } from '../../ChatPartStory.jsx';
import * as stories from './ChatComposer.React.stories.jsx';
export default {
  title: 'Django/USX/Chat/Composer',
  tags: ['USX', 'autodocs'],
  decorators: componentInit('popover', 'chat'),
  argTypes: buildArgTypes(config.props),
};

export const Default = djangoPartStory('chat-composer', stories.Default);
export const WithFormatting = djangoPartStory('chat-composer', stories.WithFormatting);
export const WithAttachmentsAndEmoji = djangoPartStory(
  'chat-composer',
  stories.WithAttachmentsAndEmoji
);
export const ThreadReply = djangoPartStory('chat-composer', stories.ThreadReply);
export const GroupMessage = djangoPartStory('chat-composer', stories.GroupMessage);
