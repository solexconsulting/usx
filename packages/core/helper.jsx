
/*
An array of helpers for story rendering.
*/

import { djangoComponent } from './djangoComponent.js';

export const componentTag = ({ name, props }) => {
    const propsString = Object.entries(props)
        .map(([key, value]) => ` ${key}="${value}"`)
        .join('');
    return `{% ${name} ${propsString} %}`;
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

/**
 * Returns a story factory bound to a Django component name.
 * Call once with the component name, then use the returned function per story.
 *
 * Usage:
 *   const createStory = createDjangoStory('my-component');
 *   export const Default = createStory(storyDefs.Default);
 */
export const createDjangoStory = (componentName) => (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: componentName, props: args }),
      },
    },
  },
  render: djangoComponent(componentName),
});


