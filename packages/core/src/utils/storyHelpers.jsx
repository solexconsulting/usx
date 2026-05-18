/*
An array of helpers for story rendering.
*/

import { djangoComponent, fetchComponentHtml, useDjangoRenderedHtml } from './djangoComponent.js';
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

    let finalContent;

    if (content) {
        finalContent = `${openTag}
  ${content}
{% end${componentName} %}`;
    }

    else {
        finalContent = `${openTag}{% end${componentName} %}`;
    }

    return finalContent;
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
 *   const createStory = createDjangoStory({ componentName: 'my-component' });
 *   export const Default = createStory(storyDefs.Default);
 *
 * With wrapper context:
 *   const createStory = createDjangoStory(
 *     {
 *       componentName: 'my-component',
 *       wrapper: (payload, args, { mode }) => {
 *         if (mode === 'source') {
 *           return `<section>${payload}</section>`;
 *         }
 *         return <section dangerouslySetInnerHTML={{ __html: payload }} />;
 *       },
 *     }
 *   );
 *
 * Renderer options (optional `renderOptions`):
 *   { executeScripts: boolean, replayGlobalEvents: boolean }
 */
export const createDjangoStory = ({
    componentName,
    postRender = null,
    wrapper = null,
    renderOptions = null,
}) => {
    if (!componentName) {
        throw new Error('createDjangoStory requires an options object with componentName');
    }

    const baseRender = !wrapper
        ? djangoComponent({ componentName, postRender, renderOptions })
        : null;

    const applyWrapperForSource = (baseCode, args) => {
        if (!wrapper) {
            return baseCode;
        }

        const wrappedCode = wrapper(baseCode, args, { mode: 'source' });
        return typeof wrappedCode === 'string' ? wrappedCode : baseCode;
    };

    const applyWrapperForRender = (html, args) => {
        return wrapper(html, args, { mode: 'render' });
    };

    const WrappedDjangoHtml = ({ storyArgs }) => {
        const { html, error } = useDjangoRenderedHtml(componentName, storyArgs);

        if (error) {
            return <div style={{ color: 'red' }}>Error rendering component: {error}</div>;
        }

        return applyWrapperForRender(html, storyArgs);
    };

    return (args) => ({
        args,
        parameters: {
            docs: {
                source: {
                    code: (() => {
                        const baseCode = componentTag({ name: componentName, props: args, children: null });
                        return applyWrapperForSource(baseCode, args);
                    })(),
                },
            },
        },
        render: (storyArgs) => {
            if (!wrapper) {
                return baseRender(storyArgs);
            }

            return <WrappedDjangoHtml storyArgs={storyArgs} />;
        },
    });
};

export const createBulkDjangoStory = (componentName, storyDefs, postRender = null, wrapper = null) => {

    const createStory = createDjangoStory({ componentName, postRender });

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
                    <React.Fragment key={props.storyName || index}>
                        {props.storyName ? (
                            <div className="display-flex flex-column flex-align-center color-inherit">
                                <h4 className="color-inherit">{props.storyName}</h4>
                                {createStory(props.props || props).render(props.props || props)}
                            </div>
                        ) : (
                            createStory(props.props || props).render(props.props || props)
                        )}
                    </React.Fragment>
                ))}
            </Wrapper>
        )

    }
}
