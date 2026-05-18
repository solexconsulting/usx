/*
An array of helpers for story rendering.
*/

import { djangoComponent, fetchComponentHtml } from './djangoComponent.js';
import React from 'react';

export const getComponentHtml = async (componentName, props) => {
    return fetchComponentHtml(componentName, props);
};

export const getFormattedProps = (props) => {
    return Object.entries(props)
        .filter(([key, value]) =>
            value !== undefined &&
            value !== null &&
            key !== 'children'
        )
        .map(([key, value]) => {
            return `    ${key}=${JSON.stringify(value, null, 4)}`;
        })
        .join('\n');
};

export const componentTag = ({ name, props, children = null }) => {
    const formattedProps = getFormattedProps(props);
    const hasProps = formattedProps.length > 0;
    const content = children || props.children;

    const componentName = getSnakeCase(name);

    let openTag = `{% ${componentName}`;

    if (hasProps) {
        openTag += `\n${formattedProps}\n%}`;
    } else {
        openTag += ` %}`;
    }

    if (content) {
        return `${openTag}
  ${content}
{% end${componentName} %}`;
    }

    return `${openTag}{% end${componentName} %}`;
};

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
 *
 * With wrapper context:
 *   const createStory = createDjangoStory(
 *     'my-component',
 *     null,
 *     (component) => <section>{component}</section>
 *   );
 */
export const createDjangoStory = (componentName, postRender = null, wrapper = null) => {
    const baseRender = djangoComponent(componentName, postRender);

    return (args) => ({
        args,
        parameters: {
            docs: {
                source: {
                    code: componentTag({ name: componentName, props: args }),
                },
            },
        },
        render: (storyArgs) => {
            const component = baseRender(storyArgs);
            return wrapper ? wrapper(component, storyArgs) : component;
        },
    });
};

export const createBulkDjangoStory = (componentName, storyDefs, postRender = null, wrapper = null) => {

    const createStory = createDjangoStory(componentName, postRender);

    const Wrapper = ({ children }) => {
        if (wrapper) {
            return wrapper({ children });
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

    }
}
