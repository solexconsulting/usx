import type { SummaryProps } from '../summary/Summary';
import ChatWindow from '../chat-window/ChatWindow';
import ChatMessage from '../chat-message/ChatMessage';
import ChatControls from '../chat-controls/ChatControls';
import ChatDirectory from '../chat-directory/ChatDirectory';
import ChatContext from '../chat-context/ChatContext';
import ChatHistory from '../chat-history/ChatHistory';
import React from 'react';
import chatAvatarProps from './avatarProps';
import type { AvatarProps } from '../avatar/Avatar';
import AvatarGroup from '../avatar-group/AvatarGroup';
import Callout from '../callout/Callout';
import type { PopoverAlign, PopoverSide } from '../popover/Popover';
import chatConfig from './config.json';
import ChatComposer from '../chat-composer/ChatComposer';

const MAX_EMOJI = 100;

export interface ChatParticipant {
  id: string;
  name: string;
  avatarProps?: Omit<AvatarProps, 'href'>;
  /** Current host-supplied presence; omit when unavailable or unknown. */
  presence?: 'online' | 'away';
  /** Default actions for messages from this sender; [] disables host actions. */
  messageActions?: ChatAction[];
}

export interface ChatAttachment {
  name: string;
  url?: string;
  imageUrl?: string;
  /** Description of the preview image; defaults to the file name. */
  alt?: string;
}

export interface ChatOlderHistory {
  /** Whether an earlier page exists. Omit olderHistory to disable paging controls. */
  hasMore: boolean;
  /** Opaque host-owned cursor for the next older page. */
  cursor?: string;
  loading?: boolean;
  error?: string;
}

export interface ChatMessageData {
  id: string;
  /** Correlation ID supplied by the host after submission. */
  clientMessageId?: string;
  senderId: string;
  /** Optional explicit grouping; both renderers derive it when omitted. */
  groupPosition?: 'single' | 'first' | 'middle' | 'last';
  /** Safe formatting subset: **bold**, *italic*, <u>underline</u>, ~~strike~~, lists, > quotes, and fenced code. */
  text?: string;
  /** Rich content; provide exportText for the plain-text copy action. */
  content?: React.ReactNode;
  /** Use a full-width neutral panel for host-owned editing or confirmation controls. */
  layout?: 'bubble' | 'panel';
  exportText?: string;
  sentAt?: string;
  timeLabel?: string;
  attachments?: ChatAttachment[];
  /** Optional replies rendered in a thread view. */
  replies?: ChatMessageData[];
  /** Paging state for replies when this message is the active thread root. */
  olderReplies?: ChatOlderHistory;
  replyCount?: number;
  edited?: boolean;
  deliveryStatus?: string;
  /** Optional host-supplied delivery state for server-rendered messages. */
  deliveryState?: 'sending' | 'failed';
  actions?: ChatMessageAction[];
  reactions?: ChatReaction[];
  /** Override the chat-level emoji choices; an empty array disables adding reactions. */
  reactionOptions?: ChatReactionOption[];
}

export interface ChatAction {
  id: string;
  label: string;
  disabled?: boolean;
}
export type ChatMessageAction = ChatAction;
export interface ChatMessageActionDefaults {
  sent?: ChatAction[];
  received?: ChatAction[];
}

