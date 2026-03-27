
/*
An array of helpers for story rendering.
*/

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
