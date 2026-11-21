import { hostClickDemo } from './backToTopDemo.jsx';
import React from 'react';
import config from '../../../../usx-react/src/components/back-to-top/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs, renderAllVariants } from './BackToTop.React.stories.jsx';

export default {
  decorators: [hostClickDemo],
  title: 'Django/USX/BackToTop',
  tags: ['USX', 'autodocs'],
  // An inferred onClick would turn every default link into a button.
  parameters: { actions: { argTypesRegex: null } },
  argTypes: { ...buildArgTypes(config.props || {}), onClick: { control: 'boolean' } },
};

const createStory = createDjangoStory({ componentName: 'back-to-top' });

export const Default = createStory(storyDefs.Default);
export const IconLeft = createStory(storyDefs.IconLeft);
export const IconOnlySmall = createStory(storyDefs.IconOnlySmall);
export const IconOnlyLarge = createStory(storyDefs.IconOnlyLarge);

const createOnDarkStory = createDjangoStory({
  componentName: 'back-to-top',
  wrapper: (payload, args, { mode }) => {
    if (mode === 'source') return `<div class="bg-surface-inverse padding-1">${payload}</div>`;
    return (
      <div className="bg-surface-inverse padding-1" dangerouslySetInnerHTML={{ __html: payload }} />
    );
  },
});
export const LinkOnDark = createOnDarkStory({ inverse: true });

export const CustomHref = createStory(storyDefs.CustomHref);
export const WithOnClick = createStory(storyDefs.WithOnClick);

export const AllVariants = {
  render: () => renderAllVariants((props) => createStory(props).render(props)),
};
