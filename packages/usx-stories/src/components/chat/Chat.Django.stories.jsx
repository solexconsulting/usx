import config from '../../../../usx-react/src/components/chat/config.json';
import { buildArgTypes, componentInit, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Chat.React.stories.jsx';
import * as reactStories from './Chat.React.stories.jsx';
import {
  ConversationActions as ReactConversationActions,
  EmptyInbox as ReactEmptyInbox,
  MessageActions as ReactMessageActions,
} from './Chat.React.stories.jsx';
import { djangoComponent } from '../../utils/djangoComponent.js';

export default {
  decorators: componentInit('popover', 'chat'),
  title: 'Django/USX/Chat',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  parameters: {
    docs: {
      description: {
        component:
          'Chat renders contract data as markup. Include the optional Chat styles and initialize @solexllc/usx/js/chat and @solexllc/usx/js/popover for shared interactions in React or Django. The host responds to usx:chat-* events and supplies the next view, message data, delivery state, and history. The examples use an application host outside the component library. Chat composes Window, Directory, Context, Message, Bubble, Message Actions, History, Controls, Attachments, and Composer. Each has a matching React/Django contract and nested stories. Message/Grouped demonstrates consecutive bubbles sharing an identity and final timestamp.',
      },
    },
  },
};

const createStory = createDjangoStory({ componentName: 'chat' });
const DjangoChat = djangoComponent({ componentName: 'chat' });
const interactiveStory = (args, reactStory) => {
  const story = createStory(args);
  return {
    ...story,
    render: (props) => reactStory.render({ ...props, renderer: DjangoChat }),
    parameters: {
      ...story.parameters,
      docs: { ...story.parameters.docs, ...reactStory.parameters?.docs },
    },
  };
};

export const Default = interactiveStory(storyDefs.Default, reactStories.Default);
export const InboxJourney = interactiveStory(storyDefs.InboxJourney, reactStories.InboxJourney);
export const EmptyInbox = interactiveStory(storyDefs.EmptyInbox, ReactEmptyInbox);
export const GroupInbox = interactiveStory(storyDefs.GroupInbox, reactStories.GroupInbox);
export const MultipleParticipants = interactiveStory(
  storyDefs.MultipleParticipants,
  reactStories.MultipleParticipants
);
export const BotControlsWithHistory = interactiveStory(
  storyDefs.BotControlsWithHistory,
  reactStories.BotControlsWithHistory
);
export const Attachments = interactiveStory(storyDefs.Attachments, reactStories.Attachments);
export const ActionsAndRichContent = interactiveStory(
  storyDefs.ActionsAndRichContent,
  reactStories.ActionsAndRichContent
);
export const MessageActions = interactiveStory(storyDefs.MessageActions, ReactMessageActions);
export const CustomEmojiPack = interactiveStory(
  storyDefs.CustomEmojiPack,
  reactStories.CustomEmojiPack
);
export const Formatting = interactiveStory(storyDefs.Formatting, reactStories.Formatting);
export const ThreadHistory = interactiveStory(storyDefs.ThreadHistory, reactStories.ThreadHistory);
export const LongHistory = interactiveStory(storyDefs.LongHistory, reactStories.LongHistory);
export const ContextualInbox = interactiveStory(
  storyDefs.ContextualInbox,
  reactStories.ContextualInbox
);
export const MixedUnread = interactiveStory(storyDefs.MixedUnread, reactStories.MixedUnread);
export const LinkedNavigation = interactiveStory(
  storyDefs.LinkedNavigation,
  reactStories.LinkedNavigation
);
export const FailedSend = interactiveStory(storyDefs.FailedSend, reactStories.FailedSend);
export const FloatingLauncher = interactiveStory(
  storyDefs.FloatingLauncher,
  reactStories.FloatingLauncher
);
export const TextLauncher = interactiveStory(storyDefs.TextLauncher, reactStories.TextLauncher);
export const UnavailableThread = interactiveStory(
  storyDefs.UnavailableThread,
  reactStories.UnavailableThread
);

export const NewGroupMessage = interactiveStory(
  storyDefs.NewGroupMessage,
  reactStories.NewGroupMessage
);

export const ConversationActions = interactiveStory(
  storyDefs.ConversationActions,
  ReactConversationActions
);

export const MessageActionDefaults = interactiveStory(
  storyDefs.MessageActionDefaults,
  reactStories.MessageActionDefaults
);
