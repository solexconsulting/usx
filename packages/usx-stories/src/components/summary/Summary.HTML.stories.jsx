import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/summary/summary.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/summary/summary.django-snapshot.html?raw';

export default {
  title: 'HTML/USX/Summary',
  tags: ['USX', 'autodocs'],
};

/** Static snapshot of every React variant. Summary is documented as a child of a details element. */
export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
};

/** Static snapshot of every Django variant. Summary is documented as a child of a details element. */
export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
};
