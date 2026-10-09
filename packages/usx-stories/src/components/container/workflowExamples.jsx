import React from 'react';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import CalendarDate from '../../../../usx-react/src/components/calendar-date/CalendarDate.tsx';
import Card from '../../../../usx-react/src/components/card/Card.tsx';
import Container from '../../../../usx-react/src/components/container/Container.tsx';
import FileList from '../../../../usx-react/src/components/file-list/FileList.tsx';
import Link from '../../../../usx-react/src/components/link/Link.tsx';
import List from '../../../../usx-react/src/components/list/List.tsx';
import Prose from '../../../../usx-react/src/components/prose/Prose.tsx';
import Section from '../../../../usx-react/src/components/section/Section.tsx';
import SummaryBox from '../../../../usx-react/src/components/summary-box/SummaryBox.tsx';
import Tag from '../../../../usx-react/src/components/tag/Tag.tsx';

const programResults = [
  {
    name: 'Home energy assessment',
    category: 'Home improvements',
    summary: 'An advisor can suggest ways to make your home more comfortable.',
    availability: 'Appointments available',
    detail: 'Book a home visit or phone consultation. Bring a recent utility bill.',
  },
  {
    name: 'Weatherization assistance',
    category: 'Home improvements',
    summary: 'Get help with insulation and air sealing based on an energy assessment.',
    availability: 'Applications open',
    detail: 'The team reviews your household and home before recommending work.',
  },
  {
    name: 'Utility bill support',
    category: 'Household expenses',
    summary: 'A benefits specialist can explain help with an overdue energy bill.',
    availability: 'Year-round support',
    detail: 'Bring your latest bill and any notice from your utility provider.',
  },
];

const reviewGroups = [
  {
    title: 'Household contact',
    fields: [['Applicant', 'Morgan Rivera'], ['Email', 'morgan@example.com'], ['Preferred contact', 'Email'], ['Household size', '3 people']],
  },
  {
    title: 'Home information',
    fields: [['Street address', '120 River Street'], ['City', 'Riverton'], ['Residence', 'Rented apartment'], ['Requested service', 'Home energy assessment']],
  },
];

