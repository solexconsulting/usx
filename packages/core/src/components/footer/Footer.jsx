import React from 'react';
import PropTypes from 'prop-types';
import Branding, { brandingShape } from '../branding/Branding';
import Input from '../input/Input';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import './footer.scss';

// ── Sub-components ──────────────────────────────────────────────────────────
// These are exported individually so teams can compose fully custom footers.

export function FooterReturnToTop({ label = 'Return to top', href = '#', className = '' }) {
  return (
    <div className={['grid-container usa-footer__return-to-top usx-footer__return-to-top', className].filter(Boolean).join(' ')}>
      <a href={href} className="usa-link usx-link usx-return-to-top">{label}<Icon name="arrow_upward" /></a>
    </div>
  );
}

FooterReturnToTop.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
};

export function FooterNavColumn({ heading, links = [], className = '' }) {
  return (
    <section className={['usa-footer__primary-content usa-footer__primary-content--collapsible usx-footer__nav-column', className].filter(Boolean).join(' ')}>
      {heading && <h4 className="usa-footer__primary-link">{heading}</h4>}
      {links.length > 0 && (
        <ul className="usa-list usa-list--unstyled">
          {links.map((link, i) => (
            <li key={i} className="usa-footer__secondary-link">
              <a href={link.href} aria-label={link.ariaLabel || undefined}>{link.text}</a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

FooterNavColumn.propTypes = {
  heading: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string,
  })),
  className: PropTypes.string,
};

export function FooterSignUp({
  heading = 'Sign up',
  emailLabel = 'Your email address',
  emailId = 'footer-email',
  buttonText = 'Sign up',
  action = '',
  onSubmit = null,
  className = '',
}) {
  return (
    <div className={['usa-sign-up usx-footer__sign-up', className].filter(Boolean).join(' ')}>
      <h3 className="usa-sign-up__heading">{heading}</h3>
      <form className="usa-form" action={action || undefined} onSubmit={onSubmit || undefined}>
        <Input
          id={emailId}
          name="email"
          type="email"
          label={emailLabel}
          autoComplete="email"
        />
        <Button type="submit" variant="primary">{buttonText}</Button>
      </form>
    </div>
  );
}

FooterSignUp.propTypes = {
  heading: PropTypes.string,
  emailLabel: PropTypes.string,
  emailId: PropTypes.string,
  buttonText: PropTypes.string,
  action: PropTypes.string,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

export function FooterSocialLinks({ links = [], className = '' }) {
  if (!links.length) return null;
  return (
    <div className={['usa-footer__social-links grid-row grid-gap-1 usx-footer__social-links', className].filter(Boolean).join(' ')}>
      {links.map((link, i) => (
        <div key={i} className="grid-col-auto">
          <a className="usa-social-link" href={link.href} aria-label={link.alt}>
            <img className="usa-social-link__icon" src={link.icon} alt={link.alt} />
          </a>
        </div>
      ))}
    </div>
  );
}

FooterSocialLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  })),
  className: PropTypes.string,
};

const linkShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ href: PropTypes.string.isRequired, text: PropTypes.string.isRequired }),
]);

function normalizeContactLink(value, scheme) {
  if (!value) return null;
  if (typeof value === 'string') return { href: `${scheme}${value}`, text: value };
  const href = value.href?.startsWith(scheme) ? value.href : `${scheme}${value.href}`;
  return { href, text: value.text };
}

export function FooterContact({
  heading = null,
  phone = null,
  email = null,
  links = [],
  className = '',
}) {
  const allLinks = [
    normalizeContactLink(phone, 'tel:'),
    normalizeContactLink(email, 'mailto:'),
    ...links,
  ].filter(Boolean);

  if (!heading && allLinks.length === 0) return null;
  return (
    <address className={['usa-footer__address usx-footer__contact', className].filter(Boolean).join(' ')}>
      {heading && <p className="usa-footer__contact-heading">{heading}</p>}
      {allLinks.length > 0 && (
        <div className="usa-footer__contact-info grid-row grid-gap">
          {allLinks.map((link, i) => (
            <div key={i} className="grid-col-auto">
              <a href={link.href}>{link.text}</a>
            </div>
          ))}
        </div>
      )}
    </address>
  );
}

FooterContact.propTypes = {
  heading: PropTypes.string,
  phone: linkShape,
  email: linkShape,
  links: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })),
  className: PropTypes.string,
};

// ── Main Footer ─────────────────────────────────────────────────────────────

