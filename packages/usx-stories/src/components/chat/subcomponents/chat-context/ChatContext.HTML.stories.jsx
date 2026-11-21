import React from 'react';
import { expect } from 'storybook/test';
import react from '../../../../../../usx-react/src/components/chat-context/chat-context.react-snapshot.html?raw';
import django from '../../../../../../usx-react/src/components/chat-context/chat-context.django-snapshot.html?raw';
export default { title: 'HTML/USX/Chat/Context' };
const play = async ({ canvasElement }) => {
  await expect(canvasElement.querySelectorAll('.site-preview-heading')).toHaveLength(2);
  const link = canvasElement.querySelector('a');
  const target = canvasElement.querySelector(link.getAttribute('href'));
  await expect(target).toHaveTextContent('Your request is awaiting approval');
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
