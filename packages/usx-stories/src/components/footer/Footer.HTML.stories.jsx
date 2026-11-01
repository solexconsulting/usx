import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/footer/footer.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/footer/footer.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs, borderRoleVars } from './Footer.React.stories.jsx';
import { createAllVariantsPlay } from '../../utils/playHelpers.js';
import { uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { FooterInitOnce } from './footerInit.jsx';

export default {
  title: 'HTML/USWDS/Footer',
  tags: ['USWDS', 'autodocs'],
  decorators: [FooterInitOnce],
  parameters: { docs: { description: { component: uswdsInitNote('`footer.init()`') } } },
};

const checkLinks = async (links, expected) => {
  await expect(links).toHaveLength(expected.length);
  for (const [index, link] of links.entries()) {
    await expect(link).toHaveAttribute('href', expected[index].href);
    await expect(link).toHaveTextContent(expected[index].text);
    if (expected[index].ariaLabel) await expect(link).toHaveAccessibleName(expected[index].ariaLabel);
  }
};

const checkFooter = (def, key) => async (section) => {
  const footer = section.matches('footer') ? section : section.querySelector('footer');
  await expect(footer).not.toBeNull();
  await expect(footer).toHaveClass('usa-footer', 'usx-footer');
  for (const variant of ['big', 'slim']) {
    await (def.variant === variant ? expect(footer) : expect(footer).not).toHaveClass(`usa-footer--${variant}`);
  }

  const returnLink = footer.querySelector('.usa-footer__return-to-top a.usx-footer__return-to-top');
  if (def.returnToTop === false) {
    await expect(returnLink).toBeNull();
  } else {
    await expect(returnLink).toHaveAttribute('href', def.returnToTopHref ?? '#');
    await expect(returnLink).toHaveAccessibleName(def.returnToTopLabel ?? 'Return to top');
    await expect(returnLink.querySelector('use').getAttribute('href')).toMatch(/#arrow_upward$/);
  }

  const primary = footer.querySelector(':scope > .usa-footer__primary-section');
  const secondary = footer.querySelector(':scope > .usa-footer__secondary-section');
  await expect(primary).not.toBeNull();
  await expect(Boolean(secondary)).toBe(def.variant !== 'slim' || Boolean(def.branding));

  const nav = primary.querySelector('nav.usa-footer__nav');
  if (def.navColumns?.length) {
    await expect(nav).toHaveAccessibleName('Footer navigation');
    const columns = [...nav.querySelectorAll('.usx-footer__nav-column')];
    await expect(columns).toHaveLength(def.navColumns.length);
    for (const [index, column] of columns.entries()) {
      await expect(column.querySelector('h4')).toHaveTextContent(def.navColumns[index].heading);
      await checkLinks([...column.querySelectorAll('li > a')], def.navColumns[index].links);
    }
  } else if (def.navLinks?.length) {
    await expect(nav).toHaveAccessibleName(key === 'Custom Composition' ? 'Custom footer nav' : 'Footer navigation');
    await checkLinks([...nav.querySelectorAll('li > a')], def.navLinks);
  } else {
    await expect(nav).toBeNull();
  }

  const signUp = primary.querySelector('.usx-footer__sign-up');
  if (def.signUp) {
    await expect(signUp.querySelector('h3')).toHaveTextContent(def.signUp.heading);
    const email = signUp.querySelector('input[type="email"]');
    await expect(email).toHaveAttribute('name', 'email');
    await expect(email).toHaveAccessibleName(def.signUp.emailLabel);
    await expect(signUp.querySelector('button[type="submit"]')).toHaveTextContent(def.signUp.buttonText);
  } else {
    await expect(signUp).toBeNull();
  }

  const logo = footer.querySelector('.usa-footer__logo');
  await expect(Boolean(logo)).toBe(Boolean(def.branding) || key === 'Custom Composition');
  if (logo) await expect(logo.querySelector('img[alt="Agency Name"]')).not.toBeNull();

  const social = [...footer.querySelectorAll('.usa-social-link')];
  await expect(social).toHaveLength(def.socialLinks?.length ?? 0);
  for (const [index, link] of social.entries()) {
    await expect(link).toHaveAttribute('href', def.socialLinks[index].href);
    await expect(link).toHaveAccessibleName(def.socialLinks[index].alt);
    await expect(link.querySelector('img')).toHaveAttribute('alt', def.socialLinks[index].alt);
  }

  const contact = footer.querySelector('address.usx-footer__contact');
  const hasContact = Boolean(def.contactHeading || def.contactPhone || def.contactEmail || def.contactLinks?.length);
  await expect(Boolean(contact)).toBe(hasContact);
  if (contact) {
    if (def.contactHeading && def.variant !== 'slim') await expect(contact.querySelector('.usa-footer__contact-heading')).toHaveTextContent(def.contactHeading);
    const expected = [def.contactPhone, def.contactEmail, ...(def.contactLinks ?? [])].filter(Boolean);
    await checkLinks([...contact.querySelectorAll('a')], expected);
    await expect(Boolean(primary.contains(contact))).toBe(def.variant === 'slim');
  }

  if (key === 'Custom Composition') {
    await expect(primary.firstElementChild).toBe(nav);
    await expect(secondary.querySelector('.usa-footer__contact-links')).not.toBeNull();
    await expect(secondary.querySelector('.grid-row').style.alignItems).toBe('center');
  }
  if (key === 'Border Roles') {
    for (const [property, value] of Object.entries(borderRoleVars)) {
      await expect(section.style.getPropertyValue(property)).toBe(value);
    }
  }
};

const checks = {
  'Big Footer': checkFooter(storyDefs.Big, 'Big Footer'),
  'Medium Footer': checkFooter(storyDefs.Medium, 'Medium Footer'),
  Slim: checkFooter(storyDefs.Slim, 'Slim'),
  'Logo Only': checkFooter(storyDefs.LogoOnly, 'Logo Only'),
  'No Nav': checkFooter(storyDefs.NoNav, 'No Nav'),
  Minimal: checkFooter(storyDefs.Minimal, 'Minimal'),
  'Primary Only': checkFooter(storyDefs.PrimaryOnly, 'Primary Only'),
  'Border Roles': checkFooter(storyDefs.Big, 'Border Roles'),
  'Custom Composition': checkFooter(storyDefs.CustomComposition, 'Custom Composition'),
};

const play = createAllVariantsPlay(checks);

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />;
  },
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: {
    docs: {
      source: {
        code: djangoSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />;
  },
  play,
};
