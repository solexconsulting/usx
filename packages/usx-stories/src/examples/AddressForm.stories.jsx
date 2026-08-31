import React from 'react';
import Skipnav from '../../../core/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import Identifier from '../../../core/src/components/identifier/Identifier.tsx';
import ButtonGroup from '../../../core/src/components/button-group/ButtonGroup.tsx';
import Card from '../../../core/src/components/card/Card.tsx';
import Checkbox from '../../../core/src/components/checkbox/Checkbox.tsx';
import DatePicker from '../../../core/src/components/date-picker/DatePicker.jsx';
import Fieldset from '../../../core/src/components/fieldset/Fieldset.tsx';
import Input from '../../../core/src/components/input/Input.tsx';
import Layout from '../../../core/src/components/layout/Layout.tsx';
import Page from '../../../core/src/components/page/Page.jsx';
import Section from '../../../core/src/components/section/Section.tsx';
import Select from '../../../core/src/components/select/Select.tsx';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs.js';

export default {
  title: 'Examples/Patterns',
};

const STATE_OPTIONS = [
  { value: '', label: '- Select State -' },
  { value: 'AL', label: 'Alabama' },
  { value: 'CA', label: 'California' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'VA', label: 'Virginia' },
];

export const AddressFormPattern = {
  render: () => (
    <>
      <Skipnav target="address-form-example" />
      <Banner id="address-banner" ariaLabel="Official government banner" />
      <Header id="address-header" {...headerArgs} />
      <Layout
        variant="single-column"
        content={
          <Page id="address-form-example" title="Mailing &amp; Billing Address">
            <p className="text-intro margin-bottom-3">Provide your official mailing address for documentation and correspondence.</p>

            <Section>
              <form className="usa-form maxw-full" onSubmit={(e) => e.preventDefault()}>
                <Fieldset legend="Mailing Address" largeLegend={true}>
                  <Input
                    id="street-1"
                    name="street1"
                    label="Street Address 1"
                    type="text"
                    required
                  />

                  <Input
                    id="street-2"
                    name="street2"
                    label="Street Address 2 (Apartment, suite, unit)"
                    type="text"
                  />

                  <div className="grid-row grid-gap">
                    <div className="tablet:grid-col-6">
                      <Input
                        id="city"
                        name="city"
                        label="City"
                        type="text"
                        required
                      />
                    </div>
                    <div className="tablet:grid-col-6">
                      <Select
                        id="state"
                        name="state"
                        label="State or Territory"
                        options={STATE_OPTIONS}
                        defaultValue=""
                        required
                      />
                    </div>
                  </div>

                  <div className="grid-row grid-gap">
                    <div className="tablet:grid-col-6">
                      <Input
                        id="zip"
                        name="zip"
                        label="ZIP Code"
                        type="text"
                        required
                      />
                    </div>
                    <div className="tablet:grid-col-6">
                      <Select
                        id="country"
                        name="country"
                        label="Country"
                        options={[
                          { value: 'US', label: 'United States' },
                          { value: 'CA', label: 'Canada' },
                          { value: 'MX', label: 'Mexico' },
                        ]}
                        defaultValue="US"
                        required
                      />
                    </div>
                  </div>

                  <DatePicker
                    id="effective-date"
                    name="effectiveDate"
                    label="Address Effective Date"
                    hint="mm/dd/yyyy"
                    defaultValue="2026-09-01"
                  />
                </Fieldset>

                <Fieldset legend="Billing Options" largeLegend={true} className="margin-top-4">
                  <Checkbox
                    id="billing-same"
                    name="billingSame"
                    label="Billing address is the same as mailing address"
                    tile={true}
                    checked
                  />

                  <Checkbox
                    id="save-address"
                    name="saveAddress"
                    label="Save to my profile address book"
                    tile={true}
                  />

                  <div className="margin-top-4">
                    <ButtonGroup
                      items={[
                        { children: 'Save Address', variant: 'primary' },
                        { children: 'Cancel', variant: 'secondary' },
                      ]}
                    />
                  </div>
                </Fieldset>
              </form>
            </Section>
          </Page>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-address' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};