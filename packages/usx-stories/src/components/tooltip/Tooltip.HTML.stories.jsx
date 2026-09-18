import React from 'react';
import html from '../../../../usx-react/src/components/tooltip/tooltip.html?raw';

export default {
  title: 'HTML/USWDS-Inspired/Tooltip (CSS-only)',
  tags: ['USWDS-Inspired', 'autodocs'],
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: html
      }
    }
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: html }} />
}
