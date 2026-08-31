/* Shared args used across example page stories */

const searchArgs = {
  ariaLabel: 'Header search',
  searchKey: 'q',
  label: 'Search',
  icon: 'search',
  iconOnly: true,
  buttonVariant: 'primary',
  big: false,
  action: 'https://www.google.com/search',
  placeholder: 'Search...',
};

export const miscBannerArgs = {
  tone: 'beta',
  badgeText: 'beta',
  message: 'Welcome to the beta website!',
  casualLinkText: 'Learn more',
  casualLinkHref: '#',
  importantLinkText: 'Return to classic site',
  importantLinkHref: '#',
  importantLinkIcon: 'arrow_forward',
};

export const headerArgs = {
  branding: {
    logo: {
      fallback: `${window.usxBaseUrl}symbol-only.svg`,
      sources: [
        { media: '(min-width: 64em)', srcSet: `${window.usxBaseUrl}stacked-w-symbol_left.svg` },
        { media: '(min-width: 40em)', srcSet: `${window.usxBaseUrl}linear.svg` },
        { media: '(min-width: 20em)', srcSet: `${window.usxBaseUrl}solex-only.svg` },
      ],
    },
    title: 'SOLEX Consulting',
  },
  projectUrl: 'https://google.com',
  navSections: [
    {
      title: 'Section 1',
      links: [
        { text: 'Link 1', href: 'https://example.com/link1', ariaLabel: 'Link 1' },
        { text: 'Link 2', href: 'https://example.com/link2', ariaLabel: 'Link 2' },
      ],
    },
    {
      title: 'Section 2',
      links: [
        { text: 'Link A', href: 'https://example.com/linkA', ariaLabel: 'Link A' },
        { text: 'Link B', href: 'https://example.com/linkB', ariaLabel: 'Link B' },
      ],
    },
    {
      title: 'Section 3',
      href: 'https://example.com/section3',
      ariaLabel: 'Section 3',
    },
  ],
  secondaryLinks: [
    { text: 'Secondary Link 1', href: 'https://example.com/secondary1', ariaLabel: 'Secondary Link 1' },
    { text: 'Secondary Link 2', href: 'https://example.com/secondary2', ariaLabel: 'Secondary Link 2' },
  ],
  searchConfig: searchArgs,
  extended: true,
  megamenu: true,
  useMenuIcon: true,
  stickyNav: true,
};

const footerNavColumns = [
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

export const footerArgs = {
  variant: 'big',
  returnToTop: true,
  branding: {
    logo: {
      fallback: `${window.usxBaseUrl}symbol-only.svg`,
      sources: [
        { media: '(min-width: 40em)', srcSet: `${window.usxBaseUrl}linear.svg` },
      ],
    },
    title: 'SOLEX Consulting',
  },
  brandingUrl: '/',
  navColumns: footerNavColumns,
  signUp: {
    heading: 'Stay informed',
    emailLabel: 'Your email address',
    emailId: 'footer-email',
    buttonText: 'Subscribe',
  },
  socialLinks: [
    { icon: `${window.usxBaseUrl}img/usa-icons/facebook.svg`,  href: '#', alt: 'Facebook' },
    { icon: `${window.usxBaseUrl}img/usa-icons/twitter.svg`,   href: '#', alt: 'Twitter' },
    { icon: `${window.usxBaseUrl}img/usa-icons/youtube.svg`,   href: '#', alt: 'YouTube' },
    { icon: `${window.usxBaseUrl}img/usa-icons/instagram.svg`, href: '#', alt: 'Instagram' },
  ],
  contactHeading: 'Agency Contact Center',
  contactPhone: { href: 'tel:1-800-555-5555', text: '(800) 555-GOVT' },
  contactEmail: { href: 'mailto:info@agency.gov', text: 'info@agency.gov' },
};

export const identifierArgs = {
  domain: 'solexconsulting.com',
  parentAgencies: [
    { name: 'SOLEX Consulting', href: 'https://google.com' },
  ],
  logos: [
    {
      href: 'https://google.com',
      src: `./white_symbol-only.png`,
      alt: 'SOLEX Consulting',
    },
  ],
  requiredLinks: [
    { href: '#', label: 'About SOLEX' },
    { href: '#', label: 'Accessibility statement' },
    { href: '#', label: 'FOIA requests' },
    { href: '#', label: 'No FEAR Act data' },
    { href: '#', label: 'Office of the Inspector General' },
    { href: '#', label: 'Performance reports' },
    { href: '#', label: 'Privacy policy' },
  ],
  taxpayerDisclaimer: true,
};
