import React from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import Search, { SearchProps } from '../search/Search';
import Branding, { BrandingProps } from './Branding';

const externalIndicator = (
  <>
    <span className="usa-sr-only">External.</span>
    <Icon name="launch" size={1} className="margin-left-05" />
  </>
);

export interface HeaderNavLink {
  text: string;
  href: string;
  ariaLabel?: string;
  external?: boolean;
}

export interface HeaderNavSection {
  title: string;
  links?: HeaderNavLink[];
  href?: string;
  ariaLabel?: string;
  external?: boolean;
}

interface PrimaryNavProps {
  navSections: HeaderNavSection[];
  megamenu: boolean;
  showSecondary?: boolean;
  secondaryLinks?: HeaderNavLink[];
  searchProps?: SearchProps | null;
  utilityContent?: React.ReactNode;
  headerId?: string;
  renderSearchDirectly?: boolean;
}

function PrimaryNav({
  navSections,
  megamenu,
  showSecondary = false,
  secondaryLinks = [],
  searchProps = null,
  utilityContent = null,
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
              <a
                href={section.href}
                className="usa-nav__link"
                aria-label={section.ariaLabel}
              >
                <span>{section.title}</span>
                {section.external && externalIndicator}
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
                                      <a
                                        href={link.href}
                                        aria-label={link.ariaLabel}
                                      >
                                        {link.text}
                                        {link.external && externalIndicator}
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
                          <a
                            href={link.href}
                            aria-label={link.ariaLabel}
                          >
                            <span>{link.text}</span>
                            {link.external && externalIndicator}
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
                <a
                  href={link.href}
                  aria-label={link.ariaLabel}
                >
                  <span>{link.text}</span>
                  {link.external && externalIndicator}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {renderSearchDirectly && (utilityContent || searchProps) && (
        <div className="usx-nav__utility">
          {utilityContent}
          {searchProps && <Search {...searchProps} />}
        </div>
      )}
    </>
  );
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  branding: BrandingProps;
  projectUrl?: string;
  navSections?: HeaderNavSection[];
  secondaryLinks?: HeaderNavLink[];
  searchProps?: SearchProps | null;
  extended?: boolean;
  megamenu?: boolean;
  useMenuIcon?: boolean;
  stickyNav?: boolean;
  className?: string;
  /** Rendered inline, to the left of the search box (in both header variants). */
  utilityContent?: React.ReactNode;
  /** Rendered right-justified, in line with the primary nav links (extended header only). */
  navEndContent?: React.ReactNode;
}

export default function Header({
  id = 'header',
  branding,
  projectUrl = '/',
  navSections = [],
  secondaryLinks = [],
  searchProps = null,
  extended = false,
  megamenu = false,
  useMenuIcon = false,
  stickyNav = false,
  className = '',
  utilityContent = null,
  navEndContent = null,
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
                    <a
                      href={link.href}
                      aria-label={link.ariaLabel}
                    >
                      <span>{link.text}</span>
                      {link.external && externalIndicator}
                    </a>
                  </li>
                ))}
              </ul>
              {(utilityContent || searchProps) && (
                <div className="usx-nav__utility">
                  {utilityContent}
                  {searchProps && <Search {...searchProps} />}
                </div>
              )}
            </div>
            {navEndContent && <div className="usx-nav__end-slot">{navEndContent}</div>}
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
            searchProps={searchProps}
            utilityContent={utilityContent}
            headerId={id}
            renderSearchDirectly={true}
          />
        </nav>
      </div>
    </header>
  );
}
