import React from 'react';
import PropTypes from 'prop-types';
import './villain.scss';

export default function Villain({
  title = '',
  callout = '',
  paragraph = '',
  button = null,
  ariaLabel = 'Introduction',
  className = '',
  ...props
}) {
  const classes = ['usa-hero', className].filter(Boolean).join(' ');
  return (
    <section className={classes} aria-label={ariaLabel} {...props}>
      <div className="grid-container">
        <div className="usa-hero__callout">
          <h1 className="usa-hero__heading">
            {callout && <span className="usa-hero__heading--alt">{callout}</span>}
            {title}
          </h1>
          {paragraph && <p>{paragraph}</p>}
          {button && (
            <a className="usa-button" href={button.href}>
              {button.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

Villain.propTypes = {
  title: PropTypes.string,
  callout: PropTypes.string,
  paragraph: PropTypes.string,
  button: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
  }),
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};