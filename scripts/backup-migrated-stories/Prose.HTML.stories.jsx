import React from 'react';
import proseHtml from '../components/prose/prose.html?raw';

export default {
  title: 'HTML/Prose',
  tags: ['autodocs']
};

export const SimplePage = {
  parameters: {
    docs: {
      source: {
        code: proseHtml
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: proseHtml }} />;
  }
}
