import React from 'react';
import Skipnav from '../skipnav/Skipnav';
import Banner from '../banner/Banner';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Accordion from '../accordion/Accordion';
import Alert from '../alert/Alert';
import Identifier from '../identifier/Identifier';
import Prose from '../prose/Prose';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs';

export default {
  title: 'Examples',
};

export const FAQPage = {
  render: () => (
    <>
      <Skipnav target="faq-page-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="faq-header"
        {...headerArgs}
      />
      <div id="faq-page-example" className="grid-container">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our products and services.</p>

        <Alert
          type="info"
          heading="Need more help?"
          className="margin-bottom-4"
        >
          Can't find what you're looking for? <a href="#contact">Contact our support team</a> for personalized assistance.
        </Alert>

        <Accordion
          items={[
            {
              id: 'getting-started',
              title: 'Getting Started',
              content: (
                <Prose>
                  <p>Getting started with our platform is easy! Simply create an account, verify your email, and you'll be ready to explore all the features we offer.</p>
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
      </div>
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-faq' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
