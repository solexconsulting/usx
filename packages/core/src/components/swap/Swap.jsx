import React from 'react';
import PropTypes from 'prop-types';
import './swap.scss';

export default function Swap({
  children = null,
  className = '',
  variant = 'default',
  onContent = 'ON',
  offContent = 'OFF',
  includeInput = true,
  inputProps = {},
  onClassName = '',
  offClassName = '',
  ...props
}) {
  const variantClass = variant !== 'default' ? `usx-swap--${variant}` : '';
  const classes = ['usx-swap', variantClass, className].filter(Boolean).join(' ');
  const onClasses = ['usx-swap-on', onClassName].filter(Boolean).join(' ');
  const offClasses = ['usx-swap-off', offClassName].filter(Boolean).join(' ');

  const content = children || (
    <>
      {includeInput ? <input type="checkbox" autoComplete="off" {...inputProps} /> : null}
      <span className={onClasses}>{onContent}</span>
      <span className={offClasses}>{offContent}</span>
    </>
  );

  return (
    <label className={classes} {...props}>
      {content}
    </label>
  );
}

Swap.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'active', 'rotate', 'flip']),
  onContent: PropTypes.node,
  offContent: PropTypes.node,
  includeInput: PropTypes.bool,
  inputProps: PropTypes.object,
  onClassName: PropTypes.string,
  offClassName: PropTypes.string,
};
