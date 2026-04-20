import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';
import classNames from 'classnames';
import ButtonGroup from '../button-group/ButtonGroup';

export default function Modal({
  id = 'usx-modal',
  heading,
  description,
  actions = [
    { children: 'Continue', variant: 'primary', 'data-close-modal': true },
    { children: 'Go back', variant: 'unstyled', className: 'padding-105 text-center', 'data-close-modal': true },
  ],
  size = 'default',
  forceAction = false,
  className = '',
  children,
  ...props
}) {
  const classes = classNames('usa-modal', 'usx-modal', {
    'usa-modal--lg': size === 'lg',
    'usx-modal--lg-collapsed': size === 'lg-collapsed',
  }, className);

  return (
    <div
      className={classes}
      id={id}
      aria-labelledby={`${id}-heading`}
      aria-describedby={`${id}-description`}
      {...(forceAction ? { 'data-force-action': true } : {})}
      {...props}
    >
      <div className="usa-modal__content">
        <div className="usa-modal__main">
          <h2 className="usa-modal__heading" id={`${id}-heading`}>
            {heading}
          </h2>
          <div className="usa-prose">
            <p id={`${id}-description`}>{children ?? description}</p>
          </div>
          <div className="usa-modal__footer">
            <ButtonGroup items={actions} />
          </div>
        </div>
        {!forceAction && (
          <button
            type="button"
            className="usa-button usa-modal__close"
            aria-label="Close this window"
            data-close-modal
          >
            <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
              <use href={((typeof window !== 'undefined' && window.usxBaseUrl) || '/') + 'img/sprite.svg#close'} />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object),
  size: PropTypes.oneOf(['default', 'lg', 'lg-collapsed']),
  forceAction: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
