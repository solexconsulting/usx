import React from 'react';
import html from '../components/{{kebab}}/{{kebab}}.html?raw';

export default {
  title: `HTML/{{Name}}`,
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
