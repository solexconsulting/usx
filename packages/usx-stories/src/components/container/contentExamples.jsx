import React from 'react';
import Attribution from '../../../../usx-react/src/components/attribution/Attribution.tsx';
import Button from '../../../../usx-react/src/components/button/Button.tsx';
import Card from '../../../../usx-react/src/components/card/Card.tsx';
import Collection from '../../../../usx-react/src/components/collection/Collection.tsx';
import Container from '../../../../usx-react/src/components/container/Container.tsx';
import Eyebrow from '../../../../usx-react/src/components/eyebrow/Eyebrow.tsx';
import Link from '../../../../usx-react/src/components/link/Link.tsx';
import List from '../../../../usx-react/src/components/list/List.tsx';
import Prose from '../../../../usx-react/src/components/prose/Prose.tsx';
import Quote from '../../../../usx-react/src/components/quote/Quote.tsx';
import Section from '../../../../usx-react/src/components/section/Section.tsx';
import SummaryBox from '../../../../usx-react/src/components/summary-box/SummaryBox.tsx';

const services = [
  ['Housing', 'Find a stable place to live', 'Explore rental assistance, housing counseling, and help with essential home repairs.', 'View housing services'],
  ['Food', 'Get help with groceries', 'Find food programs, neighborhood markets, and meal delivery options for older adults.', 'View food services'],
  ['Work', 'Take your next career step', 'Connect with a career coach, build new skills, and prepare for your next interview.', 'View work services'],
  ['Transportation', 'Plan a reliable trip', 'Learn about reduced fares and accessible transportation to appointments and work.', 'View travel services'],
  ['Family', 'Find support for your family', 'Explore child care options, family resource centers, and activities for young people.', 'View family services'],
  ['Utilities', 'Keep essential services running', 'Find assistance with energy bills and learn how to make your home more efficient.', 'View utility services'],
];

const offices = [
  { name: 'Northside service center', address: '120 Garden Avenue', days: 'Monday–Friday', hours: '8:30 a.m.–5 p.m.', detail: 'Evening appointments on Thursdays.', phone: '(202) 555-0101', href: 'tel:+12025550101' },
  { name: 'Riverside service center', address: '45 River Street', days: 'Monday–Saturday', hours: '9 a.m.–4 p.m.', detail: 'A quiet appointment room is available.', phone: '(202) 555-0102', href: 'tel:+12025550102' },
  { name: 'Eastgate service center', address: '300 Orchard Road', days: 'Tuesday–Saturday', hours: '8 a.m.–4:30 p.m.', detail: 'Near the Eastgate bus interchange.', phone: '(202) 555-0103', href: 'tel:+12025550103' },
  { name: 'Community outreach team', address: 'At participating neighborhood libraries', days: 'Monday–Friday', hours: 'By appointment', detail: 'Call to find the next visit near you.', phone: '(202) 555-0104', href: 'tel:+12025550104' },
];

const resources = [
  { title: 'Your first appointment', summary: 'What to bring, where to go, and how to request an interpreter.', type: 'Guide', detail: '5 minute read', id: 'first-appointment' },
  { title: 'Document checklist', summary: 'Review examples of the documents you may need before starting an application.', type: 'Checklist', detail: '3 minute read', id: 'document-checklist' },
  { title: 'Understanding your decision letter', summary: 'Learn what each part of your letter means and where to find your next steps.', type: 'Guide', detail: '7 minute read', id: 'decision-letter' },
];

