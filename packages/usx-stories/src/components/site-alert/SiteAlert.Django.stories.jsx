import config from '../../../../usx-react/src/components/site-alert/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './SiteAlert.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/SiteAlert',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const replaceOnDismiss = (storyDef) => {
    return {
      ...storyDef,
      onDismiss: "this.closest('.usa-site-alert').remove();"
    }
}

const createStory = createDjangoStory({ componentName: 'site-alert' });

export const StandardInfo = createStory(storyDefs.StandardInfo);
export const StandardEmergency = createStory(storyDefs.StandardEmergency);
export const NoHeader = createStory(storyDefs.NoHeader);
export const List = createStory(storyDefs.List);
export const Slim = createStory(storyDefs.Slim);
export const NoIcon = createStory(storyDefs.NoIcon);
export const Maintenance = createStory(storyDefs.Maintenance);
Maintenance.tags = ['USX'];
export const MaintenanceWarning = createStory(replaceOnDismiss(storyDefs.MaintenanceWarning));
MaintenanceWarning.tags = ['USX'];
export const DismissibleInfo = createStory(replaceOnDismiss(storyDefs.DismissibleInfo));
export const DismissibleEmergency = createStory(replaceOnDismiss(storyDefs.DismissibleEmergency));
export const DismissibleNoHeader = createStory(replaceOnDismiss(storyDefs.DismissibleNoHeader));
export const DismissibleList = createStory(replaceOnDismiss(storyDefs.DismissibleList));
export const DismissibleSlim = createStory(replaceOnDismiss(storyDefs.DismissibleSlim));
export const DismissibleNoIcon = createStory(replaceOnDismiss(storyDefs.DismissibleNoIcon));
export const DismissibleMaintenance = createStory(replaceOnDismiss(storyDefs.DismissibleMaintenance));
DismissibleMaintenance.tags = ['USX'];
export const DismissibleMaintenanceWarning = createStory(replaceOnDismiss(storyDefs.DismissibleMaintenanceWarning));
DismissibleMaintenanceWarning.tags = ['USX'];
