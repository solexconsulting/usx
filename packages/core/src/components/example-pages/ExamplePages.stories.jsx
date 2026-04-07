import React from 'react';
import Banner from '../banner/Banner';
import Header from '../header/Header';
import Alert from '../alert/Alert';
import Accordion from '../accordion/Accordion';
import Checkbox from '../checkbox/Checkbox';
import Image from '../image/Image';
import Button from '../button/Button';
import ButtonGroup from '../button-group/ButtonGroup';
import CardGroup from '../card-group/CardGroup';
import Icon from '../icon/Icon';
import Input from '../input/Input';
import Search from '../search/Search';
import Select from '../select/Select';
import Tag from '../tag/Tag';
import Prose from '../prose/Prose';


/* These stories are pages for demonstrating various components */

const searchArgs = {
  ariaLabel: 'Header search',
  searchKey: 'q',
  label: 'Search',
  icon: 'search',
  iconOnly: true,
  buttonVariant: 'secondary',
  big: false,
  action: 'https://www.google.com/search',
  placeholder: 'Search...',
}

const headerArgs = {
  projectTitle: 'Example Project',
  projectLogo: 'placeholder_logo.png',
  projectUrl: 'https://google.com',
  navSections: [
    {
      title: 'Section 1',
      links: [
        { text: 'Link 1', href: 'https://example.com/link1', ariaLabel: 'Link 1' },
        { text: 'Link 2', href: 'https://example.com/link2', ariaLabel: 'Link 2' },
      ],
    },
    {
      title: 'Section 2',
      links: [
        { text: 'Link A', href: 'https://example.com/linkA', ariaLabel: 'Link A' },
        { text: 'Link B', href: 'https://example.com/linkB', ariaLabel: 'Link B' },
      ],
    },
    {
      title: 'Section 3',
      href: 'https://example.com/section3',
      ariaLabel: 'Section 3'
    }
  ],
  secondaryLinks: [
    { text: 'Secondary Link 1', href: 'https://example.com/secondary1', ariaLabel: 'Secondary Link 1' },
    { text: 'Secondary Link 2', href: 'https://example.com/secondary2', ariaLabel: 'Secondary Link 2' },
  ],
  searchConfig: searchArgs,
  extended: true,
  megamenu: true,
  useMenuIcon: true,
  stickyNav: true,
}

export default {
  title: 'Examples',
};

export const ContactForm = {
  render: () => (
    <>
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="contact-header"
        {...headerArgs}
      />
      <div className="grid-container">
        <h1>Contact Us</h1>
        <p>Get in touch with our team for any questions or support.</p>

        <div className="grid-row grid-gap">
          <div className="tablet:grid-col-8">
            <form className="usa-form">
              <fieldset className="usa-fieldset">
                <legend className="usa-legend usa-legend--large">Contact Information</legend>

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

                <fieldset className="usa-fieldset">
                  <legend className="usa-legend">How did you hear about us?</legend>
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
                </fieldset>

                <Checkbox
                  id="newsletter"
                  name="newsletter"
                  value="subscribe"
                  label="Subscribe to our newsletter"
                  description="Get updates about our latest news and events."
                />

                <Button type="submit" variant="primary">Send Message</Button>
              </fieldset>
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
    </>
  )
}

const productShowcaseCardArgs = [
  {
    title: 'Premium Package',
    description: 'Our flagship product offers comprehensive features and exceptional performance. Perfect for enterprises looking for robust solutions.',
    images: [{
      src: 'https://picsum.photos/400/300?random=1',
      alt: 'Premium Package',
      caption: 'Premium Solution Package',
      rounded: true
    }],
    mediaInset: true,
    actions: [
      {
        children: 'Learn More',
        variant: 'primary',
        onClick: () => alert('Learn More clicked')
      },
      {
        children: 'Get Quote',
        variant: 'secondary',
        onClick: () => alert('Get Quote clicked')
      }
    ],
    className: 'tablet:grid-col-6 widescreen:grid-col-4'
  },
  {
    title: 'Essential Package',
    description: 'A cost-effective solution that provides all the essential features you need to get started quickly and efficiently.',
    images: [{
      src: 'https://picsum.photos/400/300?random=2',
      alt: 'Essential Package',
      caption: 'Essential Starter Package',
      rounded: true
    }],
    mediaInset: true,

    actions: [
      {
        children: 'Learn More',
        variant: 'primary',
        onClick: () => alert('Learn More clicked')
      },
      {
        children: 'Get Quote',
        variant: 'secondary',
        onClick: () => alert('Get Quote clicked')
      }
    ],
    className: 'tablet:grid-col-6 widescreen:grid-col-4'
  }
]

