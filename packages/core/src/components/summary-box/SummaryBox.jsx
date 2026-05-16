import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './summary-box.scss';

export default function SummaryBox({
  id = 'summary-box-heading',
  heading,
  content = '',
  children = null,
  className = '',
  ...props
}) {
  const classes = ClassNames('usa-summary-box', 'usx-summary-box', className);
  const headingId = id;
  const bodyContent = children ?? content;

  return (
    <div
      className={classes}
      role="region"
      aria-labelledby={headingId}
      {...props}
    >
      <div className="usa-summary-box__body">
        <h4 className="usa-summary-box__heading" id={headingId}>{heading}</h4>
        <div className="usa-summary-box__text">
          {bodyContent}
        </div>
      </div>
    </div>
  );
}

SummaryBox.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string.isRequired,
  content: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};