export const workflowStoryDefs = {
  SearchResultsWorkspace: {
    element: 'section',
    gridContainer: 'default',
    display: 'flex',
    direction: 'column',
    gap: '3',
    ariaLabel: 'Find support for your home',
    children: (
      <>
        <Section id="program-search-title" title="Find support for your home" style={{ margin: 0 }}>
          <Prose>Showing community services programs for Riverton residents who need help with energy costs.</Prose>
        </Section>
        <Container gridRow gutters="3" responsive={{ desktop: { gutters: '4' } }}>
          <Container element="aside" column="12" responsive={{ desktop: { column: '4' } }} className="margin-bottom-3">
            <SummaryBox id="program-search-criteria" heading="Applied search criteria">
              <Container display="flex" direction="column" gap="2">
                <Container display="flex" direction="column" gap="1">
                  <Prose className="text-bold">Location</Prose>
                  <Prose>Riverton</Prose>
                </Container>
                <Container display="flex" direction="column" gap="1">
                  <Prose className="text-bold">Topics</Prose>
                  <List items={['Home improvements', 'Household expenses']} />
                </Container>
                <Container display="flex" direction="column" gap="1">
                  <Prose className="text-bold">Availability</Prose>
                  <Prose>Accepting requests</Prose>
                </Container>
              </Container>
            </SummaryBox>
          </Container>
          <Container column="12" responsive={{ desktop: { column: '8' } }} className="minw-0">
            <Container display="flex" direction="column" gap="1" responsive={{ desktop: { direction: 'row', justify: 'space-between', align: 'center' } }} className="margin-bottom-3">
              <Section headingLevel="h3" title="3 programs match your search" style={{ margin: 0 }} />
              <Prose className="text-base-dark">Sorted by relevance</Prose>
            </Container>
            <Container display="flex" direction="column" gap="3">
              {programResults.map((program) => (
                <Card
                  key={program.name}
                  tag="article"
                  title={program.name}
                  description={`${program.summary} ${program.detail}`}
                  tagProps={[{ value: program.category }, { value: program.availability, color: 'primary', outline: true }]}
                  buttonProps={[{ href: '#program-search-support', children: 'Get program help', variant: 'outline' }]}
                  className="margin-bottom-0"
                />
              ))}
            </Container>
          </Container>
        </Container>
        <SummaryBox id="program-search-support" heading="Help choosing a program">
          <Prose>Visit the community services desk at Riverton Library. A navigator can help you compare programs and prepare a request.</Prose>
        </SummaryBox>
      </>
    ),
  },
  ProgramDashboard: {
    element: 'section',
    gridContainer: 'default',
    display: 'flex',
    direction: 'column',
    gap: '3',
    ariaLabel: 'Team overview',
    children: (
      <>
        <Container display="flex" direction="column" gap="2" responsive={{ tablet: { direction: 'row', justify: 'space-between', align: 'center' } }}>
          <Container flex="fill" className="minw-0">
            <Section id="program-dashboard-title" title="Team overview" style={{ margin: 0 }}>
              <Prose>Community energy program</Prose>
            </Section>
          </Container>
          <Container element="nav" display="flex" wrap="wrap" gap="2" ariaLabel="Dashboard sections">
            <Link href="#dashboard-queue">Application queue</Link>
            <Link href="#dashboard-priorities">Team priorities</Link>
          </Container>
        </Container>
        <Section headingLevel="h3" title="Program activity" style={{ margin: 0 }}>
          <Container gridRow gutters="2">
            {[
              ['86', 'Active applications', 'Across all program teams'],
              ['12', 'Ready for review', 'Complete documentation'],
              ['8', 'Upcoming visits', 'Scheduled this week'],
              ['34', 'Completed this month', 'Services delivered'],
            ].map(([value, label, description], index) => (
              <Container key={label} column="12" responsive={{ mobileLg: { column: '6' }, desktop: { column: '3' } }} className="margin-bottom-2">
                <SummaryBox id={`dashboard-metric-${index}`} heading={label} className="height-full">
                  <Container display="flex" direction="column" gap="1">
                    <Prose className="font-heading-xl text-bold text-primary">{value}</Prose>
                    <Prose className="text-base-dark font-body-sm">{description}</Prose>
                  </Container>
                </SummaryBox>
              </Container>
            ))}
          </Container>
        </Section>
        <Container gridRow gutters="3">
          <Container column="12" responsive={{ desktop: { column: '8' } }} className="margin-bottom-3">
            <Section id="dashboard-queue" headingLevel="h3" title="Application queue" style={{ margin: 0 }}>
              <Prose className="margin-bottom-3">Active applications are grouped by their current stage.</Prose>
              <Container gridRow gutters="2">
                {[
                  { title: 'Received', total: '42 applications', items: [['Awaiting documents', '30'], ['Ready for review', '12']] },
                  { title: 'In progress', total: '44 applications', items: [['Scheduling a visit', '16'], ['Visit scheduled', '8'], ['Service planning', '20']] },
                ].map((group, index) => (
                  <Container key={group.title} column="12" responsive={{ tablet: { column: '6' } }} className="margin-bottom-2">
                    <SummaryBox id={`dashboard-stage-${index}`} heading={group.title} className="height-full">
                      <Prose className="text-base-dark">{group.total}</Prose>
                      <List
                        unstyled
                        items={group.items.map(([label, total]) => (
                          <Container key={label} display="flex" justify="space-between" align="baseline" gap="2" className="margin-top-2">
                            <Prose>{label}</Prose>
                            <Tag value={total} />
                          </Container>
                        ))}
                      />
                    </SummaryBox>
                  </Container>
                ))}
              </Container>
            </Section>
          </Container>
          <Container element="aside" column="12" responsive={{ desktop: { column: '4' } }}>
            <SummaryBox id="dashboard-priorities" heading="Team priorities">
              <List ordered items={[
                'Assign the 12 complete applications for review.',
                'Confirm access details for this week’s 8 visits.',
                'Contact households missing documents.',
              ]} />
            </SummaryBox>
          </Container>
        </Container>
      </>
    ),
  },
  ApplicationReview: {
    element: 'article',
    gridContainer: 'default',
    display: 'flex',
    direction: 'column',
    gap: '3',
    ariaLabel: 'Review your request',
    children: (
      <>
        <Container display="flex" direction="column" gap="2" responsive={{ desktop: { direction: 'row', justify: 'space-between', align: 'start' } }}>
          <Container flex="fill" className="minw-0">
            <Section id="application-review-title" title="Review your request" style={{ margin: 0 }}>
              <Container display="flex" direction="column" gap="1">
                <Prose className="text-base-dark">Home energy assessment · Step 3 of 4</Prose>
                <Prose>Check your household information before the final consent step.</Prose>
              </Container>
            </Section>
          </Container>
          <Container flex="none" alignSelf="start">
            <Alert variant="success" slim text="Draft saved · Reference EA-2048" />
          </Container>
        </Container>
        <Container gridRow gutters="3">
          <Container column="12" responsive={{ desktop: { column: '8' } }} className="margin-bottom-3">
            <Container display="flex" direction="column" gap="3">
              {reviewGroups.map((group) => (
                <Section key={group.title} headingLevel="h3" title={group.title} style={{ margin: 0 }}>
                  <Container gridRow gutters="2">
                    {group.fields.map(([label, value]) => (
                      <Container key={label} column="12" responsive={{ tablet: { column: '6' } }} className="margin-bottom-2">
                        <Container display="flex" direction="column" gap="1">
                          <Prose className="text-bold font-body-sm">{label}</Prose>
                          <Prose>{value}</Prose>
                        </Container>
                      </Container>
                    ))}
                  </Container>
                </Section>
              ))}
              <Section headingLevel="h3" title="Supporting documents" style={{ margin: 0 }}>
                <FileList hint="Received documents" files={[
                  { key: 'utility-bill', name: 'utility-bill.pdf', size: 245760 },
                  { key: 'residence', name: 'lease-summary.pdf', size: 184320 },
                ]} />
              </Section>
            </Container>
          </Container>
          <Container element="aside" column="12" responsive={{ desktop: { column: '4' } }}>
            <SummaryBox id="application-review-guidance" heading="Before you continue">
              <Container display="flex" direction="column" gap="3">
                <List items={[
                  'Confirm that your contact information is current.',
                  'Check that your documents are readable.',
                  'Review the consent information below.',
                ]} />
                <Link href="#application-review-consent">Read about the final step</Link>
                <Section headingLevel="h5" title="Need to make a correction?" style={{ margin: 0 }}>
                  <Prose>Your draft remains saved while you review it. Ask your service navigator to update any information that has changed.</Prose>
                </Section>
              </Container>
            </SummaryBox>
          </Container>
        </Container>
        <Container display="flex" direction="column" gap="2" responsive={{ tablet: { direction: 'row', align: 'center', justify: 'space-between' } }} className="border-top-1px border-base-lighter padding-top-3">
          <Container flex="fill" className="minw-0">
            <Section id="application-review-consent" headingLevel="h3" title="Next: consent and submission" style={{ margin: 0 }}>
              <Prose>The final step explains how your information will be used and asks you to confirm your request.</Prose>
            </Section>
          </Container>
          <Container flex="none" alignSelf="start" responsive={{ tablet: { alignSelf: 'center' } }}>
            <Link href="#application-review-title">Back to review</Link>
          </Container>
        </Container>
      </>
    ),
  },
  AppointmentSummary: {
    element: 'article',
    gridContainer: 'default',
    display: 'flex',
    direction: 'column',
    gap: '3',
    ariaLabel: 'Your service center visit',
    children: (
      <>
        <Container display="flex" direction="column" gap="3" responsive={{ desktop: { direction: 'row', justify: 'space-between', align: 'center' } }}>
          <Container display="flex" direction="column" gap="2" align="start" flex="fill" responsive={{ mobileLg: { direction: 'row' } }} className="minw-0">
            <CalendarDate datetime="2026-11-10" />
            <Section id="appointment-summary-title" title="Your service center visit" style={{ margin: 0 }}>
              <Container display="flex" direction="column" align="start" gap="2">
                <Tag value="Appointment confirmed" color="primary" />
                <Prose>Tuesday, November 10 · 9:00–10:30 a.m. Central</Prose>
              </Container>
            </Section>
          </Container>
          <Container flex="none" alignSelf="start">
            <SummaryBox id="appointment-confirmation" heading="Confirmation number"><Prose>RV-1048</Prose></SummaryBox>
          </Container>
        </Container>
        <Container element="nav" display="flex" direction="column" gap="2" responsive={{ mobileLg: { direction: 'row', wrap: 'wrap', gap: '3' } }} ariaLabel="Appointment details">
          <Link href="#appointment-itinerary">Your itinerary</Link>
          <Link href="#appointment-preparation">What to bring</Link>
          <Link href="#appointment-location">Getting here</Link>
        </Container>
        <Container gridRow gutters="3">
          <Container column="12" responsive={{ desktop: { column: '8' } }} className="margin-bottom-3">
            <Section id="appointment-itinerary" headingLevel="h3" title="Your itinerary" style={{ margin: 0 }}>
              <List ordered unstyled className="margin-0" items={[
                ['9:00 a.m.', 'Check in', 'Main lobby', 'Show your confirmation number and documents at the welcome desk.'],
                ['9:15 a.m.', 'Meet your navigator', 'Room 204', 'Talk through your household needs and programs that may help.'],
                ['10:00 a.m.', 'Make a service plan', 'Resource room', 'Choose next steps and any applications or appointments to schedule.'],
              ].map(([time, title, location, description], index) => (
                <Container key={title} display="flex" direction="column" gap="1" responsive={{ tablet: { direction: 'row', gap: '3' } }} className="margin-bottom-2">
                  <Container flex="none" display="flex" direction="column" align="start" gap="1" className="minw-15">
                    <Tag value={`Stop ${index + 1}`} color="primary" outline />
                    <Prose className="text-primary text-bold">{time}</Prose>
                  </Container>
                  <Container flex="fill" className="minw-0">
                    <Card title={title} description={description} tagProps={[{ value: location }]} className="margin-0" />
                  </Container>
                </Container>
              ))} />
            </Section>
          </Container>
          <Container element="aside" column="12" responsive={{ desktop: { column: '4' } }}>
            <Container display="flex" direction="column" gap="3">
              <SummaryBox id="appointment-preparation" heading="What to bring">
                <Container display="flex" direction="column" gap="3">
                  <List items={['Your confirmation number', 'A recent utility bill', 'Any questions for your navigator']} />
                  <Section headingLevel="h5" title="Missing a document?" style={{ margin: 0 }}>
                    <Prose>Keep your appointment. Your navigator can help you identify another document or explain how to provide it later.</Prose>
                  </Section>
                </Container>
              </SummaryBox>
              <Section id="appointment-location" headingLevel="h3" title="Getting here" style={{ margin: 0 }}>
                <Container display="flex" direction="column" gap="2">
                  <List unstyled items={['Riverton Service Center', '120 River Street', 'Riverton']} />
                  <Prose>The main entrance faces River Street. An accessible entrance and elevator are available from the courtyard.</Prose>
                  <Prose>Allow 15 minutes for parking and check-in.</Prose>
                </Container>
              </Section>
            </Container>
          </Container>
        </Container>
        <SummaryBox id="appointment-follow-up" heading="After your visit">
          <Container display="flex" direction="column" gap="2">
            <Prose>Your navigator will call to check your progress and answer any new questions.</Prose>
            <Container display="flex" gap="2" align="center" flex="none">
              <CalendarDate datetime="2026-11-17" />
              <Section headingLevel="h5" title="Phone follow-up" style={{ margin: 0 }}><Prose>November 17 · 10:00 a.m. Central</Prose></Section>
            </Container>
          </Container>
        </SummaryBox>
      </>
    ),
  },
};

export const workflowStoryDescriptions = {
  SearchResultsWorkspace: 'A services directory composes Section, Prose, List, SummaryBox, and structured Card components. The criteria panel stacks above results on small and medium screens, then becomes a 4/8 grid at desktop. The results heading and sort information become a horizontal flex row at desktop, while each Card provides program details, tags, and a working help link.',
  ProgramDashboard: 'A program dashboard arranges SummaryBox metrics, Section headings, List content, and Tag counts. Metrics grow from one column to two at mobileLg and four at desktop. Status groups become two columns at tablet; the priorities move beside the queue in a desktop 8/4 split. Nested Containers align each stage label with its count while keeping all information visible.',
  ApplicationReview: 'An application review composes Section and Prose fields, a FileList of received documents, an Alert for the saved draft, and SummaryBox guidance. Fields become two columns at tablet; the header and guidance form wider desktop layouts. The next-step link moves beside its description at tablet.',
  AppointmentSummary: 'An appointment page combines CalendarDate, structured Card itinerary entries, an ordered List, Link navigation, and SummaryBox preparation and follow-up information. Navigation wraps horizontally at mobileLg. At tablet each itinerary entry places its time beside the Card; at desktop preparation and directions occupy a 4-column aside beside the 8-column itinerary.',
};
