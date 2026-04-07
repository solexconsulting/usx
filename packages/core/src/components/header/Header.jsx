import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import Search from '../search/Search';
import Image from '../image/Image';
import './header.scss';

function PrimaryNav({
  navSections,
  megamenu,
  showSecondary = false,
  secondaryLinks = [],
  searchConfig = null,
  headerId = 'header',
  renderSearchDirectly = false,
}) {
  const navClasses = ClassNames(
    'usa-nav__primary', 'usa-accordion'
  );

  return (
    <>
      <button type="button" className="usa-nav__close">
        <Icon name="close" />
      </button>
      <ul className={navClasses}>
        {navSections.map((section, index) => (
          <li key={index} className="usa-nav__primary-item">
            {section.href ? (
              <a href={section.href} className="usa-nav__link" aria-label={section.ariaLabel}>
                <span>{section.title}</span>
              </a>
            ) : (
              <>
                <button
                  type="button"
                  className="usa-accordion__button usa-nav__link"
                  aria-expanded="false"
                  aria-controls={`${headerId}-nav-section-${index}`}
                >
                  <span>{section.title}</span>
                </button>
                {section.links && (
                  megamenu ? (
                    <div id={`${headerId}-nav-section-${index}`} className="usa-nav__submenu usa-megamenu" hidden="hidden">
                      <div className="grid-row grid-gap-4">
                        {(() => {
                          const links = section.links;
                          const numColumns = Math.min(4, Math.max(1, Math.ceil(links.length / 3))); // Up to 4 columns, at least 1
                          const linksPerColumn = Math.ceil(links.length / numColumns);
                          
                          return Array.from({ length: numColumns }, (_, colIndex) => {
                            const startIndex = colIndex * linksPerColumn;
                            const endIndex = Math.min(startIndex + linksPerColumn, links.length);
                            const columnLinks = links.slice(startIndex, endIndex);
                            
                            return (
                              <div key={colIndex} className="usa-col">
                                <ul className="usa-nav__submenu-list">
                                  {columnLinks.map((link, linkIndex) => (
                                    <li key={linkIndex} className="usa-nav__submenu-item">
                                      <a href={link.href} aria-label={link.ariaLabel}>
                                        {link.text}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  ) : (
                    <ul id={`${headerId}-nav-section-${index}`} className="usa-nav__submenu" hidden="true">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex} className="usa-nav__submenu-item">
                          <a href={link.href} aria-label={link.ariaLabel}>
                            <span>{link.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      {showSecondary && (
        <div className="usa-nav__secondary">
          <ul className="usa-nav__secondary-links">
            {secondaryLinks.map((link, index) => (
              <li key={index} className="usa-nav__secondary-item">
                <a href={link.href} aria-label={link.ariaLabel}>
                  <span>{link.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {renderSearchDirectly && searchConfig && <Search {...searchConfig} />}
    </>
  )
}

PrimaryNav.propTypes = {
  navSections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      ariaLabel: PropTypes.string,
    })),
    href: PropTypes.string,
    ariaLabel: PropTypes.string,
  })),
  megamenu: PropTypes.bool,
  showSecondary: PropTypes.bool,
  secondaryLinks: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string,
  })),
  searchConfig: PropTypes.shape({
    id: PropTypes.string,
    ariaLabel: PropTypes.string,
    searchKey: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    iconOnly: PropTypes.bool,
    buttonVariant: PropTypes.string,
    big: PropTypes.bool,
    action: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    onSubmit: PropTypes.func,
    className: PropTypes.string,
  }),
  headerId: PropTypes.string,
  renderSearchDirectly: PropTypes.bool,
};

export default function Header({
  id = 'header',
  projectTitle,
  projectLogo,
  projectUrl = '/',
  navSections = [],
  secondaryLinks = [],
  searchConfig = null,
  extended = false,
  megamenu = false,
  useMenuIcon = false,
  stickyNav = false,
  className = '',
  ...props
}) {
  const headerClasses = ClassNames(
    'usa-header',
    'usx-header',
    { 'usa-header--basic': !extended },
    // Only needed for basic header
    { 'usa-header--megamenu': megamenu && !extended },
    { 'usa-header--extended': extended },
    className
  );

  const navClasses = ClassNames(
    'usa-nav',
    'usx-nav',
    { 'usx-nav--sticky': stickyNav },
  );

  const navbar = (
    <div className="usa-navbar">
      <div className="usa-logo">
        <em className="usa-logo__text">
          {projectLogo ? (
            <Image src={projectLogo} alt="Logo" title={projectTitle} href={projectUrl} className="usa-logo__image" />
          ) : (
            <a href={projectUrl} title={projectTitle}>{projectTitle}</a>
          )}
        </em>
      </div>
      <button type="button" className="usa-menu-btn">
        {useMenuIcon ? <Icon name="menu" /> : 'Menu'}
      </button>
    </div>
  );

  if (extended) {
    return (
      <>
        <header className={headerClasses} {...props}>
          {navbar}
        </header>

        <nav aria-label="Primary navigation" className={navClasses}>
          <div className="usa-nav__inner">
            <PrimaryNav
              navSections={navSections}
              megamenu={megamenu}
              showSecondary={false}
              headerId={id}
            />
            <div className="usa-nav__secondary">
              <ul className="usa-nav__secondary-links">
                {secondaryLinks.map((link, index) => (
                  <li key={index} className="usa-nav__secondary-item">
                    <a href={link.href} aria-label={link.ariaLabel}>
                      <span>{link.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
              {searchConfig && <Search {...searchConfig} />}
            </div>
          </div>
        </nav>
      </>
    );
  }

  return (
    <header className={headerClasses} {...props}>
      <div className="usa-nav-container">
        {navbar}
        <nav aria-label="Primary navigation" className={navClasses}>
          <PrimaryNav
            navSections={navSections}
            megamenu={megamenu}
            showSecondary={false}
            secondaryLinks={secondaryLinks}
            searchConfig={searchConfig}
            headerId={id}
            renderSearchDirectly={true}
          />
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  projectTitle: PropTypes.string,
  projectLogo: PropTypes.string,
  projectUrl: PropTypes.string,
  navSections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      ariaLabel: PropTypes.string,
    })),
    href: PropTypes.string,
    ariaLabel: PropTypes.string,
  })),
  secondaryLinks: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string,
  })),
  searchConfig: PropTypes.shape({
    id: PropTypes.string,
    ariaLabel: PropTypes.string,
    searchKey: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    iconOnly: PropTypes.bool,
    buttonVariant: PropTypes.string,
    big: PropTypes.bool,
    action: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    onSubmit: PropTypes.func,
    className: PropTypes.string,
  }),
  extended: PropTypes.bool,
  megamenu: PropTypes.bool,
  useMenuIcon: PropTypes.bool,
  stickyNav: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  styles: PropTypes.object,
};
