import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './SiteAlert.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/SiteAlert',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory('site-alert');

export const StandardInfo = createStory(storyDefs.StandardInfo);
export const DismissibleInfo = createStory(storyDefs.DismissibleInfo);
export const StandardEmergency = createStory(storyDefs.StandardEmergency);
export const DismissibleEmergency = createStory(storyDefs.DismissibleEmergency);
export const NoHeader = createStory(storyDefs.NoHeader);
export const DismissibleNoHeader = createStory(storyDefs.DismissibleNoHeader);
export const List = createStory(storyDefs.List);
export const DismissibleList = createStory(storyDefs.DismissibleList);
export const Slim = createStory(storyDefs.Slim);
export const DismissibleSlim = createStory(storyDefs.DismissibleSlim);
export const NoIcon = createStory(storyDefs.NoIcon);
export const DismissibleNoIcon = createStory(storyDefs.DismissibleNoIcon);
export const Maintenance = createStory(storyDefs.Maintenance);
export const DismissibleMaintenance = createStory(storyDefs.DismissibleMaintenance);
export const MaintenanceWarning = createStory(storyDefs.MaintenanceWarning);
export const DismissibleMaintenanceWarning = createStory(storyDefs.DismissibleMaintenanceWarning);
