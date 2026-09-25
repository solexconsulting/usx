import React from 'react';

import classnames from 'classnames';

export interface LanguageOption {
  code?: string;
  label?: React.ReactNode;
  description?: string;
  href?: string;
  current?: boolean;
  plain?: boolean;
}

export interface LanguageSelectorProps {
  languages?: LanguageOption[];
  variant?: 'two' | 'menu' | null;
  unstyled?: boolean;
  small?: boolean;
  label?: string;
  id?: string;
  navAriaLabel?: string;
  className?: string;
  onSelect?: ((language: LanguageOption, event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void) | null;
}

interface TwoLanguageSelectorProps extends Pick<LanguageSelectorProps, 'onSelect' | 'className' | 'navAriaLabel'> {
  target: LanguageOption;
}

interface MenuLanguageSelectorProps extends Omit<LanguageSelectorProps, 'variant' | 'languages'> {
  languages: LanguageOption[];
}

/**
 * Renders a single language link/submenu-item's accessible label.
 * Real USWDS wraps the native-language name in <strong> and appends an
 * English gloss in parens (e.g. <strong>Español</strong> (Spanish)); the
 * whole thing carries `lang`/`xml:lang` so assistive tech announces it in
 * the correct language (WCAG H58).
 */
function LanguageLabel({ code, label, description }: Pick<LanguageOption, 'code' | 'label' | 'description'>) {
  if (!code) {
    return <>{label}</>;
  }

  return (
    <span {...{ lang: code, xmlLang: code }}>
      <strong>{label}</strong>
      {description ? ` (${description})` : null}
    </span>
  );
}

function TwoLanguageSelector({ target, onSelect, className, navAriaLabel }: TwoLanguageSelectorProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onSelect) onSelect(target, event);
    if (!target.href) event.preventDefault();
  };

  const Tag = target.href ? 'a' : 'button';
  const tagProps = target.href
    ? { href: target.href }
    : { type: 'button' as const };

  return (
    <nav aria-label={navAriaLabel} className={className}>
      <div className="usa-language-container">
        <Tag className="usa-button usx-button usa-button--primary" onClick={handleClick} {...tagProps}>
          <LanguageLabel code={target.code} label={target.label} />
        </Tag>
      </div>
    </nav>
  );
}

function MenuLanguageSelector({
  languages,
  unstyled,
  small,
  label,
  id,
  onSelect,
  className,
  navAriaLabel,
}: MenuLanguageSelectorProps) {
  // Open/close (aria-expanded, hidden, outside-click, Escape, focusout) is
  // driven by USWDS's own JS, initialized via a decorator in the story/host
  // app — this component only renders the static USWDS markup.
  const containerClasses = classnames(
    'usa-language-container',
    small && 'usa-language--small'
  );

  const buttonClasses = classnames(
    'usa-button',
    'usx-button',
    unstyled ? 'usa-button--unstyled' : 'usa-button--primary',
    'usa-language__link'
  );

  return (
    <nav aria-label={navAriaLabel} className={className}>
      <div className={containerClasses}>
        <ul className="usa-language__primary usa-accordion">
          <li className="usa-language__primary-item">
            <button
              type="button"
              className={buttonClasses}
              aria-expanded="false"
              aria-controls={id}
            >
              {label}
            </button>
            <ul id={id} className="usa-language__submenu" hidden>
              {languages.map((lang, idx) => (
                <li className="usa-language__submenu-item" key={lang.code || (typeof lang.label === 'string' || typeof lang.label === 'number' ? lang.label : undefined) || idx}>
                  <a
                    href={lang.href || 'javascript:void(0);'}
                    aria-current={lang.current ? 'true' : undefined}
                    onClick={(e) => {
                      if (onSelect) onSelect(lang, e);
                      if (!lang.href) e.preventDefault();
                    }}
                  >
                    {lang.plain ? (
                      lang.label
                    ) : (
                      <LanguageLabel code={lang.code} label={lang.label} description={lang.description} />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/**
 * LanguageSelector — USWDS `usa-language-selector` with the USX treatment.
 *
 * Renders either the two-language button (`variant="two"`) or the
 * three-or-more-language dropdown menu (`variant="menu"`, optionally
 * `unstyled`), auto-inferring the variant from `languages.length` when not
 * given explicitly. Always exposed as a `<nav>` landmark for discoverability
 * by assistive tech, per gov.uk/VA.gov prior art.
 */
export default function LanguageSelector({
  languages = [],
  variant = null,
  unstyled = false,
  small = false,
  label = 'Languages',
  id = 'language-options',
  navAriaLabel = 'Language selection',
  className = '',
  onSelect = null,
  ...props
}: LanguageSelectorProps) {
  const resolvedVariant = variant || (languages.length > 2 ? 'menu' : 'two');
  const classes = classnames('usx-language-selector', className);

  if (!languages || languages.length === 0) {
    return <div className={classes}>{'LanguageSelector'}</div>;
  }

  if (resolvedVariant === 'two') {
    const target = languages.find((lang) => !lang.current) || languages[1] || languages[0];
    return (
      <TwoLanguageSelector
        target={target}
        onSelect={onSelect}
        className={classes}
        navAriaLabel={navAriaLabel}
        {...props}
      />
    );
  }

  return (
    <MenuLanguageSelector
      languages={languages}
      unstyled={unstyled}
      small={small}
      label={label}
      id={id}
      onSelect={onSelect}
      className={classes}
      navAriaLabel={navAriaLabel}
      {...props}
    />
  );
}
