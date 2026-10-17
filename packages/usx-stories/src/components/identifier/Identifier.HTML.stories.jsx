import React from 'react';
import { expect, within } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/identifier/identifier.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/identifier/identifier.django-snapshot.html?raw';

export default {
  title: 'HTML/USWDS/Identifier',
  tags: ['USWDS', 'autodocs'],
};

// Each variant is an h3 followed by its identifier root.
const identifierFor = (canvasElement, title) => {
  const heading = [...canvasElement.querySelectorAll('h3.site-preview-heading')].find(
    (element) => element.textContent === title
  );
  return heading.nextElementSibling;
};

const testSolex = async ({ canvasElement }) => {
  const disclaimer = identifierFor(canvasElement, 'Solex').querySelector(
    '.usa-identifier__identity-disclaimer'
  );
  await expect(disclaimer).toHaveTextContent('official website of SOLEX Consulting LLC');
  await expect(disclaimer).not.toHaveTextContent('the SOLEX Consulting LLC');
};

const testMixedArticle = async ({ canvasElement }) => {
  const disclaimer = identifierFor(
    canvasElement,
    'Multiple Parents And Avatars Mixed Article'
  ).querySelector('.usa-identifier__identity-disclaimer');
  await expect(disclaimer).toHaveTextContent(
    'official website of the <Parent agency> and SOLEX Consulting LLC'
  );
};

const testAvatarVariants = async ({ canvasElement }) => {
  const identifier = identifierFor(canvasElement, 'Avatar Variants');
  const scope = within(identifier);
  await expect(
    identifier.querySelector('.usa-identifier__logo.height-auto .usx-avatar__img')
  ).toHaveClass('usa-identifier__logo-img', 'usx-rounded-lg');
  const initials = scope.getByRole('link', { name: 'United States' });
  await expect(initials).toHaveAttribute('href', '#agency');
  await expect(initials.querySelector('.usx-avatar__content')).toHaveClass(
    'usx-avatar__content',
    'usx-circle'
  );
  await expect(initials.querySelector('.usx-avatar__content')).toHaveTextContent('US');
  await expect(
    scope.getByRole('link', { name: 'Agency account' }).querySelector('svg')
  ).toBeInTheDocument();
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play: async (context) => {
    const step = (name, fn) => context.step(name, fn);
    await step('Solex', () => testSolex(context));
    await step('Multiple Parents And Avatars Mixed Article', () => testMixedArticle(context));
    await step('Avatar Variants', () => testAvatarVariants(context));
  },
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
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play: AllVariantsReact.play,
};
