import React from 'react';
import { useGlobals } from 'storybook/preview-api';
import ThemePicker from '../../../../core/src/components/theme-picker/ThemePicker.tsx';
import config from '../../../../core/src/components/theme-picker/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import { PRESETS } from '../../utils/themePresets.js';
import Alert from '../../../../core/src/components/alert/Alert.tsx';

const PRESET_NAMES = Object.keys(PRESETS);
// Same theme names as the toolbar. ThemePicker itself only renders the
// select — applying a theme (here, via `applyStandaloneTheme` below) is the
// installation's job.
const THEMES = PRESET_NAMES.map((name) => ({ value: name, label: name }));
const LIGHTDARKTHEMES = [
    { value: 'Aurora', label: 'Light' },
    { value: 'Borealis', label: 'Dark' },
]

export const storyDefs = {
    Default: {
        id: 'theme-picker-1',
        label: 'Theme',
        themes: THEMES,
        defaultValue: 'Default',
    },
    LightDark: {
        id: 'theme-picker-2',
        label: 'Theme',
        themes: LIGHTDARKTHEMES,
        defaultValue: 'Aurora',
    },
};

export default {
    title: 'React/USX/ThemePicker',
    component: ThemePicker,
    tags: ['USX', 'autodocs'],
    argTypes: buildArgTypes(config.props || {}),
    excludeStories: ['storyDefs'],
    decorators: [
        (Story) => {
            // Subscribe to Storybook globals so the toolbar theme decorator re-applies
            // when this story's ThemePicker changes the selection.
            useGlobals();
            return (
                <>
                    <Alert
                        variant="info"
                        slim={true}
                        text={"This story is decorated with a background color and theme/state color boxes for demonstration purposes."}
                        className="margin-bottom-2"
                    />
                    <Story />
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <div style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-primary)' }} />
                        <div style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-secondary)' }} />
                        <div style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-accent-cool)' }} />
                        <div style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-accent-warm)' }} />
                        <div style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-info)' }} />
                        <div style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-success)' }} />
                        <div style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-warning)' }} />
                        <div style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-error)' }} />
                        <div style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-surface-2)' }} />
                        <div style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-surface-3)' }} />
                    </div>
                </>
            );
        }
    ]
};

export const Default = {
    render: (args) => {
        const [globals, updateGlobals] = useGlobals();
        return (
            <ThemePicker
                {...args}
                themes={THEMES}
                value={globals.theme}
                onChange={(next) => updateGlobals({ theme: next })}
            />
        );
    },
};

export const LightDark = {
    render: (args) => {
        const [globals, updateGlobals] = useGlobals();
        return (
            <ThemePicker
                {...args}
                themes={LIGHTDARKTHEMES}
                value={globals.theme}
                onChange={(next) => updateGlobals({ theme: next })}
            />
        );
    },
};