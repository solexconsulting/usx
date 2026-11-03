import React, { useState, useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const getDjangoBaseUrl = () => {
  return window.USX_DJANGO_URL?.replace(/\/$/, '') || `http://${window.location.hostname}:9090`;
};

const djangoResponse = async (componentName, props, format = '', errorMessage = 'Failed to fetch component HTML') => {
  const baseUrl = getDjangoBaseUrl();
  const query = new URLSearchParams({ props: JSON.stringify(props) });
  if (format) query.set('format', format);
  const url = `${baseUrl}/render/${componentName}/?${query}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(errorMessage);
  return response;
};

export const fetchComponentHtml = async (componentName, props) =>
  (await djangoResponse(componentName, prepareDjangoRequest(componentName, props))).text();

export const storyTree = (componentName, props, renderTree) =>
  renderTree
    ? serializePropsForDjango(renderTree(props))
    : { __usxNode: 'component', name: componentName.replace(/-/g, '_'), props: serializePropsForDjango(props) };

export const fetchStorySource = async (componentName, tree) => {
  const response = await djangoResponse(componentName, { __usxStoryTree: tree }, 'story', 'Failed to fetch Django story source');
  return (await response.json()).source;
};

const componentName = (type) => {
  const name = type.displayName || type.name;
  if (!name) throw new Error('A nested Django story component needs a name.');
  if (name === 'SideNav') return 'sidenav';
  return name.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
};

const serializeNode = (value) => {
  if (Array.isArray(value)) return value.map(serializeNode).filter((item) => item !== null);
  if (value === null || value === undefined || typeof value === 'boolean') return null;
  if (!React.isValidElement(value)) return { __usxNode: 'text', value: String(value) };

  const { type, props } = value;
  if (type === React.Fragment) {
    return { __usxNode: 'fragment', children: serializeNode(props.children) };
  }
  if (typeof type === 'string') {
    const marker = '__USX_STORY_CHILDREN__';
    const { children, ...attributes } = props;
    const markup = renderToStaticMarkup(React.createElement(type, attributes, children == null ? null : marker));
    const markerIndex = markup.indexOf(marker);
    if (markerIndex < 0) return { __usxNode: 'html', value: markup };
    return {
      __usxNode: 'element',
      open: markup.slice(0, markerIndex),
      close: markup.slice(markerIndex + marker.length),
      children: serializeNode(children),
    };
  }
  const { children, ...attributes } = props;
  return {
    __usxNode: 'component',
    name: componentName(type),
    props: serializePropsForDjango(attributes),
    children: serializeNode(children),
  };
};

export const serializePropsForDjango = (value) => {
  if (typeof value === 'function' || typeof value === 'symbol') return undefined;
  if (React.isValidElement(value)) return serializeNode(value);
  if (Array.isArray(value)) return value.map(serializePropsForDjango).filter((item) => item !== undefined);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, item]) => [key, serializePropsForDjango(item)])
      .filter(([, item]) => item !== undefined)
  );
};

const containsStoryNode = (value) => {
  if (!value || typeof value !== 'object') return false;
  if (value.__usxNode) return true;
  return Object.values(value).some(containsStoryNode);
};

export const prepareDjangoRequest = (componentName, props) => {
  const serialized = serializePropsForDjango(props);
  if (serialized?.__usxStoryTree || !containsStoryNode(serialized)) return serialized;
  return { __usxStoryTree: { __usxNode: 'component', name: componentName.replace(/-/g, '_'), props: serialized } };
};

const getErrorMessage = (error) => {
  if (!error) {
    return 'Unknown error';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Failed to fetch component HTML';
};

export const useDjangoRenderedHtml = (componentName, props) => {
  const [html, setHtml] = useState('');
  const [error, setError] = useState(null);

  // Keyed on the serialized props so a new-but-equal props object doesn't refetch.
  const requestKey = JSON.stringify(prepareDjangoRequest(componentName, props));

  useEffect(() => {
    let active = true;

    const fetchHtml = async () => {
      setError(null);

      try {
        const nextHtml = await fetchComponentHtml(componentName, JSON.parse(requestKey));
        if (active) {
          setHtml(nextHtml);
        }
      } catch (err) {
        if (active) {
          setError(getErrorMessage(err));
        }
      }
    };

    fetchHtml();

    return () => {
      active = false;
    };
  }, [componentName, requestKey]);

  return { html, error };
};

/** Render several fields without adding a wrapper around each one. */
export const useDjangoRenderedFields = (fields) => {
  const [html, setHtml] = useState('');
  const [errors, setErrors] = useState([]);

  // Keyed on the serialized fields so equal-but-new arrays/objects don't refetch.
  const requestKey = JSON.stringify(
    fields.map(({ componentName, args }) => ({
      componentName,
      props: prepareDjangoRequest(componentName, args),
    }))
  );

  useEffect(() => {
    let active = true;
    const parsedFields = JSON.parse(requestKey);

    const fetchAll = async () => {
      const results = await Promise.allSettled(
        parsedFields.map(({ componentName, props }) => fetchComponentHtml(componentName, props))
      );

      if (!active) {
        return;
      }

      const nextErrors = [];
      const combinedHtml = results
        .map((result, index) => {
          if (result.status === 'rejected') {
            const message = getErrorMessage(result.reason);
            nextErrors.push({ componentName: parsedFields[index].componentName, error: message });
            return `<div className="usa-error-message usx-error-message">Error rendering component: ${message}</div>`;
          }
          return result.value;
        })
        .join('\n');

      setHtml(combinedHtml);
      setErrors(nextErrors);
    };

    fetchAll();

    return () => {
      active = false;
    };
  }, [requestKey]);

  return { html, errors };
};

export function djangoComponent({ componentName }) {
  if (!componentName) throw new Error('djangoComponent requires an options object with componentName');

  return function DjangoRenderedComponent(props) {
    const { html, error } = useDjangoRenderedHtml(componentName, props);
    const containerRef = useRef(null);

    useEffect(() => {
      if (html && containerRef.current) {
        containerRef.current.innerHTML = html;
        containerRef.current.dataset.testid = 'storybook-django';
        containerRef.current.dataset.state = 'loaded';
      }
    }, [html]);

    if (error) {
      return React.createElement(
        'div',
        { className: 'usa-error-message usx-error-message' },
        `Error rendering component: ${error}`
      );
    }

    return React.createElement('div', { ref: containerRef });
  };
}
