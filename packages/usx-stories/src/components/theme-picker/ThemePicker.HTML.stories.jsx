import React from 'react';
import html from '../../../../core/src/components/theme-picker/theme-picker.html?raw';
import { useGlobals } from 'storybook/preview-api';
import Alert from '../../../../core/src/components/alert/Alert.tsx';

export default {
    title: 'HTML/USX/ThemePicker',
    tags: ['USX', 'autodocs'],
    decorators: [
        (Story) => {
            // Ensure the Storybook toolbar's global theme decorator is applied, so
            // this story's ThemePicker selection actually changes the colors.
            const [globals] = useGlobals();
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

export const AllVariants = {
    parameters: {
        docs: {
            source: {
                code: html
            }
        }
    },
    render: () => {
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
}
