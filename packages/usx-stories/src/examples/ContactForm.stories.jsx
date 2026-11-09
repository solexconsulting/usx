import React from 'react';
import Skipnav from '../../../usx-react/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../usx-react/src/components/banner/Banner.tsx';
import MiscBanner from '../../../usx-react/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../usx-react/src/components/header/Header.tsx';
import Footer from '../../../usx-react/src/components/footer/Footer.tsx';
import Identifier from '../../../usx-react/src/components/identifier/Identifier.tsx';
import Button from '../../../usx-react/src/components/button/Button.tsx';
import Card from '../../../usx-react/src/components/card/Card.tsx';
import Checkbox from '../../../usx-react/src/components/checkbox/Checkbox.tsx';
import CheckboxGroup from '../../../usx-react/src/components/checkbox-group/CheckboxGroup.tsx';
import Fieldset from '../../../usx-react/src/components/fieldset/Fieldset.tsx';
import Input from '../../../usx-react/src/components/input/Input.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import Prose from '../../../usx-react/src/components/prose/Prose.tsx';
import Section from '../../../usx-react/src/components/section/Section.tsx';
import TextArea from '../../../usx-react/src/components/text-area/TextArea.tsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from './commonArgs.js';

export default {
  title: 'Examples/Data Collection',
  parameters: {
    layout: 'fullscreen',
  },
};

export const ContactForm = {
  render: () => (
    <>
      <Skipnav target="contact-form-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <MiscBanner {...miscBannerArgs} />
      <Header
        id="contact-header"
        {...headerArgs}
      />
      <Layout
        variant="grid"
        rightSidebar={
          <Card
            title="Contact Details"
            className="margin-top-5 margin-x-neg-1"
            description={
              <Prose>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> info@example.com</p>
                <p><strong>Address:</strong><br />
                  123 Main Street<br />
                  Anytown, USA 12345</p>
              </Prose>
            }
          />
        }
        content={
          <Page id="contact-form-example" title="Contact Us">
            <p className="text-intro maxw-tablet margin-bottom-3">Get in touch with our team for any questions or support.</p>

            <Section>
              <form className="usa-form maxw-tablet">
                <Fieldset legend="Contact Information" largeLegend={true}>
                  <div className="grid-row grid-gap">
                    <div className="tablet:grid-col-6">
                      <Input
                        id="first-name"
                        name="firstName"
                        label="First name"
                        type="text"
                        autoComplete="given-name"
                        required
                      />
                    </div>
                    <div className="tablet:grid-col-6">
                      <Input
                        id="last-name"
                        name="lastName"
                        label="Last name"
                        type="text"
                        autoComplete="family-name"
                        required
                      />
                    </div>
                  </div>

                  <Input
                    id="email"
                    name="email"
                    label="Email address"
                    type="email"
                    autoComplete="email"
                    required
                  />

                  <Input
                    id="phone"
                    name="phone"
                    label="Phone number"
                    type="tel"
                    autoComplete="tel"
                  />

                  <Input
                    id="subject"
                    name="subject"
                    label="Subject"
                    type="text"
                    required
                  />

                  <TextArea
                    id="message"
                    name="message"
                    label="Message"
                    rows={6}
                    required
                  />

                  <CheckboxGroup
                    id="referral-sources"
                    name="referral"
                    legend="How did you hear about us?"
                    checkboxProps={[
                      { id: 'referral-website', value: 'website', label: 'Website' },
                      { id: 'referral-social', value: 'social', label: 'Social media' },
                      { id: 'referral-friend', value: 'friend', label: 'Friend or colleague' },
                      { id: 'referral-other', value: 'other', label: 'Other' },
                    ]}
                  />

                  <Checkbox
                    id="newsletter"
                    name="newsletter"
                    value="subscribe"
                    label="Subscribe to our newsletter"
                    description="Get updates about our latest news and events."
                  />

                  <Button type="submit" variant="primary">Send Message</Button>
                </Fieldset>
              </form>
            </Section>
          </Page>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-contact' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
