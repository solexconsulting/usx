import React from 'react';
import Skipnav from '../skipnav/Skipnav';
import Banner from '../banner/Banner';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Identifier from '../identifier/Identifier';
import Button from '../button/Button';
import Checkbox from '../checkbox/Checkbox';
import Fieldset from '../fieldset/Fieldset';
import Input from '../input/Input';
import Prose from '../prose/Prose';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs';

export default {
  title: 'Examples',
};

export const ContactForm = {
  render: () => (
    <>
      <Skipnav target="contact-form-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="contact-header"
        {...headerArgs}
      />
      <div id="contact-form-example" className="grid-container margin-bottom-7">
        <h1>Contact Us</h1>
        <p>Get in touch with our team for any questions or support.</p>

        <div className="grid-row grid-gap">
          <div className="tablet:grid-col-8">
            <form className="usa-form">
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
            <div className="border border-base-lighter border-1px padding-2">
              <h3>Contact Details</h3>
              <Prose>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> info@example.com</p>
                <p><strong>Address:</strong><br />
                123 Main Street<br />
                Anytown, USA 12345</p>
              </Prose>
            </div>
          </div>
        </div>
      </div>
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-contact' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
