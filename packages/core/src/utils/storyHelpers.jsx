/*
An array of helpers for story rendering.
*/

import { djangoComponent, fetchComponentHtml } from './djangoComponent.js';
import React from 'react';

export const getComponentHtml = async (componentName, props) => {
    return fetchComponentHtml(componentName, props);
};

export const componentTag = ({ name, props, children=null }) => {
    const formattedProps = Object.entries(props)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => {
            const jsonStr = JSON.stringify(value, null, 4);
            const lines = jsonStr.split('\n');
            // Indent continuation lines (first line has prop indent, rest get extra JSON indent)
            const formatted = lines
                .map((line, i) => i === 0 ? line : '    ' + line)
                .join('\n');
            return `    ${key}=${formatted}`;
        })
        .join('\n');

    if (children) {
        return `{% ${name}\n${formattedProps}\n%}\n  ${children}\n{% end${name} %}`;
    }
    return `{% ${name}\n${formattedProps}\n%}{% end${name} %}`;
}

export const buildArgTypes = (props = {}) => {
    const argTypes = {};
    Object.entries(props).forEach(([name, meta]) => {
        const type = (meta && meta.type) || null;
        if (type === 'select') {
            argTypes[name] = {
                type: { name: 'select' },
                control: { type: 'select' },
                options: meta.options || []
            };
        } else if (type === 'boolean') {
            argTypes[name] = {
                type: { name: 'boolean' },
                control: { type: 'boolean' }
            };
        } else if (type === 'object') {
            argTypes[name] = {
                type: { name: 'object' },
                control: { type: 'object' }
            };
        } else if (type === 'string') {
            argTypes[name] = {
                type: { name: 'string' },
                control: { type: 'text' }
            };
        } else {
            argTypes[name] = {
                type: { name: 'string' },
                control: { type: 'text' }
            };
        }
    if (meta && meta.description) {
        argTypes[name].description = meta.description;
    }
});
return argTypes;
};

const getSnakeCase = (str) => {
    return str.replace(/-/g, '_').toLowerCase();
};

/**
 * Returns a story factory bound to a Django component name.
 * Call once with the component name, then use the returned function per story.
 *
 * Usage:
 *   const createStory = createDjangoStory('my-component');
 *   export const Default = createStory(storyDefs.Default);
 */
export const createDjangoStory = (componentName, postRender=null) => (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: getSnakeCase(componentName), props: args }),
      },
    },
  },
  render: djangoComponent(componentName, postRender),
});

export const createBulkDjangoStory = (componentName, storyDefs, postRender=null, wrapper=null) => {
    
    const createStory = createDjangoStory(componentName, postRender);

    const Wrapper = ({ children }) => {
        if (wrapper) {
            return wrapper({children});
        }
        return (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {children}
            </div>
        );
    };

    return {
    args: {},
    parameters: {
        docs: {
            source: {
                code: storyDefs?.map((props) => {
                    return componentTag({ name: componentName, props: props.props || props });
                }).join('\n\n'),
            },
        },
    },
    render: () => (
        <Wrapper>
            {storyDefs?.map((props, index) => (
                <>
                    {props.storyName ? (
                        <div className="display-flex flex-column flex-align-center color-inherit" key={index}>
                            <h4 className="color-inherit">{props.storyName}</h4>
                            {createStory(props.props || props).render(props.props || props)}
                        </div>
                    ) : (
                        createStory(props.props || props).render(props.props || props)
                    )}
                </>
            ))}
        </Wrapper>
    )

}}
