import React from 'react';
import html from '../../../../core/src/components/avatar-group/avatar-group.html?raw';

export default {
  title: 'HTML/USX/AvatarGroup',
  tags: ['USX', 'autodocs'],
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
