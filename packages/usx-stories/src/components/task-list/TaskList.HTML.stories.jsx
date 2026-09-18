import React from 'react';
import html from '../../../../usx-react/src/components/task-list/task-list.html?raw';

export default {
  title: 'HTML/USX/TaskList',
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
