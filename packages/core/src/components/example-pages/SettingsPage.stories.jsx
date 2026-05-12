import React from 'react';
import Skipnav from '../skipnav/Skipnav';
import Banner from '../banner/Banner';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Alert from '../alert/Alert';
import ButtonGroup from '../button-group/ButtonGroup';
import Checkbox from '../checkbox/Checkbox';
import Fieldset from '../fieldset/Fieldset';
import Identifier from '../identifier/Identifier';
import Input from '../input/Input';
import Layout from '../layout/Layout';
import Select from '../select/Select';
import SideNav from '../sidenav/SideNav';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs';

export default {
  title: 'Examples',
};

export const SettingsPage = {
  render: () => (
    <>
      <Skipnav target="settings-page-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="settings-header"
        {...headerArgs}
      />

      <Layout
        variant="grid"
        content={
          <div className="margin-top-3">
            <h2>Profile Settings</h2>
            <Alert
              type="success"
              heading="Settings Updated"
              className="margin-bottom-4"
            >
              Your profile settings have been successfully updated.
            </Alert>

            <form className="usa-form">

              <Input
                id="display-name"
                name="displayName"
                label="Display Name"
                type="text"
                defaultValue="John Doe"
              />

              <Input
                id="email"
                name="email"
                label="Email Address"
                type="email"
                defaultValue="john.doe@example.com"
              />

              <div className="margin-bottom-3">
                <Select
                  id="timezone"
                  name="timezone"
                  label="Timezone"
                  options={[
                    { value: 'America/New_York', label: 'Eastern Time (ET)' },
                    { value: 'America/Chicago', label: 'Central Time (CT)' },
                    { value: 'America/Denver', label: 'Mountain Time (MT)' },
                    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
                    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
                    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
                  ]}
                  defaultValue="America/New_York"
                />
              </div>

              <div className="margin-bottom-3">
                <Select
                  id="language"
                  name="language"
                  label="Language"
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Español' },
                    { value: 'fr', label: 'Français' },
                    { value: 'de', label: 'Deutsch' },
                    { value: 'ja', label: '日本語' },
                  ]}
                  defaultValue="en"
                />
              </div>

              <div className="margin-bottom-4">
                <Fieldset legend="Notification Preferences">
                  <Checkbox
                    id="email-notifications"
                    name="emailNotifications"
                    label="Email notifications"
                    tile={true}
                    description="Receive important updates via email"
                    checked
                  />
                  <Checkbox
                    id="marketing-emails"
                    name="marketingEmails"
                    label="Marketing emails"
                    tile={true}
                    description="Receive promotional content and newsletters"
                  />
                  <Checkbox
                    id="security-alerts"
                    name="securityAlerts"
                    label="Security alerts"
                    tile={true}
                    description="Get notified about security-related events"
                    checked
                  />
                </Fieldset>
              </div>

              <ButtonGroup
                buttons={[
                  { children: 'Save Changes', variant: 'primary' },
                  { children: 'Cancel', variant: 'secondary' },
                  { children: 'Reset to Defaults', variant: 'secondary' },
                ]}
              />
            </form>
          </div>
        }
        leftSidebar={
          <SideNav
            items={[
              { text: 'Profile', href: '#profile', current: true },
              { text: 'Security', href: '#security' },
              { text: 'Notifications', href: '#notifications' },
              { text: 'Billing', href: '#billing' },
            ]}
            sticky={true}
          />
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-settings' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
