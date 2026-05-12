import React from 'react';
import Skipnav from '../skipnav/Skipnav';
import Banner from '../banner/Banner';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CardGroup from '../card-group/CardGroup';
import Icon from '../icon/Icon';
import Identifier from '../identifier/Identifier';
import Prose from '../prose/Prose';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs';

export default {
  title: 'Examples',
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
      <Header
        id="product-header"
        {...headerArgs}
      />
      <div id="product-showcase-example" className="grid-container">
        <h1>Our Products</h1>
        <p>Discover our range of innovative solutions designed to meet your needs.</p>

        <CardGroup cards={productShowcaseCardArgs} />

        <div className="margin-top-4">
          <h2 className="margin-bottom-0">Why Choose Us?</h2>
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-4">
              <h4 className="display-flex flex-align-center"><Icon name="check_circle" size="lg" className="text-success" /> Reliable</h4>
              <Prose>
                <p>Trusted by thousands of customers worldwide with 99.9% uptime.</p>
              </Prose>
            </div>
            <div className="tablet:grid-col-4">
              <h4 className="display-flex flex-align-center"><Icon name="security" size="lg" className="text-primary" /> Secure</h4>
              <Prose>
                <p>Enterprise-grade security with end-to-end encryption.</p>
              </Prose>
            </div>
            <div className="tablet:grid-col-4">
              <h4 className="display-flex flex-align-center"><Icon name="support" size="lg" className="text-accent-cool" /> Support</h4>
              <Prose>
                <p>24/7 customer support with dedicated account managers.</p>
              </Prose>
            </div>
          </div>
        </div>
      </div>
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-product' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
