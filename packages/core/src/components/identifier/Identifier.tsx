import React from 'react';
import classNames from 'classnames';

const shapeClassMap = {
  circle: 'usx-circle',
  'rounded-sm': 'usx-rounded-sm',
  'rounded-md': 'usx-rounded-md',
  'rounded-lg': 'usx-rounded-lg',
  'rounded-xl': 'usx-rounded-xl',
};

interface Agency {
  name: string;
  href?: string;
}

interface Logo {
  href?: string;
  src: string;
  alt: string;
  shape?: null | 'circle' | 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'rounded-xl';
  imageClassName?: string;
}

interface RequiredLink {
  href?: string;
  label?: string;
}

type RequiredLinks = (string | RequiredLink)[];

export interface IdentifierProps {
  domain?: string;
  language?: 'en' | 'es';
  parentAgencies?: Agency[];
  logoProps?: Logo[];
  logoShape?: null | 'circle' | 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'rounded-xl';
  requiredLinks?: RequiredLinks;
  taxpayerDisclaimer?: boolean;
  overlapAvatars?: boolean;
  className?: string;
}

const defaultRequiredLinks: Record<'en' | 'es', string[]> = {
  en: [
    'About <Parent shortname>',
    'Accessibility statement',
    'FOIA requests',
    'No FEAR Act data',
    'Office of the Inspector General',
    'Performance reports',
    'Privacy policy',
  ],
  es: [
    'Acerca de <Parent shortname>',
    'Declaracion de accesibilidad',
    'Solicitud a traves de FOIA',
    'Datos de la ley No FEAR',
    'Oficina del Inspector General',
    'Informes de desempeno',
    'Politica de privacidad',
  ],
};

const defaultUsaGov = {
  en: {
    text: 'Looking for U.S. government information and services?',
    href: 'https://www.usa.gov/',
    label: 'Visit USA.gov',
  },
  es: {
    text: 'Necesita informacion y servicios del Gobierno?',
    href: 'https://www.usa.gov/es/',
    label: 'Visite USAGov en Espanol',
  },
};

function renderDisclaimer({ language, parentAgencies, taxpayerDisclaimer }: { language: 'en' | 'es'; parentAgencies?: Agency[]; taxpayerDisclaimer?: boolean }) {
  if (!parentAgencies || parentAgencies.length === 0) {
    return null;
  }
  if (language === 'es') {
    return (
      <>
        Un sitio web oficial de{' '}
        {parentAgencies.map((agency, index) => (
          <React.Fragment key={`${agency.name}-${index}`}>
            {index > 0 ? ' y ' : ''}
            <a href={agency.href || ''}>{agency.name}</a>
          </React.Fragment>
        ))}
        {taxpayerDisclaimer ? ' . Producido y publicado con dinero de los contribuyentes de impuestos.' : ''}
      </>
    );
  }
  return (
    <>
      <span aria-hidden="true">An </span>official website of the{' '}
      {parentAgencies.map((agency, index) => (
        <React.Fragment key={`${agency.name}-${index}`}>
          {index > 0 ? (index === parentAgencies.length - 1 ? ' and the ' : ', the ') : ''}
          <a href={agency.href || ''}>{agency.name}</a>
        </React.Fragment>
      ))}
      {taxpayerDisclaimer ? '. Produced and published at taxpayer expense.' : ''}
    </>
  );
}

export default function Identifier({
  domain = 'domain.gov',
  language = 'en',
  parentAgencies = [],
  logoProps = [],
  logoShape = null,
  requiredLinks,
  taxpayerDisclaimer = false,
  overlapAvatars = false,
  className = '',
}: IdentifierProps) {
  const classes = classNames('usa-identifier', 'usx-identifier', className);
  const labels = {
    masthead: language === 'es' ? 'Identificador de la agencia,' : 'Agency identifier,',
    description: language === 'es' ? 'Descripcion de la agencia,' : 'Agency description,',
    required: language === 'es' ? 'Enlaces importantes,' : 'Important links,',
    usagov: language === 'es'
      ? 'Informacion y servicios del Gobierno de EE. UU.,'
      : 'U.S. government information and services,',
  };
  const links = requiredLinks || defaultRequiredLinks[language] || defaultRequiredLinks.en;
  const usaGov = defaultUsaGov[language] || defaultUsaGov.en;
  return (
    <div className={classes}>
      <section className="usa-identifier__section usa-identifier__section--masthead" aria-label={labels.masthead}>
        <div className="usa-identifier__container">
          {logoProps.length > 0 ? (
            <div
              className={classNames(
                'usa-identifier__logos',
                'usx-avatar-group',
                overlapAvatars && 'usa-avatar-group--overlap',
              )}
            >
              {logoProps.map((logo, index) => (
                <a href={logo.href || ''} className="usa-identifier__logo usx-avatar" key={`${logo.alt}-${index}`}>
                  <img
                    className={classNames(
                      'usa-identifier__logo-img',
                      shapeClassMap[logo.shape || logoShape || ''] || null,
                      logo.imageClassName,
                    )}
                    src={logo.src}
                    alt={logo.alt}
                    role="img"
                  />
                </a>
              ))}
            </div>
          ) : null}
          <section className="usa-identifier__identity" aria-label={labels.description}>
            <p className="usa-identifier__identity-domain">{domain}</p>
            <p className="usa-identifier__identity-disclaimer">
              {renderDisclaimer({ language, parentAgencies, taxpayerDisclaimer })}
            </p>
          </section>
        </div>
      </section>
      <nav className="usa-identifier__section usa-identifier__section--required-links" aria-label={labels.required}>
        <div className="usa-identifier__container">
          <ul className="usa-identifier__required-links-list">
            {links.map((link, index) => (
              <li className="usa-identifier__required-links-item" key={typeof link === 'string' ? `${link}-${index}` : `${link.label || link}-${index}`}>
                {typeof link === 'string' ? (
                  <span className="usa-identifier__required-link usa-link">{link}</span>
                ) : (
                  <a href={link.href || ''} className="usa-identifier__required-link usa-link">
                    {link.label || link.href}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <section className="usa-identifier__section usa-identifier__section--usagov" aria-label={labels.usagov}>
        <div className="usa-identifier__container">
          <div className="usa-identifier__usagov-description">{usaGov.text}</div>{' '}
          <a href={usaGov.href} className="usa-link">{usaGov.label}</a>
        </div>
      </section>
    </div>
  );
}
