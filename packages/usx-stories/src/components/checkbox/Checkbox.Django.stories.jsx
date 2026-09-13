import React, { useEffect, useState } from 'react';
import config from '../../../../core/src/components/checkbox/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { fetchComponentHtml } from '../../utils/djangoComponent.js';
import { storyDefs } from './Checkbox.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Checkbox',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'checkbox' });

export const Default = createStory(storyDefs.Default);
export const Checked = createStory(storyDefs.Checked);
export const Tile = createStory(storyDefs.Tile);
export const Description = createStory(storyDefs.Description);
export const TileWithDescription = createStory(storyDefs.TileWithDescription);
export const Disabled = createStory(storyDefs.Disabled);
export const DisabledChecked = createStory(storyDefs.DisabledChecked);
export const DisabledTile = createStory(storyDefs.DisabledTile);
export const DisabledCheckedTile = createStory(storyDefs.DisabledCheckedTile);
export const Small = createStory(storyDefs.Small);
export const SmallTile = createStory(storyDefs.SmallTile);
export const SmallDisabled = createStory(storyDefs.SmallDisabled);
export const SmallCheckedDisabled = createStory(storyDefs.SmallCheckedDisabled);
export const SmallTileDisabled = createStory(storyDefs.SmallTileDisabled);
export const SmallCheckedTileDisabled = createStory(storyDefs.SmallCheckedTileDisabled);
export const WithOnChange = createStory(storyDefs.WithOnChange);
export const Required = createStory(storyDefs.Required);
export const Error = createStory(storyDefs.Error);
export const Success = createStory(storyDefs.Success);

// Composes checkbox + fieldset + form-group Django fragments to mirror the
// React GroupError story, since there's no single Django tag for a group of
// bare checkboxes wrapped in an errored fieldset/form-group.
const GroupErrorRender = () => {
  const [html, setHtml] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const checkboxes = await Promise.all([
          fetchComponentHtml('checkbox', { id: 'group-error-truth', name: 'group-error-figures', value: 'sojourner-truth', label: 'Sojourner Truth' }),
          fetchComponentHtml('checkbox', { id: 'group-error-douglass', name: 'group-error-figures', value: 'frederick-douglass', label: 'Frederick Douglass' }),
        ]);
        const fieldsetHtml = await fetchComponentHtml('fieldset', {
          legend: 'Select any historical figure',
          error: 'Select at least one option.',
          children: checkboxes.join('\n'),
        });
        const formGroupHtml = await fetchComponentHtml('form-group', { error: true, children: fieldsetHtml });
        if (active) {
          setHtml(formGroupHtml);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to render component');
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>Error rendering component: {error}</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export const GroupError = {
  render: () => <GroupErrorRender />,
};