import React from 'react';
import Skipnav from '../../../usx-react/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../usx-react/src/components/banner/Banner.tsx';
import Header from '../../../usx-react/src/components/header/Header.tsx';
import Footer from '../../../usx-react/src/components/footer/Footer.tsx';
import Identifier from '../../../usx-react/src/components/identifier/Identifier.tsx';
import Avatar from '../../../usx-react/src/components/avatar/Avatar.tsx';
import Indicator from '../../../usx-react/src/components/indicator/Indicator.tsx';
import ButtonGroup from '../../../usx-react/src/components/button-group/ButtonGroup.tsx';
import Collection from '../../../usx-react/src/components/collection/Collection.tsx';
import IconList from '../../../usx-react/src/components/icon-list/IconList.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import Section from '../../../usx-react/src/components/section/Section.tsx';
import Status from '../../../usx-react/src/components/status/Status.tsx';
import TagGroup from '../../../usx-react/src/components/tag-group/TagGroup.tsx';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs.js';

export default {
  title: 'Examples/Data Display',
  parameters: {
    layout: 'fullscreen',
  },
};

export const ProfileInfo = {
  render: () => (
    <>
      <Skipnav target="profile-info-example" />
      <Banner id="profile-banner" ariaLabel="Official government banner" />
      <Header id="profile-header" {...headerArgs} />
      <Layout
        variant="single-column"
        content={
          <Page id="profile-info-example" title="User Profile" tabIndex={-1}>
            <Section>
              <div className="padding-3 border usx-rounded-box bg-surface-2 margin-bottom-3">
                <div className="display-flex flex-wrap flex-align-start gap-3">
                  <Indicator className="usx-indicator-top usx-indicator-end margin-right-3">
                    <Avatar
                      src="benjamin_franklin.png"
                      href="#profile-info-example"
                      className="usx-avatar--size-xl usx-rounded-sm"
                      contentClassName="bg-surface-3"
                      alt="Alex Morgan"
                    />
                    <Status
                      color="success"
                      size="md"
                      className="usx-indicator-item"
                      animation="ping"
                    />
                  </Indicator>
                  <div className="flex-fill">
                    <div className="display-flex flex-align-center gap-2 flex-wrap">
                      <h2 className="margin-0 margin-right-2">Alex Morgan</h2>
                    </div>
                    <p className="text-base usx-text-muted margin-y-1">Senior Digital Systems Architect &bull; Office of Technology</p>
                    <TagGroup
                      tagProps={[
                        { value: 'Administrator', color: 'primary' },
                        { value: 'Security Lead', color: 'info' },
                        { value: 'USX Specialist', color: 'success' },
                      ]}
                    />
                  </div>
                  <ButtonGroup
                    buttonProps={[
                      { children: 'Edit Profile', variant: 'primary', iconProps: [{ name: 'edit' }] },
                      { children: 'Message', variant: 'secondary', iconProps: [{ name: 'mail' }] },
                    ]}
                  />
                </div>
              </div>
            </Section>

            <Section title="Account & Contact Information">
              <div className="grid-row grid-gap">
                <div className="tablet:grid-col-6 margin-bottom-2">
                  <section className="height-full padding-3 border usx-rounded-box bg-surface-1" aria-labelledby="profile-contact-heading">
                    <h3 id="profile-contact-heading" className="margin-top-0">Contact Details</h3>
                      <IconList
                        items={[
                          { iconName: 'alternate_email', content: 'alex.morgan@agency.gov' },
                          { iconName: 'phone', content: '(202) 555-0184' },
                          { iconName: 'location_on', content: 'Washington, D.C. Headquarters, Room 402' },
                        ]}
                      />
                  </section>
                </div>

                <div className="tablet:grid-col-6 margin-bottom-2">
                  <section className="height-full padding-3 border usx-rounded-box bg-surface-1" aria-labelledby="profile-access-heading">
                    <h3 id="profile-access-heading" className="margin-top-0">Role &amp; Access Summary</h3>
                      <IconList
                        items={[
                          { iconName: 'account_box', content: 'Employee ID: AG-884920' },
                          { iconName: 'verified_user', content: 'Clearance Level: Tier 3 Public Trust' },
                          { iconName: 'schedule', content: 'Member since: January 2021' },
                        ]}
                      />
                  </section>
                </div>
              </div>
            </Section>

            <Section title="Recent Activity">
              <Collection
                aria-label="Recent activity"
                items={[
                  {
                    heading: 'Approved Security Compliance Audit',
                    href: '#profile-info-example',
                    description: 'Quarterly review for USX Design System components',
                    meta: [{ text: 'September 28, 2026 at 10:14 AM', datetime: '2026-09-28T10:14:00-04:00' }],
                  },
                  {
                    heading: 'Updated System Tokens',
                    href: '#profile-info-example',
                    description: 'Synchronized USWDS 3.14.0 token manifest package',
                    meta: [{ text: 'September 27, 2026 at 3:45 PM', datetime: '2026-09-27T15:45:00-04:00' }],
                  },
                ]}
              />
            </Section>
          <Section title="Quick Info" className="margin-y-4">
            <dl className="font-sans-sm">
              <dt className="text-bold">Direct Supervisor</dt>
              <dd className="margin-left-0 margin-bottom-3">Jane Doe (Director of Tech)</dd>
              <dt className="text-bold">Primary Location</dt>
              <dd className="margin-left-0 margin-bottom-3">HQ Building - East Wing</dd>
              <dt className="text-bold">Time Zone</dt>
              <dd className="margin-left-0">Eastern Time (America/New_York)</dd>
            </dl>
          </Section>
          </Page>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-profile' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};