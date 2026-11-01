import config from '../../../../usx-react/src/components/file-input/config.json';
import { buildArgTypes, createDjangoStory, componentInit, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import {
  storyDefs,
  PreloadedSingle as PreloadedSingleReactStory,
  PreloadedMultiple as PreloadedMultipleReactStory,
  ManagedMultiple as ManagedMultipleReactStory,
  PreloadedDownloadable as PreloadedDownloadableReactStory,
  PreloadedNotDownloadable as PreloadedNotDownloadableReactStory,
  PreloadedDisabled as PreloadedDisabledReactStory,
  PreloadedNameOnly as PreloadedNameOnlyReactStory,
  LongFileName as LongFileNameReactStory,
} from './FileInput.React.stories.jsx';

export default {
  title: 'Django/USWDS/FileInput',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  parameters: { docs: { description: { component: uswdsInitNote('`fileInput.init()`') } } },
  decorators: [...componentInit('fileInput')],
};

const createStory = createDjangoStory({ componentName: 'file-input' });

export const Default = createStory(storyDefs.Default);
export const AcceptSpecificTypes = createStory(storyDefs.AcceptSpecificTypes);
export const AcceptImages = createStory(storyDefs.AcceptImages);
export const Multiple = createStory(storyDefs.Multiple);
export const WithError = createStory(storyDefs.WithError);
export const Disabled = createStory(storyDefs.Disabled);
export const PreloadedSingle = createStory(PreloadedSingleReactStory.args);
export const PreloadedMultiple = createStory(PreloadedMultipleReactStory.args);
export const ManagedMultiple = createStory(ManagedMultipleReactStory.args);
export const PreloadedDownloadable = createStory(PreloadedDownloadableReactStory.args);
export const PreloadedNotDownloadable = createStory(PreloadedNotDownloadableReactStory.args);
export const PreloadedDisabled = createStory(PreloadedDisabledReactStory.args);
export const PreloadedNameOnly = createStory(PreloadedNameOnlyReactStory.args);
export const LongFileName = createStory(LongFileNameReactStory.args);
