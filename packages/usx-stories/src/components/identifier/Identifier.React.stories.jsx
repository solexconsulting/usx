
import Identifier from '../../../../usx-react/src/components/identifier/Identifier.tsx';
import config from '../../../../usx-react/src/components/identifier/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import { expect } from 'storybook/test';

const linksEn = [
  { href: 'javascript:void(0)', label: 'About <Parent shortname>' },
  { href: '', label: 'Accessibility statement' },
  { href: '', label: 'FOIA requests' },
  { href: '', label: 'No FEAR Act data' },
  { href: '', label: 'Office of the Inspector General' },
  { href: '', label: 'Performance reports' },
  { href: '', label: 'Privacy policy' },
];

const linksEs = [
  { href: 'javascript:void(0)', label: 'Acerca de <Parent shortname>' },
  { href: '', label: 'Declaracion de accesibilidad' },
  { href: '', label: 'Solicitud a traves de FOIA' },
  { href: '', label: 'Datos de la ley No FEAR' },
  { href: '', label: 'Oficina del Inspector General' },
  { href: '', label: 'Informes de desempeno' },
  { href: '', label: 'Politica de privacidad' },
];

const statueAvatars = [
  { href: '', src: './lady_liberty.png', alt: 'Statue of Liberty' },
];

const solexAvatars = [
  { href: 'https://solex-llc.com', src: './white_symbol-only.png', alt: 'SOLEX Consulting LLC', className: 'height-auto' }
];

const presidentAvatars = [
  { href: 'javascript:void(0)', src: './george_washington.png', alt: 'George Washington' },
  { href: 'javascript:void(0)', src: './thomas_jefferson.png', alt: 'Thomas Jefferson' },
];

const presidentCircleAvatars = presidentAvatars.map((logo) => ({ ...logo, shape: 'circle' }));

const presidentRoundedAvatars = presidentAvatars.map((logo) => ({ ...logo, shape: 'rounded-lg' }));

export const storyDefs = {
  Default: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [{ name: '<Parent agency>', href: '' }],
    avatarProps: statueAvatars,
    requiredLinks: linksEn,
  },
  DefaultSpanish: {
    ...(config.default || {}),
    language: 'es',
    parentAgencies: [{ name: '<Parent agency>', href: '' }],
    avatarProps: statueAvatars,
    requiredLinks: linksEs,
  },
  MultipleParentsAndAvatars: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [
      { name: '<Parent agency>', href: '' },
      { name: '<Other agency>', href: 'javascript:void(0)' },
    ],
    avatarProps: presidentAvatars,
    requiredLinks: linksEn,
  },
  MultipleParentsAndAvatarsSpanish: {
    ...(config.default || {}),
    language: 'es',
    parentAgencies: [
      { name: '<Parent agency>', href: '' },
      { name: '<Other agency>', href: 'javascript:void(0)' },
    ],
    avatarProps: presidentAvatars,
    requiredLinks: linksEs,
  },
  MultipleParentsAndAvatarsOverlappingAvatars: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [
      { name: '<Parent agency>', href: '' },
      { name: '<Other agency>', href: 'javascript:void(0)' },
    ],
    avatarProps: presidentCircleAvatars,
    overlapAvatars: true,
    requiredLinks: linksEn,
  },
  LogoShapeRounded: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [
      { name: '<Parent agency>', href: '' },
      { name: '<Other agency>', href: 'javascript:void(0)' },
    ],
    avatarProps: presidentRoundedAvatars,
    requiredLinks: linksEn,
  },
  LogoShapeGlobal: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [
      { name: '<Parent agency>', href: '' },
      { name: '<Other agency>', href: 'javascript:void(0)' },
    ],
    avatarProps: presidentAvatars,
    logoShape: 'circle',
    overlapAvatars: true,
    requiredLinks: linksEn,
  },
  NoAvatars: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [{ name: '<Parent agency>', href: '' }],
    avatarProps: [],
    requiredLinks: linksEn,
  },
  TaxpayerDisclaimer: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [{ name: '<Parent agency>', href: '' }],
    avatarProps: statueAvatars,
    taxpayerDisclaimer: true,
    requiredLinks: linksEn,
  },
  TaxpayerDisclaimerSpanish: {
    ...(config.default || {}),
    language: 'es',
    parentAgencies: [{ name: '<Parent agency>', href: '' }],
    avatarProps: statueAvatars,
    taxpayerDisclaimer: true,
    requiredLinks: linksEs,
  },
  Solex: {
    ...(config.default || {}),
    domain: 'solex-llc.com',
    avatarProps: solexAvatars,
    parentAgencies: [{ name: 'SOLEX Consulting LLC', href: 'https://solex-llc.com', useThe: false }],
    requiredLinks: [
      { href: 'https://solex-llc.com', label: 'About SOLEX Consulting' },
      { href: 'https://solex-llc.com', label: 'Privacy policy' },
    ],
  }
};

