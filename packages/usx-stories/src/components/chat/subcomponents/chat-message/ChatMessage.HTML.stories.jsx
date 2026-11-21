import React from 'react';
import { expect, userEvent } from 'storybook/test';
import react from '../../../../../../usx-react/src/components/chat-message/chat-message.react-snapshot.html?raw';
import django from '../../../../../../usx-react/src/components/chat-message/chat-message.django-snapshot.html?raw';
import popover from '@solexllc/usx/js/popover';
export default { title: 'HTML/USX/Chat/Message' };
const play = async ({ canvasElement }) => {
  popover.init(canvasElement);
  await expect(canvasElement.querySelectorAll('.site-preview-heading')).toHaveLength(8);

  await expect(canvasElement.querySelectorAll('.usx-chat__message')).toHaveLength(11);
  for (const id of ['short', 'short-own']) {
    const message = canvasElement.querySelector(`[data-message-id="${id}"]`);
    const bar = message.querySelector('.usx-chat__message-tools');
    bar.querySelector('summary').focus();
    await expect(getComputedStyle(bar).opacity).toBe('1');
    const bounds = bar.getBoundingClientRect();
    const container = message.getBoundingClientRect();
    await expect(bounds.left).toBeGreaterThanOrEqual(container.left);
    await expect(bounds.right).toBeLessThanOrEqual(container.right);
    const bubble = message.querySelector('.usx-chat__bubble').getBoundingClientRect();
    await expect(Math.abs(bounds.right - bubble.right)).toBeLessThan(1);
    await expect(bounds.left).toBeGreaterThanOrEqual(bubble.left);
  }
  const first = canvasElement.querySelector('.usx-chat__message--first');
  const middle = canvasElement.querySelector('.usx-chat__message--middle');
  const last = canvasElement.querySelector('.usx-chat__message--last');
  await expect(first.querySelector('.usx-chat__sender')).toHaveTextContent('Avery');
  await expect(middle.querySelector('.usx-chat__sender')).toBeNull();
  await expect(last.querySelector('.usx-chat__time')).not.toHaveClass('usa-sr-only');
  await expect(
    canvasElement.querySelector('.usx-chat__message--failed [data-usx-chat-retry]')
  ).toHaveAccessibleName('Retry sending message');
  const outgoingAvatar = canvasElement.querySelector(
    '.usx-chat__message--own .usx-avatar__content'
  );
  await expect(outgoingAvatar).toHaveClass('bg-base-light', 'text-base-dark');
  await expect(outgoingAvatar).not.toHaveClass('bg-primary-light', 'text-inverse');
  const tools = canvasElement.querySelector('.usx-chat__message-tools');
  const trigger = tools.querySelector('summary');
  trigger.focus();
  await expect(trigger).toHaveFocus();
  await expect(getComputedStyle(tools).opacity).toBe('1');
  await userEvent.click(trigger);
  await expect(trigger.parentElement).toHaveAttribute('open');
  tools.querySelector('[data-usx-chat-reaction]').focus();
  await userEvent.keyboard('{Escape}');
  await expect(trigger.parentElement).not.toHaveAttribute('open');
  await expect(trigger).toHaveFocus();
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
