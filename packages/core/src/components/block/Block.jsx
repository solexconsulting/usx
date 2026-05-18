import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import Attribution from '../attribution/Attribution';
import './block.scss';

export default function Block({
  variant = null,
  indent = null,
  dedent = false,
  big = false,
  quote = false,
  color = null,
  contentClassName = '',
  attribution = null,
  children = null,
  className = '',
  ...props
}) {
  const isCallout = variant === 'callout';

  const classes = classNames(
    'usx-block',
    variant && `usx-block--${variant}`,
    dedent && 'usx-block--dedent',
    indent && `usx-block--indent-${indent}`,
    big && 'usx-block--big',
    quote && !isCallout && 'display-flex flex-row',
    isCallout && color && `usx-border-${color}`,
    className,
  );

  const contentClasses = classNames(
    'usx-block__content',
    !isCallout && color && `usx-border-${color}`,
    contentClassName,
  );

  const attributionNode = attribution ? (
    <div className="usx-block__attribution">
      <Attribution {...attribution} />
    </div>
  ) : null;

  if (quote && !isCallout) {
    return (
      <div className={classes} {...props}>
        <Icon name="format_quote" size={4} className="usx-block__open-quote-icon" />
        <div className={contentClasses}>
          {children}
          {attributionNode}
        </div>
      </div>
    );
  }

  return (
    <div className={classes} {...props}>
      <div className={contentClasses}>
        {children}
      </div>
      {attributionNode}
    </div>
  );
}

Block.propTypes = {
  variant: PropTypes.oneOf([null, 'callout']),
  indent: PropTypes.oneOf([null, 'sm', 'md', 'lg', 'xl']),
  dedent: PropTypes.bool,
  big: PropTypes.bool,
  quote: PropTypes.bool,
  color: PropTypes.string,
  contentClassName: PropTypes.string,
  attribution: PropTypes.shape({
    avatar: PropTypes.shape({
      href: PropTypes.string,
      src: PropTypes.string,
      alt: PropTypes.string,
      initials: PropTypes.string,
      shape: PropTypes.oneOf([null, 'circle', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl']),
      tooltip: PropTypes.string,
      className: PropTypes.string,
      imageClassName: PropTypes.string,
      initialsClassName: PropTypes.string,
    }),
    media: PropTypes.node,
    primary: PropTypes.node,
    secondary: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
  }),
  children: PropTypes.node,
  className: PropTypes.string,
};
