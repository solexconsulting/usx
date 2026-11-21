import React from 'react';
import { expect } from 'storybook/test';
import react from '../../../../../../usx-react/src/components/chat-controls/chat-controls.react-snapshot.html?raw';
import django from '../../../../../../usx-react/src/components/chat-controls/chat-controls.django-snapshot.html?raw';
import popover from '@solexllc/usx/js/popover';
import chat from '@solexllc/usx/js/chat';
export default { title: 'HTML/USX/Chat/Controls' };
const play = async ({ canvasElement }) => {
  popover.init(canvasElement);
  chat.init(canvasElement);
  await expect(canvasElement.querySelectorAll('.site-preview-heading')).toHaveLength(4);
  await expect(canvasElement.querySelector('.usx-chat__controls a')).toHaveAttribute('download');

  await expect(canvasElement.querySelectorAll('[data-usx-chat-suggestion]')).toHaveLength(2);
  await expect(canvasElement.querySelectorAll('[data-usx-chat-choice]')).toHaveLength(3);
  await expect(canvasElement.querySelector('[data-usx-chat-choice="confirm"]')).toBeDisabled();
  await expect(
    canvasElement.querySelector('[aria-label="Which appointment works for you?"]')
  ).toHaveAttribute('role', 'group');
  for (const [attribute, eventName, value] of [
    ['suggestion', 'usx:chat-option', 'next'],
    ['choice', 'usx:chat-option', 'tuesday'],
  ]) {
    let detail;
    canvasElement.addEventListener(
      eventName,
      (event) => {
        event.preventDefault();
        detail = event.detail;
      },
      { once: true }
    );
    canvasElement.querySelector(`[data-usx-chat-${attribute}="${value}"]`).click();
    await expect(detail).toMatchObject({ value });
  }
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
