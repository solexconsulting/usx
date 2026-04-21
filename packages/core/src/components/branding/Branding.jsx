import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image/Image';
import './branding.scss';

function BrandingContent({ config, projectUrl }) {
  const { title, symbol, logo, alt } = config;

  if (logo) {
    return (
      <Image
        src={logo}
        alt={alt ?? title ?? ''}
        href={projectUrl}
        className="usx-logo__image"
      />
    );
  }

  return (
    <em className="usa-logo__text">
      {symbol && (
        <img src={symbol} alt="" aria-hidden="true" className="usx-logo__symbol" />
      )}
      {title && (
        projectUrl
          ? <a href={projectUrl} className="usx-logo__title">{title}</a>
          : <span className="usx-logo__title">{title}</span>
      )}
    </em>
  );
}

BrandingContent.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string,
    symbol: PropTypes.string,
    alt: PropTypes.string,
    logo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        fallback: PropTypes.string.isRequired,
        sources: PropTypes.arrayOf(PropTypes.shape({
          srcSet: PropTypes.string.isRequired,
          media: PropTypes.string,
          type: PropTypes.string,
          sizes: PropTypes.string,
        })).isRequired,
      }),
    ]),
  }).isRequired,
  projectUrl: PropTypes.string,
};

export const brandingShape = PropTypes.shape({
  title: PropTypes.string,
  symbol: PropTypes.string,
  alt: PropTypes.string,
  logo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      fallback: PropTypes.string.isRequired,
      sources: PropTypes.arrayOf(PropTypes.shape({
        srcSet: PropTypes.string.isRequired,
        media: PropTypes.string,
        type: PropTypes.string,
        sizes: PropTypes.string,
      })).isRequired,
    }),
  ]),
});

export default function Branding({ branding, projectUrl = '/', className = '', ...props }) {
  if (!branding) return null;
  const classes = ['usa-logo', 'usx-logo', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      <BrandingContent config={branding} projectUrl={projectUrl} />
    </div>
  );
}

Branding.propTypes = {
  branding: brandingShape,
  projectUrl: PropTypes.string,
  className: PropTypes.string,
};
