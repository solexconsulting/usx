import React, { useState } from 'react';
import Icon from '../icon/Icon';
import ClassNames from 'classnames';
import './banner.scss';

export interface BannerProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  ariaLabel?: string;
  tld?: string;
  bannerText?: string;
  bannerActionText?: string;
  domainHeading?: string;
  domainText?: string;
  httpsHeading?: string;
  httpsText?: React.ReactNode;
  className?: string;
}

export default function Banner({
  id = 'gov-banner',
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
}: BannerProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

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
                src={((typeof window !== 'undefined' && (window as any).usxBaseUrl) || '/') + 'img/us_flag_small.png'}
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
        <div
          className="usa-banner__content usa-accordion__content"
          hidden={!expanded}
        >
          <div className="grid-row grid-gap-lg">
            <div className="usa-banner__guidance tablet:grid-col-6">
              <p>
                <strong>{domainHeading}</strong>
                <br />
                {domainText}
              </p>
            </div>
            <div className="usa-banner__guidance tablet:grid-col-6">
              <p>
                <strong>{httpsHeading}</strong>
                <br />
                {httpsText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
