import React from 'react';
import { expect, userEvent } from 'storybook/test';
import react from '../../../../../../usx-react/src/components/chat-window/chat-window.react-snapshot.html?raw';
import django from '../../../../../../usx-react/src/components/chat-window/chat-window.django-snapshot.html?raw';
import popover from '@solexllc/usx/js/popover';
import chat from '@solexllc/usx/js/chat';
export default { title: 'HTML/USX/Chat/Window' };
const play = async ({ canvasElement }) => {
  popover.init(canvasElement);
  chat.init(canvasElement);
  await expect(canvasElement.querySelectorAll('.site-preview-heading')).toHaveLength(4);

  await expect(canvasElement.querySelectorAll('.usx-chat__window')).toHaveLength(4);
  await expect(canvasElement.querySelectorAll('[aria-label="Close chat"]')).toHaveLength(4);
  await expect(canvasElement.querySelector('[data-usx-chat-back]')).toHaveAccessibleName(
    'Back to conversation'
  );
  await expect(canvasElement.querySelector('[data-usx-chat-new]')).toHaveAccessibleName(
    'New message'
  );
  const menu = canvasElement.querySelector('.usx-chat__actions');
  const headerActions = [
    canvasElement.querySelector('[data-usx-chat-back]'),
    canvasElement.querySelector('[data-usx-chat-new]'),
    menu.querySelector('summary'),
    canvasElement.querySelector('.usx-popover__header-close'),
  ];
  const appearance = (element) => {
    const style = getComputedStyle(element);
    return [
      style.width,
      style.height,
      style.padding,
      style.margin,
      style.borderRadius,
      style.color,
      style.backgroundColor,
    ];
  };
  for (const action of headerActions) {
    await expect(action).toHaveClass('usa-button--unstyled', 'usx-popover__header-action');
    await expect(action).not.toHaveClass('usx-button--ghost');
    await expect(getComputedStyle(action).padding).toBe('12px');
    await expect(appearance(action)).toEqual(appearance(headerActions[0]));
    await expect(action.getBoundingClientRect().width).toBe(
      headerActions[0].getBoundingClientRect().width
    );
    await expect(action.getBoundingClientRect().height).toBe(
      headerActions[0].getBoundingClientRect().height
    );
    await expect(action.getBoundingClientRect().width).toBeGreaterThanOrEqual(44);
    await expect(action.getBoundingClientRect().height).toBeGreaterThanOrEqual(44);
  }
  await expect(menu.querySelector('[data-usx-chat-copy]')).toHaveTextContent('Copy conversation');
  const events = [];
  canvasElement.addEventListener('usx:chat-directory-action', (event) => events.push(event.detail));
  await userEvent.click(menu.querySelector('summary'));
  await userEvent.click(menu.querySelector('[data-usx-chat-directory-action="leave-group"]'));
  await expect(events).toEqual([{ actionId: 'leave-group', conversationId: 'support' }]);
  await expect(menu).not.toHaveAttribute('open');
  await expect(menu.querySelector('summary')).toHaveFocus();
  const disabled = menu.querySelector('[data-usx-chat-directory-action="delete-history"]');
  await expect(disabled).toBeDisabled();
  disabled.click();
  await expect(events).toHaveLength(1);
  const close = canvasElement.querySelector('[aria-label="Close chat"]');
  const details = close.closest('details');
  await userEvent.click(close);
  await expect(details).not.toHaveAttribute('open');
  await expect(details.querySelector('summary')).toHaveFocus();
  await userEvent.click(details.querySelector('summary'));
  await expect(details).toHaveAttribute('open');
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