/** Pure markup defaults. Explicit message actions (including []) take precedence. */
export function resolveChatMessageActions(
  message: ChatMessageData,
  currentUserId: string,
  participant?: ChatParticipant,
  conversation?: ChatConversationData,
  defaults?: ChatMessageActionDefaults
): ChatAction[] {
  const side = message.senderId === currentUserId ? 'sent' : 'received';
  return (
    message.actions ??
    participant?.messageActions ??
    conversation?.messageActions?.[side] ??
    defaults?.[side] ??
    []
  );
}
export interface ChatReaction {
  emoji: string;
  label: string;
  count: number;
  selected?: boolean;
}
export interface ChatReactionOption {
  emoji: string;
  label: string;
}
export interface ChatEmoji extends ChatReactionOption {
  /** Lowercase shortcode without colons, such as thumbsup. */
  name: string;
  aliases?: string[];
}
export interface ChatConversationContext {
  /** Short category such as "Listing" or "Access request". */
  label: string;
  title: string;
  /** Optional detail such as a price or request status. */
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** URL of the referenced item or record; navigation is owned by the host. */
  href?: string;
}
export interface ChatConversationData {
  id: string;
  title: string;
  /** Host-defined actions shared by the directory row and conversation/thread header. */
  actions?: ChatAction[];
  messageActions?: ChatMessageActionDefaults;
  /** Other members shown in the inbox; the current user is omitted if supplied. */
  participantIds?: string[];
  /** Preserve group treatment when only one other member remains. */
  isGroup?: boolean;
  /** Optional conversation image or icon instead of member avatars. */
  avatarProps?: Omit<AvatarProps, 'href'>;
  preview?: string;
  /** Sender of preview, shown before the preview in group inbox rows. */
  previewSenderId?: string;
  timeLabel?: string;
  unreadCount?: number;
  /** Stable ID of the first unread message in the supplied history. */
  firstUnreadMessageId?: string;
  href?: string;
  context?: ChatConversationContext;
  messages?: ChatMessageData[];
  olderHistory?: ChatOlderHistory;
  /** Override whether this conversation accepts new file uploads. */
  allowAttachments?: boolean;
  /** Enable threads for every message in this conversation. */
  allowThreads?: boolean;
}
export interface ChatContactData {
  participantId: string;
  /** Optional host-defined actions for this directory entry. */
  actions?: ChatAction[];
  description?: string;
  conversationId?: string;
  href?: string;
  /** Override whether a new conversation with this contact accepts uploads. */
  allowAttachments?: boolean;
}
export type ChatView = 'inbox' | 'contacts' | 'conversation' | 'thread';

export interface ChatOption {
  label: string;
  value: string;
}

export interface ChatProps {
  id: string;
  title?: string;
  status?: string;
  /** Subject of a standalone conversation. A selected conversation overrides it. */
  context?: ChatConversationContext;
  participants?: ChatParticipant[];
  currentUserId?: string;
  messages?: ChatMessageData[];
  messageActions?: ChatMessageActionDefaults;
  /** Paging state for a standalone conversation. Selected conversations use their own state. */
  olderHistory?: ChatOlderHistory;
  /** First unread message for a standalone conversation. A selected conversation overrides it. */
  firstUnreadMessageId?: string;
  conversations?: ChatConversationData[];
  contacts?: ChatContactData[];
  /** View supplied by the host; defaults to the initial directory or conversation. */
  view?: ChatView;
  defaultView?: ChatView;
  activeConversationId?: string;
  defaultConversationId?: string;
  activeThreadId?: string;
  /** Recipient for a new conversation without an ID yet. */
  recipientId?: string;
  /** Initially selected recipients in the new-message picker. */
  recipientIds?: string[];
  emptyText?: string;
  typingIds?: string[];
  suggestedQuestions?: ChatOption[];
  choices?: ChatOption[];
  choicePrompt?: string;
  actions?: React.ReactNode;
  showCopyAction?: boolean;
  /** Show Copy message in each message's More menu. */
  showCopyMessageAction?: boolean;
  /** Emoji choices for adding a reaction to any message. Defaults to emojiPack. Pass [] to disable reactions. */
  reactionOptions?: ChatReactionOption[];
  /** Composer emoji and shortcode choices. Defaults to the included pack; pass [] to disable emoji input. */
  emojiPack?: ChatEmoji[];
  children?: React.ReactNode;
  summaryProps?: Omit<SummaryProps, 'unstyled'>;
  side?: PopoverSide;
  align?: PopoverAlign;
  defaultOpen?: boolean;
  groupWindowMinutes?: number;
  /** Enable file uploads in the composer. Defaults to false; conversations and contacts may override it. */
  allowAttachments?: boolean;
  /** Enable threads for every message; individual conversations may override this. */
  allowThreads?: boolean;
  /** Show the composer formatting panel and enable its keyboard shortcuts. Defaults to false. */
  allowFormatting?: boolean;
  accept?: string;
  formAction?: string;
  disabled?: boolean;
  className?: string;
}

