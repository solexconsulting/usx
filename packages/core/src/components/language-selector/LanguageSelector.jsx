import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Renders a single language link/submenu-item's accessible label.
 * Real USWDS wraps the native-language name in <strong> and appends an
 * English gloss in parens (e.g. <strong>Español</strong> (Spanish)); the
 * whole thing carries `lang`/`xml:lang` so assistive tech announces it in
 * the correct language (WCAG H58).
 */
function LanguageLabel({ code, label, description }) {
  if (!code) {
    return <>{label}</>;
  }

  return (
    <span lang={code} xmlLang={code}>
      <strong>{label}</strong>
      {description ? ` (${description})` : null}
    </span>
  );
}

LanguageLabel.propTypes = {
  code: PropTypes.string,
  label: PropTypes.node.isRequired,
  description: PropTypes.string,
};

function TwoLanguageSelector({ target, onSelect, className, navAriaLabel }) {
  const handleClick = (e) => {
    if (onSelect) onSelect(target, e);
    if (!target.href) e.preventDefault();
  };

  const Tag = target.href ? 'a' : 'button';
  const tagProps = target.href
    ? { href: target.href }
    : { type: 'button' };

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

TwoLanguageSelector.propTypes = {
  target: PropTypes.shape({
    code: PropTypes.string,
    label: PropTypes.node,
    href: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  navAriaLabel: PropTypes.string,
};

function MenuLanguageSelector({
  languages,
  unstyled,
  small,
  label,
  id,
  onSelect,
  className,
  navAriaLabel,
}) {
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
                <li className="usa-language__submenu-item" key={lang.code || lang.label || idx}>
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

MenuLanguageSelector.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      label: PropTypes.node,
      description: PropTypes.string,
      href: PropTypes.string,
      current: PropTypes.bool,
      plain: PropTypes.bool,
    })
  ).isRequired,
  unstyled: PropTypes.bool,
  small: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  navAriaLabel: PropTypes.string,
};

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
}) {
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

LanguageSelector.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      label: PropTypes.node,
      description: PropTypes.string,
      href: PropTypes.string,
      current: PropTypes.bool,
      plain: PropTypes.bool,
    })
  ),
  variant: PropTypes.oneOf(['two', 'menu']),
  unstyled: PropTypes.bool,
  small: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string,
  navAriaLabel: PropTypes.string,
  className: PropTypes.string,
  onSelect: PropTypes.func,
};