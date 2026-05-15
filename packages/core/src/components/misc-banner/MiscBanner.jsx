import React, { useId } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import './misc-banner.scss';

export default function MiscBanner({
  children = null,
  className = '',
  tone = 'beta',
  badgeText = 'beta',
  message = 'Welcome to the beta website!',
  casualLinkText = 'Learn more',
  casualLinkHref = 'https://usx.solex.studio/',
  showLearnMore = true,
  importantLinkText = 'Return to Classic Site',
  importantLinkHref = 'https://usx.solex.studio/',
  importantLinkIcon = 'undo',
  showReturnLink = true,
  ...props
}) {
  const menuId = useId();
  const toggleId = useId();
  const classes = ['usx-misc-banner', `bg-${tone}`, className].filter(Boolean).join(' ');
  const mobileLinks = [];
  const hasLearnMoreLink = showLearnMore && Boolean(casualLinkText);
  const hasReturnLink = showReturnLink && Boolean(importantLinkText);

  if (hasLearnMoreLink) {
    mobileLinks.push({
      href: casualLinkHref,
      text: casualLinkText,
    });
  }

  if (hasReturnLink) {
    mobileLinks.push({
      href: importantLinkHref,
      text: importantLinkText,
    });
  }

  const content = children || (
    <>
      <strong className={`usx-misc-banner__badge text-${tone}`}>{badgeText}</strong>
      <p className="usx-misc-banner__text">
        {message}
        {hasLearnMoreLink ? (
          <>
            {' '}
            <a className="usa-link usx-misc-banner__link" href={casualLinkHref}>{casualLinkText}</a>
          </>
        ) : null}
      </p>
      {hasReturnLink ? (
        <span className="usx-misc-banner__return-text">
          <a className="usa-link usx-misc-banner__link" href={importantLinkHref}>
            <Icon name={importantLinkIcon} size={1} className="usx-icon--size-1" />
            {' '}
            {importantLinkText}
          </a>
        </span>
      ) : null}
      {mobileLinks.length ? (
        <div className="usx-misc-banner__dropdown">
          <input
            id={toggleId}
            type="checkbox"
            className="usx-misc-banner__dropdown-toggle"
          />
          <label
            className="usx-misc-banner__dropdown-button"
            htmlFor={toggleId}
            aria-controls={menuId}
            aria-label="Toggle banner links"
          >
            <Icon name="expand_more" size={4} className="usx-icon" />
          </label>
          <div id={menuId} className="usx-misc-banner__dropdown-content">
            <ul className="usa-list">
              {mobileLinks.map((link) => (
                <li key={`${link.href}-${link.text}`} className="usa-list__item">
                  <a className="usa-link usx-misc-banner__link" href={link.href}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
  tone: PropTypes.oneOf(['base', 'primary', 'beta', 'dev', 'test']),
  badgeText: PropTypes.string,
  message: PropTypes.string,
  casualLinkText: PropTypes.string,
  casualLinkHref: PropTypes.string,
  showLearnMore: PropTypes.bool,
  importantLinkText: PropTypes.string,
  importantLinkHref: PropTypes.string,
  importantLinkIcon: PropTypes.string,
  showReturnLink: PropTypes.bool,
};
