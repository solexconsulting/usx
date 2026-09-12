import config from '../../../../core/src/components/file-list/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './FileList.React.stories.jsx';

export default {
  title: 'Django/USX/FileList',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'file-list' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const WithDownloadLink = createStory(toDjangoArgs(storyDefs.WithDownloadLink));
export const CustomHint = createStory(toDjangoArgs(storyDefs.CustomHint));
export const Disabled = createStory(toDjangoArgs(storyDefs.Disabled));
export const NoOnRemove = createStory(toDjangoArgs(storyDefs.NoOnRemove));
export const LongFileName = createStory(toDjangoArgs(storyDefs.LongFileName));
