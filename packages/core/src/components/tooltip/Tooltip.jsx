import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './tooltip.scss';

export default function Tooltip({
  label,
  position = 'top',
  children,
  className = '',
  ...props
}) {
  const validPositions = ['top', 'bottom', 'left', 'right'];
  const normalizedPosition = validPositions.includes(position) ? position : 'top';

  return (
    <span className={classNames('usx-tooltip', className)} {...props}>
      {children}
      <span
        className={`usa-tooltip__body usa-tooltip__body--${normalizedPosition}`}
        role="tooltip"
      >
        {label}
      </span>
    </span>
  );
}

Tooltip.propTypes = {
  label: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  children: PropTypes.node,
  className: PropTypes.string,
};

