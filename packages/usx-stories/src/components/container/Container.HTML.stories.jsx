import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/container/container.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/container/container.django-snapshot.html?raw';

export default {
  title: 'HTML/USX/Container',
  tags: ['USX', 'autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="padding-2 tablet:padding-3">
        <Story />
      </div>
    ),
  ],
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
};
