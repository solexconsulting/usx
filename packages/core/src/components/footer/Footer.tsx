import React from 'react';
import Branding, { BrandingProps } from '../header/Branding';
import Input from '../input/Input';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import './footer.scss';
import ClassNames from 'classnames';

// ── Sub-components ──────────────────────────────────────────────────────────

export interface FooterReturnToTopProps {
  label?: string;
  href?: string;
  className?: string;
}
export function FooterReturnToTop({ label = 'Return to top', href = '#', className = '' }: FooterReturnToTopProps) {
  const classes = ClassNames(
    'grid-container',
    'usa-footer__return-to-top',
    'usx-footer__return-to-top',
    className
  )
  return (
    <div className={classes}>
      <a href={href} className="usa-link usx-link usx-footer__return-to-top">{label}<Icon name="arrow_upward" /></a>
    </div>
  );
}

export interface FooterNavLink {
  text: string;
  href: string;
  ariaLabel?: string;
}
export interface FooterNavColumnProps {
  heading?: string;
  links?: FooterNavLink[];
  className?: string;
}
export function FooterNavColumn({ heading, links = [], className = '' }: FooterNavColumnProps) {
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

export interface FooterSignUpProps {
  heading?: string;
  emailLabel?: string;
  emailId?: string;
  buttonText?: string;
  action?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement> | null;
  className?: string;
}
export function FooterSignUp({
  heading = 'Sign up',
  emailLabel = 'Your email address',
  emailId = 'footer-email',
  buttonText = 'Sign up',
  action = '',
  onSubmit = null,
  className = '',
}: FooterSignUpProps) {
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

export interface FooterSocialLink {
  icon: string;
  href: string;
  alt: string;
}
export interface FooterSocialLinksProps {
  links?: FooterSocialLink[];
  className?: string;
}
export function FooterSocialLinks({ links = [], className = '' }: FooterSocialLinksProps) {
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

type LinkShape = string | { href: string; text: string };
function normalizeContactLink(value: LinkShape | null | undefined, scheme: string) {
  if (!value) return null;
  if (typeof value === 'string') return { href: `${scheme}${value}`, text: value };
  const href = value.href?.startsWith(scheme) ? value.href : `${scheme}${value.href}`;
  return { href, text: value.text };
}

export interface FooterContactLink {
  href: string;
  text: string;
}
export interface FooterContactProps {
  heading?: string | null;
  phone?: LinkShape | null;
  email?: LinkShape | null;
  links?: FooterContactLink[];
  className?: string;
}
export function FooterContact({
  heading = null,
  phone = null,
  email = null,
  links = [],
  className = '',
}: FooterContactProps) {
  const allLinks = [
    normalizeContactLink(phone, 'tel:'),
    normalizeContactLink(email, 'mailto:'),
    ...links,
  ].filter(Boolean) as FooterContactLink[];

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

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'big' | 'medium' | 'slim';
  returnToTop?: boolean | string;
  returnToTopLabel?: string;
  returnToTopHref?: string;
  navColumns?: FooterNavColumnProps[];
  navLinks?: FooterNavLink[];
  navAriaLabel?: string;
  signUp?: FooterSignUpProps | null;
  branding?: BrandingProps | null;
  brandingUrl?: string;
  socialLinks?: FooterSocialLink[];
  contactHeading?: string | null;
  contactPhone?: LinkShape | null;
  contactEmail?: LinkShape | null;
  contactLinks?: FooterContactLink[];
  primaryChildren?: React.ReactNode;
  secondaryChildren?: React.ReactNode;
  className?: string;
}

export default function Footer({
  variant = 'medium',
  returnToTop = true,
  returnToTopLabel = 'Return to top',
  returnToTopHref = '#',
  navColumns = [],
  navLinks = [],
  navAriaLabel = 'Footer navigation',
  signUp = null,
  branding = null,
  brandingUrl = '/',
  socialLinks = [],
  contactHeading = null,
  contactPhone = null,
  contactEmail = null,
  contactLinks = [],
  primaryChildren = null,
  secondaryChildren = null,
  className = '',
  ...props
}: FooterProps) {
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
