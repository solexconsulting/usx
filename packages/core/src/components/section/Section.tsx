import React from 'react';
import './section.scss';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  title = '',
  children = null,
  content = null,
  className = '',
  ...props
}) => {
  const classes = ['usx-section', className].filter(Boolean).join(' ');
  const sectionContent = children || content;

  return (
    <section className={classes} {...props}>
      {title ? <h2 className="usx-section__title">{title}</h2> : null}
      <div className="usx-section__content">{sectionContent}</div>
    </section>
  );
};

export default Section;
