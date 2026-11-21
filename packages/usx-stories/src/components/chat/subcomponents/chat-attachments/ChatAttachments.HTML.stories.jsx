import React from 'react';
import { expect, within } from 'storybook/test';
import react from '../../../../../../usx-react/src/components/chat-attachments/chat-attachments.react-snapshot.html?raw';
import django from '../../../../../../usx-react/src/components/chat-attachments/chat-attachments.django-snapshot.html?raw';

export default { title: 'HTML/USX/Chat/Attachments' };

const play = async ({ canvasElement }) => {
  const list = within(canvasElement).getByRole('list');
  await expect(list.tagName).toBe('UL');
  await expect(list).toHaveClass('usx-chat__attachments');
  await expect(within(list).getAllByRole('listitem')).toHaveLength(4);
  await expect(list.querySelectorAll(':scope > li')).toHaveLength(4);
  await expect(within(list).getByRole('link', { name: 'Notes.txt' })).toHaveAttribute(
    'download',
    'Notes.txt'
  );
  const preview = within(list).getByRole('img', { name: 'Blue bicycle offered for sale' });
  await expect(preview.closest('a')).toHaveAttribute('download', 'Bicycle.svg');
  const pending = within(list).getByText('Document awaiting upload.pdf');
  await expect(pending.closest('li')).not.toBeNull();
  await expect(pending.closest('a')).toBeNull();
  const thumbnail = within(list).getByRole('link', { name: 'Bicycle thumbnail.svg' });
  await expect(thumbnail.querySelector('img')).toHaveAttribute('alt', '');
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
