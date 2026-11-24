import React from 'react';
import classnames from 'classnames';

export type AccordionHeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface AccordionItemProps {
    title: React.ReactNode;
    id: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
    expanded?: boolean;
    headingClassName?: string;
    contentClassName?: string;
    headingAs?: AccordionHeadingAs;
    handleToggle?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AccordionItem({
    title,
    id,
    content,
    children,
    expanded = false,
    headingClassName,
    contentClassName,
    headingAs = 'h3',
    handleToggle,
}: AccordionItemProps) {
    const headingClasses = classnames('usa-accordion__heading', headingClassName);
    const contentClasses = classnames('usa-accordion__content', 'usa-prose', contentClassName);
    const Heading = headingAs;

    return (
        <>
            <Heading id={`${id}-heading`} className={headingClasses}>
                <button
                    type="button"
                    className="usa-accordion__button"
                    aria-expanded={expanded}
                    aria-controls={`${id}-content`}
                    onClick={handleToggle}>
                    {title}
                </button>
            </Heading>
            <div
                id={`${id}-content`}
                aria-labelledby={`${id}-heading`}
                className={contentClasses}
                hidden={!expanded}>
                {children ?? content}
            </div>
        </>
    );
}
