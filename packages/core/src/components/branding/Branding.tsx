import React from 'react';
import Image from '../image/Image';
import './branding.scss';

export interface BrandingLogoSource {
  srcSet: string;
  media?: string;
  type?: string;
  sizes?: string;
}

export interface BrandingLogo {
  fallback: string;
  sources: BrandingLogoSource[];
}

export interface BrandingConfig {
  title?: string;
  symbol?: string;
  alt?: string;
  logo?: string | BrandingLogo;
}

export interface BrandingProps extends React.HTMLAttributes<HTMLDivElement> {
  branding: BrandingConfig;
  projectUrl?: string;
  className?: string;
}

function BrandingContent({ config, projectUrl }: { config: BrandingConfig; projectUrl?: string }) {
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

export default function Branding({ branding, projectUrl = '/', className = '', ...props }: BrandingProps) {
  if (!branding) return null;
  const classes = ['usa-logo', 'usx-logo', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      <BrandingContent config={branding} projectUrl={projectUrl} />
    </div>
  );
}

export const brandingShape = {
  title: 'string',
  symbol: 'string',
  alt: 'string',
  logo: 'string|object',
};
