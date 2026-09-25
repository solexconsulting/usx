import React from 'react';
import classnames from 'classnames';

export type AccordionHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface AccordionItemProps {
    title: React.ReactNode;
    id: string;
    content: React.ReactNode;
    expanded?: boolean;
    className?: string;
    headingLevel?: AccordionHeadingLevel;
    handleToggle?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
    bordered?: boolean;
    items?: AccordionItemProps[];
    multiselectable?: boolean;
    headingLevel?: AccordionHeadingLevel;
    iconPosition?: 'start' | 'end';
}

function AccordionItem({
    title,
    id,
    content,
    expanded = false,
    className,
    headingLevel = 'h3',
    handleToggle,
}: AccordionItemProps) {
    const headingClasses = classnames('usa-accordion__heading', className)
    const contentClasses = classnames(
        'usa-accordion__content',
        'usa-prose',
        className
    )

    const Heading = headingLevel

    return (
        <>
            <Heading id={`${id}-heading`} className={headingClasses}>
                <button
                    type="button"
                    className="usa-accordion__button"
                    aria-expanded={expanded}
                    aria-controls={`${id}-content`}
                    data-testid={`accordionButton_${id}`}
                    onClick={handleToggle}>
                    {title}
                </button>
            </Heading>
            <div
                id={`${id}-content`}
                aria-labelledby={`${id}-heading`}
                data-testid={`accordionItem_${id}`}
                className={contentClasses}
                hidden={!expanded}>
                {content}
            </div>
        </>
    )
};

export function Accordion({
    id,
    bordered = false,
    items = [],
    multiselectable = false,
    headingLevel = 'h3',
    iconPosition,
    className = '',
    ...props
}: AccordionProps) {
    const accordionClasses = classnames(
        'usa-accordion',
        'usx-accordion',
        bordered && 'usa-accordion--bordered',
        (iconPosition === 'start' || iconPosition === 'end') && `usa-accordion--icon-${iconPosition}`,
        className
    )


    return (
        <div
            id={id}
            className={accordionClasses}
            data-allow-multiple={multiselectable ? true : undefined}
            {...props}
        >
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    {...item}
                    headingLevel={headingLevel}
                    className={className}
                />
            ))}
        </div>
    );
}

export default Accordion;