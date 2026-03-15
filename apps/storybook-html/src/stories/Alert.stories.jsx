import React from 'react';
import alertHtml from '../../../../packages/core/src/components/alert/alert.html?raw';

export default {
  title: 'Components/Alert',
  tags: ['autodocs']
};

export const Overview = () => <div dangerouslySetInnerHTML={{ __html: alertHtml }} />;
