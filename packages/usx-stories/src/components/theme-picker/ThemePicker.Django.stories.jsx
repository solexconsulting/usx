import React from 'react';
import { storyDefs } from './ThemePicker.React.stories.jsx';
import config from '../../../../core/src/components/theme-picker/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { useGlobals } from 'storybook/preview-api';
import Alert from '../../../../core/src/components/alert/Alert.tsx';


export default {
    title: 'Django/USX/ThemePicker',
    tags: ['USX', 'autodocs'],
    argTypes: buildArgTypes(config.props || {}),
    decorators: [
        (Story) => {
            // Ensure the Storybook toolbar's global theme decorator is applied, so
            // this story's ThemePicker selection actually changes the colors.
            const [globals] = useGlobals();
            return (
                <div data-usx-theme={globals.theme}>
                    <div style={{ width: '100%', height: '100%', padding: '1rem', backgroundColor: 'var(--usx-surface-1)' }}>
                        <Alert
                            variant="info"
                            slim={true}
                            text={"This component is decorated with a background color and theme/state color boxes for demonstration purposes."}
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
                    </div>
                </div>
            );
        }
    ]
};

const createStory = createDjangoStory({ componentName: 'theme-picker' });

// onChange is a plain JS expression string (not a function) — the Django
// template inserts it verbatim into the select's onchange attribute.
// `__STORYBOOK_ADDONS_CHANNEL__` is the same channel `useGlobals` uses under
// the hood, so this drives the toolbar's global theme without any bundler.
export const Default = createStory({
    ...storyDefs.Default,
    onChange: "window.__STORYBOOK_ADDONS_CHANNEL__.emit('updateGlobals', { globals: { theme: this.value } })",
});

export const LightDark = createStory({
    ...storyDefs.LightDark,
    onChange: "window.__STORYBOOK_ADDONS_CHANNEL__.emit('updateGlobals', { globals: { theme: this.value } })",
});
