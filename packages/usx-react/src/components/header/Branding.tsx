import React from 'react';
import Image from '../image/Image';
import ClassNames from 'classnames';
import { getAssetUrl } from '../../assets';

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
  symbolInverse?: string;
  alt?: string;
  logo?: string | BrandingLogo;
  logoInverse?: string | BrandingLogo;
}

export interface BrandingProps extends React.HTMLAttributes<HTMLDivElement> {
  branding: BrandingConfig;
  projectUrl?: string;
  staticBaseUrl?: string;
  className?: string;
}

function BrandingContent({ config, projectUrl, staticBaseUrl }: { config: BrandingConfig; projectUrl?: string; staticBaseUrl?: string }) {
  const { title, symbol, symbolInverse, logo, logoInverse, alt } = config;
  const label = alt ?? title ?? '';

  if (logo) {
    const Wrapper: React.ElementType = projectUrl ? 'a' : 'div';

    return (
      <Wrapper
        {...(projectUrl ? { href: projectUrl } : {})}
        className="usx-image usx-logo__image"
      >
        <Image src={logo} alt={label} staticBaseUrl={staticBaseUrl} className="usx-logo__variant" />
        {logoInverse && (
          <Image
            src={logoInverse}
            staticBaseUrl={staticBaseUrl}
            alt={label}
            className="usx-logo__variant usx-logo__variant--inverse"
          />
        )}
      </Wrapper>
    );
  }

  return (
    <em className="usa-logo__text">
      {symbol && (
        <img src={getAssetUrl(symbol, staticBaseUrl)} alt="" aria-hidden="true" className="usx-logo__symbol usx-logo__variant" />
      )}
      {symbolInverse && (
        <img
          src={getAssetUrl(symbolInverse, staticBaseUrl)}
          alt=""
          aria-hidden="true"
          className="usx-logo__symbol usx-logo__variant usx-logo__variant--inverse"
        />
      )}
      {title && (
        projectUrl
          ? <a href={projectUrl} className="usx-logo__title">{title}</a>
          : <span className="usx-logo__title">{title}</span>
      )}
    </em>
  );
}

export default function Branding({ branding, projectUrl = '/', staticBaseUrl, className = '', ...props }: BrandingProps) {
  if (!branding) return null;

  const classes = ClassNames(
    'usa-logo',
    'usx-logo',
    className
  );

  return (
    <div className={classes} {...props}>
      <BrandingContent config={branding} projectUrl={projectUrl} staticBaseUrl={staticBaseUrl} />
    </div>
  );
}

export const brandingShape = {
  title: 'string',
  symbol: 'string',
  symbolInverse: 'string',
  alt: 'string',
  logo: 'string|object',
  logoInverse: 'string|object',
};
