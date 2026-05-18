/**
 * Storybook renderer for Django components.
 *
 * This module provides a function to create Storybook stories that fetch rendered HTML
 * from Django endpoints instead of rendering templates in JavaScript.
 */

import React, { useState, useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const DEFAULT_RENDER_OPTIONS = {
  executeScripts: false,
  replayGlobalEvents: false,
};

const normalizeRenderOptions = (renderOptions = {}) => {
  return {
    ...DEFAULT_RENDER_OPTIONS,
    ...(renderOptions || {}),
  };
};

/**
 * Inserts HTML into an element, executing embedded script tags.
 * @param {HTMLElement} element
 * @param {string} html
 */
const insertHTMLWithScripts = (element, html) => {
  element.innerHTML = html;

  Array.from(element.querySelectorAll('script')).forEach((script) => {
    const newScript = document.createElement('script');
    Array.from(script.attributes).forEach((attr) =>
      newScript.setAttribute(attr.name, attr.value),
    );

    newScript.appendChild(document.createTextNode(script.innerHTML));
    if (script.parentNode) {
      script.parentNode.replaceChild(newScript, script);
    }
  });
};

const insertHTML = (element, html, executeScripts) => {
  if (executeScripts) {
    insertHTMLWithScripts(element, html);
    return;
  }

  element.innerHTML = html;
};

const replayGlobalLoadingEvents = () => {
  window.document.dispatchEvent(
    new Event('DOMContentLoaded', {
      bubbles: true,
      cancelable: true,
    }),
  );
  window.dispatchEvent(
    new Event('DOMContentLoaded', {
      bubbles: true,
      cancelable: true,
    }),
  );
  window.dispatchEvent(
    new Event('load', {
      bubbles: true,
      cancelable: true,
    }),
  );
};

/**
 * Inserts HTML into an element, executing embedded script tags,
 * firing default loading events and custom ones.
 * @param {HTMLElement|null} element
 * @param {string} html
 */
const simulateLoading = (element, html, renderOptions) => {
  if (!element) {
    return;
  }

  insertHTML(element, html, renderOptions.executeScripts);

  element.dataset.testid = 'storybook-django';
  element.dataset.state = 'loaded';

  if (renderOptions.replayGlobalEvents) {
    replayGlobalLoadingEvents();
  }

};

/**
 * Base URL for the Django storybook render server.
 *
 * Resolution order (first match wins):
 *  1. window.USX_DJANGO_URL  — injected at container startup via env-config.js
 *  2. http://<current-hostname>:9090  — last-resort default for local dev
 */
const getDjangoBaseUrl = () => {
  if (typeof window !== 'undefined' && window.USX_DJANGO_URL) {
    return window.USX_DJANGO_URL.replace(/\/$/, '');
  }
  const hostname = (typeof window !== 'undefined' && window.location && window.location.hostname)
    ? window.location.hostname
    : '127.0.0.1';
  return `http://${hostname}:9090`;
};

export const fetchComponentHtml = async (componentName, props) => {
  const baseUrl = getDjangoBaseUrl();
  const url = `${baseUrl}/render/${componentName}/?props=${encodeURIComponent(JSON.stringify(props))}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch component HTML');
  }
  const html = await response.text();
  return html;
};

const renderReactNodeToHtml = (node) => {
  try {
    return renderToStaticMarkup(
      React.createElement(React.Fragment, null, node),
    );
  } catch (error) {
    console.error('Error serializing React node for Django story rendering:', error);
    return '';
  }
};

export const serializePropsForDjango = (value) => {
  if (value === undefined) {
    return undefined;
  }

  if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'function' || typeof value === 'symbol') {
    return undefined;
  }

  if (React.isValidElement(value)) {
    return renderReactNodeToHtml(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => serializePropsForDjango(item))
      .filter((item) => item !== undefined);
  }

  if (typeof value === 'object') {
    const serialized = {};
    Object.entries(value).forEach(([key, item]) => {
      const next = serializePropsForDjango(item);
      if (next !== undefined) {
        serialized[key] = next;
      }
    });
    return serialized;
  }

  return value;
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

  const requestProps = serializePropsForDjango(props);
  const requestKey = JSON.stringify(requestProps);

  useEffect(() => {
    let active = true;

    const fetchHtml = async () => {
      setError(null);

      try {
        const nextHtml = await fetchComponentHtml(componentName, requestProps);
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

/**
 * Create a Storybook render component for a Django component.
 *
 * This function returns a React component that fetches the rendered HTML
 * from the Django endpoint and displays it.
 *
 * @param {string} componentName - The name of the Django component (e.g., 'usx/button').
 * @param {Function|null} postRender - Optional callback after HTML insertion.
 * @returns {Function} A React component that takes props and renders the HTML.
 */
const createDjangoRenderedComponent = (componentName, postRender, renderOptions) => {
  return function DjangoRenderedComponent(props) {
    const { html, error } = useDjangoRenderedHtml(componentName, props);
    const containerRef = useRef(null);

    useEffect(() => {
      let cleanup;
      if (html && containerRef.current) {
        simulateLoading(containerRef.current, html, renderOptions);

        if (postRender) {
          cleanup = postRender(containerRef.current);
        }
      }
      return () => {
        if (typeof cleanup === 'function') {
          cleanup();
        }
      };
    }, [html]);

    if (error) {
      return React.createElement('div', { style: { color: 'red' } }, `Error rendering component: ${error}`);
    }

    return React.createElement('div', { ref: containerRef });
  };
};

/**
 * @param {{
 *   componentName: string,
 *   postRender?: Function|null,
 *   renderOptions?: {executeScripts?: boolean, replayGlobalEvents?: boolean}|null
 * }} options
 */
export function djangoComponent({ componentName, postRender = null, renderOptions = null }) {
  if (!componentName) {
    throw new Error('djangoComponent requires an options object with componentName');
  }

  const normalizedRenderOptions = normalizeRenderOptions(renderOptions);
  return createDjangoRenderedComponent(componentName, postRender, normalizedRenderOptions);
}
