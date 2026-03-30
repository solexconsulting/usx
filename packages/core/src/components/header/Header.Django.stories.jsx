import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Header',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const defaultArgs = {
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
  secondaryLinks: [
    { text: 'Secondary Link 1', href: 'https://example.com/secondary1', ariaLabel: 'Secondary Link 1' },
    { text: 'Secondary Link 2', href: 'https://example.com/secondary2', ariaLabel: 'Secondary Link 2' },
  ],
  searchConfig: {
    id: 'header-search',
    ariaLabel: 'Header search',
    searchKey: 'q',
    label: 'Search',
    icon: 'search',
    iconOnly: true,
    buttonVariant: 'secondary',
    big: false,
    action: 'https://www.google.com/search',
    placeholder: 'Search...',
  },
  extended: true,
  megamenu: true,
  useMenuIcon: false,
}

export const Default = {
  args: defaultArgs,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'header', props: defaultArgs })
      }
    }
  },
  render: djangoComponent('header')
};

export const Basic = {
  args: {
    id: 'header-basic',
    ...defaultArgs,
    extended: false,
    megamenu: false,
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'header',
          props: { id: 'header-basic', ...defaultArgs, extended: false, megamenu: false }
        })
      }
    }
  },
  render: djangoComponent('header')
};

export const BasicWithMegamenu = {
  args: {
    id: 'header-basic-megamenu',
    ...defaultArgs,
    extended: false,
    megamenu: true,
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'header',
          props: { id: 'header-basic-megamenu', ...defaultArgs, extended: false, megamenu: true }
        })
      }
    }
  },
  render: djangoComponent('header')
};

export const Extended = {
  args: {
    id: 'header-extended',
    ...defaultArgs,
    extended: true,
    megamenu: false,
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'header',
          props: { id: 'header-extended', ...defaultArgs, extended: true, megamenu: false }
        })
      }
    }
  },
  render: djangoComponent('header')
};

export const ExtendedWithMegamenu = {
  args: {
    id: 'header-extended-megamenu',
    ...defaultArgs,
    extended: true,
    megamenu: true,
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'header',
          props: { id: 'header-extended-megamenu', ...defaultArgs, extended: true, megamenu: true }
        })
      }
    }
  },
  render: djangoComponent('header')
};

export const WithMenuIcon = {
  args: {
    id: 'header-with-menu-icon',
    ...defaultArgs,
    useMenuIcon: true,
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'header',
          props: { id: 'header-with-menu-icon', ...defaultArgs, useMenuIcon: true }
        })
      }
    }
  },
  render: djangoComponent('header')
};

export const NoLogo = {
  args: {
    id: 'header-with-logo',
    ...defaultArgs,
    projectLogo: '',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'header',
          props: { id: 'header-with-logo', ...defaultArgs, projectLogo: '' }
        })
      }
    }
  },
  render: djangoComponent('header')
};

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
    ]
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'header',
          props: {
            id: 'header-minimal',
            projectTitle: 'Simple Site',
            navSections: [
              { title: 'Home', href: '/' },
              { title: 'About', href: '/about' },
            ]
          }
        })
      }
    }
  },
  render: djangoComponent('header')
};
