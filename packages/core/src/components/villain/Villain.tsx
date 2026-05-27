import React from 'react';
import './villain.scss';

export interface VillainButton {
  href: string;
  text: string;
}

export interface VillainProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  callout?: string;
  paragraph?: string;
  button?: VillainButton | null;
  ariaLabel?: string;
  className?: string;
}

const Villain: React.FC<VillainProps> = ({
  title = '',
  callout = '',
  paragraph = '',
  button = null,
  ariaLabel = 'Introduction',
  className = '',
  ...props
}) => {
  const classes = ['usa-hero', className].filter(Boolean).join(' ');
  return (
    <section className={classes} aria-label={ariaLabel} {...props}>
      <div className="grid-container">
        <div className="usa-hero__callout">
          <h1 className="usa-hero__heading">
            {callout && <span className="usa-hero__heading--alt">{callout}</span>}
            {title}
          </h1>
          {paragraph && <p>{paragraph}</p>}
          {button && (
            <a className="usa-button" href={button.href}>
              {button.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Villain;
