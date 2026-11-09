import React, { useState } from 'react';
import Skipnav from '../../../usx-react/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../usx-react/src/components/banner/Banner.tsx';
import MiscBanner from '../../../usx-react/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../usx-react/src/components/header/Header.tsx';
import Footer from '../../../usx-react/src/components/footer/Footer.tsx';
import Alert from '../../../usx-react/src/components/alert/Alert.tsx';
import ButtonGroup from '../../../usx-react/src/components/button-group/ButtonGroup.tsx';
import CheckboxGroup from '../../../usx-react/src/components/checkbox-group/CheckboxGroup.tsx';
import Fieldset from '../../../usx-react/src/components/fieldset/Fieldset.tsx';
import Identifier from '../../../usx-react/src/components/identifier/Identifier.tsx';
import Input from '../../../usx-react/src/components/input/Input.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import Select from '../../../usx-react/src/components/select/Select.tsx';
import Section from '../../../usx-react/src/components/section/Section.tsx';
import SideNav from '../../../usx-react/src/components/sidenav/SideNav.tsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from './commonArgs.js';

export default {
    title: 'Examples/Data Collection',
    parameters: {
        layout: 'fullscreen',
    },
};

function SettingsExample() {
    const [saved, setSaved] = useState(false);

    return (
        <>
            <Skipnav target="settings-page-example" />
            <Banner id="example-1-banner" ariaLabel="Example banner" />
            <MiscBanner {...miscBannerArgs} />
            <Header id="settings-header" {...headerArgs} />
            <Layout
                variant="grid"
                content={
                    <Page as="div" id="settings-page-example" title="Settings">
                        <Section title="Profile Settings">
                            {saved && (
                                <Alert
                                    variant="success"
                                    heading="Settings Updated"
                                    text="Your profile settings have been successfully updated."
                                    className="margin-bottom-4"
                                />
                            )}

                            <form
                                className="usa-form maxw-tablet"
                                onChange={() => setSaved(false)}
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    setSaved(true);
                                }}
                                onReset={() => setSaved(false)}
                            >
                                <Fieldset id="personal-information" legend="Personal Information" largeLegend={true}>
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

                                    <CheckboxGroup
                                        id="notification-preferences"
                                        name="notifications"
                                        legend="Notification Preferences"
                                        tile
                                        checkboxProps={[
                                            {
                                                id: 'email-notifications',
                                                value: 'email',
                                                label: 'Email notifications',
                                                description: 'Receive important updates via email',
                                                defaultChecked: true,
                                            },
                                            {
                                                id: 'marketing-emails',
                                                value: 'marketing',
                                                label: 'Marketing emails',
                                                description: 'Receive promotional content and newsletters',
                                            },
                                            {
                                                id: 'security-alerts',
                                                value: 'security',
                                                label: 'Security alerts',
                                                description: 'Get notified about security-related events',
                                                defaultChecked: true,
                                            },
                                        ]}
                                    />

                                    <div className="margin-top-4">
                                        <ButtonGroup
                                            buttonProps={[
                                                { children: 'Save Changes', variant: 'primary', type: 'submit' },
                                                { children: 'Reset to Defaults', variant: 'secondary', type: 'reset' },
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
                            { text: 'Personal Information', href: '#personal-information' },
                            { text: 'Notification Preferences', href: '#notification-preferences' },
                        ]}
                        sticky={true}
                    />
                }
            />
            <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-settings' }} />
            <Identifier {...identifierArgs} />
        </>
    );
}

export const SettingsPage = {
    render: () => <SettingsExample />,
};
