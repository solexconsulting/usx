import React from 'react';
import Skipnav from '../../../core/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import MiscBanner from '../../../core/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import Identifier from '../../../core/src/components/identifier/Identifier.tsx';
import Button from '../../../core/src/components/button/Button.tsx';
import Card from '../../../core/src/components/card/Card.tsx';
import Checkbox from '../../../core/src/components/checkbox/Checkbox.tsx';
import Fieldset from '../../../core/src/components/fieldset/Fieldset.tsx';
import Input from '../../../core/src/components/input/Input.tsx';
import Layout from '../../../core/src/components/layout/Layout.tsx';
import Page from '../../../core/src/components/page/Page.jsx';
import Prose from '../../../core/src/components/prose/Prose.tsx';
import Section from '../../../core/src/components/section/Section.tsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from './commonArgs.js';

export default {
  title: 'Examples/Data Collection',
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
        variant="single-column"
        content={
          <Page id="contact-form-example" title="Contact Us">
            <p className="text-intro margin-bottom-3">Get in touch with our team for any questions or support.</p>

            <Section>
              <div className="grid-row grid-gap">
                <div className="tablet:grid-col-8 margin-bottom-3">
                  <form className="usa-form maxw-full">
                    <Fieldset legend="Contact Information" largeLegend={true}>
                      <Input
                        id="first-name"
                        name="firstName"
                        label="First name"
                        type="text"
                        required
                      />

                      <Input
                        id="last-name"
                        name="lastName"
                        label="Last name"
                        type="text"
                        required
                      />

                      <Input
                        id="email"
                        name="email"
                        label="Email address"
                        type="email"
                        required
                      />

                      <Input
                        id="phone"
                        name="phone"
                        label="Phone number"
                        type="tel"
                      />

                      <Input
                        id="subject"
                        name="subject"
                        label="Subject"
                        type="text"
                        required
                      />

                      <Input
                        id="message"
                        name="message"
                        label="Message"
                        textArea={true}
                        required
                      />

                      <Fieldset legend="How did you hear about us?">
                        <Checkbox
                          id="referral-website"
                          name="referral"
                          value="website"
                          label="Website"
                        />
                        <Checkbox
                          id="referral-social"
                          name="referral"
                          value="social"
                          label="Social media"
                        />
                        <Checkbox
                          id="referral-friend"
                          name="referral"
                          value="friend"
                          label="Friend or colleague"
                        />
                        <Checkbox
                          id="referral-other"
                          name="referral"
                          value="other"
                          label="Other"
                        />
                      </Fieldset>

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
                </div>

                <div className="tablet:grid-col-4">
                  <Card
                    title="Contact Details"
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
                </div>
              </div>
            </Section>
          </Page>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-contact' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
