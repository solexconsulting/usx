import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import Search from '../search/Search';
import './hero.scss';

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
}) {
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

Hero.propTypes = {
  title: PropTypes.string,
  callout: PropTypes.string,
  paragraph: PropTypes.string,
  button: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
  }),
  search: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    action: PropTypes.string,
    big: PropTypes.bool,
    buttonVariant: PropTypes.string,
    onSubmit: PropTypes.func,
  }),
  backgroundImage: PropTypes.string,
  overlay: PropTypes.bool,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};
