
import Identifier from '../../../../usx-react/src/components/identifier/Identifier.tsx';
import config from '../../../../usx-react/src/components/identifier/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

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

const statueLogo = [
  { href: '', src: './lady_liberty.png', alt: 'Statue of Liberty' },
];

const presidentLogos = [
  { href: 'javascript:void(0)', src: './george_washington.png', alt: 'George Washington' },
  { href: 'javascript:void(0)', src: './thomas_jefferson.png', alt: 'Thomas Jefferson' },
];

const presidentCircleLogos = presidentLogos.map((logo) => ({ ...logo, shape: 'circle' }));

const presidentRoundedLogos = presidentLogos.map((logo) => ({ ...logo, shape: 'rounded-lg' }));

export const storyDefs = {
  Default: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [{ name: '<Parent agency>', href: '' }],
    logoProps: statueLogo,
    requiredLinks: linksEn,
  },
  DefaultSpanish: {
    ...(config.default || {}),
    language: 'es',
    parentAgencies: [{ name: '<Parent agency>', href: '' }],
    logoProps: statueLogo,
    requiredLinks: linksEs,
  },
  MultipleParentsAndLogos: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [
      { name: '<Parent agency>', href: '' },
      { name: '<Other agency>', href: 'javascript:void(0)' },
    ],
    logoProps: presidentLogos,
    requiredLinks: linksEn,
  },
  MultipleParentsAndLogosSpanish: {
    ...(config.default || {}),
    language: 'es',
    parentAgencies: [
      { name: '<Parent agency>', href: '' },
      { name: '<Other agency>', href: 'javascript:void(0)' },
    ],
    logoProps: presidentLogos,
    requiredLinks: linksEs,
  },
  MultipleParentsAndLogosOverlappingAvatars: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [
      { name: '<Parent agency>', href: '' },
      { name: '<Other agency>', href: 'javascript:void(0)' },
    ],
    logoProps: presidentCircleLogos,
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
    logoProps: presidentRoundedLogos,
    requiredLinks: linksEn,
  },
  LogoShapeGlobal: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [
      { name: '<Parent agency>', href: '' },
      { name: '<Other agency>', href: 'javascript:void(0)' },
    ],
    logoProps: presidentLogos,
    logoShape: 'circle',
    overlapAvatars: true,
    requiredLinks: linksEn,
  },
  NoLogos: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [{ name: '<Parent agency>', href: '' }],
    logoProps: [],
    requiredLinks: linksEn,
  },
  TaxpayerDisclaimer: {
    ...(config.default || {}),
    language: 'en',
    parentAgencies: [{ name: '<Parent agency>', href: '' }],
    logoProps: statueLogo,
    taxpayerDisclaimer: true,
    requiredLinks: linksEn,
  },
  TaxpayerDisclaimerSpanish: {
    ...(config.default || {}),
    language: 'es',
    parentAgencies: [{ name: '<Parent agency>', href: '' }],
    logoProps: statueLogo,
    taxpayerDisclaimer: true,
    requiredLinks: linksEs,
  },
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
export const MultipleParentsAndLogos = { args: storyDefs.MultipleParentsAndLogos };
export const MultipleParentsAndLogosSpanish = { args: storyDefs.MultipleParentsAndLogosSpanish };
export const MultipleParentsAndLogosOverlappingAvatars = { args: storyDefs.MultipleParentsAndLogosOverlappingAvatars };
export const LogoShapeRounded = { args: storyDefs.LogoShapeRounded };
export const LogoShapeGlobal = { args: storyDefs.LogoShapeGlobal };
export const NoLogos = { args: storyDefs.NoLogos };
export const TaxpayerDisclaimer = { args: storyDefs.TaxpayerDisclaimer };
export const TaxpayerDisclaimerSpanish = { args: storyDefs.TaxpayerDisclaimerSpanish };
