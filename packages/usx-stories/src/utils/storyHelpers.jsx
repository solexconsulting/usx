import PropTypes from 'prop-types';
import { djangoComponent, fetchStorySource, storyTree, useDjangoRenderedHtml } from './djangoComponent.js';
import React from 'react';
import { parseFragment, serialize } from 'parse5';

// Story contracts store rich sample content as HTML; turn it back into React
// nodes for React Default stories without adding HTML parsing to components.
export const storyDefaultArgs = (value) => {
    if (Array.isArray(value)) return value.map(storyDefaultArgs);
    if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, storyDefaultArgs(item)]));
    }
    if (typeof value !== 'string' || !/<[a-z][\s\S]*>/i.test(value)) return value;
    const nodes = parseFragment(value).childNodes.map((node, index) => {
        if (node.nodeName === '#text') return node.value;
        if (!node.tagName) return null;
        const attributes = Object.fromEntries(node.attrs.map(({ name, value: text }) => {
            if (name === 'style') {
                const style = Object.fromEntries(text.split(';').filter(Boolean).map((declaration) => {
                    const [property, ...rest] = declaration.split(':');
                    return [property.trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), rest.join(':').trim()];
                }));
                return ['style', style];
            }
            if (name === 'class') return ['className', text];
            if (name === 'for') return ['htmlFor', text];
            if (['checked', 'disabled', 'hidden', 'open', 'required', 'selected', 'multiple', 'autofocus'].includes(name)) {
                return [name === 'autofocus' ? 'autoFocus' : name, true];
            }
            return [name, text];
        }));
        const content = serialize(node);
        return React.createElement(node.tagName, {
            ...attributes,
            key: index,
            ...(content ? { dangerouslySetInnerHTML: { __html: content } } : {}),
        });
    });
    return nodes.length === 1 ? nodes[0] : React.createElement(React.Fragment, null, ...nodes);
};

const componentLoaders = {
    accordion: () => import('@uswds/uswds/js/usa-accordion'),
    banner: () => import('@uswds/uswds/js/usa-banner'),
    carousel: () => import('@solexllc/usx/js/carousel'),
    dataTable: () => import('@solexllc/usx/js/data-table'),
    characterCount: () => import('@uswds/uswds/js/usa-character-count'),
    combobox: () => import('@uswds/uswds/js/usa-combo-box'),
    datePicker: () => import('@uswds/uswds/js/usa-date-picker'),
    dateRangePicker: () => import('@uswds/uswds/js/usa-date-range-picker'),
    fileInput: () => import('@uswds/uswds/js/usa-file-input'),
    navigation: () => import('@uswds/uswds/js/usa-header'),
    inPageNavigation: () => import('@uswds/uswds/js/usa-in-page-navigation'),
    languageSelector: () => import('@uswds/uswds/js/usa-language-selector'),
    modal: () => import('@uswds/uswds/js/usa-modal').then(({ default: modal }) => ({
        init(root) {
            root.querySelectorAll('.usa-modal[id]').forEach((element) => modal.init(element));
        },
    })),
    range: () => import('@uswds/uswds/js/usa-range'),
    themePicker: () => import('@solexllc/usx/js/theme-picker'),
    table: () => import('@uswds/uswds/js/usa-table').then(({ default: table }) => ({
        init(root) {
            [...(root.matches?.('.usa-table') ? [root] : []), ...root.querySelectorAll('.usa-table')].forEach((element) => {
                if (element.querySelector('th[data-sortable]:not(:has(.usa-table__header__button))')) table.init(element);
            });
        },
    })),
    timePicker: () => import('@uswds/uswds/js/usa-time-picker'),
};

export const loadComponentInitializers = async (...names) => {
    const modules = await Promise.all(names.map((name) => {
        if (!componentLoaders[name]) throw new Error(`Unknown component initializer: ${name}`);
        return componentLoaders[name]();
    }));
    const components = modules.map((module) => module.default || module);
    return (root, withEvents = false) => components.forEach((component) => {
        if (withEvents && component.on) component.on(root);
        else component.init(root);
    });
};

