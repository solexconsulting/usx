import React from 'react';
import { expect } from 'storybook/test';
import chat from '@solexllc/usx/js/chat';
import { sectionFor } from '../../../../utils/playHelpers.js';
import react from '../../../../../../usx-react/src/components/chat-history/chat-history.react-snapshot.html?raw';
import django from '../../../../../../usx-react/src/components/chat-history/chat-history.django-snapshot.html?raw';
export default { title: 'HTML/USX/Chat/History' };
const play = async ({ canvasElement }) => {
  await expect(canvasElement.querySelectorAll('.site-preview-heading')).toHaveLength(4);
  chat.init(canvasElement);
  for (const title of ['Default', 'Error']) {
    const section = sectionFor(canvasElement, title);
    let request;
    section.addEventListener(
      'usx:chat-load-older',
      (event) => {
        request = event.detail;
      },
      { once: true }
    );
    section.querySelector('[data-usx-chat-load-older]').click();
    await expect(request).toMatchObject({ cursor: '6' });
    await expect(section.querySelectorAll('.usx-chat__bubble')).toHaveLength(3);
  }
  await expect(
    sectionFor(canvasElement, 'Loading').querySelector('[data-usx-chat-load-older]')
  ).toBeDisabled();
  await expect(
    sectionFor(canvasElement, 'Beginning').querySelector('[data-usx-chat-load-older]')
  ).toBeNull();
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
