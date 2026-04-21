import React from 'react';
import Footer, {
  FooterReturnToTop,
  FooterNavColumn,
  FooterSignUp,
  FooterSocialLinks,
  FooterContact,
} from './Footer';
import Branding from '../branding/Branding';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

export default {
  title: 'React/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

// ── Shared story data ──────────────────────────────────────────────────────

const branding = {
  logo: `${window.usxBaseUrl}linear-w-symbol_left.svg`,
  title: 'Agency Name',
};
const brandingUrl = '/';

console.log("Base USX URL:", window.usxBaseUrl);

const socialLinks = [
  { icon: `${window.usxBaseUrl}img/usa-icons/facebook.svg`,  href: 'javascript:void(0);', alt: 'Facebook' },
  { icon: `${window.usxBaseUrl}img/usa-icons/twitter.svg`,   href: 'javascript:void(0);', alt: 'Twitter' },
  { icon: `${window.usxBaseUrl}img/usa-icons/youtube.svg`,   href: 'javascript:void(0);', alt: 'YouTube' },
  { icon: `${window.usxBaseUrl}img/usa-icons/instagram.svg`, href: 'javascript:void(0);', alt: 'Instagram' },
  { icon: `${window.usxBaseUrl}img/usa-icons/rss_feed.svg`,  href: 'javascript:void(0);', alt: 'RSS' },
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
Slim.storyName = 'Slim Footer';

export const LogoOnly = Template.bind({});
LogoOnly.args = storyDefs.LogoOnly;
LogoOnly.storyName = 'Logo & Social Only';

export const NoNav = Template.bind({});
NoNav.args = storyDefs.NoNav;
NoNav.storyName = 'Sign-Up, No Nav';

export const Minimal = Template.bind({});
Minimal.args = storyDefs.Minimal;

// ── Composition story: using sub-components directly ──────────────────────

export const CustomComposition = {
  storyName: 'Custom Composition',
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
              <FooterSocialLinks links={socialLinks} />
              <FooterContact
                heading="Agency Contact Center"
                phone={{ href: 'tel:1-800-555-5555', text: '(800) 555-GOVT' }}
                email={{ href: 'mailto:info@agency.gov', text: 'info@agency.gov' }}
              />
            </div>
          </div>
        </div>
      }
    />
  ),
};

