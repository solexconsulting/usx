import React, { useState } from 'react';
import Skipnav from '../../../usx-react/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../usx-react/src/components/banner/Banner.tsx';
import Button from '../../../usx-react/src/components/button/Button.tsx';
import Checkbox from '../../../usx-react/src/components/checkbox/Checkbox.tsx';
import Footer from '../../../usx-react/src/components/footer/Footer.tsx';
import Header from '../../../usx-react/src/components/header/Header.tsx';
import Input from '../../../usx-react/src/components/input/Input.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Link from '../../../usx-react/src/components/link/Link.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import { headerArgs, footerArgs } from './commonArgs.js';

export default {
  title: 'Examples/Authentication',
  parameters: {
    layout: 'fullscreen',
  },
};

function LoginExample() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setStatus('This example does not authenticate. No information was sent.');
  }

  function handleAccountAction(event, action) {
    event.preventDefault();
    setStatus(`${action} is not connected in this example.`);
  }

  return (
    <div className="minh-viewport display-flex flex-column">
      <Skipnav target="login-pattern-example" />
      <Banner />
      <Header
        id="login-header"
        branding={headerArgs.branding}
        projectUrl="#login-pattern-example"
      />

      <Layout className="flex-fill">
        <Page id="login-pattern-example" className="maxw-mobile margin-x-auto" title="Sign in" tabIndex={-1}>
          <form className="usa-form maxw-full" onSubmit={handleSubmit}>
            <Input
              id="login-email"
              name="email"
              label="Email address"
              type="email"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              placeholder=""
              required
            />
            <Input
              id="login-password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder=""
              required
            />
            <div className="display-flex flex-wrap flex-align-center flex-justify gap-2 margin-y-2">
              <Checkbox
                id="login-show-password"
                label="Show password"
                checked={showPassword}
                onChange={(event) => setShowPassword(event.target.checked)}
              />
              <Link className="margin-top-105" href="#login-status" onClick={(event) => handleAccountAction(event, 'Password recovery')}>
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="width-full margin-right-0">Sign in</Button>
          </form>

          <div className="display-flex flex-align-center gap-2 margin-y-3">
            <span className="flex-fill border-top border-base-lighter margin-right-2" aria-hidden="true" />
            <span>or</span>
            <span className="flex-fill border-top border-base-lighter margin-left-2" aria-hidden="true" />
          </div>
          <div className="display-flex flex-column gap-2" role="group" aria-label="Other sign-in options">
            <Button
              variant="secondary"
              className="width-full margin-top-0 margin-x-0 margin-bottom-2"
              onClick={(event) => handleAccountAction(event, 'Social sign-in')}
            >
              {"Login with <placeholder>"}
            </Button>
            <Button
              variant="accent-cool"
              className="width-full margin-top-0 margin-x-0 margin-bottom-2"
              onClick={(event) => handleAccountAction(event, 'Social sign-in')}
            >
              {"Login with <placeholder>"}
            </Button>
            <Button
              variant="accent-warm"
              className="width-full margin-0"
              onClick={(event) => handleAccountAction(event, 'Social sign-in')}
            >
              {"Login with <placeholder>"}
            </Button>
          </div>
          <p className="text-center margin-top-3">
            New to SOLEX?{' '}
            <Link href="#login-status" onClick={(event) => handleAccountAction(event, 'Account creation')}>
              Create an account
            </Link>
          </p>
          <div id="login-status" role="status" className="margin-top-2">
            {status}
          </div>
        </Page>
      </Layout>

      <Footer
        variant="slim"
        returnToTop={false}
        branding={footerArgs.branding}
        brandingUrl="#login-pattern-example"
      />
    </div>
  );
}

export const Login = {
  render: () => <LoginExample />,
};