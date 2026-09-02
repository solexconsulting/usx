import React from 'react';
import html from '../../../../core/src/components/{{kebab}}/{{kebab}}.html?raw';

export default {
  title: 'HTML/USX/{{Name}}',
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
