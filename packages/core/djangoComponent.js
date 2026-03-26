/**
 * Storybook renderer for Django components.
 *
 * This module provides a function to create Storybook stories that fetch rendered HTML
 * from Django endpoints instead of rendering templates in JavaScript.
 */

import React, { useState, useEffect } from 'react';

/**
 * Create a Storybook render component for a Django component.
 *
 * This function returns a React component that fetches the rendered HTML
 * from the Django endpoint and displays it.
 *
 * @param {string} componentName - The name of the Django component (e.g., 'usx/button').
 * @returns {Function} A React component that takes props and renders the HTML.
 */
export function djangoComponent(componentName) {
  return function DjangoRenderedComponent(props) {
    const [html, setHtml] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchHtml = async () => {
        setError(null);
        const propsJson = JSON.stringify(props);
        const url = `http://192.168.86.60:9090/storybook/render/${componentName}/?props=${encodeURIComponent(propsJson)}`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to render component: ${response.statusText}`);
          }
          const html = await response.text();
          setHtml(html);
        } catch (err) {
          console.error('Error rendering Django component:', err);
          setError(err.message);
        }
      };

      fetchHtml();
    }, [JSON.stringify(props)]); // Depend on serialized props to avoid unnecessary re-renders

    if (error) {
      return React.createElement('div', { style: { color: 'red' } }, `Error rendering component: ${error}`);
    }

    return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
  };
}