import React from 'react';
import Skipnav from '../../../core/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import MiscBanner from '../../../core/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import Button from '../../../core/src/components/button/Button.tsx';
import ButtonGroup from '../../../core/src/components/button-group/ButtonGroup.tsx';
import Icon from '../../../core/src/components/icon/Icon.tsx';
import Identifier from '../../../core/src/components/identifier/Identifier.tsx';
import Layout from '../../../core/src/components/layout/Layout.tsx';
import Page from '../../../core/src/components/page/Page.jsx';
import Section from '../../../core/src/components/section/Section.tsx';
import Status from '../../../core/src/components/status/Status.tsx';
import Table from '../../../core/src/components/table/Table.jsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from './commonArgs.js';

export default {
  title: 'Examples/Data Display',
};

export const Dashboard = {
  render: () => (
    <>
      <Skipnav target="dashboard-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <MiscBanner {...miscBannerArgs} />
      <Header
        id="dashboard-header"
        {...headerArgs}
      />
      <Layout
        variant="grid"
        expandRightSidebar={true}
        content={
          <Page id="dashboard-example" title="Dashboard">
            <div className="margin-bottom-3 display-flex flex-wrap flex-align-center justify-between gap-2">
              <p className="text-intro margin-0">Overview of system analytics, user registrations, and live status.</p>
              <ButtonGroup
                items={[
                  { children: 'New Item', variant: 'primary', leftIcon: { name: 'add', size: 'sm' } },
                  { children: 'Export Data', variant: 'secondary', leftIcon: { name: 'file_download', size: 'sm' } },
                ]}
              />
            </div>

            <Section title="Key Metrics">
              <div className="grid-row grid-gap">
                <div className="tablet:grid-col-3 margin-bottom-2">
                  <div className="bg-usx-surface-2 border-left-05 usx-border-primary padding-3 usx-rounded-md">
                    <h3 className="margin-0 text-primary font-sans-sm">Total Users</h3>
                    <div className="font-heading-xl usx-text margin-y-1">12,847</div>
                    <div className="text-success font-sans-xs display-flex flex-align-center">
                      <Icon name="trending_up" size="sm" className="margin-right-05" />
                      +12.5% from last month
                    </div>
                  </div>
                </div>

                <div className="tablet:grid-col-3 margin-bottom-2">
                  <div className="bg-usx-surface-2 border-left-05 usx-border-success padding-3 usx-rounded-md">
                    <h3 className="margin-0 text-success font-sans-sm">Active Sessions</h3>
                    <div className="font-heading-xl usx-text margin-y-1">3,429</div>
                    <div className="text-success font-sans-xs display-flex flex-align-center">
                      <Icon name="trending_up" size="sm" className="margin-right-05" />
                      +8.2% from last month
                    </div>
                  </div>
                </div>

                <div className="tablet:grid-col-3 margin-bottom-2">
                  <div className="bg-usx-surface-2 border-left-05 usx-border-warning padding-3 usx-rounded-md">
                    <h3 className="margin-0 text-warning font-sans-sm">Conversion Rate</h3>
                    <div className="font-heading-xl usx-text margin-y-1">24.7%</div>
                    <div className="text-error font-sans-xs display-flex flex-align-center">
                      <Icon name="trending_down" size="sm" className="margin-right-05" />
                      -2.1% from last month
                    </div>
                  </div>
                </div>

                <div className="tablet:grid-col-3 margin-bottom-2">
                  <div className="bg-usx-surface-2 border-left-05 usx-border-accent-cool padding-3 usx-rounded-md">
                    <h3 className="margin-0 text-accent-cool font-sans-sm">Revenue</h3>
                    <div className="font-heading-xl usx-text margin-y-1">$89,432</div>
                    <div className="text-success font-sans-xs display-flex flex-align-center">
                      <Icon name="trending_up" size="sm" className="margin-right-05" />
                      +15.3% from last month
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Recent Activity">
              <Table
                bordered
                columns={[
                  { key: 'event', label: 'Event' },
                  { key: 'details', label: 'Details' },
                  { key: 'status', label: 'Status' },
                  { key: 'time', label: 'Time' },
                ]}
                data={[
                  {
                    event: <span className="text-bold display-flex flex-align-center gap-1"><Icon name="person" size="sm" className="text-primary" /> User Signup</span>,
                    details: 'John Smith registered a new account',
                    status: <Status label="Completed" variant="active" size="sm" />,
                    time: '2 minutes ago',
                  },
                  {
                    event: <span className="text-bold display-flex flex-align-center gap-1"><Icon name="shopping_cart" size="sm" className="text-success" /> New Order</span>,
                    details: 'Order #12345 placed for $299.99',
                    status: <Status label="Completed" variant="active" size="sm" />,
                    time: '5 minutes ago',
                  },
                  {
                    event: <span className="text-bold display-flex flex-align-center gap-1"><Icon name="mail" size="sm" className="text-accent-cool" /> Campaign Sent</span>,
                    details: 'Monthly newsletter dispatched to 12,847 recipients',
                    status: <Status label="Delivered" variant="active" size="sm" />,
                    time: '1 hour ago',
                  },
                  {
                    event: <span className="text-bold display-flex flex-align-center gap-1"><Icon name="warning" size="sm" className="text-warning" /> System Alert</span>,
                    details: 'Database backup started automatically',
                    status: <Status label="In Progress" variant="warning" size="sm" />,
                    time: '2 hours ago',
                  },
                ]}
              />
            </Section>
          </Page>
        }
        rightSidebar={
          <div className="display-flex flex-column margin-top-3 gap-3">
            <div>
              <h3 className="usx-text margin-top-0 margin-bottom-15">Quick Actions</h3>
              <div className="display-flex flex-column gap-1">
                <Button variant="primary" className="width-full" leftIcon={{ name: 'add', size: 'sm' }}>
                  Add New User
                </Button>
                <Button variant="primary" className="width-full" leftIcon={{ name: 'file_upload', size: 'sm' }}>
                  Import Data
                </Button>
                <Button variant="primary" className="width-full" leftIcon={{ name: 'settings', size: 'sm' }}>
                  System Settings
                </Button>
                <Button variant="secondary" className="width-full" leftIcon={{ name: 'help', size: 'sm' }}>
                  Help & Support
                </Button>
              </div>
            </div>

            <div>
              <h3 className="usx-text margin-top-0 margin-bottom-15">System Status</h3>
              <div className="display-flex flex-column gap-2">
                <div className="display-flex flex-align-center gap-1">
                  <Status label="Operational" variant="active" size="md" />
                  <div>
                    <div className="text-bold font-sans-xs usx-text">API Status</div>
                    <div className="text-base usx-text-muted font-sans-3xs">All systems operational</div>
                  </div>
                </div>

                <div className="display-flex flex-align-center gap-1">
                  <Status label="Operational" variant="active" size="md" />
                  <div>
                    <div className="text-bold font-sans-xs usx-text">Database</div>
                    <div className="text-base usx-text-muted font-sans-3xs">99.9% uptime</div>
                  </div>
                </div>

                <div className="display-flex flex-align-center gap-1">
                  <Status label="Scheduled" variant="warning" size="md" />
                  <div>
                    <div className="text-bold font-sans-xs usx-text">Maintenance</div>
                    <div className="text-base usx-text-muted font-sans-3xs">March 20, 2:00 AM - 4:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-dashboard' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
