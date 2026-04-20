import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import ClassNames from 'classnames';
import './banner.scss';

Banner.propTypes = {
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  tld: PropTypes.string,
  bannerText: PropTypes.string,
  bannerActionText: PropTypes.string,
  domainHeading: PropTypes.string,
  domainText: PropTypes.string,
  httpsHeading: PropTypes.string,
  httpsText: PropTypes.node,
  className: PropTypes.string,
};

export default function Banner({
  id = 'gov-banner',
  // lang = 'en',  <-- TODO: Not implemented
  ariaLabel = 'Official government website',
  tld = '.gov',
  bannerText = 'An official website of the United States government',
  bannerActionText = "Here's how you know",
  domainHeading = `Official websites use ${tld}`,
  domainText = `A ${tld} website belongs to an official government organization in the United States.`,
  httpsHeading = `Secure ${tld} websites use HTTPS`,
  httpsText = (
    <>
      A <strong>lock</strong> (<Icon name="lock" size={1} />) or <strong>https://</strong> means
      you’ve safely connected to the {tld} website. Share sensitive information only on official, secure websites.
    </>
  ),
  className = '',
  ...props
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  }

  const classes = ClassNames(
    'usa-banner',
    'usx-banner',
    className
  );
  return (
    <section id={id} className={classes} aria-label={ariaLabel} {...props}>
      <div id={`${id}-accordion`} className="usa-accordion">
        <header className="usa-banner__header">
          <div className="usa-banner__inner">
            <div className="grid-col-auto">
              <img
                aria-hidden="true"
                className="usa-banner__header-flag"
                src={((typeof window !== 'undefined' && window.usxBaseUrl) || '/') + 'img/us_flag_small.png'}
                alt=""
              />
            </div>
            <div
              className="grid-col-fill tablet:grid-col-auto"
              aria-hidden="true"
            >
              <p className="usa-banner__header-text">
                {bannerText}
              </p>
              <p className="usa-banner__header-action">{bannerActionText}</p>
            </div>
            <button
              type="button"
              className="usa-accordion__button usa-banner__button"
              aria-expanded={expanded}
              onClick={toggleExpanded}
            >
              <span className="usa-banner__button-text">{bannerActionText}</span>
            </button>
          </div>
        </header>
        {expanded && (
          <div
            className="usa-banner__content usa-accordion__content"
            id={`${id}-content`}
          >
            <div className="grid-row grid-gap-lg">
              <div className="usa-banner__guidance tablet:grid-col-6">
                <img
                  className="usa-banner__icon usa-media-block__img"
                  src={((typeof window !== 'undefined' && window.usxBaseUrl) || '/') + 'img/icon-dot-gov.svg'}
                  role="img"
                  alt=""
                  aria-hidden="true"
                />
                <div className="usa-media-block__body">
                  <p>
                    <strong>{domainHeading}</strong><br/>
                    {domainText}
                  </p>
                </div>
              </div>
              <div className="usa-banner__guidance tablet:grid-col-6">
                <img
                  className="usa-banner__icon usa-media-block__img"
                  src={((typeof window !== 'undefined' && window.usxBaseUrl) || '/') + 'img/icon-https.svg'}
                  role="img"
                  alt=""
                  aria-hidden="true"
                />
                <div className="usa-media-block__body">
                  <p>
                    <strong>{httpsHeading}</strong><br/>
                    {httpsText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


