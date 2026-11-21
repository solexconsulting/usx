import React from 'react';
import { expect } from 'storybook/test';
import react from '../../../../../../usx-react/src/components/chat-bubble/chat-bubble.react-snapshot.html?raw';
import django from '../../../../../../usx-react/src/components/chat-bubble/chat-bubble.django-snapshot.html?raw';
import popover from '@solexllc/usx/js/popover';
export default { title: 'HTML/USX/Chat/Bubble' };
const play = async ({ canvasElement }) => {
  popover.init(canvasElement);
  await expect(canvasElement.querySelectorAll('.site-preview-heading')).toHaveLength(5);

  await expect(canvasElement.querySelector('.usx-chat__bubble strong')).toHaveTextContent(
    'Bring with you:'
  );
  await expect(canvasElement.querySelector('.usx-chat__attachments a')).toHaveAttribute('download');
  const attachments = canvasElement.querySelector('.usx-chat__attachments');
  await expect(getComputedStyle(attachments).paddingInlineStart).toBe('0px');
  const buttons = canvasElement.querySelector('.usx-chat__bubble .usa-button-group');
  await expect(getComputedStyle(buttons).paddingInlineStart).toBe('0px');
  const bubble = buttons.closest('.usx-chat__bubble');
  bubble.style.inlineSize = '16rem';
  await expect(bubble.scrollWidth).toBeLessThanOrEqual(bubble.clientWidth);
  bubble.style.removeProperty('inline-size');
  await expect(canvasElement.querySelector('[data-usx-chat-reaction]')).toHaveAttribute(
    'aria-pressed',
    'true'
  );
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
