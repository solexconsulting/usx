import React from 'react';
import Skipnav from '../../../core/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import MiscBanner from '../../../core/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import CardGroup from '../../../core/src/components/card-group/CardGroup.tsx';
import Icon from '../../../core/src/components/icon/Icon.tsx';
import Identifier from '../../../core/src/components/identifier/Identifier.tsx';
import Page from '../../../core/src/components/page/Page.jsx';
import Prose from '../../../core/src/components/prose/Prose.tsx';
import Section from '../../../core/src/components/section/Section.tsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from '../../../core/src/components/example-pages/commonArgs.js';

export default {
  title: 'Patterns/Data Display',
};

const productShowcaseCardArgs = [
  {
    title: 'Premium Package',
    description: 'Our flagship product offers comprehensive features and exceptional performance. Perfect for enterprises looking for robust solutions.',
    images: [{
      src: 'https://picsum.photos/400/300?random=1',
      alt: 'Premium Package',
      caption: 'Premium Solution Package',
      rounded: true,
    }],
    mediaInset: true,
    actions: [
      {
        children: 'Learn More',
        variant: 'primary',
        onClick: () => alert('Learn More clicked'),
      },
      {
        children: 'Get Quote',
        variant: 'secondary',
        onClick: () => alert('Get Quote clicked'),
      },
    ],
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
  {
    title: 'Essential Package',
    description: 'A cost-effective solution that provides all the essential features you need to get started quickly and efficiently.',
    images: [{
      src: 'https://picsum.photos/400/300?random=2',
      alt: 'Essential Package',
      caption: 'Essential Starter Package',
      rounded: true,
    }],
    mediaInset: true,
    actions: [
      {
        children: 'Learn More',
        variant: 'primary',
        onClick: () => alert('Learn More clicked'),
      },
      {
        children: 'Get Quote',
        variant: 'secondary',
        onClick: () => alert('Get Quote clicked'),
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
      <Page id="product-showcase-example" title="Our Products" className="grid-container">
        <Section>
          <p>Discover our range of innovative solutions designed to meet your needs.</p>
        </Section>

        <Section title="Product Packages">
          <CardGroup cards={productShowcaseCardArgs} />
        </Section>

        <Section title="Why Choose Us?" className="margin-top-4">
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-4">
              <h3 className="display-flex flex-align-center"><Icon name="check_circle" size="lg" className="text-success" /> Reliable</h3>
              <Prose>
                <p>Trusted by thousands of customers worldwide with 99.9% uptime.</p>
              </Prose>
            </div>
            <div className="tablet:grid-col-4">
              <h3 className="display-flex flex-align-center"><Icon name="security" size="lg" className="text-primary" /> Secure</h3>
              <Prose>
                <p>Enterprise-grade security with end-to-end encryption.</p>
              </Prose>
            </div>
            <div className="tablet:grid-col-4">
              <h3 className="display-flex flex-align-center"><Icon name="support" size="lg" className="text-accent-cool" /> Support</h3>
              <Prose>
                <p>24/7 customer support with dedicated account managers.</p>
              </Prose>
            </div>
          </div>
        </Section>
      </Page>
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-product' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