export const ProductShowcase = {
  render: () => (
    <>
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="product-header"
        {...headerArgs}
      />
      <div className="grid-container">
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
    </>
  )
}

export const BlogPost = {
  render: () => (
    <>
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="blog-header"
        {...headerArgs}
      />
      <div className="grid-container">
        <article>
          <header className="margin-bottom-4">
            <h1>The Future of Digital Transformation</h1>
            <div className="text-base margin-top-2">
              <span>By John Doe</span>
              <span className="margin-left-2">Published March 15, 2024</span>
              <span className="margin-left-2">5 min read</span>
            </div>
            <div className="margin-top-1">
              <Tag value="Technology" color="info" />
              <Tag value="Innovation" color="success" className="margin-left-1" />
            </div>
          </header>

          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-8">
              <Image
                src="https://picsum.photos/800/400?random=3"
                alt="Digital transformation concept"
                rounded
                className="margin-bottom-3"
              />

              <Prose>
                <p>In today's rapidly evolving digital landscape, organizations face unprecedented challenges and opportunities. Digital transformation has become not just a competitive advantage, but a necessity for survival in an increasingly connected world.</p>

                <h2>The Current State</h2>
                <p>According to recent industry reports, over 70% of organizations have either begun or completed their digital transformation initiatives. However, only 20% consider their efforts successful. This gap highlights the complexity and challenges involved in truly transforming how businesses operate.</p>

                <h2>Key Challenges</h2>
                <ul>
                  <li>Legacy system integration</li>
                  <li>Skills gap in digital technologies</li>
                  <li>Cultural resistance to change</li>
                  <li>Security and compliance concerns</li>
                </ul>

                <h2>The Path Forward</h2>
                <p>Successful digital transformation requires a holistic approach that encompasses technology, processes, and people. Organizations must focus on:</p>
                <ol>
                  <li>Building a clear digital strategy</li>
                  <li>Investing in employee training</li>
                  <li>Starting with pilot projects</li>
                  <li>Measuring and iterating continuously</li>
                </ol>

                <blockquote>
                  "Digital transformation is not about technology—it's about people and processes."
                  <cite>— John Doe, CTO</cite>
                </blockquote>

                <p>As we look to the future, the organizations that thrive will be those that embrace digital transformation not as a one-time project, but as an ongoing journey of innovation and adaptation.</p>
              </Prose>
            </div>

            <div className="tablet:grid-col-4">
              <div className="border border-base-lighter border-1px padding-3">
                <h3>Related Articles</h3>
                <ul className="usa-list usa-list--unstyled">
                  <li><a className="usa-link" href="#">Cloud Migration Strategies</a></li>
                  <li><a className="usa-link" href="#">AI in Modern Business</a></li>
                  <li><a className="usa-link" href="#">Cybersecurity Best Practices</a></li>
                  <li><a className="usa-link" href="#">Agile Development Methods</a></li>
                </ul>
              </div>

              <div className="border border-base-lighter border-1px padding-3 margin-top-3">
                <h3>Tags</h3>
                <div className="margin-top-2 display-flex flex-wrap">
                  <Tag value="Digital Transformation" color="primary" className="margin-05" />
                  <Tag value="Technology" color="info" className="margin-05" />
                  <Tag value="Innovation" color="success" className="margin-05" />
                  <Tag value="Business Strategy" color="warning" className="margin-05" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}

export const Dashboard = {
  render: () => (
    <>
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="dashboard-header"
        {...headerArgs}
      />
      <div className="grid-container">
        <div className="grid-row grid-gap flex-align-center">
          <div className="grid-col-fill">
            <h1>Dashboard</h1>
          </div>
          <div className="grid-col-auto">
            <ButtonGroup items={[
              {children: 'Export Data', variant: 'secondary'},
              {children: 'New Item', variant: 'primary'}
            ]} />
          </div>
        </div>

        <div className="grid-row grid-gap margin-4">
          <div className="tablet:grid-col-3">
            <div className="bg-primary-lighter padding-3 border border-primary border-1px">
              <h3 className="margin-0 text-primary-dark">Total Users</h3>
              <div className="font-heading-xl margin-top-1">12,847</div>
              <div className="text-success margin-top-1">
                <Icon name="trending_up" size="sm" className="margin-right-1" />
                +12.5% from last month
              </div>
            </div>
          </div>

          <div className="tablet:grid-col-3">
            <div className="bg-success-lighter padding-3 border border-success border-1px">
              <h3 className="margin-0 text-success-dark">Active Sessions</h3>
              <div className="font-heading-xl margin-top-1">3,429</div>
              <div className="text-success margin-top-1">
                <Icon name="trending_up" size="sm" className="margin-right-1" />
                +8.2% from last month
              </div>
            </div>
          </div>

          <div className="tablet:grid-col-3">
            <div className="bg-warning-lighter padding-3 border border-warning border-1px">
              <h3 className="margin-0 text-warning-dark">Conversion Rate</h3>
              <div className="font-heading-xl margin-top-1">24.7%</div>
              <div className="text-error margin-top-1">
                <Icon name="trending_down" size="sm" className="margin-right-1" />
                -2.1% from last month
              </div>
            </div>
          </div>

          <div className="tablet:grid-col-3">
            <div className="bg-accent-cool-lighter padding-3 border border-accent-cool border-1px">
              <h3 className="margin-0 text-accent-cool-dark">Revenue</h3>
              <div className="font-heading-xl margin-top-1">$89,432</div>
              <div className="text-success margin-top-1">
                <Icon name="trending_up" size="sm" className="margin-right-1" />
                +15.3% from last month
              </div>
            </div>
          </div>
        </div>

        <div className="grid-row grid-gap">
          <div className="tablet:grid-col-8">
            <div className="border border-base-lighter border-1px padding-3">
              <h3>Recent Activity</h3>
              <div className="margin-top-3">
                <div className="grid-row grid-gap margin-bottom-2">
                  <div className="grid-col-auto">
                    <Icon name="person" size="md" />
                  </div>
                  <div className="grid-col-fill">
                    <div className="text-bold">New user registration</div>
                    <div className="text-base">John Smith joined 2 minutes ago</div>
                  </div>
                  <div className="grid-col-auto text-base">2m ago</div>
                </div>

                <div className="grid-row grid-gap margin-bottom-2">
                  <div className="grid-col-auto">
                    <Icon name="local_grocery_store" size="md" />
                  </div>
                  <div className="grid-col-fill">
                    <div className="text-bold">New order</div>
                    <div className="text-base">Order #12345 for $299.99</div>
                  </div>
                  <div className="grid-col-auto text-base">5m ago</div>
                </div>

                <div className="grid-row grid-gap margin-bottom-2">
                  <div className="grid-col-auto">
                    <Icon name="mail" size="md" />
                  </div>
                  <div className="grid-col-fill">
                    <div className="text-bold">Email campaign sent</div>
                    <div className="text-base">Monthly newsletter sent to 12,847 subscribers</div>
                  </div>
                  <div className="grid-col-auto text-base">1h ago</div>
                </div>
              </div>
            </div>
          </div>

          <div className="tablet:grid-col-4">
            <div className="border border-base-lighter border-1px padding-3">
              <h3>Quick Actions</h3>
              <div className="margin-top-3">
                <Button variant="primary" className="margin-bottom-2" leftIcon={{ name: 'add', size: 'sm' }}>
                  Add New User
                </Button>
                <Button variant="primary" className="margin-bottom-2" leftIcon={{ name: 'file_upload', size: 'sm' }}>
                  Import Data
                </Button>
                <Button variant="primary" className="margin-bottom-2" leftIcon={{ name: 'settings', size: 'sm' }}>
                  System Settings
                </Button>
                <Button variant="primary" leftIcon={{ name: 'help', size: 'sm' }}>
                  Help & Support
                </Button>
              </div>
            </div>

            <div className="border border-base-lighter border-1px padding-3 margin-top-3">
              <h3>System Status</h3>
              <div className="margin-top-3">
                <div className="grid-row grid-gap margin-bottom-2">
                  <div className="grid-col-auto">
                    <Icon name="check_circle" size="sm" className="text-success" />
                  </div>
                  <div className="grid-col-fill">
                    <div className="text-bold">API Status</div>
                    <div className="text-base text-success">All systems operational</div>
                  </div>
                </div>

                <div className="grid-row grid-gap margin-bottom-2">
                  <div className="grid-col-auto">
                    <Icon name="check_circle" size="sm" className="text-success" />
                  </div>
                  <div className="grid-col-fill">
                    <div className="text-bold">Database</div>
                    <div className="text-base text-success">99.9% uptime</div>
                  </div>
                </div>

                <div className="grid-row grid-gap">
                  <div className="grid-col-auto">
                    <Icon name="warning" size="sm" className="text-warning" />
                  </div>
                  <div className="grid-col-fill">
                    <div className="text-bold">Scheduled Maintenance</div>
                    <div className="text-base text-warning">March 20, 2:00 AM - 4:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const FAQPage = {
  render: () => (
    <>
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="faq-header"
        {...headerArgs}
      />
      <div className="grid-container">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our products and services.</p>

        <Alert
          type="info"
          heading="Need more help?"
          className="margin-bottom-4"
        >
          Can't find what you're looking for? <a href="#contact">Contact our support team</a> for personalized assistance.
        </Alert>

        <Accordion
          items={[
            {
              id: 'getting-started',
              title: 'Getting Started',
              content: (
                <Prose>
                  <p>Getting started with our platform is easy! Simply create an account, verify your email, and you'll be ready to explore all the features we offer.</p>
                  <ul>
                    <li>Sign up for a free account</li>
                    <li>Complete your profile setup</li>
                    <li>Explore the dashboard and available tools</li>
                    <li>Connect with our community</li>
                  </ul>
                </Prose>
              )
            },
            {
              id: 'pricing-plans',
              title: 'Pricing and Plans',
              content: (
                <Prose>
                  <p>We offer flexible pricing plans designed to meet different needs and budgets.</p>
                  <h4>Free Plan</h4>
                  <p>Perfect for individuals and small projects with basic features.</p>
                  <h4>Pro Plan - $29/month</h4>
                  <p>Advanced features for growing businesses and teams.</p>
                  <h4>Enterprise Plan</h4>
                  <p>Custom solutions for large organizations with dedicated support.</p>
                </Prose>
              )
            },
            {
              id: 'account-security',
              title: 'Account Security',
              content: (
                <Prose>
                  <p>Your account security is our top priority. We use industry-standard encryption and security measures to protect your data.</p>
                  <p><strong>Two-Factor Authentication:</strong> Enable 2FA for an extra layer of security.</p>
                  <p><strong>Password Requirements:</strong> Use strong, unique passwords and change them regularly.</p>
                  <p><strong>Session Management:</strong> Monitor and control active sessions from your account settings.</p>
                </Prose>
              )
            },
            {
              id: 'technical-support',
              title: 'Technical Support',
              content: (
                <Prose>
                  <p>Our technical support team is available to help you with any issues or questions.</p>
                  <p><strong>Email Support:</strong> support@example.com (24-48 hour response)</p>
                  <p><strong>Live Chat:</strong> Available during business hours</p>
                  <p><strong>Phone Support:</strong> Premium plan customers only</p>
                  <p><strong>Documentation:</strong> Comprehensive guides and tutorials in our help center</p>
                </Prose>
              )
            },
            {
              id: 'data-privacy',
              title: 'Data Privacy and Compliance',
              content: (
                <Prose>
                  <p>We are committed to protecting your privacy and complying with all relevant data protection regulations.</p>
                  <ul>
                    <li>GDPR compliant for EU users</li>
                    <li>CCPA compliant for California residents</li>
                    <li>SOC 2 Type II certified</li>
                    <li>Regular security audits and penetration testing</li>
                  </ul>
                  <p>Read our full <a href="#privacy-policy">Privacy Policy</a> and <a href="#terms">Terms of Service</a> for complete details.</p>
                </Prose>
              )
            }
          ]}
        />
      </div>
    </>
  )
}

export const SearchResults = {
  render: () => (
    <>
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="search-header"
        {...headerArgs}
      />
      <div className="grid-container">
        <div className="margin-y-4">
          <Search
            ariaLabel="Search documentation"
            searchKey="q"
            label="Search"
            icon="search"
            buttonVariant="primary"
            big={true}
            action="#"
            placeholder="Search documentation, guides, and articles..."
          />
        </div>

        <div className="grid-row grid-gap margin-bottom-4">
          <div className="tablet:grid-col-3">
            <div className="border border-base-lighter border-1px padding-3">
              <h4 className="margin-top-0">Filter Results</h4>

              <div className="margin-bottom-3">
                <label htmlFor="category-filter" className="usa-label">Category</label>
                <Select
                  id="category-filter"
                  name="category"
                  options={[
                    { value: '', label: 'All Categories' },
                    { value: 'getting-started', label: 'Getting Started' },
                    { value: 'api-reference', label: 'API Reference' },
                    { value: 'tutorials', label: 'Tutorials' },
                    { value: 'troubleshooting', label: 'Troubleshooting' }
                  ]}
                  defaultValue=""
                />
              </div>

              <div className="margin-bottom-3">
                <label htmlFor="content-type-filter" className="usa-label">Content Type</label>
                <Select
                  id="content-type-filter"
                  name="contentType"
                  options={[
                    { value: '', label: 'All Types' },
                    { value: 'guide', label: 'Guide' },
                    { value: 'tutorial', label: 'Tutorial' },
                    { value: 'reference', label: 'Reference' },
                    { value: 'faq', label: 'FAQ' }
                  ]}
                  defaultValue=""
                />
              </div>

              <ButtonGroup
                buttons={[
                  { children: 'Apply Filters', variant: 'primary' },
                  { children: 'Clear All', variant: 'secondary' }
                ]}
                direction="vertical"
              />
            </div>
          </div>

          <div className="tablet:grid-col-9">
            <div className="margin-bottom-3">
              <h2 className="margin-top-0">Search Results</h2>
              <p className="text-base">Showing 24 results for "getting started"</p>
            </div>

            <CardGroup
              cards={[
                {
                  title: 'Quick Start Guide',
                  description: 'Get up and running in under 5 minutes with our comprehensive quick start guide.',
                  images: [{
                    src: 'https://picsum.photos/300/200?random=10',
                    alt: 'Quick start guide illustration'
                  }],
                  tags: [
                    { value: 'Guide', color: 'primary' },
                    { value: 'Beginner', color: 'success' }
                  ],
                  actions: [
                    { children: 'Read Guide', variant: 'primary' },
                    { children: 'Watch Video', variant: 'secondary' }
                  ],
                  className: 'tablet:grid-col-6 widescreen:grid-col-4'
                },
                {
                  title: 'API Authentication',
                  description: 'Learn how to authenticate your API requests and manage access tokens securely.',
                  images: [{
                    src: 'https://picsum.photos/300/200?random=11',
                    alt: 'API authentication illustration'
                  }],
                  tags: [
                    { value: 'Tutorial', color: 'info' },
                    { value: 'API', color: 'warning' }
                  ],
                  actions: [
                    { children: 'View Tutorial', variant: 'primary' }
                  ],
                  className: 'tablet:grid-col-6 widescreen:grid-col-4'
                },
                {
                  title: 'Dashboard Overview',
                  description: 'Explore the main dashboard and learn about all available features and tools.',
                  images: [{
                    src: 'https://picsum.photos/300/200?random=12',
                    alt: 'Dashboard overview illustration'
                  }],
                  tags: [
                    { value: 'Guide', color: 'primary' },
                    { value: 'Overview', color: 'accent-cool' }
                  ],
                  actions: [
                    { children: 'Explore Dashboard', variant: 'primary' }
                  ],
                  className: 'tablet:grid-col-6 widescreen:grid-col-4'
                }
              ]}
            />

            <div className="margin-top-4 text-center">
              <ButtonGroup
                buttons={[
                  { children: 'Previous', variant: 'secondary', disabled: true },
                  { children: '1', variant: 'primary' },
                  { children: '2', variant: 'secondary' },
                  { children: '3', variant: 'secondary' },
                  { children: 'Next', variant: 'secondary' }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const SettingsPage = {
  render: () => (
    <>
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="settings-header"
        {...headerArgs}
      />

      <main
        className="main-content"
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          maxWidth: '64rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderTop: 'none'

        }}
      >
        <aside
          aria-label="Settings navigation"
          style={{
            display: 'block',
            marginTop: '3rem',
            marginBottom: '3rem',
            paddingRight: 0,
            paddingLeft: '2rem',
            width: '15rem',
            position: 'absolute',
            left: '-15rem'
          }}
        >
          <ul className="usa-sidenav">
            <li className="usa-sidenav__item">
              <a href="#profile" className="usa-current">Profile</a>
            </li>
            <li className="usa-sidenav__item">
              <a href="#security">Security</a>
            </li>
            <li className="usa-sidenav__item">
              <a href="#notifications">Notifications</a>
            </li>
            <li className="usa-sidenav__item">
              <a href="#billing">Billing</a>
            </li>
          </ul>
        </aside>
        <div className="padding-x-4 margin-top-3">
          <h2>Profile Settings</h2>
          <Alert
            type="success"
            heading="Settings Updated"
            className="margin-bottom-4"
          >
            Your profile settings have been successfully updated.
          </Alert>

          <form className="usa-form">

            <Input
              id="display-name"
              name="displayName"
              label="Display Name"
              type="text"
              defaultValue="John Doe"
            />

            <Input
              id="email"
              name="email"
              label="Email Address"
              type="email"
              defaultValue="john.doe@example.com"
            />

            <div className="margin-bottom-3">
              <Select
                id="timezone"
                name="timezone"
                label="Timezone"
                options={[
                  { value: 'America/New_York', label: 'Eastern Time (ET)' },
                  { value: 'America/Chicago', label: 'Central Time (CT)' },
                  { value: 'America/Denver', label: 'Mountain Time (MT)' },
                  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
                  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
                  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' }
                ]}
                defaultValue="America/New_York"
              />
            </div>

            <div className="margin-bottom-3">
              <Select
                id="language"
                name="language"
                label="Language"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Español' },
                  { value: 'fr', label: 'Français' },
                  { value: 'de', label: 'Deutsch' },
                  { value: 'ja', label: '日本語' }
                ]}
                defaultValue="en"
              />
            </div>

            <div className="margin-bottom-4">
              <label className="usa-label">Notification Preferences</label>
              <Checkbox
                id="email-notifications"
                name="emailNotifications"
                label="Email notifications"
                tile={true}
                description="Receive important updates via email"
                checked
              />
              <Checkbox
                id="marketing-emails"
                name="marketingEmails"
                label="Marketing emails"
                tile={true}
                description="Receive promotional content and newsletters"
              />
              <Checkbox
                id="security-alerts"
                name="securityAlerts"
                label="Security alerts"
                tile={true}
                description="Get notified about security-related events"
                checked
              />
            </div>

            <ButtonGroup
              buttons={[
                { children: 'Save Changes', variant: 'primary' },
                { children: 'Cancel', variant: 'secondary' },
                { children: 'Reset to Defaults', variant: 'secondary' }
              ]}
            />
          </form>
        </div>
      </main>
    </>
  )
}