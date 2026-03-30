import React from 'react';
import Header from './Header';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const baseArgs = {
  projectTitle: 'My Project',
  projectLogo: 'placeholder_logo.png',
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
      ariaLabel: 'Section 3'
    }
  ],
};

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

export const Default = {
  args: {
    id: 'header-default',
    ...baseArgs,
    secondaryLinks: secondaryLinks,
    searchConfig: searchArgs,
    extended: true,
    megamenu: true,
    useMenuIcon: true,
  },
}

export const Basic = {
  args: {
    id: 'header-basic',
    ...baseArgs,
    searchConfig: searchArgs,
    extended: false,
    megamenu: false,
  },
}

export const BasicWithMegamenu = {
  args: {
    ...baseArgs,
    secondaryLinks: secondaryLinks,
    searchConfig: searchArgs,
    id: 'header-basic-megamenu',
    extended: false,
    megamenu: true,
  },
}

export const Extended = {
  args: {
    ...baseArgs,
    secondaryLinks: secondaryLinks,
    searchConfig: searchArgs,
    id: 'header-extended',
    extended: true,
    megamenu: false,
  },
}

export const ExtendedWithMegamenu = {
  args: {
    ...baseArgs,
    secondaryLinks: secondaryLinks,
    searchConfig: searchArgs,
    id: 'header-extended-megamenu',
    extended: true,
    megamenu: true,
  },
}

export const WithMenuIcon = {
  args: {
    ...baseArgs,
    secondaryLinks: secondaryLinks,
    searchConfig: searchArgs,
    id: 'header-menu-icon',
    useMenuIcon: true,
  },
}

const noLogoArgs = {
  ...baseArgs,
  id: 'header-no-logo',
  projectLogo: null
}

export const NoLogo = {
  args: {
    ...noLogoArgs,
    searchConfig: searchArgs,
  },
}

export const Minimal = {
  args: {
    id: 'header-minimal',
    projectTitle: 'Simple Site',
    navSections: [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'About',
        href: '/about',
      },
    ],
  },
}

const lotsOfLinks = Array.from({ length: 10 }, (_, i) => ({
  text: `Link ${i + 1}`,
  href: `https://example.com/link${i + 1}`,
  ariaLabel: `Link ${i + 1}`
}));

export const Maximal = {
  args: {
    id: 'header-maximal',
    ...baseArgs,
    navSections: [
      {
        title: 'Section 1',
        links: lotsOfLinks,
      },
      {
        title: 'Section 2',
        links: lotsOfLinks,
      },
      {
        title: 'Section 3',
        links: lotsOfLinks,
      },
      {
        title: 'Section 4',
        links: lotsOfLinks,
      },
      {
        title: 'Section 5',
        links: lotsOfLinks,
      },
      {
        title: 'Section 6',
        links: lotsOfLinks,
      },
      {
        title: 'Section 7',
        href: 'https://example.com/section7',
      },
    ],
    secondaryLinks: secondaryLinks,
    searchConfig: searchArgs,
    extended: true,
    megamenu: true,
    useMenuIcon: true,
    className: 'bg-primary-lighter',
  },

}