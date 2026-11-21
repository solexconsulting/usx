import { componentInit } from '../../../../utils/storyHelpers.jsx';
import { djangoPartStory } from '../../ChatPartStory.jsx';
import * as stories from './ChatDirectoryItem.React.stories.jsx';
export default {
  title: 'Django/USX/Chat/Directory Item',
  decorators: componentInit('popover', 'chat'),
};
export const Default = djangoPartStory('chat-directory-item', stories.Default);
export const Contact = djangoPartStory('chat-directory-item', stories.Contact);
export const LinkedContact = djangoPartStory('chat-directory-item', stories.LinkedContact);
export const Recipient = djangoPartStory('chat-directory-item', stories.Recipient);
export const Group = djangoPartStory('chat-directory-item', stories.Group);
export const LongText = djangoPartStory('chat-directory-item', stories.LongText);