storyDefs.MultipleParentsAndAvatarsMixedArticle = {
  ...storyDefs.MultipleParentsAndAvatars,
  parentAgencies: [
    { name: '<Parent agency>', href: '' },
    { name: 'SOLEX Consulting LLC', href: 'https://solex-llc.com', useThe: false },
  ],
};

storyDefs.AvatarVariants = {
  ...storyDefs.Default,
  logoShape: 'circle',
  avatarProps: [
    { ...statueAvatars[0], shape: 'rounded-lg', className: 'height-auto' },
    { variant: 'initials', value: 'US', alt: 'United States', href: '#agency', contentClassName: 'bg-primary-lighter text-primary-darker' },
    { variant: 'icon', value: 'account_circle', alt: 'Agency account', href: '#account', contentClassName: 'bg-primary-lighter text-primary-darker' },
  ],
};

export default {
  title: 'React/USWDS/Identifier',
  component: Identifier,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const DefaultSpanish = { args: storyDefs.DefaultSpanish };
export const MultipleParentsAndAvatars = { args: storyDefs.MultipleParentsAndAvatars };
export const MultipleParentsAndAvatarsSpanish = { args: storyDefs.MultipleParentsAndAvatarsSpanish };
export const MultipleParentsAndAvatarsOverlappingAvatars = { args: storyDefs.MultipleParentsAndAvatarsOverlappingAvatars };
export const LogoShapeRounded = { args: storyDefs.LogoShapeRounded };
export const LogoShapeGlobal = { args: storyDefs.LogoShapeGlobal };
export const NoAvatars = { args: storyDefs.NoAvatars };
export const TaxpayerDisclaimer = { args: storyDefs.TaxpayerDisclaimer };
export const TaxpayerDisclaimerSpanish = { args: storyDefs.TaxpayerDisclaimerSpanish };
export const Solex = {
  args: storyDefs.Solex,
  play: async ({ canvasElement }) => {
    const disclaimer = canvasElement.querySelector('.usa-identifier__identity-disclaimer');
    await expect(disclaimer).toHaveTextContent('official website of SOLEX Consulting LLC');
    await expect(disclaimer).not.toHaveTextContent('the SOLEX Consulting LLC');
  },
};
export const MultipleParentsAndAvatarsMixedArticle = {
  args: storyDefs.MultipleParentsAndAvatarsMixedArticle,
  play: async ({ canvasElement }) => {
    const disclaimer = canvasElement.querySelector('.usa-identifier__identity-disclaimer');
    await expect(disclaimer).toHaveTextContent('official website of the <Parent agency> and SOLEX Consulting LLC');
  },
};
export const AvatarVariants = {
  args: storyDefs.AvatarVariants,
  play: async ({ canvas, canvasElement }) => {
    await expect(canvasElement.querySelector('.usa-identifier__logo.height-auto .usx-avatar__img')).toHaveClass('usa-identifier__logo-img', 'usx-rounded-lg', 'identifier-custom-image');
    await expect(canvas.getByRole('link', { name: 'United States' })).toHaveAttribute('href', '#agency');
    await expect(canvasElement.querySelector('.identifier-custom-content')).toHaveClass('usx-avatar__content', 'usx-circle');
    await expect(canvasElement.querySelector('.identifier-custom-content')).toHaveTextContent('US');
    await expect(canvasElement.querySelector('[role="tooltip"]')).toHaveTextContent('Agency profile');
    await expect(canvas.getByRole('link', { name: 'Agency account' }).querySelector('svg')).toBeInTheDocument();
  },
};
