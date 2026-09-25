import React from 'react';
import Button from '../button/Button';
import Search, { SearchProps } from '../search/Search';

export interface HeroButtonProps {
  href?: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export interface HeroSecondaryContent {
  title?: string;
  paragraph?: string;
  link?: { href: string; text: string } | null;
}

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  callout?: string;
  paragraph?: string;
  button?: HeroButtonProps | null;
  searchProps?: SearchProps | null;
  backgroundImage?: string;
  backgroundPosition?: React.CSSProperties['backgroundPosition'];
  contentPosition?: 'left' | 'center' | 'right';
  boxed?: boolean;
  calloutMaxWidth?: string;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  secondaryContent?: HeroSecondaryContent | null;
  overlay?: boolean;
  overlayOpacity?: number;
  ariaLabel?: string;
  className?: string;
}

export default function Hero({
  title = '',
  callout = '',
  paragraph = '',
  button = null,
  searchProps = null,
  backgroundImage = '',
  backgroundPosition,
  contentPosition = 'left',
  boxed = true,
  calloutMaxWidth,
  headingLevel = 'h1',
  secondaryContent = null,
  overlay = true,
  overlayOpacity,
  ariaLabel = 'Introduction',
  className = '',
  style,
  ...props
}: HeroProps) {
  const Heading = headingLevel;
  const secondaryHeadings = { h1: 'h2', h2: 'h3', h3: 'h4', h4: 'h5', h5: 'h6' } as const;
  const SecondaryHeading = secondaryHeadings[headingLevel];
  const classes = [
    'usx-hero',
    overlay && 'usx-hero--has-overlay',
    overlayOpacity !== undefined && 'usx-hero--custom-overlay',
    contentPosition !== 'left' && `usx-hero--content-${contentPosition}`,
    !boxed && 'usx-hero--unboxed',
    secondaryContent && 'usx-hero--split',
    className,
  ].filter(Boolean).join(' ');

  const heroStyle: React.CSSProperties & { '--hero-overlay-opacity'?: number } = {
    ...(backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : {}),
    ...(backgroundPosition ? { backgroundPosition } : {}),
    ...(overlayOpacity !== undefined ? { '--hero-overlay-opacity': Math.min(1, Math.max(0, overlayOpacity)) } : {}),
    ...style,
  };

  return (
    <section className={classes} aria-label={ariaLabel} style={heroStyle} {...props}>
      <div className="usx-hero__inner">
        <div className="usx-hero__callout" style={calloutMaxWidth ? { maxWidth: calloutMaxWidth } : undefined}>
          <Heading className="usx-hero__heading">
            {callout && <span className="usx-hero__heading--alt">{callout}</span>}
            {title}
          </Heading>
          {paragraph && <p className="usx-hero__paragraph">{paragraph}</p>}
          {searchProps && <Search {...searchProps} />}
          {!searchProps && button && (
            <Button variant="primary" href={button.href} onClick={button.onClick}>
              {button.text}
            </Button>
          )}
        </div>
        {secondaryContent && (
          <div className="usx-hero__secondary">
            {secondaryContent.title && <SecondaryHeading className="usx-hero__secondary-heading">{secondaryContent.title}</SecondaryHeading>}
            {secondaryContent.paragraph && <p className="usx-hero__paragraph">{secondaryContent.paragraph}</p>}
            {secondaryContent.link && (
              <a className="usx-hero__secondary-link" href={secondaryContent.link.href}>
                {secondaryContent.link.text}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
