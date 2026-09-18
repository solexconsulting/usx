import React from 'react';
import Button from '../button/Button';
import Search, { SearchProps } from '../search/Search';

export interface HeroButtonProps {
  href?: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  callout?: string;
  paragraph?: string;
  button?: HeroButtonProps | null;
  searchProps?: SearchProps | null;
  backgroundImage?: string;
  overlay?: boolean;
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
  overlay = true,
  ariaLabel = 'Introduction',
  className = '',
  ...props
}: HeroProps) {
  const classes = [
    'usx-hero',
    overlay && 'usx-hero--has-overlay',
    className,
  ].filter(Boolean).join(' ');

  const style = backgroundImage
    ? { backgroundImage: `url('${backgroundImage}')` }
    : undefined;

  return (
    <section className={classes} aria-label={ariaLabel} style={style} {...props}>
      <div className="usx-hero__inner">
        <div className="usx-hero__callout">
          <h1 className="usx-hero__heading">
            {callout && <span className="usx-hero__heading--alt">{callout}</span>}
            {title}
          </h1>
          {paragraph && <p className="usx-hero__paragraph">{paragraph}</p>}
          {searchProps && <Search {...searchProps} />}
          {!searchProps && button && (
            <Button variant="primary" href={button.href} onClick={button.onClick}>
              {button.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
