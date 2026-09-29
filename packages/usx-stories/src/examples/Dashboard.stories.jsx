import React from 'react';
import Skipnav from '../../../usx-react/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../usx-react/src/components/banner/Banner.tsx';
import Header from '../../../usx-react/src/components/header/Header.tsx';
import Footer from '../../../usx-react/src/components/footer/Footer.tsx';
import ButtonGroup from '../../../usx-react/src/components/button-group/ButtonGroup.tsx';
import { MetricCard } from '../patterns/BuildingBlocks.jsx';
import Identifier from '../../../usx-react/src/components/identifier/Identifier.tsx';
import Indicator from '../../../usx-react/src/components/indicator/Indicator.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import Section from '../../../usx-react/src/components/section/Section.tsx';
import Status from '../../../usx-react/src/components/status/Status.tsx';
import Table from '../../../usx-react/src/components/table/Table.tsx';
import Tag from '../../../usx-react/src/components/tag/Tag.tsx';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs.js';

const activity = [
  { id: 'user-signup', event: 'User signup', details: 'John Smith registered a new account', status: 'Completed', time: '2 minutes ago' },
  { id: 'new-order', event: 'New order', details: 'Order #12345 placed for $299.99', status: 'Completed', time: '5 minutes ago' },
  { id: 'campaign-sent', event: 'Campaign sent', details: 'Monthly newsletter dispatched to 12,847 recipients', status: 'Delivered', time: '1 hour ago' },
  { id: 'database-backup', event: 'Database backup', details: 'Database backup started automatically', status: 'In progress', time: '2 hours ago' },
];

function exportActivity() {
  const blob = new Blob([JSON.stringify(activity, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'dashboard-activity.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default {
  title: 'Examples/Data Display',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Dashboard = {
  render: () => (
    <>
      <Skipnav target="dashboard-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="dashboard-header"
        {...headerArgs}
      />
      <Layout
        variant="single-column"
        content={
          <Page id="dashboard-example" title="Dashboard" tabIndex={-1}>
            <div className="padding-bottom-2 border-bottom usx-border-border display-flex flex-wrap flex-align-center flex-justify">
              <p className="margin-y-1 margin-right-3 font-sans-sm">September 2026 <span className="text-base"> / Monthly overview</span></p>
              <ButtonGroup
                className="margin-y-1"
                buttonProps={[
                  { children: 'Export activity', variant: 'outline', iconProps: [{ name: 'file_download' }], onClick: exportActivity },
                ]}
              />
            </div>

            <Section title="Key Metrics" className="margin-top-3 margin-bottom-2">
              <div className="grid-row grid-gap">
                <div className="tablet:grid-col-6 desktop:grid-col-3 margin-bottom-2">
                  <MetricCard title="Total Users" value="12,847" trend="+12.5%" color="primary" />
                </div>

                <div className="tablet:grid-col-6 desktop:grid-col-3 margin-bottom-2">
                  <MetricCard title="Active Sessions" value="3,429" trend="+8.2%" color="success" />
                </div>

                <div className="tablet:grid-col-6 desktop:grid-col-3 margin-bottom-2">
                  <MetricCard title="Conversion Rate" value="24.7%" trend="-2.1%" color="warning" negative />
                </div>

                <div className="tablet:grid-col-6 desktop:grid-col-3 margin-bottom-2">
                  <MetricCard title="Revenue" value="$89,432" trend="+15.3%" color="accent-cool" />
                </div>
              </div>
            </Section>

            <Section title="Recent Activity" className="margin-y-3">
              <Table
                id="dashboard-activity"
                tabIndex={-1}
                aria-label="Recent activity"
                borderless
                responsive="stack"
                className="width-full"
                columns={[
                  { key: 'event', header: 'Event', primary: true },
                  { key: 'details', header: 'Details' },
                  {
                    key: 'status', header: 'Status',
                    render: (row) => (
                      <Tag
                        value={row.status}
                        color={row.status === 'In progress' ? 'warning' : 'success'}
                        outline
                        className="text-no-wrap"
                      />
                    ),
                  },
                  { key: 'time', header: 'Time' },
                ]}
                data={activity}
              />
            </Section>
            <Section title="System Status" className="margin-top-3 margin-bottom-4">
              <div className="grid-row grid-gap">
                {[
                  { name: 'API', status: 'Operational', detail: 'All endpoints available', color: 'success' },
                  { name: 'Database', status: 'Operational', detail: '99.9% uptime this month', color: 'success' },
                  { name: 'Maintenance', status: 'Scheduled', detail: 'October 1, 2:00-4:00 AM ET', color: 'warning' },
                ].map((system) => (
                  <div key={system.name} className="tablet:grid-col-4 margin-bottom-2 display-flex">
                    <Indicator className="flex-fill flex-column padding-2 border usx-border-border usx-radius-box bg-surface-1">
                      <Status
                        color={system.color}
                        size="lg"
                        className="usx-indicator-item usx-indicator-top usx-indicator-end"
                        aria-hidden="true"
                      />
                      <h3 className="margin-top-0 margin-bottom-1 font-sans-sm">{system.name}</h3>
                      <p className="margin-y-1 font-sans-sm">{system.status}</p>
                      <p className="margin-top-1 margin-bottom-0 font-sans-xs text-base">{system.detail}</p>
                    </Indicator>
                  </div>
                ))}
              </div>
            </Section>
          </Page>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-dashboard' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