export default function Footer({
  variant = 'medium',        // 'big' | 'medium' | 'slim'
  returnToTop = true,        // true | false | string (used as label)
  returnToTopLabel = 'Return to top',
  returnToTopHref = '#',
  navColumns = [],           // big footer: [{ heading, links: [{text, href, ariaLabel}] }]
  navLinks = [],             // medium/slim footer: [{ text, href, ariaLabel }]
  navAriaLabel = 'Footer navigation',
  signUp = null,             // big footer: { heading, emailLabel, emailId, buttonText, action }
  branding = null,           // { title?, symbol?, logo?, alt? } — same shape as Header branding
  brandingUrl = '/',         // href for the branding link
  socialLinks = [],          // [{ icon, href, alt }]
  contactHeading = null,
  contactPhone = null,       // string or { href, text }
  contactEmail = null,       // string or { href, text }
  contactLinks = [],         // [{ href, text }]
  primaryChildren = null,    // override primary section content entirely
  secondaryChildren = null,  // override secondary section content entirely
  className = '',
  ...props
}) {
  const variantClass = variant === 'big' ? 'usa-footer--big'
    : variant === 'slim' ? 'usa-footer--slim'
    : '';
  const classes = ['usa-footer', variantClass, 'usx-footer', className].filter(Boolean).join(' ');

  const returnToTopEl = returnToTop ? (
    <FooterReturnToTop
      label={typeof returnToTop === 'string' ? returnToTop : returnToTopLabel}
      href={returnToTopHref}
    />
  ) : null;

  const hasContact = contactHeading || contactPhone || contactEmail || contactLinks.length > 0;
  const contactEl = hasContact ? (
    <FooterContact
      heading={contactHeading}
      phone={contactPhone}
      email={contactEmail}
      links={contactLinks}
    />
  ) : null;

  const socialEl = socialLinks.length > 0 ? <FooterSocialLinks links={socialLinks} /> : null;
  const logoClassName = variant === 'slim'
    ? 'usa-footer__logo grid-row grid-gap-2 usx-footer__logo'
    : 'usa-footer__logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2 usx-footer__logo';
  const brandingEl = branding ? (
    <Branding branding={branding} projectUrl={brandingUrl} className={logoClassName} />
  ) : null;

  const secondaryContactBlock = (socialEl || contactEl) ? (
    <div className="usa-footer__contact-links mobile-lg:grid-col-6">
      {socialEl}
      {contactEl}
    </div>
  ) : null;

  // ── Big footer ────────────────────────────────────────────────────────────
  if (variant === 'big') {
    return (
      <footer className={classes} {...props}>
        {returnToTopEl}
        <div className="usa-footer__primary-section">
          {primaryChildren ?? (
            <div className="grid-container">
              <div className="grid-row grid-gap">
                {navColumns.length > 0 && (
                  <div className="tablet:grid-col-8">
                    <nav className="usa-footer__nav" aria-label={navAriaLabel}>
                      <div className="grid-row grid-gap-4">
                        {navColumns.map((col, i) => (
                          <div key={i} className="mobile-lg:grid-col-6 desktop:grid-col-3">
                            <FooterNavColumn heading={col.heading} links={col.links} />
                          </div>
                        ))}
                      </div>
                    </nav>
                  </div>
                )}
                {signUp && (
                  <div className={navColumns.length > 0 ? 'tablet:grid-col-4' : 'tablet:grid-col-12'}>
                    <FooterSignUp {...signUp} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="usa-footer__secondary-section">
          {secondaryChildren ?? (
            <div className="grid-container">
              <div className="grid-row grid-gap">
                {brandingEl}
                {secondaryContactBlock}
              </div>
            </div>
          )}
        </div>
      </footer>
    );
  }

  // ── Slim footer ───────────────────────────────────────────────────────────
  if (variant === 'slim') {
    return (
      <footer className={classes} {...props}>
        {returnToTopEl}
        <div className="usa-footer__primary-section">
          {primaryChildren ?? (
            <div className="usa-footer__primary-container grid-row">
              {navLinks.length > 0 && (
                <div className="mobile-lg:grid-col-8">
                  <nav className="usa-footer__nav" aria-label={navAriaLabel}>
                    <ul className="grid-row grid-gap">
                      {navLinks.map((link, i) => (
                        <li key={i} className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                          <a className="usa-footer__primary-link" href={link.href} aria-label={link.ariaLabel || undefined}>
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
              {contactEl && (
                <div className="mobile-lg:grid-col-4">
                  {contactEl}
                </div>
              )}
            </div>
          )}
        </div>
        {(brandingEl || secondaryChildren) && (
          <div className="usa-footer__secondary-section">
            {secondaryChildren ?? (
              <div className="grid-container">
                {brandingEl}
              </div>
            )}
          </div>
        )}
      </footer>
    );
  }

  // ── Medium footer (default) ───────────────────────────────────────────────
  return (
    <footer className={classes} {...props}>
      {returnToTopEl}
      <div className="usa-footer__primary-section">
        {primaryChildren ?? (
          navLinks.length > 0 && (
            <nav className="usa-footer__nav" aria-label={navAriaLabel}>
              <ul className="grid-row grid-gap">
                {navLinks.map((link, i) => (
                  <li key={i} className="mobile-lg:grid-col-4 desktop:grid-col-auto usa-footer__primary-content">
                    <a className="usa-footer__primary-link" href={link.href} aria-label={link.ariaLabel || undefined}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )
        )}
      </div>
      <div className="usa-footer__secondary-section">
        {secondaryChildren ?? (
          <div className="grid-container">
            <div className="grid-row grid-gap">
              {brandingEl}
              {secondaryContactBlock}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

Footer.propTypes = {
  variant: PropTypes.oneOf(['big', 'medium', 'slim']),
  returnToTop: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  returnToTopLabel: PropTypes.string,
  returnToTopHref: PropTypes.string,
  navColumns: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      ariaLabel: PropTypes.string,
    })),
  })),
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string,
  })),
  navAriaLabel: PropTypes.string,
  signUp: PropTypes.shape({
    heading: PropTypes.string,
    emailLabel: PropTypes.string,
    emailId: PropTypes.string,
    buttonText: PropTypes.string,
    action: PropTypes.string,
  }),
  branding: brandingShape,
  brandingUrl: PropTypes.string,
  socialLinks: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  })),
  contactHeading: PropTypes.string,
  contactPhone: linkShape,
  contactEmail: linkShape,
  contactLinks: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })),
  primaryChildren: PropTypes.node,
  secondaryChildren: PropTypes.node,
  className: PropTypes.string,
};
