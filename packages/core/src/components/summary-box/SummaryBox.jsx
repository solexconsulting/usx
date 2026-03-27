import React from 'react';
import PropTypes from 'prop-types';
import './summary-box.scss';

export default function SummaryBox({ children = null, className = '', ...props }) {
  const classes = ['usx-summary-box', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'SummaryBox'}
    </div>
  );
}

SummaryBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};