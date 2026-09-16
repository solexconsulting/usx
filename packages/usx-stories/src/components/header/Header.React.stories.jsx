
import Header from '../../../../core/src/components/header/Header.tsx';
import config from '../../../../core/src/components/header/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export default {
  title: 'React/USWDS/Header',
  component: Header,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

const lotsOfLinks = Array.from({ length: 30 }, (_, i) => ({
  text: `Link ${i + 1}`,
  href: `https://example.com/link${i + 1}`,
  ariaLabel: `Link ${i + 1}`
}));

const simpleBranding = {
  logo: `${window.usxBaseUrl}linear.svg`,
  logoInverse: `${window.usxBaseUrl}white_linear.png`,
  title: 'Agency Name',
}

const responsiveBranding = {
  logo: {
    fallback: `${window.usxBaseUrl}symbol-only.svg`,
    sources: [
      { media: '(min-width: 64em)', srcSet: `${window.usxBaseUrl}stacked-w-symbol_left.svg` },
      { media: '(min-width: 40em)', srcSet: `${window.usxBaseUrl}linear.svg` },
      { media: '(min-width: 20em)', srcSet: `${window.usxBaseUrl}solex-only.svg` },
    ],
  },
  logoInverse: {
    fallback: `${window.usxBaseUrl}white_symbol-only.png`,
    sources: [
      { media: '(min-width: 64em)', srcSet: `${window.usxBaseUrl}white_stacked-w-symbol_left.png` },
      { media: '(min-width: 40em)', srcSet: `${window.usxBaseUrl}white_linear.png` },
      { media: '(min-width: 20em)', srcSet: `${window.usxBaseUrl}white_solex-only.png` },
    ],
  },
  title: 'Agency Name',
};

const standardBranding = {
  symbol: `${window.usxBaseUrl}symbol-only.svg`,
  symbolInverse: `${window.usxBaseUrl}white_symbol-only.png`,
  title: 'Agency Name',
}

// Same responsive source set in both polarities; the active theme decides
// which one renders (toolbar theme → Borealis/Midnight/Carbon/NASA).
const themeResponsiveBranding = {
  logo: responsiveBranding.logo,
  logoInverse: responsiveBranding.logoInverse,
  title: 'Agency Name',
};

const navSections = [
  {
    title: 'Section 1',
    links: [
      { text: 'Link A', href: 'https://example.com/linkA', ariaLabel: 'Link A' },
      { text: 'Link B', href: 'https://example.com/linkB', ariaLabel: 'Link B' },
    ],
  },
  {
    title: 'Section 2',
    links: [
      { text: 'Link C', href: 'https://example.com/linkC', ariaLabel: 'Link C' },
      { text: 'Link D', href: 'https://example.com/linkD', ariaLabel: 'Link D' },
    ],
  },
  {
    title: 'Section 3',
    href: 'https://example.com/section3',
    ariaLabel: 'Section 3'
  }
];

const searchArgs = {
  ariaLabel: 'Header search',
  searchKey: 'q',
  label: 'Search',
  icon: 'search',
  iconOnly: true,
  buttonVariant: 'secondary',
  big: false,
  action: 'https://www.google.com/search',
  placeholder: 'Search...',
};

const secondaryLinks = [
  { text: 'Secondary Link 1', href: 'https://example.com/secondary1', ariaLabel: 'Secondary Link 1' },
  { text: 'Secondary Link 2', href: 'https://example.com/secondary2', ariaLabel: 'Secondary Link 2' },
];

const baseArgs = {
  projectUrl: 'https://example.com',
  useMenuIcon: true,
  navSections,
};

const fullArgs = {
  ...baseArgs,
  branding: standardBranding,
  secondaryLinks,
  searchProps: searchArgs,
};

export const storyDefs = {
  TextOnly: { ...baseArgs, id: 'header-text-only', branding: { title: 'Agency Name' } },
  SymbolAndText: { ...baseArgs, id: 'header-symbol-text', branding: standardBranding },
  SingleLogo: { ...baseArgs, id: 'header-single-logo', branding: simpleBranding },
  ResponsiveLogo: {
    ...baseArgs,
    id: 'header-responsive-logo',
    branding: responsiveBranding,
  },
  ResponsiveLogoExtended: {
    ...baseArgs,
    id: 'header-responsive-logo-extended',
    branding: responsiveBranding,
    extended: true,
  },
  ThemeResponsiveLogo: {
    ...baseArgs,
    id: 'header-theme-responsive-logo',
    branding: themeResponsiveBranding,
    extended: true,
  },
  Default: { ...fullArgs, id: 'header-default', extended: true, megamenu: true, useMenuIcon: true },
  Basic: { ...fullArgs, id: 'header-basic', extended: false, megamenu: false },
  BasicWithMegamenu: { ...fullArgs, id: 'header-basic-megamenu', extended: false, megamenu: true },
  Extended: { ...fullArgs, id: 'header-extended', extended: true, megamenu: false },
  ExtendedWithMegamenu: { ...fullArgs, id: 'header-extended-megamenu', extended: true, megamenu: true },
  WithMenuIcon: { ...fullArgs, id: 'header-menu-icon', useMenuIcon: true },
  Minimal: {
    id: 'header-minimal',
    branding: { title: 'Simple Site' },
    navSections: [
      { title: 'Home', href: '/' },
      { title: 'About', href: '/about' },
    ],
  },
  Maximal: {
    id: 'header-maximal',
    ...fullArgs,
    navSections: [
      { title: 'Section 1', links: lotsOfLinks },
      { title: 'Section 2', links: lotsOfLinks },
      { title: 'Section 3', links: lotsOfLinks },
      { title: 'Section 4', links: lotsOfLinks },
      { title: 'Section 5', links: lotsOfLinks },
      { title: 'Section 6', links: lotsOfLinks },
      { title: 'Section 7', href: 'https://example.com/section7' },
    ],
    extended: true,
    megamenu: true,
    useMenuIcon: true,
    className: 'bg-primary-lighter',
  },
};

// ─── Branding variants ───────────────────────────────────────────────────────

export const TextOnly = { args: storyDefs.TextOnly };
export const SymbolAndText = { args: storyDefs.SymbolAndText };
export const SingleLogo = { args: storyDefs.SingleLogo };
export const ResponsiveLogo = { args: storyDefs.ResponsiveLogo };
export const ResponsiveLogoExtended = { args: storyDefs.ResponsiveLogoExtended };
export const ThemeResponsiveLogo = {
  args: storyDefs.ThemeResponsiveLogo,
  parameters: {
    docs: {
      description: {
        story: 'Supply `logo` and `logoInverse` to switch artwork with the theme. Resize the viewport to see each variant\'s own responsive sources, and switch the toolbar theme to a dark preset to see the white artwork.'
      }
    }
  }
};

// ─── Layout variants ─────────────────────────────────────────────────────────

export const Default = { args: storyDefs.Default };
export const Basic = { args: storyDefs.Basic };
export const BasicWithMegamenu = { args: storyDefs.BasicWithMegamenu };
export const Extended = { args: storyDefs.Extended };
export const ExtendedWithMegamenu = { args: storyDefs.ExtendedWithMegamenu };
export const WithMenuIcon = { args: storyDefs.WithMenuIcon };
export const Minimal = { args: storyDefs.Minimal };
export const Maximal = { args: storyDefs.Maximal };