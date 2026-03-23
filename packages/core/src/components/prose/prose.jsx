import React from 'react';

/**
 * Prose component for displaying rich text content.
 */
export default function Prose({
    containerElement='div',
    content,
    children,
    className='',
    ...props
}) {

  const normalizeContainerElement = () => {
    const validElements = ['div', 'article', 'section', 'main'];
    return validElements.includes(containerElement) ? containerElement : 'div';
  }

  const Element = normalizeContainerElement();

  if (content && children) {
    console.warn('Prose component: Both "content" and "children" props are provided. "content" will take precedence over "children".');
  }

  return (
    <Element className={`usa-prose usx-prose ${className}`} {...props} {...(content ? { dangerouslySetInnerHTML: { __html: content } } : {})}>
      {children ? children : null}
    </Element>
  );
};
