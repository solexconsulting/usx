/**
 * Storybook renderer for Django components.
 *
 * This module provides a function to create Storybook stories that fetch rendered HTML
 * from Django endpoints instead of rendering templates in JavaScript.
 */

import React, { useState, useEffect, useRef } from 'react';

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
 *  2. import.meta.env.VITE_DJANGO_STORYBOOK_URL — local dev .env.local fallback
 *  3. http://<current-hostname>:9090  — last-resort default
 */
const getDjangoBaseUrl = () => {
  if (typeof window !== 'undefined' && window.USX_DJANGO_URL) {
    return window.USX_DJANGO_URL.replace(/\/$/, '');
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_DJANGO_STORYBOOK_URL) {
    return import.meta.env.VITE_DJANGO_STORYBOOK_URL.replace(/\/$/, '');
  }
  const hostname = (typeof window !== 'undefined' && window.location && window.location.hostname)
    ? window.location.hostname
    : '127.0.0.1';
  return `http://${hostname}:9090`;
};

export const fetchComponentHtml = async (componentName, props) => {
  const baseUrl = getDjangoBaseUrl();
  const url = `${baseUrl}/storybook/render/${componentName}/?props=${encodeURIComponent(JSON.stringify(props))}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch component HTML');
  }
  const html = await response.text();
  return html;
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

        try {
          const html = await fetchComponentHtml(componentName, props);

          setHtml(html);
        } catch (err) {
          console.error('Error rendering Django component:', err);
          setError(err.message);
        }
      };

      fetchHtml();
    }, [JSON.stringify(props)]); // Depend on serialized props to avoid unnecessary re-renders

    useEffect(() => {
      if (html && containerRef.current) {
        simulateLoading(containerRef.current, html);
      }
      if (postRender) {
        postRender();
      }
    }, [html]);

    if (error) {
      return React.createElement('div', { style: { color: 'red' } }, `Error rendering component: ${error}`);
    }

    return React.createElement('div', { ref: containerRef });
  };
}