const nameOf = (id: string, participants: ChatParticipant[]) =>
  participants.find((participant) => participant.id === id)?.name || id;
// Only grouping uses normalized instants; displayed labels and datetime attributes stay literal.
function groupingTime(value: string | undefined): number {
  const match = value?.match(
    /^(\d{4}-\d{2}-\d{2})T((?:[01]\d|2[0-3]):[0-5]\d)(?::([0-5]\d)(?:\.(\d+))?)?(Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)?$/
  );
  if (!match || match[0] !== value) return NaN;
  const [, date, time, seconds = '00', fraction = '', zone = 'Z'] = match;
  const calendar = new Date(`${date}T00:00:00Z`);
  if (
    date.startsWith('0000') ||
    !Number.isFinite(calendar.getTime()) ||
    calendar.toISOString().slice(0, 10) !== date
  )
    return NaN;
  return Date.parse(`${date}T${time}:${seconds}.${fraction.slice(0, 3).padEnd(3, '0')}${zone}`);
}

const sameGroup = (
  a: ChatMessageData | undefined,
  b: ChatMessageData | undefined,
  minutes: number
) => {
  if (!a?.sentAt || !b?.sentAt || a.senderId !== b.senderId) return false;
  const gap = groupingTime(b.sentAt) - groupingTime(a.sentAt);
  return Number.isFinite(gap) && gap >= 0 && gap <= minutes * 60_000;
};

