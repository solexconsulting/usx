# Chat Composer

ChatComposer renders a message form using the same props in React and Django. `value` supplies initial text. `allowAttachments` adds a file input and a slim FileList for files staged to send; the list appears only after a selection and each row has a remove action. `allowFormatting` adds the formatting toggle and panel. Both default to false. `emojiPack` replaces the default emoji choices; an empty array hides the picker. `isThread` changes the reply labels and includes `threadRootId` when supplied.

Import `ChatComposer` from `@solexllc/usx-react/chat` and include the optional [Chat styles](../../../../usx/README.md#optional-chat). Initialize the default exports from `@solexllc/usx/js/chat` and `@solexllc/usx/js/popover`, even when displaying the composer alone. The same enhancement handles either renderer's textarea, file controls, formatting, emoji, and submission. Each file selection is added to the staged files. When files exist, the shared native FileList renderer creates slim rows and a screen-reader-only “Files ready to send” heading. Removing a row also removes its corresponding input file. Listen for `usx:chat-send` on the surrounding Chat or standalone form. The host sends messages and retains drafts. `formAction` enables native form submission.

For a new conversation, supply `recipientIds` or associate ChatDirectory recipient checkboxes with the form ID `${id}-composer`. Enable `requireRecipients` to prevent sends without recipients while allowing users to draft text. Native submissions carry repeated `recipientIds` fields; enhancement sends the same IDs in `usx:chat-send.detail.recipientIds`. The host creates or reuses the conversation. Existing `recipientId` integrations remain supported; `conversationId` identifies an existing conversation.

```tsx
<ChatComposer id="support-composer" value="" allowAttachments allowFormatting />
```

```django
{% chat_composer id='support-composer' allowAttachments=True allowFormatting=True %}{% endchat_composer %}
```
