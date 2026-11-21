import React from 'react';
import { expect, userEvent } from 'storybook/test';
import react from '../../../../../../usx-react/src/components/chat-message-actions/chat-message-actions.react-snapshot.html?raw';
import django from '../../../../../../usx-react/src/components/chat-message-actions/chat-message-actions.django-snapshot.html?raw';
import popover from '@solexllc/usx/js/popover';
import chat from '@solexllc/usx/js/chat';
export default { title: 'HTML/USX/Chat/Message Actions' };
const play = async ({ canvasElement }) => {
  popover.init(canvasElement);
  chat.init(canvasElement);
  await expect(canvasElement.querySelectorAll('.site-preview-heading')).toHaveLength(3);

  const tools = canvasElement.querySelector('.usx-chat__message-tools');
  await expect(tools).toHaveAccessibleName('Actions for message from Avery');
  await expect(getComputedStyle(tools).opacity).toBe('1');
  const trigger = tools.querySelector('summary');
  await userEvent.click(trigger);
  await expect(trigger.parentElement).toHaveAttribute('open');
  await expect(tools.querySelector('[data-usx-chat-reaction="Helpful"]')).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  tools.querySelector('[data-usx-chat-reaction="Helpful"]').focus();
  await userEvent.keyboard('{Escape}');
  await expect(trigger.parentElement).not.toHaveAttribute('open');
  await expect(trigger).toHaveFocus();
  await expect(
    canvasElement.querySelector('[data-usx-chat-message-action="delete"]')
  ).toBeDisabled();
  const events = [];
  canvasElement.addEventListener('usx:chat-message-action', (event) => events.push(event.detail));
  const report = tools.querySelector('[data-usx-chat-message-action="report"]');
  report.closest('details').querySelector('summary').click();
  report.click();
  await expect(events).toEqual([{ actionId: 'report', messageId: 'm1' }]);
  await expect(
    tools.closest('[data-message-id]').querySelector('.usx-chat__bubble')
  ).toHaveTextContent('Your appointment is confirmed.');
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
