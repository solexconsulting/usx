import React from 'react';

export default {
    title: 'Documentation/Research',
    tags: ['autodocs']
};

export const Index = {
    render: () => (
        <div className="usa-prose usx-prose">
            <h1>Research Index</h1>
            <p>
                This page serves as an index of research findings related to a variety
                of topics relevant to the design and development of the USWDS. Each entry
                includes a brief summary and a link to the full research report for
                further reading.<br />
                <strong>NOTE:</strong> USX does not claim ownership of the research findings
                listed here. These entries are intended to provide a centralized resource for
                designers and developers working with the USWDS, and to highlight key insights
                from research conducted by various organizations and individuals in the field.
            </p>

            {/* Switch to a table someday */}
            <h2>Disabled States Research Findings (2023)</h2>
            <p>
                A comprehensive research report on the use of disabled states in user interfaces,
                including best practices, common pitfalls, and recommendations for improving
                accessibility and usability. The report includes findings from user testing,
                expert reviews, and a review of existing literature on the topic.
            </p>
            <a href="https://github.com/uswds/uswds/wiki/Disabled-States-Research-Findings-2023" target="_blank" rel="noopener noreferrer">
                Read the full research report
            </a>
        </div>
    )
};

