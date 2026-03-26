import React from 'react';
import './language-selector.scss';

export default function LanguageSelector({ children = null, className = '', ...props }) {
  const classes = ['usx-language-selector', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'LanguageSelector'}
    </div>
  );
}
