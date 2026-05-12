import React from 'react';
import html from './avatar-group.html?raw';

export default {
  title: 'HTML/AvatarGroup',
  tags: ['autodocs'],
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: html
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
}