export const contentStoryDefs = {
  ServiceDirectory: {
    element: 'section',
    ariaLabel: 'Community service directory',
    gridContainer: 'default',
    className: 'padding-x-0',
    display: 'flex',
    direction: 'column',
    gap: '4',
    children: (
      <>
        <Container display="flex" direction="column" gap="2" responsive={{ tablet: { direction: 'row', align: 'end', justify: 'space-between' } }}>
          <Container flex="fill" className="minw-0">
            <Prose className="text-uppercase text-bold text-primary margin-bottom-1">Cedar County community services</Prose>
            <Section id="service-directory-title" title="Support for everyday life">
              <Prose className="measure-5">Find local services for you and your household. Our team can help you decide where to begin.</Prose>
            </Section>
          </Container>
          <Container flex="none">
            <Button variant="primary" href="#service-directory-help" label="Talk with a navigator" className="margin-right-0" />
          </Container>
        </Container>
        <Container element="nav" ariaLabel="Browse community services" display="flex" wrap="wrap" gap="2">
          {services.map(([category]) => (
            <Link key={category} href={`#service-${category.toLowerCase()}`}>{category}</Link>
          ))}
        </Container>
        <Section title="Explore services" headingLevel="h3">
          <Container element="ul" gridRow gutters="2" responsive={{ desktop: { gutters: '3' } }} className="usa-list--unstyled">
            {services.map(([category, title, description, action]) => (
              <Container element="li" key={category} column="12" responsive={{ tablet: { column: '6' }, desktop: { column: '4' } }} className="padding-bottom-3">
                <Card
                  id={`service-${category.toLowerCase()}`}
                  title={title}
                  description={description}
                  tagProps={[{ value: category }]}
                  buttonProps={[{ href: '#service-directory-help', label: action, variant: 'unstyled' }]}
                  className="height-full margin-bottom-0"
                />
              </Container>
            ))}
          </Container>
        </Section>
        <Container id="service-directory-help" element="aside">
          <SummaryBox id="service-help-title" heading="You do not have to figure it out alone">
            <Container display="flex" direction="column" gap="2" responsive={{ tablet: { direction: 'row', align: 'center' } }}>
              <Container flex="fill" className="minw-0">
                <Prose>A community navigator can explain your options. Call Monday–Friday, 9 a.m.–5 p.m.</Prose>
              </Container>
              <Container flex="none">
                <Button variant="primary" href="tel:+12025550100" label="Call (202) 555-0100" className="margin-right-0" />
              </Container>
            </Container>
          </SummaryBox>
        </Container>
      </>
    ),
  },
  EditorialFeature: {
    element: 'article',
    ariaLabel: 'A new chapter for the Riverside library',
    gridContainer: 'default',
    className: 'padding-x-0',
    children: (
      <>
        <Container gridRow gutters="3">
          <Container column="12" responsive={{ tablet: { column: '8', offset: '2' }, desktop: { column: '9', offset: 'none' } }}>
            <Prose className="text-uppercase text-bold text-primary margin-bottom-2">From our neighborhoods</Prose>
            <Section id="editorial-title" title="A new chapter for the Riverside library">
              <Container display="flex" direction="column" gap="2">
                <Prose className="font-body-lg">A familiar neighborhood space is opening its doors to more ways to learn, connect, and get things done.</Prose>
                <Attribution primary="Cedar County library team" secondary="September 14, 2026 · 4 minute read" />
              </Container>
            </Section>
          </Container>
        </Container>
        <Container gridRow gutters="3" responsive={{ desktop: { gutters: '4' } }}>
          <Container column="12" responsive={{ tablet: { column: '8', offset: '2' }, desktop: { column: '8', offset: 'none' } }}>
            <Section id="library-space-title" title="Room for the whole neighborhood" headingLevel="h3">
              <Container display="flow-root">
                <Prose className="margin-bottom-2">On a typical afternoon, the library hosts students working on a science project, neighbors trading gardening tips, and job seekers getting help with applications. The renewed Riverside branch makes room for all of them.</Prose>
                <Container element="aside" float="none" responsive={{ desktop: { float: 'right' } }} className="width-full desktop:width-card-lg desktop:margin-left-3 margin-bottom-2">
                  <SummaryBox id="library-improvements-title" heading="More ways to use your library">
                    <List items={['Two reservable meeting rooms', 'A family reading corner', 'Six additional public computers']} />
                  </SummaryBox>
                </Container>
                <Prose className="margin-bottom-2">Residents helped shape the renovation through open houses and small group conversations. Their priorities were practical: comfortable places to sit, accessible workspaces, and room for activities without interrupting quiet study.</Prose>
                <Prose className="margin-bottom-2">The result includes brighter reading areas and a flexible community room. Staff can set up the room for a language class in the morning and a neighborhood meeting in the evening.</Prose>
                <Prose>A new welcome desk brings library staff and community navigators together. Visitors can ask about a book, get help finding a service, or learn how to reserve a computer in one place.</Prose>
              </Container>
            </Section>
            <Section id="library-programs-title" title="Built around your day" headingLevel="h3" className="margin-y-4">
              <Container display="flex" direction="column" gap="3">
                <Prose>Weekly activities include family story time, guided technology practice, and conversation groups. Most programs are free and welcome drop-in visitors.</Prose>
                <Quote attributionProps={{ primary: 'Jordan Lee', secondary: 'Riverside branch manager' }}>
                  We wanted a place where someone can arrive with a question and leave feeling ready for their next step.
                </Quote>
                <Prose>Stop by during opening week to meet the team, explore the new spaces, and share an idea for a future program.</Prose>
              </Container>
            </Section>
          </Container>
          <Container element="aside" ariaLabel="Plan a library visit" column="12" responsive={{ tablet: { column: '8', offset: '2' }, desktop: { column: '4', offset: 'none' } }}>
            <Container display="flex" direction="column" gap="3">
              <Section id="library-visit-title" title="Visit Riverside" headingLevel="h3">
                <List unstyled items={['45 River Street, Cedar County', 'Monday–Thursday: 9 a.m.–8 p.m.', 'Friday–Saturday: 9 a.m.–5 p.m.']} />
              </Section>
              <Section id="library-events-title" title="This week at the library" headingLevel="h3">
                <Container display="flex" direction="column" gap="2">
                  <List items={['Tuesday: Family story time, 10 a.m.', 'Thursday: Technology help, 2 p.m.', 'Saturday: Community open house, 11 a.m.']} />
                  <Link href="tel:+12025550105">Call the library</Link>
                </Container>
              </Section>
            </Container>
          </Container>
        </Container>
      </>
    ),
  },
  ContactDirectory: {
    element: 'section',
    ariaLabel: 'Resident service center directory',
    gridContainer: 'default',
    className: 'padding-x-0',
    children: (
      <>
        <Container>
          <Prose className="text-uppercase text-bold text-primary margin-bottom-2">Cedar County resident services</Prose>
          <Section id="contact-directory-title" title="Find a place to get help">
            <Prose className="measure-5">Visit a service center for help with applications, documents, and local programs. Call ahead if you need an interpreter or an accommodation.</Prose>
          </Section>
        </Container>
        <Section id="contact-options-title" title="Start with the option that works for you" headingLevel="h3">
          <Container display="flex" direction="column" gap="3" responsive={{ tablet: { direction: 'row' } }}>
            <Container flex="fill" className="minw-0 border-top-05 border-primary padding-top-2">
              <Eyebrow>By phone</Eyebrow>
              <Container display="flex" direction="column" gap="1" className="margin-top-2">
                <Link href="tel:+12025550100">(202) 555-0100</Link>
                <Prose>Monday–Friday, 9 a.m.–5 p.m.</Prose>
              </Container>
            </Container>
            <Container flex="fill" className="minw-0 border-top-05 border-primary padding-top-2">
              <Eyebrow>In person</Eyebrow>
              <Prose className="margin-top-2">Walk in at any service center. Appointments may reduce your wait.</Prose>
            </Container>
            <Container flex="fill" className="minw-0 border-top-05 border-primary padding-top-2">
              <Eyebrow>In your neighborhood</Eyebrow>
              <Prose className="margin-top-2">Meet our outreach team at a participating library.</Prose>
            </Container>
          </Container>
        </Section>
        <Section title="Service centers and outreach" headingLevel="h3">
          <Container element="ul" gridRow gutters="3" className="usa-list--unstyled">
            {offices.map((office) => (
              <Container element="li" key={office.name} column="12" responsive={{ tablet: { column: '6' } }} className="padding-bottom-3">
                <Card
                  title={office.name}
                  description={`${office.address}. ${office.days}, ${office.hours}. ${office.detail}`}
                  buttonProps={[{ label: `Call ${office.phone}`, href: office.href, variant: 'unstyled' }]}
                  className="height-full margin-bottom-0"
                />
              </Container>
            ))}
          </Container>
        </Section>
      </>
    ),
  },
  ResourceCenter: {
    element: 'section',
    ariaLabel: 'Application resource center',
    gridContainer: 'default',
    className: 'padding-x-0',
    children: (
      <>
        <Container display="flex" direction="column" gap="2" className="margin-bottom-4">
          <Section id="resource-center-title" title="Application resource center">
            <Prose className="measure-5">Clear, practical information to help you prepare an application and understand what happens next.</Prose>
          </Section>
          <Container element="nav" ariaLabel="Resource topics" display="flex" direction="column" gap="2" responsive={{ mobileLg: { direction: 'row', wrap: 'wrap', gap: '3' } }}>
            <Link href="#resources-getting-started">Getting started</Link>
            <Link href="#resources-common-questions">Common questions</Link>
            <Link href="#resources-help">Personal assistance</Link>
          </Container>
        </Container>
        <Container gridRow gutters="3" responsive={{ desktop: { gutters: '4' } }}>
          <Container column="12" responsive={{ desktop: { column: '8' } }} className="margin-bottom-4">
            <Section id="resources-getting-started" title="Getting started" headingLevel="h3">
              <Container display="flex" direction="column" gap="2">
                {resources.map((resource) => (
                  <Container id={resource.id} key={resource.id}>
                    <Collection items={[{
                      heading: resource.title,
                      href: '#resources-help',
                      description: resource.summary,
                      meta: [resource.detail],
                      tags: [resource.type],
                    }]} className="margin-y-0" />
                  </Container>
                ))}
              </Container>
            </Section>
            <Section id="resources-common-questions" title="Common questions" headingLevel="h3" className="margin-top-4">
              <Container gridRow gutters="2">
                <Container column="12" responsive={{ tablet: { column: '6' } }} className="padding-bottom-2">
                  <Card title="Can someone help me complete an application?" description="Yes. A community navigator can walk through the steps with you by phone or in person." className="height-full margin-bottom-0" />
                </Container>
                <Container column="12" responsive={{ tablet: { column: '6' } }} className="padding-bottom-2">
                  <Card title="What if I do not have a document on the checklist?" description="Contact the service team. They can explain which alternatives may be available for your program." className="height-full margin-bottom-0" />
                </Container>
              </Container>
            </Section>
          </Container>
          <Container id="resources-help" element="aside" column="12" responsive={{ desktop: { column: '4' } }}>
            <Section id="resources-help-title" title="Personal assistance" headingLevel="h3">
              <Container display="flex" direction="column" gap="2">
                <SummaryBox id="resource-navigator-title" heading="Talk with a navigator">
                  <Container display="flex" direction="column" gap="2">
                    <Prose>Get help with your next step or ask for a printed guide.</Prose>
                    <Button variant="primary" href="tel:+12025550100" label="Call a navigator" className="margin-right-0" />
                    <Prose>Monday–Friday, 9 a.m.–5 p.m.</Prose>
                  </Container>
                </SummaryBox>
                <Container className="border-top-1px border-base-light padding-top-2">
                  <Eyebrow>Information in your language</Eyebrow>
                  <Prose className="margin-top-2">Tell the navigator your preferred language. Interpretation is available at no cost.</Prose>
                </Container>
              </Container>
            </Section>
          </Container>
        </Container>
      </>
    ),
  },
};

export const contentStoryDescriptions = {
  ServiceDirectory: 'A county service landing page combines Section and Prose introductions, wrapping Link navigation, and structured Card components in a one-, two-, then three-column Container grid. Cards own their headings, descriptions, category Tags, and footer Buttons. A SummaryBox contains a help message and a call Button that switch from a stack to an aligned row at tablet width.',
  EditorialFeature: 'A library feature uses Section, Prose, Attribution, Quote, List, and SummaryBox components. Container centers the reading column on tablets, then resets offsets to make room for a desktop visit-information sidebar. The improvements SummaryBox fills the reading column on smaller screens and floats at a readable width on desktop.',
  ContactDirectory: 'A service-center directory pairs three responsive contact options labeled with Eyebrow components and structured Card components for office addresses, opening hours, and phone Buttons. Container changes the office list from one column to two at tablet width; Card owns the equal-height surfaces and footer layout.',
  ResourceCenter: 'A resource library combines responsive Link navigation, Collection entries with descriptions, tags and reading times, and two Card answers to common questions. Container changes the topic navigation into a wrapping row at mobileLg and moves the SummaryBox for personal assistance into a sidebar on desktop.',
};
