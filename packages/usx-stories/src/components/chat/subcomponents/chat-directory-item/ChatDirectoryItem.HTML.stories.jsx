import React from 'react';
import { expect, userEvent } from 'storybook/test';
import chat from '@solexllc/usx/js/chat';
import popover from '@solexllc/usx/js/popover';
import { sectionFor } from '../../../../utils/playHelpers.js';
import react from '../../../../../../usx-react/src/components/chat-directory-item/chat-directory-item.react-snapshot.html?raw';
import django from '../../../../../../usx-react/src/components/chat-directory-item/chat-directory-item.django-snapshot.html?raw';
export default { title: 'HTML/USX/Chat/Directory Item' };
const play = async ({ canvasElement }) => {
  chat.init(canvasElement);
  popover.init(canvasElement);
  const inbox = sectionFor(canvasElement, 'Default');
  const row = inbox.querySelector('.usx-chat__directory-item');
  await expect(row.tagName).toBe('BUTTON');
  await expect(row).toHaveAccessibleName(/Jordan Lee.*Three design books.*I can bundle all three/);
  await expect(row.querySelectorAll('a, button, strong')).toHaveLength(0);
  const navigation = [];
  inbox.addEventListener('usx:chat-navigate', (event) => navigation.push(event.detail));
  row.focus();
  await userEvent.keyboard('{Enter}');
  await userEvent.keyboard(' ');
  await expect(navigation).toEqual(
    Array(2).fill({ view: 'conversation', conversationId: 'books' })
  );
  const menu = inbox.querySelector('.usx-chat__directory-actions');
  await expect(menu.closest('.usx-chat__directory-item')).toBeNull();
  let action;
  inbox.addEventListener('usx:chat-directory-action', (event) => {
    action = event.detail;
  });
  menu.querySelector('summary').click();
  menu.querySelector('[data-usx-chat-directory-action]').click();
  await expect(action).toEqual({ actionId: 'delete-history', conversationId: 'books' });
  const contact = sectionFor(canvasElement, 'Contact');
  let contactNavigation;
  contact.addEventListener('usx:chat-navigate', (event) => {
    contactNavigation = event.detail;
  });
  contact.querySelector('.usx-chat__directory-item').click();
  await expect(contactNavigation).toEqual({ view: 'conversation', participantId: 'avery' });
  await expect(sectionFor(canvasElement, 'Linked Contact').querySelector('a')).toHaveAttribute(
    'href',
    '#morgan'
  );
  const recipient = sectionFor(canvasElement, 'Recipient');
  const checkbox = recipient.querySelector('input');
  await expect(checkbox).toBeChecked();
  await expect(checkbox).toHaveAccessibleName('Avery Patel');
  await expect(checkbox).toHaveAccessibleDescription('Application support');
  recipient.querySelector('label').click();
  await expect(checkbox).not.toBeChecked();
  await expect(
    sectionFor(canvasElement, 'Group').querySelectorAll('.usx-chat__avatar')
  ).toHaveLength(2);
  const long = sectionFor(canvasElement, 'Long Text');
  for (const selector of ['.usx-chat__directory-title', '.usx-chat__directory-subtitle']) {
    const element = long.querySelector(selector);
    await expect(getComputedStyle(element).whiteSpace).toBe('normal');
    await expect(element.getBoundingClientRect().height).toBeGreaterThan(
      parseFloat(getComputedStyle(element).lineHeight)
    );
  }
  const preview = long.querySelector('.usx-chat__directory-preview');
  await expect(getComputedStyle(preview).textOverflow).toBe('ellipsis');
  await expect(getComputedStyle(preview).whiteSpace).toBe('nowrap');
  await expect(preview.scrollWidth).toBeGreaterThan(preview.clientWidth);
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
