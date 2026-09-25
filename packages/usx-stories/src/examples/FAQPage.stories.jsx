import React from 'react';
import Skipnav from '../../../usx-react/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../usx-react/src/components/banner/Banner.tsx';
import MiscBanner from '../../../usx-react/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../usx-react/src/components/header/Header.tsx';
import Footer from '../../../usx-react/src/components/footer/Footer.tsx';
import Accordion from '../../../usx-react/src/components/accordion/Accordion.tsx';
import Alert from '../../../usx-react/src/components/alert/Alert.tsx';
import Identifier from '../../../usx-react/src/components/identifier/Identifier.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import Prose from '../../../usx-react/src/components/prose/Prose.tsx';
import Search from '../../../usx-react/src/components/search/Search.tsx';
import Section from '../../../usx-react/src/components/section/Section.tsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from './commonArgs.js';

export default {
  title: 'Examples/Data Display',
};

export const FAQPage = {
    render: () => (
        <>
            <Skipnav target="faq-page-example" />
            <Banner
                id="example-1-banner"
                ariaLabel="Example banner"
            />
            <MiscBanner {...miscBannerArgs} />
            <Header
                id="faq-header"
                {...headerArgs}
            />
            <Layout
                variant="single-column"
                content={
                    <Page id="faq-page-example" title="Frequently Asked Questions">
                        <p className="text-intro margin-bottom-2">Find answers to common questions about our products and services.</p>

                        <div className="margin-y-3">
                            <Search
                                ariaLabel="Search FAQs"
                                placeholder="Search FAQ topics, keywords, or guides..."
                                big={true}
                                buttonVariant="primary"
                            />
                        </div>

                        <Alert
                            variant="info"
                            heading="Need more help?"
                            text={<>Can&apos;t find what you&apos;re looking for? <a href="#contact" className="usa-link usx-link">Contact our support team</a> for personalized assistance.</>}
                            className="margin-bottom-4"
                        />

                        <Section title="Questions and Answers">
                            <Accordion
                                items={[
                                    {
                                        id: 'getting-started',
                                        title: 'Getting Started',
                                        content: (
                                            <Prose>
                                                <p>Getting started with our platform is easy! Simply create an account, verify your email, and you&apos;ll be ready to explore all the features we offer.</p>
                                                <ul>
                                                    <li>Sign up for a free account</li>
                                                    <li>Complete your profile setup</li>
                                                    <li>Explore the dashboard and available tools</li>
                                                    <li>Connect with our community</li>
                                                </ul>
                                            </Prose>
                                        ),
                                    },
                                    {
                                        id: 'pricing-plans',
                                        title: 'Pricing and Plans',
                                        content: (
                                            <Prose>
                                                <p>We offer flexible pricing plans designed to meet different needs and budgets.</p>
                                                <h4>Free Plan</h4>
                                                <p>Perfect for individuals and small projects with basic features.</p>
                                                <h4>Pro Plan - $29/month</h4>
                                                <p>Advanced features for growing businesses and teams.</p>
                                                <h4>Enterprise Plan</h4>
                                                <p>Custom solutions for large organizations with dedicated support.</p>
                                            </Prose>
                                        ),
                                    },
                                    {
                                        id: 'account-security',
                                        title: 'Account Security',
                                        content: (
                                            <Prose>
                                                <p>Your account security is our top priority. We use industry-standard encryption and security measures to protect your data.</p>
                                                <p><strong>Two-Factor Authentication:</strong> Enable 2FA for an extra layer of security.</p>
                                                <p><strong>Password Requirements:</strong> Use strong, unique passwords and change them regularly.</p>
                                                <p><strong>Session Management:</strong> Monitor and control active sessions from your account settings.</p>
                                            </Prose>
                                        ),
                                    },
                                    {
                                        id: 'technical-support',
                                        title: 'Technical Support',
                                        content: (
                                            <Prose>
                                                <p>Our technical support team is available to help you with any issues or questions.</p>
                                                <p><strong>Email Support:</strong> support@example.com (24-48 hour response)</p>
                                                <p><strong>Live Chat:</strong> Available during business hours</p>
                                                <p><strong>Phone Support:</strong> Premium plan customers only</p>
                                                <p><strong>Documentation:</strong> Comprehensive guides and tutorials in our help center</p>
                                            </Prose>
                                        ),
                                    },
                                    {
                                        id: 'data-privacy',
                                        title: 'Data Privacy and Compliance',
                                        content: (
                                            <Prose>
                                                <p>We are committed to protecting your privacy and complying with all relevant data protection regulations.</p>
                                                <ul>
                                                    <li>GDPR compliant for EU users</li>
                                                    <li>CCPA compliant for California residents</li>
                                                    <li>SOC 2 Type II certified</li>
                                                    <li>Regular security audits and penetration testing</li>
                                                </ul>
                                                <p>Read our full <a href="#privacy-policy">Privacy Policy</a> and <a href="#terms">Terms of Service</a> for complete details.</p>
                                            </Prose>
                                        ),
                                    },
                                ]}
                            />
                        </Section>
                    </Page>
                }
            />
            <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-faq' }} />
            <Identifier {...identifierArgs} />
        </>
    ),
};
