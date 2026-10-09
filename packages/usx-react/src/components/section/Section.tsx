import React from 'react';
import ClassNames from 'classnames';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  title = '',
  headingLevel = 'h2',
  children = null,
  content = null,
  className = '',
  ...props
}) => {
  const classes = ClassNames('usx-section', className);
  const sectionContent = children || content;
  const Heading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(headingLevel) ? headingLevel : 'h2';

  return (
    <section className={classes} {...props}>
      {title ? <Heading className="usx-section__title">{title}</Heading> : null}
      <div className="usx-section__content">{sectionContent}</div>
    </section>
  );
};

export default Section;
