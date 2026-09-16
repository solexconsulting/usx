import React from 'react';
import Skipnav from '../../../core/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import Identifier from '../../../core/src/components/identifier/Identifier.tsx';
import Avatar from '../../../core/src/components/avatar/Avatar.tsx';
import ButtonGroup from '../../../core/src/components/button-group/ButtonGroup.tsx';
import Card from '../../../core/src/components/card/Card.tsx';
import Icon from '../../../core/src/components/icon/Icon.tsx';
import IconList from '../../../core/src/components/icon-list/IconList.tsx';
import Layout from '../../../core/src/components/layout/Layout.tsx';
import Page from '../../../core/src/components/page/Page.jsx';
import Section from '../../../core/src/components/section/Section.tsx';
import Status from '../../../core/src/components/status/Status.tsx';
import TagGroup from '../../../core/src/components/tag-group/TagGroup.tsx';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs.js';

export default {
  title: 'Examples/Patterns',
};

export const ProfileInfoPattern = {
  render: () => (
    <>
      <Skipnav target="profile-info-example" />
      <Banner id="profile-banner" ariaLabel="Official government banner" />
      <Header id="profile-header" {...headerArgs} />
      <Layout
        variant="grid"
        expandRightSidebar={true}
        content={
          <Page id="profile-info-example" title="User Profile">
            <Section>
              <div className="padding-3 border usx-border-border usx-rounded-lg bg-usx-surface-1 margin-bottom-3">
                <div className="display-flex flex-wrap flex-align-center gap-3">
                  <Avatar
                    size="xl"
                    src="https://picsum.photos/128/128?random=50"
                    alt="Alex Morgan"
                  />
                  <div className="flex-1">
                    <div className="display-flex flex-align-center gap-2 flex-wrap">
                      <h2 className="margin-0 text-ink">Alex Morgan</h2>
                      <Status label="Active" variant="active" size="md" />
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
                      { children: 'Message', variant: 'secondary', iconProps: [{ name: 'email' }] },
                    ]}
                  />
                </div>
              </div>
            </Section>

            <Section title="Account & Contact Information">
              <div className="grid-row grid-gap">
                <div className="tablet:grid-col-6 margin-bottom-2">
                  <Card
                    title="Contact Details"
                    description={
                      <IconList
                        items={[
                          { iconName: 'email', content: 'alex.morgan@agency.gov' },
                          { iconName: 'phone', content: '(202) 555-0184' },
                          { iconName: 'location_on', content: 'Washington, D.C. Headquarters &bull; Room 402' },
                        ]}
                      />
                    }
                  />
                </div>

                <div className="tablet:grid-col-6 margin-bottom-2">
                  <Card
                    title="Role & Access Summary"
                    description={
                      <IconList
                        items={[
                          { iconName: 'badge', content: 'Employee ID: AG-884920' },
                          { iconName: 'verified_user', content: 'Clearance Level: Tier 3 Public Trust' },
                          { iconName: 'schedule', content: 'Member since: January 2021' },
                        ]}
                      />
                    }
                  />
                </div>
              </div>
            </Section>

            <Section title="Recent Activity">
              <Card
                title="Activity Feed"
                description={
                  <div className="display-flex flex-column gap-2 margin-top-1">
                    <div className="display-flex flex-align-center gap-2 padding-bottom-2 border-bottom border-base-lighter">
                      <Icon name="check_circle" size="md" className="text-success" />
                      <div className="flex-1">
                        <div className="text-bold text-ink">Approved Security Compliance Audit</div>
                        <div className="text-base usx-text-muted font-sans-3xs">Quarterly review for USX Design System components</div>
                      </div>
                      <div className="text-base usx-text-muted font-sans-3xs">Today, 10:14 AM</div>
                    </div>

                    <div className="display-flex flex-align-center gap-2 padding-bottom-2 border-bottom border-base-lighter">
                      <Icon name="update" size="md" className="text-primary" />
                      <div className="flex-1">
                        <div className="text-bold text-ink">Updated System Tokens</div>
                        <div className="text-base usx-text-muted font-sans-3xs">Synchronized USWDS 3.14.0 token manifest package</div>
                      </div>
                      <div className="text-base usx-text-muted font-sans-3xs">Yesterday, 3:45 PM</div>
                    </div>
                  </div>
                }
              />
            </Section>
          </Page>
        }
        rightSidebar={
          <div className="display-flex flex-column margin-top-3 gap-2">
            <h3 className="text-ink margin-top-0 margin-bottom-15">Quick Info</h3>
            <div className="display-flex flex-column gap-2">
              <div>
                <div className="text-bold font-sans-xs text-ink">Direct Supervisor</div>
                <div className="text-base usx-text-muted font-sans-3xs">Jane Doe (Director of Tech)</div>
              </div>
              <div>
                <div className="text-bold font-sans-xs text-ink">Primary Location</div>
                <div className="text-base usx-text-muted font-sans-3xs">HQ Building - East Wing</div>
              </div>
              <div>
                <div className="text-bold font-sans-xs text-ink">Timezone</div>
                <div className="text-base usx-text-muted font-sans-3xs">Eastern Standard Time (EST)</div>
              </div>
            </div>
          </div>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-profile' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};