/*
An array of helpers for story rendering.
*/

import { djangoComponent, fetchComponentHtml } from './djangoComponent.js';
import React from 'react';

export const getComponentHtml = async (componentName, props) => {
    return fetchComponentHtml(componentName, props);
};

const addLineBreaksToDjangoComponentTag = (tag) => {
    const selfClosingTagPattern = /{%\s*(\w+)([^%]*)%}/g;
    return tag.replace(selfClosingTagPattern, (match, componentName, props) => {
        const formattedProps = props
            .split(/\s+/)
            .filter(Boolean)
            .map(prop => `  ${prop}`)
            .join('\n');
        return `{% ${componentName}\n${formattedProps}\n%}`;
    });
};

export const componentTag = ({ name, props, children=null }) => {
    const propsString = Object.entries(props)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => ` ${key}=${JSON.stringify(value)}`)
        .join('');
    const tag = children
        ? `{% ${name} ${propsString} %}\n  ${children}\n{% end${name} %}`
        : `{% ${name} ${propsString} %}{% end${name} %}`;
    return addLineBreaksToDjangoComponentTag(tag);
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
        code: componentTag({ name: componentName, props: args }),
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
