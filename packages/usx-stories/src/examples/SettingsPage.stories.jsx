import React from 'react';
import Skipnav from '../../../core/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import MiscBanner from '../../../core/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import Alert from '../../../core/src/components/alert/Alert.tsx';
import ButtonGroup from '../../../core/src/components/button-group/ButtonGroup.tsx';
import Checkbox from '../../../core/src/components/checkbox/Checkbox.tsx';
import Fieldset from '../../../core/src/components/fieldset/Fieldset.tsx';
import Identifier from '../../../core/src/components/identifier/Identifier.tsx';
import Input from '../../../core/src/components/input/Input.tsx';
import Layout from '../../../core/src/components/layout/Layout.tsx';
import Page from '../../../core/src/components/page/Page.jsx';
import Select from '../../../core/src/components/select/Select.tsx';
import Section from '../../../core/src/components/section/Section.tsx';
import SideNav from '../../../core/src/components/sidenav/SideNav.tsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from './commonArgs.js';

export default {
    title: 'Examples/Data Collection',
};

export const SettingsPage = {
    render: () => (
        <>
            <Skipnav target="settings-page-example" />
            <Banner
                id="example-1-banner"
                ariaLabel="Example banner"
            />
            <MiscBanner {...miscBannerArgs} />
            <Header
                id="settings-header"
                {...headerArgs}
            />
            <Layout
                variant="grid"
                expandLeftSidebar={true}
                content={
                    <Page id="settings-page-example" title="Settings">
                        <Section title="Profile Settings">
                            <Alert
                                variant="success"
                                heading="Settings Updated"
                                text="Your profile settings have been successfully updated."
                                className="margin-bottom-4"
                            />

                            <form className="usa-form maxw-full">
                                <Fieldset legend="Personal Information" largeLegend={true}>
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

                                    <div className="margin-top-4">
                                        <ButtonGroup
                                            items={[
                                                { children: 'Save Changes', variant: 'primary' },
                                                { children: 'Cancel', variant: 'secondary' },
                                                { children: 'Reset to Defaults', variant: 'secondary' },
                                            ]}
                                        />
                                    </div>
                                </Fieldset>
                            </form>
                        </Section>
                    </Page>
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
