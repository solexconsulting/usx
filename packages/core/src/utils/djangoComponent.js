/**
 * Storybook renderer for Django components.
 *
 * This module provides a function to create Storybook stories that fetch rendered HTML
 * from Django endpoints instead of rendering templates in JavaScript.
 */

import React, { useState, useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

/**
 * Inserts HTML into an element, executing embedded script tags.
 * @param {HTMLElement} element
 * @param {string} html
 */
const insertHTMLWithScripts = (element, html) => {
  element.innerHTML = html;

  Array.from(element.querySelectorAll('script')).forEach((script) => {
    console.log("Found script:", script);
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

/**
 * Inserts HTML into an element, executing embedded script tags,
 * firing default loading events and custom ones.
 * @param {HTMLElement|null} element
 * @param {string} html
 */
const simulateLoading = (element, html) => {
  if (!element) {
    return;
  }

  insertHTMLWithScripts(element, html);

  // Indicate the element has loaded at least once.
  element.dataset.testid = 'storybook-django';
  element.dataset.state = 'loaded';

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

const serializePropsForDjango = (value) => {
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

/**
 * Create a Storybook render component for a Django component.
 *
 * This function returns a React component that fetches the rendered HTML
 * from the Django endpoint and displays it.
 *
 * @param {string} componentName - The name of the Django component (e.g., 'usx/button').
 * @returns {Function} A React component that takes props and renders the HTML.
 */
export function djangoComponent(componentName, postRender=null) {
  return function DjangoRenderedComponent(props) {
    const [html, setHtml] = useState('');
    const [error, setError] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
      const fetchHtml = async () => {
        setError(null);
        const requestProps = serializePropsForDjango(props);

        try {
          const html = await fetchComponentHtml(componentName, requestProps);

          setHtml(html);
        } catch (err) {
          console.error('Error rendering Django component:', err);
          setError(err.message);
        }
      };

      fetchHtml();
    }, [JSON.stringify(props)]); // Depend on serialized props to avoid unnecessary re-renders

    useEffect(() => {
      let cleanup;
      if (html && containerRef.current) {
        simulateLoading(containerRef.current, html);
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
}
