import React, { useState } from 'react';
import Skipnav from '../../../usx-react/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../usx-react/src/components/banner/Banner.tsx';
import Header from '../../../usx-react/src/components/header/Header.tsx';
import Footer from '../../../usx-react/src/components/footer/Footer.tsx';
import Identifier from '../../../usx-react/src/components/identifier/Identifier.tsx';
import ButtonGroup from '../../../usx-react/src/components/button-group/ButtonGroup.tsx';
import Alert from '../../../usx-react/src/components/alert/Alert.tsx';
import Checkbox from '../../../usx-react/src/components/checkbox/Checkbox.tsx';
import DatePicker from '../../../usx-react/src/components/date-picker/DatePicker.tsx';
import Fieldset from '../../../usx-react/src/components/fieldset/Fieldset.tsx';
import Input from '../../../usx-react/src/components/input/Input.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import Section from '../../../usx-react/src/components/section/Section.tsx';
import Select from '../../../usx-react/src/components/select/Select.tsx';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs.js';

export default {
  title: 'Examples/Data Collection',
  parameters: { layout: 'fullscreen' },
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

function AddressExample() {
  const [billingSame, setBillingSame] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <Skipnav target="address-form-example" />
      <Banner id="address-banner" ariaLabel="Official government banner" />
      <Header id="address-header" {...headerArgs} />
      <Layout
        variant="single-column"
        content={
          <Page id="address-form-example" title="Mailing &amp; Billing Address">
            <p className="text-intro maxw-tablet margin-bottom-3">Provide a U.S. mailing address for documentation and correspondence.</p>

            <Section>
              {saved && (
                <Alert
                  variant="success"
                  heading="Address details saved"
                  text="Your address details have been saved for this example."
                  className="maxw-tablet margin-bottom-3"
                />
              )}
              <form
                className="usa-form maxw-tablet"
                onChange={() => setSaved(false)}
                onSubmit={(event) => {
                  event.preventDefault();
                  setSaved(true);
                }}
                onReset={() => {
                  setBillingSame(true);
                  setSaved(false);
                }}
              >
                <Fieldset legend="Mailing Address" largeLegend={true}>
                  <Input
                    id="street-1"
                    name="street1"
                    label="Street Address 1"
                    type="text"
                    autoComplete="address-line1"
                    required
                  />

                  <Input
                    id="street-2"
                    name="street2"
                    label="Street Address 2 (Apartment, suite, unit)"
                    type="text"
                    autoComplete="address-line2"
                  />

                  <div className="grid-row grid-gap">
                    <div className="tablet:grid-col-6">
                      <Input
                        id="city"
                        name="city"
                        label="City"
                        type="text"
                        autoComplete="address-level2"
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

                  <div className="maxw-mobile">
                    <Input
                      id="zip"
                      name="zip"
                      label="ZIP Code"
                      type="text"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      required
                    />
                  </div>

                  <DatePicker
                    id="effective-date"
                    name="effectiveDate"
                    label="Address Effective Date"
                    hint="mm/dd/yyyy"
                  />
                </Fieldset>

                <Fieldset legend="Billing Options" largeLegend={true} className="margin-top-4">
                  <Checkbox
                    id="billing-same"
                    name="billingSame"
                    label="Billing address is the same as mailing address"
                    tile={true}
                    checked={billingSame}
                    onChange={(event) => setBillingSame(event.target.checked)}
                  />

                  <Checkbox
                    id="save-address"
                    name="saveAddress"
                    label="Save to my profile address book"
                    tile={true}
                  />

                </Fieldset>

                {!billingSame && (
                  <Fieldset legend="Billing Address" largeLegend={true} className="margin-top-4">
                    <Input id="billing-street" name="billingStreet" label="Street address" autoComplete="billing address-line1" required />
                    <div className="grid-row grid-gap">
                      <div className="tablet:grid-col-6">
                        <Input id="billing-city" name="billingCity" label="City" autoComplete="billing address-level2" required />
                      </div>
                      <div className="tablet:grid-col-6">
                        <Select id="billing-state" name="billingState" label="State or Territory" options={STATE_OPTIONS} defaultValue="" required />
                      </div>
                    </div>
                    <Input id="billing-zip" name="billingZip" label="ZIP Code" autoComplete="billing postal-code" required />
                  </Fieldset>
                )}

                <div className="margin-top-4">
                  <ButtonGroup
                    buttonProps={[
                      { children: 'Save Address', variant: 'primary', type: 'submit' },
                      { children: 'Clear form', variant: 'secondary', type: 'reset' },
                    ]}
                  />
                </div>
              </form>
            </Section>
          </Page>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-address' }} />
      <Identifier {...identifierArgs} />
    </>
  );
}

export const AddressForm = {
  render: () => <AddressExample />,
};