export default function Chat({
  id,
  title = 'Chat',
  status,
  context,
  participants = [],
  currentUserId = 'user',
  messages = [],
  messageActions,
  olderHistory,
  firstUnreadMessageId,
  conversations = [],
  contacts = [],
  view,
  defaultView,
  activeConversationId,
  defaultConversationId,
  activeThreadId,
  recipientId,
  recipientIds = [],
  emptyText = 'No messages yet. Start the conversation.',
  typingIds = [],
  suggestedQuestions = [],
  choices = [],
  choicePrompt = 'Choose an answer',
  actions,
  showCopyAction = false,
  showCopyMessageAction = true,
  reactionOptions,
  emojiPack = chatConfig.props.emojiPack.default,
  children,
  summaryProps,
  side,
  align,
  defaultOpen = false,
  groupWindowMinutes = 5,
  allowAttachments = false,
  allowThreads = false,
  allowFormatting = false,
  accept,
  formAction,
  disabled = false,
  className,
}: ChatProps) {
  const currentView = view ?? defaultView ?? (conversations.length ? 'inbox' : 'conversation');
  const conversationId = activeConversationId ?? defaultConversationId;
  const conversation = conversations.find((item) => item.id === conversationId);
  const conversationContext = conversation?.context ?? context;
  const selectedRecipientId = recipientId;
  const contactPerson = participants.find((item) => item.id === recipientId);
  const selectedContact = !conversation
    ? contacts.find((item) => item.participantId === recipientId)
    : undefined;
  const canAttach =
    conversation?.allowAttachments ?? selectedContact?.allowAttachments ?? allowAttachments;
  const activeEmojiPack = emojiPack.slice(0, MAX_EMOJI);
  const conversationMessages =
    recipientId && !conversation ? [] : (conversation?.messages ?? messages);
  const unreadBoundaryId = conversation ? conversation.firstUnreadMessageId : firstUnreadMessageId;
  const threadRootId = activeThreadId;
  const threadRoot = conversationMessages.find((item) => item.id === threadRootId);
  const threadReplyCount =
    threadRoot?.replyCount ??
    (threadRoot?.olderReplies?.hasMore ? null : (threadRoot?.replies?.length ?? 0));
  const threadRootPreview =
    threadRoot?.text ??
    threadRoot?.exportText ??
    (threadRoot?.attachments?.[0] ? 'Attachment: ' + threadRoot.attachments[0].name : '');
  const visibleMessages =
    currentView === 'thread'
      ? threadRoot
        ? [threadRoot, ...(threadRoot.replies ?? [])]
        : []
      : conversationMessages;
  const activeOlderHistory =
    currentView === 'thread'
      ? threadRoot?.olderReplies
      : recipientId && !conversation
        ? undefined
        : conversation
          ? conversation.olderHistory
          : olderHistory;
  const olderLoading = Boolean(activeOlderHistory?.loading);
  const canCopy = showCopyAction && (currentView === 'conversation' || currentView === 'thread');
  const historyControl = activeOlderHistory ? <ChatHistory {...activeOlderHistory} /> : null;
  return (
    <ChatWindow
      id={id}
      title={
        currentView === 'thread'
          ? 'Thread'
          : currentView === 'contacts'
            ? 'New message'
            : (conversation?.title ?? contactPerson?.name ?? title)
      }
      view={currentView}
      status={
        currentView === 'thread'
          ? `In ${conversation?.title ?? title}`
          : currentView === 'conversation'
            ? status
            : undefined
      }
      showBack={
        currentView === 'thread' ||
        currentView === 'contacts' ||
        (currentView === 'conversation' && conversations.length > 0)
      }
      showNewMessage={contacts.length > 0 && currentView === 'inbox'}
      showCopyAction={canCopy}
      conversationId={conversation?.id}
      conversationActions={
        currentView === 'conversation' || currentView === 'thread'
          ? conversation?.actions
          : undefined
      }
      actions={actions}
      summaryProps={summaryProps}
      side={side}
      align={align}
      defaultOpen={defaultOpen}
      className={className}
    >
      {(currentView === 'conversation' || currentView === 'thread') && conversationContext && (
        <ChatContext {...conversationContext} />
      )}
      {currentView === 'thread' && threadRoot && (
        <Callout
          as="aside"
          big={false}
          strokeColor="primary"
          backgroundColor="surface-2"
          textColor="ink"
          className="usx-chat__context"
          aria-label="Thread context"
        >
          <div className="usx-chat__context-copy">
            <strong>Replying to {nameOf(threadRoot.senderId, participants)}</strong>
            {threadRootPreview && <span>{threadRootPreview}</span>}
          </div>
        </Callout>
      )}
      <ChatDirectory
        id={`${id}-directory`}
        view={currentView}
        conversations={conversations}
        contacts={contacts}
        participants={participants}
        currentUserId={currentUserId}
        selectable={currentView === 'contacts'}
        recipientIds={recipientIds}
        formId={`${id}-composer`}
        disabled={disabled}
      />
      {currentView === 'contacts' && (
        <ChatComposer
          id={id}
          formAction={formAction}
          requireRecipients
          disabled={disabled}
          allowAttachments={allowAttachments}
          allowFormatting={allowFormatting}
          accept={accept}
          emojiPack={activeEmojiPack}
        />
      )}
      {(currentView === 'conversation' || currentView === 'thread') && (
        <>
          <ol
            className="usx-chat__messages"
            role="log"
            aria-label={currentView === 'thread' ? 'Thread messages' : 'Conversation'}
            aria-live="polite"
            aria-relevant="additions text"
            aria-busy={olderLoading}
            tabIndex={0}
            data-usx-chat-older-cursor={activeOlderHistory?.cursor}
            data-usx-chat-conversation-id={conversationId}
            data-usx-chat-thread-id={currentView === 'thread' ? threadRootId : undefined}
          >
            {currentView !== 'thread' && historyControl}
            {visibleMessages.length === 0 && (
              <li className="usx-chat__empty">
                {currentView === 'thread' ? 'Thread unavailable.' : emptyText}
              </li>
            )}
            {currentView === 'thread' && threadRoot && (
              <li className="usx-chat__thread-label" role="separator">
                Original message
              </li>
            )}
            {visibleMessages.map((message, index) => {
              const participant = participants.find((item) => item.id === message.senderId);
              const unconfirmed = Boolean(message.deliveryState);
              const previous = visibleMessages[index - 1];
              const next = visibleMessages[index + 1];
              const starts =
                (currentView === 'thread' && index === 1) ||
                unconfirmed ||
                Boolean(previous?.deliveryState) ||
                !sameGroup(previous, message, groupWindowMinutes);
              const ends =
                (currentView === 'thread' && index === 0) ||
                unconfirmed ||
                Boolean(next?.deliveryState) ||
                !sameGroup(message, next, groupWindowMinutes);
              const position = unconfirmed
                ? 'single'
                : currentView === 'thread' && index < 2
                  ? starts
                    ? ends
                      ? 'single'
                      : 'first'
                    : ends
                      ? 'last'
                      : 'middle'
                  : (message.groupPosition ??
                    (starts ? (ends ? 'single' : 'first') : ends ? 'last' : 'middle'));
              return (
                <React.Fragment key={message.id}>
                  {currentView === 'conversation' && message.id === unreadBoundaryId && (
                    <li className="usx-chat__unread-divider" role="separator">
                      <span>Unread messages</span>
                    </li>
                  )}
                  <ChatMessage
                    id={id}
                    message={{
                      ...message,
                      groupPosition: position,
                      actions: resolveChatMessageActions(
                        message,
                        currentUserId,
                        participant,
                        conversation,
                        messageActions
                      ),
                    }}
                    participant={participant}
                    own={message.senderId === currentUserId}
                    isThread={currentView === 'thread'}
                    allowThreads={conversation?.allowThreads ?? allowThreads}
                    allowForward={contacts.length > 0}
                    showCopyMessageAction={showCopyMessageAction}
                    reactionOptions={reactionOptions ?? activeEmojiPack}
                    disabled={disabled}
                  />
                  {currentView === 'thread' && index === 0 && historyControl}
                  {currentView === 'thread' && index === 0 && (
                    <li className="usx-chat__thread-divider" role="separator">
                      <span>
                        {threadReplyCount === null
                          ? 'Replies'
                          : threadReplyCount === 1
                            ? '1 reply'
                            : `${threadReplyCount} replies`}
                      </span>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
            {typingIds.length > 0 && (
              <li className="usx-chat__typing" role="status" aria-live="polite">
                <AvatarGroup
                  overlap
                  avatarProps={typingIds.map((personId) =>
                    chatAvatarProps(
                      participants.find((item) => item.id === personId),
                      nameOf(personId, participants)
                    )
                  )}
                />
                <span>
                  {typingIds.map((personId) => nameOf(personId, participants)).join(', ')}{' '}
                  {typingIds.length === 1 ? 'is' : 'are'} typing
                </span>
                <span className="usx-chat__typing-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </li>
            )}
            <ChatControls
              suggestedQuestions={suggestedQuestions}
              choices={choices}
              choicePrompt={choicePrompt}
              disabled={disabled}
            >
              {children}
            </ChatControls>
          </ol>
          {(currentView !== 'thread' || threadRoot) && (
            <ChatComposer
              id={id}
              formAction={formAction}
              disabled={disabled}
              allowAttachments={canAttach}
              allowFormatting={allowFormatting}
              accept={accept}
              emojiPack={activeEmojiPack}
              isThread={currentView === 'thread'}
              conversationId={conversationId}
              recipientId={selectedRecipientId}
              threadRootId={threadRootId}
            />
          )}
        </>
      )}
    </ChatWindow>
  );
}
