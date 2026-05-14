import React from 'react';
import Skipnav from '../skipnav/Skipnav';
import Banner from '../banner/Banner';
import MiscBanner from '../misc-banner/MiscBanner';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Button from '../button/Button';
import ButtonGroup from '../button-group/ButtonGroup';
import Icon from '../icon/Icon';
import Identifier from '../identifier/Identifier';
import Layout from '../layout/Layout';
import Page from '../page/Page';
import Section from '../section/Section';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs';

export default {
  title: 'Examples',
};

export const Dashboard = {
  render: () => (
    <>
      <Skipnav target="dashboard-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <MiscBanner
        tone="base"
        badgeText="misc"
        message="This is a miscellaneous banner."
        learnMoreText="Casual Link"
        learnMoreHref="#"
        returnText="Important Link"
        returnHref="#"
        returnIcon="arrow_forward"
      />
      <Header
        id="dashboard-header"
        {...headerArgs}
      />
      <Layout
        variant="grid"
        content={
          <Page id="dashboard-example" title="Dashboard">
              <Section>
                <div className="grid-row grid-gap flex-align-center">
                  <div className="grid-col-fill" />
                  <div className="grid-col-auto">
                    <ButtonGroup items={[
                      { children: 'Export Data', variant: 'secondary' },
                      { children: 'New Item', variant: 'primary' },
                    ]} />
                  </div>
                </div>
              </Section>

              <Section title="Key Metrics">
                <div className="grid-row grid-gap margin-4">
                  <div className="tablet:grid-col-3">
                    <div className="bg-primary-lighter padding-3 border border-primary border-1px">
                      <h3 className="margin-0 text-primary-dark">Total Users</h3>
                      <div className="font-heading-xl margin-top-1">12,847</div>
                      <div className="text-success margin-top-1">
                        <Icon name="trending_up" size="sm" className="margin-right-1" />
                        +12.5% from last month
                      </div>
                    </div>
                  </div>

                  <div className="tablet:grid-col-3">
                    <div className="bg-success-lighter padding-3 border border-success border-1px">
                      <h3 className="margin-0 text-success-dark">Active Sessions</h3>
                      <div className="font-heading-xl margin-top-1">3,429</div>
                      <div className="text-success margin-top-1">
                        <Icon name="trending_up" size="sm" className="margin-right-1" />
                        +8.2% from last month
                      </div>
                    </div>
                  </div>

                  <div className="tablet:grid-col-3">
                    <div className="bg-warning-lighter padding-3 border border-warning border-1px">
                      <h3 className="margin-0 text-warning-dark">Conversion Rate</h3>
                      <div className="font-heading-xl margin-top-1">24.7%</div>
                      <div className="text-error margin-top-1">
                        <Icon name="trending_down" size="sm" className="margin-right-1" />
                        -2.1% from last month
                      </div>
                    </div>
                  </div>

                  <div className="tablet:grid-col-3">
                    <div className="bg-accent-cool-lighter padding-3 border border-accent-cool border-1px">
                      <h3 className="margin-0 text-accent-cool-dark">Revenue</h3>
                      <div className="font-heading-xl margin-top-1">$89,432</div>
                      <div className="text-success margin-top-1">
                        <Icon name="trending_up" size="sm" className="margin-right-1" />
                        +15.3% from last month
                      </div>
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Recent Activity">
                <div className="grid-row grid-gap">
                  <div className="tablet:grid-col-8">
                    <div className="border border-base-lighter border-1px padding-3">
                      <div className="margin-top-3">
                        <div className="grid-row grid-gap margin-bottom-2">
                          <div className="grid-col-auto">
                            <Icon name="person" size="md" />
                          </div>
                          <div className="grid-col-fill">
                            <div className="text-bold">New user registration</div>
                            <div className="text-base">John Smith joined 2 minutes ago</div>
                          </div>
                          <div className="grid-col-auto text-base">2m ago</div>
                        </div>

                        <div className="grid-row grid-gap margin-bottom-2">
                          <div className="grid-col-auto">
                            <Icon name="local_grocery_store" size="md" />
                          </div>
                          <div className="grid-col-fill">
                            <div className="text-bold">New order</div>
                            <div className="text-base">Order #12345 for $299.99</div>
                          </div>
                          <div className="grid-col-auto text-base">5m ago</div>
                        </div>

                        <div className="grid-row grid-gap margin-bottom-2">
                          <div className="grid-col-auto">
                            <Icon name="mail" size="md" />
                          </div>
                          <div className="grid-col-fill">
                            <div className="text-bold">Email campaign sent</div>
                            <div className="text-base">Monthly newsletter sent to 12,847 subscribers</div>
                          </div>
                          <div className="grid-col-auto text-base">1h ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
          </Page>
        }
          expandRightSidebar={true}
          rightSidebar={
            <>
              <Section title="Quick Actions" className="border border-base-lighter border-1px padding-4 margin-bottom-3">
                <div className="margin-top-3">
                  <Button variant="primary" className="margin-bottom-2" leftIcon={{ name: 'add', size: 'sm' }}>
                    Add New User
                  </Button>
                  <Button variant="primary" className="margin-bottom-2" leftIcon={{ name: 'file_upload', size: 'sm' }}>
                    Import Data
                  </Button>
                  <Button variant="primary" className="margin-bottom-2" leftIcon={{ name: 'settings', size: 'sm' }}>
                    System Settings
                  </Button>
                  <Button variant="primary" leftIcon={{ name: 'help', size: 'sm' }}>
                    Help & Support
                  </Button>
                </div>
              </Section>

              <Section title="System Status" className="border border-base-lighter border-1px padding-3">
                <div className="margin-top-3">
                  <div className="grid-row grid-gap margin-bottom-2">
                    <div className="grid-col-auto">
                      <Icon name="check_circle" size="sm" className="text-success" />
                    </div>
                    <div className="grid-col-fill">
                      <div className="text-bold">API Status</div>
                      <div className="text-base text-success">All systems operational</div>
                    </div>
                  </div>

                  <div className="grid-row grid-gap margin-bottom-2">
                    <div className="grid-col-auto">
                      <Icon name="check_circle" size="sm" className="text-success" />
                    </div>
                    <div className="grid-col-fill">
                      <div className="text-bold">Database</div>
                      <div className="text-base text-success">99.9% uptime</div>
                    </div>
                  </div>

                  <div className="grid-row grid-gap">
                    <div className="grid-col-auto">
                      <Icon name="warning" size="sm" className="text-warning" />
                    </div>
                    <div className="grid-col-fill">
                      <div className="text-bold">Scheduled Maintenance</div>
                      <div className="text-base text-warning">March 20, 2:00 AM - 4:00 AM</div>
                    </div>
                  </div>
                </div>
              </Section>
            </>
          }
        />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-dashboard' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
