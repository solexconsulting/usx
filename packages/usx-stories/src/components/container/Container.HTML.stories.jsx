import React from 'react';
import html from '../../../../usx-react/src/components/container/container.html?raw';

export default {
  title: 'HTML/USX/Container',
  tags: ['USX', 'autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="padding-2 tablet:padding-3"><Story /></div>],
};

export const AllVariants = {
  parameters: { docs: { source: { code: html } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: html }} />,
};
