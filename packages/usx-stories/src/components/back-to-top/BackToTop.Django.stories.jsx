import React from 'react';
import config from '../../../../usx-react/src/components/back-to-top/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs, renderAllVariants } from './BackToTop.React.stories.jsx';

export default {
  title: 'Django/USX/BackToTop',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'back-to-top' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const Primary = createStory(toDjangoArgs(storyDefs.Primary));
export const IconOnlySmall = createStory(toDjangoArgs(storyDefs.IconOnlySmall));
export const IconOnlyLarge = createStory(toDjangoArgs(storyDefs.IconOnlyLarge));
export const LinkDefault = createStory(toDjangoArgs(storyDefs.LinkDefault));
export const DefaultIconLeft = createStory(toDjangoArgs(storyDefs.DefaultIconLeft));
export const PrimaryIconLeft = createStory(toDjangoArgs(storyDefs.PrimaryIconLeft));
export const LinkIconLeft = createStory(toDjangoArgs(storyDefs.LinkIconLeft));

const createOnDarkStory = createDjangoStory({
  componentName: 'back-to-top',
  wrapper: (payload, args, { mode }) => {
    if (mode === 'source') return `<div class="bg-primary-darkest padding-1">${payload}</div>`;
    return <div className="bg-primary-darkest padding-1" dangerouslySetInnerHTML={{ __html: payload }} />;
  },
});
export const LinkOnDark = createOnDarkStory({
  label: 'Back to top',
  href: '#back-to-top',
  iconPosition: 'right',
  iconSize: 2,
  className: 'text-white hover:text-accent-cool',
});

export const AllVariants = {
  render: () =>
    renderAllVariants((props) => {
      const args = toDjangoArgs(props);
      return createStory(args).render(args);
    }),
};
