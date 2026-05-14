import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import './misc-banner.scss';

export default function MiscBanner({
  children = null,
  className = '',
  tone = 'beta',
  badgeText = 'beta',
  message = 'Welcome to the beta website!',
  learnMoreText = 'Learn more',
  learnMoreHref = 'https://usx.solex.studio/',
  showLearnMore = true,
  returnText = 'Return to Classic Site',
  returnHref = 'https://usx.solex.studio/',
  returnIcon = 'undo',
  showReturnLink = true,
  ...props
}) {
  const classes = ['usx-misc-banner', `bg-${tone}`, className].filter(Boolean).join(' ');

  const content = children || (
    <>
      <strong className={`usx-misc-banner__badge text-${tone}`}>{badgeText}</strong>
      <p className="usx-misc-banner__text">
        {message}
        {showLearnMore ? (
          <>
            {' '}
            <a className="usa-link usx-misc-banner__link" href={learnMoreHref}>{learnMoreText}</a>
          </>
        ) : null}
      </p>
      {showReturnLink ? (
        <span className="usx-misc-banner__return-text">
          <a className="usa-link usx-misc-banner__link" href={returnHref}>
            <Icon name={returnIcon} size={1} className="usx-icon--size-1" />
            {' '}
            {returnText}
          </a>
        </span>
      ) : null}
    </>
  );

  return (
    <div className={classes} {...props}>
      <div className="usx-misc-banner__content grid-container">
        {content}
      </div>
    </div>
  );
}

MiscBanner.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tone: PropTypes.oneOf(['beta', 'dev', 'test']),
  badgeText: PropTypes.string,
  message: PropTypes.string,
  learnMoreText: PropTypes.string,
  learnMoreHref: PropTypes.string,
  showLearnMore: PropTypes.bool,
  returnText: PropTypes.string,
  returnHref: PropTypes.string,
  returnIcon: PropTypes.string,
  showReturnLink: PropTypes.bool,
};
