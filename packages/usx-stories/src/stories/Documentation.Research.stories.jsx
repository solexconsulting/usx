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

            <section aria-labelledby="transforming-digital-experience-title" className="usa-prose usx-prose">
                <h2 id="transforming-digital-experience-title">Transforming the American digital experience (2021)</h2>
                <p>
                    <strong>What&apos;s next for the U.S. Web Design System</strong><br />
                    U.S. Web Design System, U.S. General Services Administration. March 2021.
                </p>
                <p>
                    <a href="https://designsystem.digital.gov/files/next/Transforming-the-American-digital-experience.pdf" target="_blank" rel="noopener noreferrer">
                        Read the full report (PDF, 31 pages)
                    </a>
                </p>

                <h3>Report summary</h3>
                <p>
                    This report examines how USWDS can help agencies deliver more consistent,
                    usable digital services. Research began in September 2020 in the context
                    of COVID-19 emergency response. The team interviewed over 60 people across
                    33 teams, including content managers, designers, engineers, managers,
                    policy analysts, and industry and civic technology leaders.
                    See the <a href="https://designsystem.digital.gov/files/next/Transforming-the-American-digital-experience.pdf#page=7" target="_blank" rel="noopener noreferrer">research overview (printed page 3)</a>.
                </p>
                <p>The report identifies five needs for agency teams:</p>
                <ul>
                    <li>Understand the value and benefits of the design system.</li>
                    <li>Know how to get started.</li>
                    <li>Find the right team and resources.</li>
                    <li>Feel engaged with the community.</li>
                    <li>Be able to improve digital services iteratively.</li>
                </ul>
                <p>
                    Its recommendations focus on clearer communication, stronger onboarding
                    and implementation support, and better coordination with other government
                    digital-service efforts. Suggested support includes customization demos,
                    guidance for teams moving from other frameworks, community-built CMS and
                    framework integrations, and a sandbox with themeable templates.
                    See <a href="https://designsystem.digital.gov/files/next/Transforming-the-American-digital-experience.pdf#page=24" target="_blank" rel="noopener noreferrer">getting-started opportunities (printed page 20)</a>.
                </p>

                <h3>USX analysis and implications</h3>
                <p>
                    The following is USX&apos;s interpretation, not a conclusion about USX
                    made by the report. The strongest implication is that a design system
                    is part of a service-delivery practice, not a substitute for one.
                    Consistent components can reduce repeated implementation work, but cannot
                    resolve unclear content, fragmented services, or missing team capacity by themselves.
                </p>
                <ul>
                    <li>
                        <strong>Make examples useful for adoption.</strong> Themeable Storybook
                        pages and working form, search, and workflow patterns are aligned with
                        the report&apos;s proposed sandbox. Include validation, recovery, empty,
                        and loading states so teams can evaluate complete tasks, not just appearance.
                    </li>
                    <li>
                        <strong>Reduce integration friction.</strong> Keep React, Django, and HTML
                        behavior aligned, document supported differences, and provide clear setup
                        and upgrade guidance. This addresses the report&apos;s concern about
                        integrating USWDS into existing CMSs and UI frameworks.
                    </li>
                    <li>
                        <strong>Explain the reasoning behind components.</strong> Link design
                        decisions to research, distinguish upstream guidance from USX extensions,
                        and document accessibility and customization constraints. Examples alone
                        do not establish that every composition is accessible or suitable for a service.
                    </li>
                    <li>
                        <strong>Evaluate outcomes beyond adoption.</strong> As proposed USX
                        measures, track time to a working integration, upgrade effort, and
                        cross-renderer defects. Pair these with service-level usability research,
                        task completion, and accessibility testing; installing a library is not
                        evidence that the public can successfully use the resulting service.
                    </li>
                </ul>
                <p>
                    The report also raises shared technology services and consolidated public-service
                    websites as longer-term possibilities. These are exploratory questions, not
                    evaluated solutions or a mandate to centralize every site.
                    See the <a href="https://designsystem.digital.gov/files/next/Transforming-the-American-digital-experience.pdf#page=26" target="_blank" rel="noopener noreferrer">long-term vision (printed page 22)</a>.
                </p>

                <h3>Evidence and limitations</h3>
                <p>
                    The interviews provide qualitative evidence about the experiences of the
                    participating teams, not a representative estimate of every agency&apos;s needs
                    or a causal test of USWDS&apos;s impact. The report does not establish that
                    adopting USWDS alone increases trust, lowers costs, or guarantees compliance.
                    Its cited traffic, adoption, and performance figures describe the 2020-2021
                    context and should not be presented as current benchmarks. Use the report
                    to inform hypotheses and implementation priorities, then validate them with
                    current guidance and research with the people using the service.
                </p>
            </section>
        </div>
    )
};

