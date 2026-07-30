import React from 'react';
import proseHtml from '../../../../core/src/components/prose/prose.html?raw';

export default {
  title: 'HTML/USWDS/Prose',
  tags: ['USWDS', 'autodocs']
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
