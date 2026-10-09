import React from 'react';
import Container from '../../../../usx-react/src/components/container/Container.tsx';
import Button from '../../../../usx-react/src/components/button/Button.tsx';
import Tag from '../../../../usx-react/src/components/tag/Tag.tsx';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import Card from '../../../../usx-react/src/components/card/Card.tsx';
import FileList from '../../../../usx-react/src/components/file-list/FileList.tsx';
import Link from '../../../../usx-react/src/components/link/Link.tsx';
import List from '../../../../usx-react/src/components/list/List.tsx';
import Prose from '../../../../usx-react/src/components/prose/Prose.tsx';
import Section from '../../../../usx-react/src/components/section/Section.tsx';
import SummaryBox from '../../../../usx-react/src/components/summary-box/SummaryBox.tsx';

export const applicationStoryDescriptions = {
  DeeplyNestedApplicationWorkspace: 'A document workspace with purposeful Container nesting: page → body grid → primary column → section stack → documents → batch stack → batch content → status group. Each level controls page width, sidebar placement, section rhythm, batch grouping, or status alignment. USX Cards group document batches, FileList renders the files, and SummaryBox explains the remaining check. The sidebar moves below the primary content on small screens; batch status and metadata wrap independently.',
  ResponsiveActionBar: 'A USX Card groups record identity, status metadata, and navigation actions. Containers stack these groups at narrow widths, make a wrapping toolbar at tablet, and add wider spacing at desktop. Long labels can wrap without hiding Button actions. A second toolbar combines content-sized and fill-sized children with USX Prose and Link.',
  ServiceComparison: 'Three USX Cards present service routes inside a Container grid. Cards stack on mobile, form two columns on tablet, and three on desktop. Card owns each title, tag, description, and action; Container controls the column widths. Linked USX Sections and Lists explain what each route includes. The comparison is a semantic list and all routes stay in source order.',
  CommunityEvent: 'An event overview combines a wrapping USX Section and Button group, a centered Prose introduction, and an agenda/support split. A USX List supplies the ordered agenda; nested Containers align each time beside its Section and let speaker metadata wrap independently. The agenda and SummaryBox attendance information stack on smaller screens.',
};

