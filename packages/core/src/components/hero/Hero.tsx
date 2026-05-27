import React from 'react';
import Button from '../button/Button';
import Search from '../search/Search';
import './hero.scss';

export interface HeroButtonProps {
  href?: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export interface HeroSearchProps {
  id?: string;
  label?: string;
  placeholder?: string;
  action?: string;
  big?: boolean;
  buttonVariant?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  callout?: string;
  paragraph?: string;
  button?: HeroButtonProps | null;
  search?: HeroSearchProps | null;
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
  search = null,
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
          {search && <Search {...search} />}
          {!search && button && (
            <Button variant="primary" href={button.href} onClick={button.onClick}>
              {button.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
