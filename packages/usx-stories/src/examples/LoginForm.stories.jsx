import React from 'react';
import Skipnav from '../../../core/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import Identifier from '../../../core/src/components/identifier/Identifier.tsx';
import Alert from '../../../core/src/components/alert/Alert.tsx';
import Button from '../../../core/src/components/button/Button.tsx';
import ButtonGroup from '../../../core/src/components/button-group/ButtonGroup.tsx';
import Card from '../../../core/src/components/card/Card.tsx';
import Checkbox from '../../../core/src/components/checkbox/Checkbox.tsx';
import Input from '../../../core/src/components/input/Input.tsx';
import Layout from '../../../core/src/components/layout/Layout.tsx';
import Link from '../../../core/src/components/link/Link.tsx';
import Page from '../../../core/src/components/page/Page.jsx';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs.js';

export default {
  title: 'Examples/Patterns',
};

export const LoginPattern = {
  render: () => (
    <>
      <Skipnav target="login-pattern-example" />
      <Banner id="login-banner" ariaLabel="Official government banner" />
      <Header id="login-header" {...headerArgs} />
      <Layout
        variant="single-column"
        content={
          <Page id="login-pattern-example" title="Sign In to Your Account">
            <div className="display-flex justify-center margin-y-4">
              <div style={{ maxWidth: '480px', width: '100%' }}>
                <Alert
                  variant="info"
                  heading="System Maintenance"
                  text="Scheduled system maintenance will occur this Sunday from 2:00 AM to 4:00 AM EST."
                  className="margin-bottom-3"
                />

                <Card
                  title="Account Authentication"
                  description={
                    <form className="usa-form maxw-full margin-top-2" onSubmit={(e) => e.preventDefault()}>
                      <Input
                        id="login-username"
                        name="username"
                        label="Username or Email Address"
                        type="text"
                        required
                      />

                      <Input
                        id="login-password"
                        name="password"
                        label="Password"
                        type="password"
                        required
                      />

                      <div className="display-flex flex-align-center justify-between margin-y-2">
                        <Checkbox
                          id="login-remember"
                          name="rememberMe"
                          label="Remember me"
                        />
                        <Link href="#forgot-password">Forgot password?</Link>
                      </div>

                      <Button type="submit" variant="primary" className="width-full margin-y-2">
                        Sign In
                      </Button>

                      <div className="border-top border-base-lighter padding-top-2 margin-top-3 text-center">
                        <p className="text-base font-sans-xs color-base-dark margin-bottom-2">Or continue with single sign-on:</p>
                        <ButtonGroup
                          direction="vertical"
                          items={[
                            { children: 'Sign in with Login.gov', variant: 'secondary' },
                            { children: 'Sign in with PIV / CAC Card', variant: 'secondary' },
                          ]}
                        />
                      </div>
                    </form>
                  }
                />
              </div>
            </div>
          </Page>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-login' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};