export const componentInit = (...names) => {
    const options = typeof names[names.length - 1] === 'object' ? names.pop() : {};
    names.forEach((name) => {
        if (!componentLoaders[name]) throw new Error(`Unknown component initializer: ${name}`);
    });

    function ComponentInitDecorator(Story) {
        React.useEffect(() => {
            let observer;
            let active = true;

            loadComponentInitializers(...names).then((init) => {
                if (!active) return;

                observer = new MutationObserver((records) => {
                    const roots = new Set();
                    records.forEach(({ addedNodes }) => addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE && node.isConnected) {
                            roots.add(node);
                        }
                    }));
                    roots.forEach((root) => init(root));
                });
                observer.observe(document.body, { childList: true, subtree: true });
                init(document.body);
                // Lets play functions wait for the USWDS scripts, which load asynchronously.
                document.body.dataset.usxReady = 'true';
                options.onReady?.();
            });

            return () => {
                active = false;
                observer?.disconnect();
                delete document.body.dataset.usxReady;
            };
        }, []);

        return <Story />;
    }

    ComponentInitDecorator.initializers = names;

    return [ComponentInitDecorator];
};

// Appended to (or used as) a story's docs.description.component for any
// component whose decorator calls USWDS's `.init()` — tells consumers they
// own that same call in their own app. `calls` is the init call(s) this
// story's decorator makes, e.g. '`comboBox.init()`'.
export const uswdsInitNote = (calls) =>
    `This story's decorator calls ${calls} to enhance the USWDS markup above. ` +
    "Your application is responsible for doing the same wherever this component's " +
    "markup mounts or updates. See **Documentation/USX React → USWDS JS " +
    "Initialization** for the full picture — in most apps (and in this " +
    "Storybook) something has already called `.on()` globally, so `.init()` " +
    "is all you need; you only own calling `.on()` yourself if you're not " +
    "using that global setup.";

export const buildArgTypes = (props = {}) => {
    return Object.fromEntries(Object.entries(props).map(([name, meta]) => {
        const kind = ['select', 'boolean', 'array', 'object'].includes(meta?.type) ? meta.type : 'string';
        const argType = {
            type: kind === 'array'
                ? { name: 'array', value: { name: 'other', value: 'unknown' } }
                : { name: kind },
            control: { type: ['array', 'object'].includes(kind) ? 'object' : kind === 'string' ? 'text' : kind },
        };
        if (kind === 'select') argType.options = meta.options || [];
        if (meta?.description) argType.description = meta.description;
        return [name, argType];
    }));
};

/** Render a Django story and fetch the same template for its source block. */
export const createDjangoStory = ({
    componentName,
    wrapper = null,
    renderTree = null,
}) => {
    if (!componentName) throw new Error('createDjangoStory requires an options object with componentName');

    const treeFor = (args) => storyTree(componentName, args, renderTree);
    const requestFor = (args) => ({ __usxStoryTree: treeFor(args) });
    const baseRender = wrapper ? null : djangoComponent({ componentName });

    const WrappedDjangoHtml = ({ storyArgs }) => {
        const { html, error } = useDjangoRenderedHtml(componentName, requestFor(storyArgs));

        if (error) {
            return <div className="usa-error-message usx-error-message">Error rendering component: {error}</div>;
        }

        return wrapper(html, storyArgs, { mode: 'render' });
    };

    WrappedDjangoHtml.propTypes = { storyArgs: PropTypes.object };

    return (args) => ({
        args,
        parameters: {
            docs: {
                source: {
                    transform: async (_code, context) => {
                        const source = await fetchStorySource(componentName, treeFor(context.args));
                        if (!wrapper) return source;
                        const wrapped = wrapper(source, context.args, { mode: 'source' });
                        return typeof wrapped === 'string' ? wrapped : source;
                    },
                },
            },
        },
        render: (storyArgs) => wrapper
            ? <WrappedDjangoHtml storyArgs={storyArgs} />
            : baseRender(requestFor(storyArgs)),
    });
};

export const createBulkDjangoStory = (componentName, storyDefs, wrapper = null) => {

    const createStory = createDjangoStory({ componentName });

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
    Wrapper.propTypes = {
        children: PropTypes.node
    };

    return {
        args: {},
        parameters: {
            docs: {
                source: {
                    transform: async () => (
                        await Promise.all(storyDefs.map((props) =>
                            fetchStorySource(componentName, storyTree(componentName, props.props || props))
                        ))
                    ).join('\n\n'),
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
