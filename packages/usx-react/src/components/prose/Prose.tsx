import React from 'react';

export interface ProseProps extends React.HTMLAttributes<HTMLElement> {
  content?: string;
  children?: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section' | 'main';
}

const validElements = ['div', 'article', 'section', 'main'] as const;

const Prose: React.FC<ProseProps> = ({
  as = 'div',
  content,
  children,
  className = '',
  ...props
}) => {
  const Element = validElements.includes(as) ? as : 'div';

  return (
    <Element
      className={`usa-prose usx-prose ${className}`}
      {...props}
      {...(content ? { dangerouslySetInnerHTML: { __html: content } } : {})}
    >
      {children ? children : null}
    </Element>
  );
};

export default Prose;
