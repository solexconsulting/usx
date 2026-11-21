import React from 'react';
import Button from '../button/Button';
import TagGroup from '../tag-group/TagGroup';
import type { ChatOption } from '../chat/Chat';
export interface ChatControlsProps {
  suggestedQuestions?: ChatOption[];
  choices?: ChatOption[];
  choicePrompt?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
export default function ChatControls({
  suggestedQuestions = [],
  choices = [],
  choicePrompt = 'Choose an answer',
  disabled = false,
  children,
}: ChatControlsProps) {
  return (
    <>
      {' '}
      {(suggestedQuestions.length > 0 || choices.length > 0 || Boolean(children)) && (
        <li className="usx-chat__controls" role="presentation">
          {suggestedQuestions.length > 0 && (
            <TagGroup
              className="usx-chat__quick-replies"
              extraAttributes={{ role: 'group', 'aria-label': 'Suggested questions' }}
            >
              <p>Suggested questions</p>
              {suggestedQuestions.map((option) => (
                <Button
                  key={option.value}
                  variant="unstyled"
                  className="usa-tag usx-tag usx-tag--outline usx-tag--interactive usa-link usx-link usx-no-visited"
                  extraAttributes={{ 'data-usx-chat-suggestion': option.value }}
                  disabled={disabled}
                >
                  {option.label}
                </Button>
              ))}
            </TagGroup>
          )}
          {choices.length > 0 && (
            <TagGroup
              className="usx-chat__choices"
              extraAttributes={{ role: 'group', 'aria-label': choicePrompt }}
            >
              <p>{choicePrompt}</p>
              {choices.map((option) => (
                <Button
                  key={option.value}
                  variant="unstyled"
                  className="usa-tag usx-tag usx-tag--outline usx-tag--interactive usa-link usx-link usx-no-visited"
                  extraAttributes={{ 'data-usx-chat-choice': option.value }}
                  disabled={disabled}
                >
                  {option.label}
                </Button>
              ))}
            </TagGroup>
          )}
          {children}
        </li>
      )}
    </>
  );
}
