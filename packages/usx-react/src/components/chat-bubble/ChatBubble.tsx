import React from 'react';
import ChatAttachments from '../chat-attachments/ChatAttachments';
import ChatFormattedText from './ChatFormattedText';
import Button from '../button/Button';
import TagGroup from '../tag-group/TagGroup';
import type { ChatAttachment as Attachment, ChatReaction } from '../chat/Chat';
export interface ChatBubbleProps {
  text?: string;
  content?: React.ReactNode;
  attachments?: Attachment[];
  reactions?: ChatReaction[];
}
export default function ChatBubble({ text, content, attachments, reactions }: ChatBubbleProps) {
  return (
    <div className="usx-chat__bubble">
      {content ?? (text && <ChatFormattedText text={text} />)}
      <ChatAttachments items={attachments} />
      {reactions?.length ? (
        <TagGroup
          className="usx-chat__reactions"
          extraAttributes={{ role: 'group', 'aria-label': 'Reactions' }}
        >
          {reactions.map((reaction) => (
            <Button
              key={reaction.label}
              variant="unstyled"
              className="usa-tag usx-tag usx-tag--outline usx-tag--interactive usa-link usx-link usx-no-visited usx-chat__reaction"
              extraAttributes={{ 'data-usx-chat-reaction': reaction.label }}
              aria-pressed={Boolean(reaction.selected)}
              aria-label={`${reaction.label}, ${reaction.count}`}
            >
              {reaction.emoji} {reaction.count}
            </Button>
          ))}
        </TagGroup>
      ) : null}
    </div>
  );
}
