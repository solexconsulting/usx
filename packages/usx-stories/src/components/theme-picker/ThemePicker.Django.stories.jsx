import React, { useEffect } from 'react';
import { storyDefs } from './ThemePicker.React.stories.jsx';
import config from '../../../../usx-react/src/components/theme-picker/config.json';
import { buildArgTypes, componentInit, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { applyStoryTheme } from '../../utils/storyTheme.js';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';

export default {
  excludeStories: ['Unenhanced'],
  title: 'Django/USX/ThemePicker',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  decorators: [
    ...componentInit('themePicker'),
    (Story) => {
      useEffect(() => {
        const change = (event) => {
          if (event.target.matches('.usx-theme-picker select')) {
            applyStoryTheme(event.target.value);
          }
        };
        document.addEventListener('change', change);
        return () => document.removeEventListener('change', change);
      }, []);
      return (
        <>
          <Alert
            variant="info"
            slim={true}
            text={
              'This story is decorated with a background color and theme/state color boxes for demonstration purposes.'
            }
            className="margin-bottom-2"
          />
          <Story />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-primary)' }}
            />
            <div
              style={{
                height: '1rem',
                width: '2rem',
                backgroundColor: 'var(--usx-color-secondary)',
              }}
            />
            <div
              style={{
                height: '1rem',
                width: '2rem',
                backgroundColor: 'var(--usx-color-accent-cool)',
              }}
            />
            <div
              style={{
                height: '1rem',
                width: '2rem',
                backgroundColor: 'var(--usx-color-accent-warm)',
              }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-info)' }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-success)' }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-warning)' }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-error)' }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-surface-2)' }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-surface-3)' }}
            />
          </div>
        </>
      );
    },
  ],
};

const createStory = createDjangoStory({ componentName: 'theme-picker' });

export const Default = createStory(storyDefs.Default);
export const Unenhanced = {
  ...createStory(storyDefs.Unenhanced),
  parameters: {
    docs: {
      description: {
        story:
          'Without USX JavaScript, the native theme select stays visible and usable. The palette trigger and confirmation control are unavailable.',
      },
    },
  },
};

export const LightDark = createStory(storyDefs.LightDark);
export const GhostSelect = createStory(storyDefs.GhostSelect);
export const Swap = createStory(storyDefs.Swap);

export const WithValue = createStory(storyDefs.WithValue);
