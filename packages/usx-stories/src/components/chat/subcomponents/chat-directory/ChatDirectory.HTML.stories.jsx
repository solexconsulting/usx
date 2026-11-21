import React from 'react';
import { expect, userEvent } from 'storybook/test';
import chat from '@solexllc/usx/js/chat';
import popover from '@solexllc/usx/js/popover';
import { sectionFor } from '../../../../utils/playHelpers.js';
import react from '../../../../../../usx-react/src/components/chat-directory/chat-directory.react-snapshot.html?raw';
import django from '../../../../../../usx-react/src/components/chat-directory/chat-directory.django-snapshot.html?raw';
export default { title: 'HTML/USX/Chat/Directory' };
const play = async ({ canvasElement }) => {
  await expect(canvasElement.querySelectorAll('.site-preview-heading')).toHaveLength(7);
  chat.init(canvasElement);
  popover.init(canvasElement);
  const contextual = sectionFor(canvasElement, 'Contextual Inbox');
  const rows = contextual.querySelectorAll('.usx-chat__directory-item');
  for (const row of rows) {
    await expect(row).toHaveClass('usx-clickable');
    await expect(row.querySelectorAll('a, button')).toHaveLength(0);
    await expect(row.querySelector('.usx-chat__directory-copy .usa-sr-only')).toBeNull();
  }
  const opener = contextual.querySelector('[data-usx-chat-conversation="request"]');
  await expect(opener.tagName).toBe('BUTTON');
  await expect(opener).toHaveAccessibleName(/Support.*Access request/);
  const navigation = [];
  contextual.addEventListener('usx:chat-navigate', (event) => navigation.push(event.detail));
  opener.querySelector('.usx-chat__directory-subtitle').click();
  opener.focus();
  await userEvent.keyboard('{Enter}');
  await userEvent.keyboard(' ');
  await expect(navigation).toEqual(
    Array(3).fill({ view: 'conversation', conversationId: 'request' })
  );
  await expect(rows[1]).toHaveAttribute('href', '#conversation-listing');
  await expect(rows[2]).toHaveTextContent('General questions');
  const actions = sectionFor(canvasElement, 'With Actions');
  const events = [];
  actions.addEventListener('usx:chat-directory-action', (event) => events.push(event.detail));
  await expect(actions.querySelectorAll('.usx-chat__directory-actions')).toHaveLength(2);
  const menu = actions.querySelector('.usx-chat__directory-actions');
  await expect(menu.querySelector('summary')).toHaveAccessibleName(
    'Actions for Application review team'
  );
  await expect(menu.closest('.usx-chat__directory-item')).toBeNull();
  menu.querySelector('summary').click();
  menu.querySelector('[data-usx-chat-directory-action="leave-group"]').click();
  await expect(events).toEqual([{ actionId: 'leave-group', conversationId: 'review-team' }]);
  await expect(menu.querySelector('summary')).toHaveFocus();
  await expect(menu.open).toBe(false);
  const contact = sectionFor(canvasElement, 'Contact Actions');
  let contactAction;
  contact.addEventListener('usx:chat-directory-action', (event) => {
    contactAction = event.detail;
  });
  contact.querySelector('summary').click();
  contact.querySelector('[data-usx-chat-directory-action]').click();
  await expect(contactAction).toEqual({
    actionId: 'delete-history',
    conversationId: 'support',
    participantId: 'agent',
  });
  const picker = sectionFor(canvasElement, 'Recipient Picker');
  const recipients = picker.querySelectorAll('[data-usx-chat-recipient]');
  await expect(recipients[0]).toBeChecked();
  for (const recipient of recipients) {
    const box = recipient.closest('.usa-checkbox.usx-checkbox');
    await expect(box).toHaveClass('usx-chat__directory-item');
    await expect(recipient).toHaveClass('usa-checkbox__input');
    const label = box.querySelector('.usa-checkbox__label');
    await expect(label).toHaveAttribute('for', recipient.id);
    await expect(label.querySelector('.usx-chat__avatar')).not.toBeNull();
  }
  let selection;
  picker.addEventListener('usx:chat-recipients-change', (event) => {
    selection = event.detail;
  });
  recipients[1].click();
  await expect(selection).toEqual({ recipientIds: ['agent', 'specialist'] });
  recipients[0].click();
  await expect(selection).toEqual({ recipientIds: ['specialist'] });
  picker.querySelector(`label[for="${recipients[0].id}"]`).click();
  await expect(selection).toEqual({ recipientIds: ['agent', 'specialist'] });
};
export const AllVariantsReact = {
  name: 'All Variants (React)',
  render: () => <div dangerouslySetInnerHTML={{ __html: react }} />,
  play,
};
export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  render: () => <div dangerouslySetInnerHTML={{ __html: django }} />,
  play,
};
