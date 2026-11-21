import React from 'react';
import chatAvatarProps from '../chat/avatarProps';
import ChatDirectoryItem, {
  type ChatDirectoryItemProps,
} from '../chat-directory-item/ChatDirectoryItem';
import type {
  ChatParticipant,
  ChatConversationData,
  ChatContactData,
  ChatView,
} from '../chat/Chat';

function contactAvatar(person: ChatParticipant | undefined, name: string) {
  const statusRingColor =
    person?.presence === 'online'
      ? 'success'
      : person?.presence === 'away'
        ? 'warning'
        : person?.avatarProps?.statusRingColor;
  const statusLabel =
    person?.presence === 'online'
      ? 'Online'
      : person?.presence === 'away'
        ? 'Away'
        : person?.avatarProps?.statusLabel;
  return chatAvatarProps(
    person,
    name,
    statusRingColor,
    statusLabel,
    statusLabel ? { label: statusLabel, position: 'right' } : person?.avatarProps?.tooltipProps
  );
}

function conversationItem(
  conversation: ChatConversationData,
  participants: ChatParticipant[],
  currentUserId: string,
  directoryId: string
): ChatDirectoryItemProps {
  const people = [...new Set(conversation.participantIds ?? [])]
    .filter((id) => id !== currentUserId)
    .map((id) => participants.find((person) => person.id === id) ?? { id, name: id });
  const isGroup = Boolean(conversation.isGroup || people.length > 1);
  let avatars;
  if (isGroup && conversation.avatarProps) {
    avatars = [
      chatAvatarProps(
        { id: conversation.id, name: conversation.title, avatarProps: conversation.avatarProps },
        conversation.title
      ),
    ];
  } else if (isGroup && people.length > 1) {
    avatars = people
      .slice(0, people.length > 3 ? 2 : 3)
      .map((person) => chatAvatarProps(person, person.name));
    if (people.length > 3)
      avatars.push({
        variant: 'initials',
        value: `+${people.length - 2}`,
        alt: `${people.length - 2} more participants`,
        shape: 'circle',
        contentClassName: 'bg-base-darker text-white',
      });
  } else if (isGroup) {
    avatars = [
      chatAvatarProps(
        {
          id: conversation.id,
          name: conversation.title,
          avatarProps: { variant: 'icon', value: 'groups', alt: `${conversation.title} group` },
        },
        conversation.title
      ),
    ];
  } else {
    avatars = [contactAvatar(people[0], people[0]?.name ?? conversation.title)];
  }
  const sender = conversation.previewSenderId
    ? participants.find((person) => person.id === conversation.previewSenderId)?.name ||
      conversation.previewSenderId
    : '';
  return {
    id: `${directoryId}-conversation-${conversation.id}`,
    title: conversation.title,
    subtitle: conversation.context?.title,
    preview:
      conversation.preview && isGroup && sender
        ? `${sender}: ${conversation.preview}`
        : conversation.preview,
    avatarProps: avatars,
    href: conversation.href,
    conversationId: conversation.id,
    timeLabel: conversation.timeLabel,
    unreadCount: conversation.unreadCount,
    actions: conversation.actions,
  };
}

export interface ChatDirectoryProps {
  id?: string;
  selectable?: boolean;
  recipientIds?: string[];
  formId?: string;
  disabled?: boolean;
  view?: ChatView;
  conversations?: ChatConversationData[];
  contacts?: ChatContactData[];
  participants?: ChatParticipant[];
  currentUserId?: string;
}

export default function ChatDirectory({
  id = 'chat-directory',
  selectable = false,
  recipientIds = [],
  formId,
  disabled = false,
  view = 'inbox',
  conversations = [],
  contacts = [],
  participants = [],
  currentUserId = 'user',
}: ChatDirectoryProps) {
  if (view !== 'inbox' && view !== 'contacts') return null;
  const selecting = view === 'contacts' && selectable;
  const Container = selecting ? 'div' : 'nav';
  const items: ChatDirectoryItemProps[] =
    view === 'inbox'
      ? conversations.map((conversation) =>
          conversationItem(conversation, participants, currentUserId, id)
        )
      : contacts.map((contact) => {
          const person = participants.find((person) => person.id === contact.participantId);
          const title = person?.name ?? contact.participantId;
          return {
            id: `${id}-recipient-${contact.participantId}`,
            title,
            subtitle: contact.description,
            avatarProps: [contactAvatar(person, title)],
            href: contact.href,
            conversationId: contact.conversationId,
            participantId: contact.participantId,
            actions: contact.actions,
            selectable,
            selected: recipientIds.includes(contact.participantId),
            formId,
            disabled,
          };
        });
  return (
    <Container
      className="usx-chat__directory"
      role={selecting ? 'group' : undefined}
      aria-label={view === 'inbox' ? 'Conversations' : selecting ? 'Recipients' : 'People'}
    >
      {selecting && <p className="usx-chat__recipient-hint">To: Choose one or more people.</p>}
      <ul className="usx-chat__directory-list">
        {items.map((item) => (
          <ChatDirectoryItem key={item.id} {...item} />
        ))}
      </ul>
      {view === 'inbox' && items.length === 0 && (
        <p className="usx-chat__empty">No conversations yet.</p>
      )}
    </Container>
  );
}
