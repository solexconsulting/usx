import React from 'react';
import Footer from '../../../../usx-react/src/components/footer/Footer.tsx';
import Branding from '../../../../usx-react/src/components/header/Branding.tsx';
import config from '../../../../usx-react/src/components/footer/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export default {
  title: 'React/USWDS/Footer',
  component: Footer,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

// ── Shared story data ──────────────────────────────────────────────────────

const branding = {
  logo: {
    fallback: 'symbol-only.svg',
    sources: [
      { media: '(min-width: 40em)', srcSet: 'linear-w-symbol_left.svg' },
    ],
  },
  logoInverse: {
    fallback: 'white_symbol-only.png',
    sources: [
      { media: '(min-width: 40em)', srcSet: 'white_linear-w-symbol_left.png' },
    ],
  },
  title: 'Agency Name',
};
const brandingUrl = '/';

const socialLinks = [
  { icon: 'img/usa-icons/facebook.svg',  href: 'javascript:void(0);', alt: 'Facebook' },
  { icon: 'img/usa-icons/twitter.svg',   href: 'javascript:void(0);', alt: 'Twitter' },
  { icon: 'img/usa-icons/youtube.svg',   href: 'javascript:void(0);', alt: 'YouTube' },
  { icon: 'img/usa-icons/instagram.svg', href: 'javascript:void(0);', alt: 'Instagram' },
  { icon: 'img/usa-icons/rss_feed.svg',  href: 'javascript:void(0);', alt: 'RSS' },
];

const contactArgs = {
  contactHeading: 'Agency Contact Center',
  contactPhone: { href: 'tel:1-800-555-5555', text: '(800) 555-GOVT' },
  contactEmail: { href: 'mailto:info@agency.gov', text: 'info@agency.gov' },
};

const navLinks = [
  { text: 'About',         href: '/about' },
  { text: 'Accessibility', href: '/accessibility' },
  { text: 'Privacy',       href: '/privacy' },
  { text: 'Contact',       href: '/contact' },
];

const navColumns = [
  {
    heading: 'Programs',
    links: [
      { text: 'Benefits',        href: '/programs/benefits' },
      { text: 'Health Services', href: '/programs/health' },
      { text: 'Education',       href: '/programs/education' },
      { text: 'Housing',         href: '/programs/housing' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { text: 'Forms',           href: '/resources/forms' },
      { text: 'Publications',    href: '/resources/publications' },
      { text: 'Data & Research', href: '/resources/data' },
      { text: 'Tools',           href: '/resources/tools' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { text: 'Newsroom',        href: '/newsroom' },
      { text: 'Events',          href: '/events' },
      { text: 'Social Media',    href: '/social' },
      { text: 'Newsletter',      href: '/newsletter' },
    ],
  },
  {
    heading: 'About',
    links: [
      { text: 'Mission',         href: '/about/mission' },
      { text: 'Leadership',      href: '/about/leadership' },
      { text: 'Careers',         href: '/about/careers' },
      { text: 'Contact Us',      href: '/contact' },
    ],
  },
];

const signUp = {
  heading: 'Stay informed',
  emailLabel: 'Your email address',
  emailId: 'footer-email-big',
  buttonText: 'Subscribe',
};

// ── Exportable story definitions (reused by Django stories) ───────────────

export const storyDefs = {
  Big: {
    variant: 'big',
    navColumns,
    signUp,
    branding,
    brandingUrl,
    socialLinks,
    ...contactArgs,
  },
  Medium: {
    variant: 'medium',
    navLinks,
    branding,
    brandingUrl,
    socialLinks,
    ...contactArgs,
  },
  Slim: {
    variant: 'slim',
    navLinks,
    branding,
    brandingUrl,
    ...contactArgs,
  },
  LogoOnly: {
    variant: 'medium',
    branding,
    brandingUrl,
    socialLinks,
  },
  NoNav: {
    variant: 'big',
    signUp,
    branding,
    brandingUrl,
    ...contactArgs,
  },
  Minimal: {
    variant: 'slim',
    navLinks: [
      { text: 'Privacy', href: '/privacy' },
      { text: 'Accessibility', href: '/accessibility' },
    ],
    contactPhone: { href: 'tel:18005555555', text: '(800) 555-5555' },
  },
};

// ── Stories ────────────────────────────────────────────────────────────────

const Template = (args) => <Footer {...args} />;

export const Big = Template.bind({});
Big.args = storyDefs.Big;
Big.storyName = 'Big Footer';

export const Medium = Template.bind({});
Medium.args = storyDefs.Medium;
Medium.storyName = 'Medium Footer';

export const Slim = Template.bind({});
Slim.args = storyDefs.Slim;


export const LogoOnly = Template.bind({});
LogoOnly.args = storyDefs.LogoOnly;


export const NoNav = Template.bind({});
NoNav.args = storyDefs.NoNav;


export const Minimal = Template.bind({});
Minimal.args = storyDefs.Minimal;

export const BorderRoles = {
  args: {
    ...storyDefs.Big,
    returnToTop: true,
    style: {
      '--usx-footer-border-top': '3px solid #005ea2',
      '--usx-footer-border-bottom': '4px solid #237a3b',
      '--usx-footer-primary-section-border-top': '2px dashed #a72f10',
      '--usx-footer-secondary-section-border-top': '5px dotted #8a3575',
      '--usx-footer-primary-link-border-top': '2px dashed #237a3b',
      '--usx-footer-nav-border-bottom': '3px solid #d1980b',
    },
  },
  render: Template,
};

// ── Composition story: using sub-components directly ──────────────────────

export const CustomComposition = {
  render: () => (
    <Footer
      variant="medium"
      returnToTop
      navLinks={navLinks}
      primaryChildren={
        <nav className="usa-footer__nav" aria-label="Custom footer nav">
          <ul className="grid-row grid-gap">
            {navLinks.map((link, i) => (
              <li key={i} className="mobile-lg:grid-col-4 desktop:grid-col-auto usa-footer__primary-content">
                <a className="usa-footer__primary-link" href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      }
      secondaryChildren={
        <div className="grid-container">
          <div className="grid-row grid-gap" style={{ alignItems: 'center' }}>
            <Branding
              branding={branding}
              projectUrl={brandingUrl}
              className="usa-footer__logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2 usx-footer__logo"
            />
            <div className="usa-footer__contact-links mobile-lg:grid-col-6">
              {/* Social links and contact info can be added here if needed */}
            </div>
          </div>
        </div>
      }
    />
  ),
};