export const applicationStoryDefs = {
  DeeplyNestedApplicationWorkspace: {
    element: 'section',
    ariaLabel: 'Riverbend neighborhood garden application',
    gridContainer: 'default',
    display: 'flex',
    direction: 'column',
    gap: '3',
    className: 'padding-y-2',
    children: (
      <>
        <Container display="flex" direction="column" gap="2" responsive={{ tablet: { direction: 'row', justify: 'space-between', align: 'center', wrap: 'wrap' } }}>
          <Container id="workspace-overview">
            <Section title="Riverbend neighborhood garden" headingLevel="h2" style={{ margin: 0 }}>
              <Prose className="text-base">Community improvement grant · CG-2048</Prose>
            </Section>
          </Container>
          <Container display="flex" wrap="wrap" align="center" gap="2">
            <Tag color="gold-20v">Draft application</Tag>
            <Button variant="primary" href="#workspace-next-steps" className="margin-0">Next steps</Button>
          </Container>
        </Container>

        <Container gridRow gutters="2" responsive={{ desktop: { gutters: '4' } }}>
          <Container column="12" responsive={{ desktop: { column: '8' } }}>
            <Container display="flex" direction="column" gap="3">
              <Alert variant="info" noIcon heading="One document needs attention" text="Confirm the project budget before sending your application for review." className="margin-top-0" />
              <Container id="workspace-documents" display="flex" direction="column" gap="2">
                <Section title="Supporting documents" headingLevel="h3" style={{ margin: 0 }}>
                  <Prose className="text-base">2 of 3 ready for review</Prose>
                </Section>
                <Container display="flex" direction="column" gap="2">
                  {[
                    {
                      title: 'Site and community planning',
                      description: 'These files support the location and community participation sections.',
                      status: 'Ready',
                      color: 'green-cool-20v',
                      updated: 'Reviewed by the garden committee',
                      files: [
                        { key: 'site', name: 'Site plan.pdf', size: 1887437 },
                        { key: 'support', name: 'Support letters.pdf', size: 655360 },
                      ],
                    },
                    {
                      title: 'Project budget',
                      description: 'This estimate supports the project costs and requested funding.',
                      status: 'Check totals',
                      color: 'gold-20v',
                      updated: 'Latest estimate uploaded by Jamie',
                      files: [{ key: 'budget', name: 'Budget.xlsx', size: 94208 }],
                      needsCheck: true,
                    },
                  ].map((batch) => (
                    <Container key={batch.title} display="flex" direction="column" gap="2">
                      <Card className="margin-0">
                        <Container display="flex" direction="column" gap="2" className="padding-1 tablet:padding-2">
                          <Section title={batch.title} headingLevel="h4" style={{ margin: 0 }}>
                            <Prose>{batch.description}</Prose>
                          </Section>
                          <Container display="flex" wrap="wrap" align="center" gap="1">
                            <Tag color={batch.color} className="margin-0">{batch.status}</Tag>
                            <Prose className="text-base font-body-sm">{batch.updated}</Prose>
                          </Container>
                          <FileList files={batch.files} hint="Supporting files" disabled />
                        </Container>
                      </Card>
                      {batch.needsCheck && (
                        <SummaryBox id="workspace-budget-check" heading="What should I check in the budget?" className="margin-0">
                          <Prose>Make sure the materials and labor subtotals add up to the amount requested. Include donated supplies in the separate contribution column.</Prose>
                        </SummaryBox>
                      )}
                    </Container>
                  ))}
                </Container>
              </Container>
              <Container id="workspace-activity">
                <Section title="Recent activity" headingLevel="h3" style={{ margin: 0 }}>
                  <List ordered items={[
                    'Budget uploaded. Jamie added the latest cost estimate.',
                    'Site confirmed. The garden committee approved the location.',
                  ]} />
                </Section>
              </Container>
            </Container>
          </Container>
          <Container element="aside" ariaLabel="Application navigation and next steps" column="12" responsive={{ desktop: { column: '4' } }} className="margin-top-3 desktop:margin-top-0">
            <Container display="flex" direction="column" gap="2">
              <Section title="In this application" headingLevel="h3" style={{ margin: 0 }}>
                <Container element="nav" ariaLabel="Application sections" display="flex" direction="column" gap="1">
                  <Link href="#workspace-overview">Overview</Link>
                  <Link href="#workspace-documents">Supporting documents</Link>
                  <Link href="#workspace-activity">Recent activity</Link>
                </Container>
              </Section>
              <Container id="workspace-next-steps">
                <SummaryBox id="workspace-next-title" heading="Before you submit">
                  <List ordered items={[
                    'Check the budget totals.',
                    'Confirm the primary contact.',
                    'Ask a committee member to review.',
                  ]} />
                </SummaryBox>
              </Container>
            </Container>
          </Container>
        </Container>
      </>
    ),
  },
  ResponsiveActionBar: {
    element: 'section',
    id: 'action-bar-title',
    ariaLabel: 'Neighborhood access study',
    display: 'flex',
    direction: 'column',
    gap: '3',
    children: (
      <>
        <Card className="margin-0">
          <Container display="flex" direction="column" gap="2" responsive={{ tablet: { direction: 'row', wrap: 'wrap', align: 'center', justify: 'space-between' }, desktop: { gap: '4' } }} className="padding-2 tablet:padding-3">
            <Container flex="auto" className="minw-0">
              <Section title="Neighborhood access study" headingLevel="h2" style={{ margin: 0 }}>
                <Container display="flex" wrap="wrap" gap="1" align="center">
                  <Tag color="blue-20v">In review</Tag>
                  <Prose>Record NS-1042</Prose>
                  <Prose className="text-base">Owner: Planning team</Prose>
                </Container>
              </Section>
            </Container>
            <Container element="nav" ariaLabel="Record actions" display="flex" direction="column" gap="1" responsive={{ mobileLg: { direction: 'row', wrap: 'wrap' } }}>
              <Button href="#action-overview" variant="primary" className="margin-0">Read overview</Button>
              <Button href="#action-history" variant="outline" className="margin-0">Review activity</Button>
            </Container>
          </Container>
        </Card>
        <Container id="action-overview">
          <Section title="Study overview" headingLevel="h3" style={{ margin: 0 }}>
            <Prose>Review proposed walking routes between the library, community center, and neighborhood parks.</Prose>
          </Section>
        </Container>
        <Container id="action-history" display="flex" direction="column" gap="1" responsive={{ tablet: { direction: 'row', gap: '2', align: 'baseline' } }} className="border-top-1px border-base-lighter padding-top-2">
          <Container flex="none"><Prose className="text-bold">Latest activity</Prose></Container>
          <Container flex="fill" className="minw-0"><Prose>The planning team added the community workshop summary.</Prose></Container>
          <Container flex="none"><Link href="#action-bar-title">Back to record</Link></Container>
        </Container>
      </>
    ),
  },
  ServiceComparison: {
    element: 'section',
    ariaLabel: 'Choose how to get help',
    gridContainer: 'default',
    children: (
      <>
        <Section title="Choose how to get help" headingLevel="h2">
          <Prose>Use the route that best fits your question and access needs.</Prose>
        </Section>
        <Container element="ul" gridRow gutters="2" className="add-list-reset margin-top-3">
          {[
            { title: 'Self-service', tag: 'Anytime', body: 'Browse answers and application guides whenever you need them.', target: 'guides', link: 'View guide topics' },
            { title: 'Phone appointment', tag: 'Personal help', body: 'Talk through your application with a specialist. Language help is available.', target: 'phone', link: 'Phone details' },
            { title: 'Community help desk', tag: 'In person', body: 'Bring your documents to a local help desk and work through the next steps together.', target: 'desk', link: 'Plan your visit' },
          ].map((route) => (
            <Container key={route.target} element="li" column="12" display="flex" responsive={{ tablet: { column: '6', offset: route.target === 'desk' ? '3' : 'none' }, desktop: { column: '4', offset: 'none' } }} className="margin-bottom-2">
              <Card
                title={route.title}
                description={route.body}
                tagProps={[{ children: route.tag }]}
                buttonProps={[{ children: route.link, href: `#comparison-${route.target}`, variant: 'outline' }]}
                className="width-full margin-0"
              />
            </Container>
          ))}
        </Container>
        <Container gridRow gutters="2" responsive={{ desktop: { gutters: '3' } }} className="margin-top-2">
          <Container id="comparison-guides" column="12" responsive={{ tablet: { column: '6' }, desktop: { column: '4' } }} className="margin-bottom-3">
            <Section title="Self-service guide topics" headingLevel="h3" className="border-top-1px border-base-lighter padding-top-2" style={{ margin: 0 }}>
              <List items={['Eligibility and step-by-step application guides', 'Supporting document checklists', 'Submitting a completed application']} />
            </Section>
          </Container>
          <Container id="comparison-phone" column="12" responsive={{ tablet: { column: '6' }, desktop: { column: '4' } }} className="margin-bottom-3">
            <Section title="Phone appointment details" headingLevel="h3" className="border-top-1px border-base-lighter padding-top-2" style={{ margin: 0 }}>
              <Prose>Have your application reference available. A support person may join the call.</Prose>
              <List items={['Help with form questions', 'Language assistance on request', 'A written follow-up summary']} />
            </Section>
          </Container>
          <Container id="comparison-desk" column="12" responsive={{ tablet: { column: '6', offset: '3' }, desktop: { column: '4', offset: 'none' } }} className="margin-bottom-3">
            <Section title="Planning an in-person visit" headingLevel="h3" className="border-top-1px border-base-lighter padding-top-2" style={{ margin: 0 }}>
              <Prose>Bring copies of your supporting documents and a list of questions. Ask the help desk about access arrangements before your visit.</Prose>
              <List items={['Accessible meeting rooms', 'Document review', 'Support for family members']} />
            </Section>
          </Container>
        </Container>
      </>
    ),
  },
  CommunityEvent: {
    element: 'article',
    ariaLabel: 'Building a greener neighborhood workshop',
    gridContainer: 'default',
    display: 'flex',
    direction: 'column',
    gap: '3',
    children: (
      <>
        <Container display="flex" direction="column" gap="2" responsive={{ tablet: { direction: 'row', wrap: 'wrap', justify: 'space-between', align: 'center' } }}>
          <Section title="Building a greener neighborhood" headingLevel="h2" style={{ margin: 0 }}>
            <Prose className="text-base">Community workshop</Prose>
          </Section>
          <Container flex="none"><Button variant="primary" href="#event-attendance" className="margin-0">Plan your attendance</Button></Container>
        </Container>
        <Container gridRow>
          <Container column="12" responsive={{ desktop: { column: '8', offset: '2' } }}>
            <Prose className="font-body-md tablet:font-body-lg">Share ideas for more shade, welcoming public spaces, and healthier walking routes. Join one session or stay for the whole workshop.</Prose>
          </Container>
        </Container>
        <Container gridRow gutters="3">
          <Container column="12" responsive={{ desktop: { column: '8' } }}>
            <Section title="Workshop agenda" headingLevel="h3" style={{ margin: 0 }}>
              <List ordered unstyled items={[
                ['9:00 AM', 'Welcome and neighborhood priorities', 'Community planning team', 'Discussion'],
                ['9:30 AM', 'Design a shared green space', 'Riverbend garden volunteers', 'Small groups'],
                ['11:00 AM', 'Turn ideas into next steps', 'Parks and public spaces team', 'Working session'],
              ].map(([time, title, speaker, format]) => (
                <Container key={time} display="flex" direction="column" gap="1" responsive={{ tablet: { direction: 'row', gap: '3', align: 'start' } }} className="border-top-1px border-base-lighter padding-y-2">
                  <Container flex="none" className="minw-10"><Prose className="text-bold">{time}</Prose></Container>
                  <Container flex="fill" className="minw-0">
                    <Section title={title} headingLevel="h4" style={{ margin: 0 }}>
                      <Container display="flex" wrap="wrap" gap="1" align="center">
                        <Prose>{speaker}</Prose>
                        <Tag className="margin-0">{format}</Tag>
                      </Container>
                    </Section>
                  </Container>
                </Container>
              ))} />
            </Section>
          </Container>
          <Container element="aside" ariaLabel="Workshop attendance" column="12" responsive={{ desktop: { column: '4' } }} className="margin-top-2 desktop:margin-top-0">
            <Container id="event-attendance">
              <SummaryBox id="event-attendance-title" heading="Attending the workshop">
                <Container display="flex" direction="column" gap="2">
                  <Prose>Riverbend Community Center, main meeting room</Prose>
                  <Prose>Bring your ideas and a reusable water bottle. Materials are provided.</Prose>
                  <Section title="Access and participation" headingLevel="h5" style={{ margin: 0 }}>
                    <Prose>The main entrance is step-free. Quiet seating and large-print materials are available at the welcome desk.</Prose>
                  </Section>
                </Container>
              </SummaryBox>
            </Container>
          </Container>
        </Container>
      </>
    ),
  },
};
