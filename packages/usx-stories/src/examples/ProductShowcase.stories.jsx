import React from 'react';
import Skipnav from '../../../core/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import MiscBanner from '../../../core/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import Hero from '../../../core/src/components/hero/Hero.tsx';
import Layout from '../../../core/src/components/layout/Layout.tsx';
import CardGroup from '../../../core/src/components/card-group/CardGroup.tsx';
import Icon from '../../../core/src/components/icon/Icon.tsx';
import Identifier from '../../../core/src/components/identifier/Identifier.tsx';
import Page from '../../../core/src/components/page/Page.jsx';
import Section from '../../../core/src/components/section/Section.tsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from './commonArgs.js';

export default {
  title: 'Examples/Data Display',
};

const productShowcaseCardArgs = [
  {
    title: 'Enterprise Suite',
    description: 'Our flagship solution for large-scale operations. Includes advanced analytics, priority support, and multi-tenant security.',
    images: [{
      src: 'https://picsum.photos/400/300?random=1',
      alt: 'Enterprise Suite',
      caption: 'Enterprise Suite Package',
      rounded: true,
    }],
    mediaInset: true,
    actions: [
      {
        children: 'Explore Suite',
        variant: 'primary',
        onClick: () => alert('Explore Suite clicked'),
      },
      {
        children: 'Request Demo',
        variant: 'secondary',
        onClick: () => alert('Request Demo clicked'),
      },
    ],
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
  {
    title: 'Essential Platform',
    description: 'A streamlined, cost-effective toolkit providing core design system components and workflow tools for growing teams.',
    images: [{
      src: 'https://picsum.photos/400/300?random=2',
      alt: 'Essential Platform',
      caption: 'Essential Platform Package',
      rounded: true,
    }],
    mediaInset: true,
    actions: [
      {
        children: 'Get Started',
        variant: 'primary',
        onClick: () => alert('Get Started clicked'),
      },
      {
        children: 'View Pricing',
        variant: 'secondary',
        onClick: () => alert('View Pricing clicked'),
      },
    ],
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
];

export const ProductShowcase = {
  render: () => (
    <>
      <Skipnav target="product-showcase-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <MiscBanner {...miscBannerArgs} />
      <Header
        id="product-header"
        {...headerArgs}
      />
      <Hero
        callout="Next-Gen Design Platform"
        title="Modern, Themeable Components for Federal Systems"
        paragraph="Build accessible, responsive digital services faster with SOLEX USX's tokenized component library."
        button={{ text: 'Explore Packages', href: '#packages' }}
      />
      <Layout
        variant="single-column"
        content={
          <Page id="product-showcase-example" title="Featured Packages">
            <Section id="packages">
              <CardGroup cardProps={productShowcaseCardArgs} />
            </Section>

            <Section title="Why Choose USX Platform?" className="margin-top-4">
              <div className="grid-row grid-gap">
                <div className="tablet:grid-col-4 margin-bottom-2">
                  <div className="padding-3 border usx-border-border usx-rounded-md bg-usx-surface-1 height-full">
                    <h3 className="margin-top-0 display-flex flex-align-center text-primary">
                      <Icon name="check_circle" size="lg" className="text-success margin-right-1" /> Reliable Uptime
                    </h3>
                    <p className="margin-bottom-0 text-base usx-text-muted">
                      Battle-tested architecture powering mission-critical government portals with 99.99% availability.
                    </p>
                  </div>
                </div>

                <div className="tablet:grid-col-4 margin-bottom-2">
                  <div className="padding-3 border usx-border-border usx-rounded-md bg-usx-surface-1 height-full">
                    <h3 className="margin-top-0 display-flex flex-align-center text-primary">
                      <Icon name="security" size="lg" className="text-primary margin-right-1" /> Security Compliant
                    </h3>
                    <p className="margin-bottom-0 text-base usx-text-muted">
                      Section 508 accessible out of the box with zero third-party tracking or unsafe dependencies.
                    </p>
                  </div>
                </div>

                <div className="tablet:grid-col-4 margin-bottom-2">
                  <div className="padding-3 border usx-border-border usx-rounded-md bg-usx-surface-1 height-full">
                    <h3 className="margin-top-0 display-flex flex-align-center text-primary">
                      <Icon name="support" size="lg" className="text-accent-cool margin-right-1" /> Dedicated Support
                    </h3>
                    <p className="margin-bottom-0 text-base usx-text-muted">
                      Direct engineering support and comprehensive documentation for seamless integration.
                    </p>
                  </div>
                </div>
              </div>
            </Section>
          </Page>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-product' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
