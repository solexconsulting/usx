import React from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import Search from '../search/Search';
import Branding, { BrandingProps } from '../branding/Branding';
import './header.scss';

export interface HeaderNavLink {
  text: string;
  href: string;
  ariaLabel?: string;
}

export interface HeaderNavSection {
  title: string;
  links?: HeaderNavLink[];
  href?: string;
  ariaLabel?: string;
}

export interface HeaderSearchConfig {
  id?: string;
  ariaLabel?: string;
  searchKey?: string;
  label?: string;
  icon?: string;
  iconOnly?: boolean;
  buttonVariant?: string;
  big?: boolean;
  action?: string;
  placeholder?: string;
  defaultValue?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

interface PrimaryNavProps {
  navSections: HeaderNavSection[];
  megamenu: boolean;
  showSecondary?: boolean;
  secondaryLinks?: HeaderNavLink[];
  searchConfig?: HeaderSearchConfig | null;
  headerId?: string;
  renderSearchDirectly?: boolean;
}

function PrimaryNav({
  navSections,
  megamenu,
  showSecondary = false,
  secondaryLinks = [],
  searchConfig = null,
  headerId = 'header',
  renderSearchDirectly = false,
}: PrimaryNavProps) {
  const navClasses = ClassNames('usa-nav__primary', 'usa-accordion');

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
                    <div id={`${headerId}-nav-section-${index}`} className="usa-nav__submenu usa-megamenu" hidden={true}>
                      <div className="grid-row grid-gap-4">
                        {(() => {
                          const links = section.links!;
                          const numColumns = Math.min(4, Math.max(1, Math.ceil(links.length / 3)));
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
                    <ul id={`${headerId}-nav-section-${index}`} className="usa-nav__submenu" hidden={true}>
                      {section.links!.map((link, linkIndex) => (
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
  );
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  branding?: BrandingProps | null;
  projectUrl?: string;
  navSections?: HeaderNavSection[];
  secondaryLinks?: HeaderNavLink[];
  searchConfig?: HeaderSearchConfig | null;
  extended?: boolean;
  megamenu?: boolean;
  useMenuIcon?: boolean;
  stickyNav?: boolean;
  className?: string;
}

export default function Header({
  id = 'header',
  branding = null,
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
}: HeaderProps) {
  const headerClasses = ClassNames(
    'usa-header',
    'usx-header',
    { 'usa-header--basic': !extended },
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
      <Branding branding={branding} projectUrl={projectUrl} />
      <button type="button" className="usa-menu-btn align-center">
        {useMenuIcon ? <Icon name="menu" size={3} /> : 'Menu'}
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
