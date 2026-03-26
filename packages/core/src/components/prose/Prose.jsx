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
    // When both `content` and `children` are provided, `content` takes precedence.
  }

  return (
    <Element className={`usa-prose usx-prose ${className}`} {...props} {...(content ? { dangerouslySetInnerHTML: { __html: content } } : {})}>
      {children ? children : null}
    </Element>
  );
};
