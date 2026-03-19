import React from 'react';
import alertHtml from '../components/alert/alert.html?raw';

export default {
  title: 'HTML/Alert',
  tags: ['autodocs']
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: alertHtml
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: alertHtml }} />;
  }
}

export const AllVariantsDarkTheme = {
  parameters: {
    docs: {
      source: {
        code: alertHtml
      }
    }
  },
  render: () => {
    return <div className="theme-dark" dangerouslySetInnerHTML={{ __html: alertHtml }} />;
  }
}

