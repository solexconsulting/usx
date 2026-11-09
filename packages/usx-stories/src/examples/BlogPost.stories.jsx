import React from 'react';
import Skipnav from '../../../usx-react/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../usx-react/src/components/banner/Banner.tsx';
import MiscBanner from '../../../usx-react/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../usx-react/src/components/header/Header.tsx';
import Footer from '../../../usx-react/src/components/footer/Footer.tsx';
import Quote from '../../../usx-react/src/components/quote/Quote.tsx';
import Image from '../../../usx-react/src/components/image/Image.tsx';
import Identifier from '../../../usx-react/src/components/identifier/Identifier.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import Section from '../../../usx-react/src/components/section/Section.tsx';
import Prose from '../../../usx-react/src/components/prose/Prose.tsx';
import Link from '../../../usx-react/src/components/link/Link.tsx';
import SideNav from '../../../usx-react/src/components/sidenav/SideNav.tsx';
import TagGroup from '../../../usx-react/src/components/tag-group/TagGroup.tsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from './commonArgs.js';

export default {
  title: 'Examples/Data Display',
  parameters: { layout: 'fullscreen' },
};

export const BlogPost = {
  render: () => (
    <>
      <Skipnav target="blog-post-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <MiscBanner {...miscBannerArgs} />
      <Header
        id="blog-header"
        {...headerArgs}
      />
      <Layout
        variant="grid"
        expandable={true}
        content={
          <Page as="article" id="blog-post-example" title="The Future of Digital Transformation">
            <Section aria-label="Article">
              <div className="display-flex flex-wrap margin-bottom-3 text-subtle font-sans-xs">
                <span className="margin-right-2">By John Doe</span>
                <span className="margin-right-2">Published <time dateTime="2024-03-15">March 15, 2024</time></span>
                <span>5 min read</span>
              </div>

              <Image
                src="https://picsum.photos/800/400?random=3"
                alt=""
                width={800}
                height={400}
                rounded
                className="maxw-tablet margin-bottom-4"
              />

              <Prose className="maxw-tablet">
                <p>In today&apos;s rapidly evolving digital landscape, organizations face unprecedented challenges and opportunities. Digital transformation has become not just a competitive advantage, but a necessity for survival in an increasingly connected world.</p>

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

                <Quote
                  calloutProps={{ orientation: 'vertical', big: true, strokeColor: 'info' }}
                  attributionProps={{
                    avatarProps: {
                      src: './george_washington.png',
                      alt: 'George Washington',
                      shape: 'circle'
                    },
                    primary: 'John Doe',
                    secondary: 'Digital services lead',
                  }}
                >
                  <p className="font-serif-md maxw-tablet margin-0">Digital transformation is not about technology—it's about people and processes.</p>
                </Quote>

                <p>As we look to the future, the organizations that thrive will be those that embrace digital transformation not as a one-time project, but as an ongoing journey of innovation and adaptation.</p>
              </Prose>
            </Section>
          </Page>
        }
        leftSidebar={
          <SideNav
            ariaLabel="Blog navigation"
            items={[
              { text: 'Home', href: '/' },
              {
                text: 'Blog',
                href: '/blog',
                children: [
                  { text: 'Digital transformation', href: '/blog/digital-transformation', current: true },
                  { text: 'News', href: '/blog/news' },
                  { text: 'Archive', href: '/blog/archive' },
                ],
              },
              { text: 'About', href: '/about' },
              { text: 'Contact', href: '/contact' },
            ]}
            sticky={true}
          />
        }
        rightSidebar={
          <div className="margin-top-3 margin-right-1">
            <h2 className="font-sans-md margin-top-0 margin-bottom-2">Explore examples</h2>
            <ul className="usa-list usa-list--unstyled margin-top-0 margin-bottom-4">
              <li className="margin-bottom-1">
                <Link href="?id=examples-data-display--dashboard&viewMode=story">Dashboard overview</Link>
              </li>
              <li className="margin-bottom-1">
                <Link href="?id=examples-data-display--product-showcase&viewMode=story">Component showcase</Link>
              </li>
              <li>
                <Link href="?id=examples-data-display--search-results&viewMode=story">Search documentation</Link>
              </li>
            </ul>
            <h2 className="font-sans-md margin-top-0 margin-bottom-2">Topics</h2>
            <TagGroup
              tagProps={[
                { value: 'Digital Transformation', color: 'primary' },
                { value: 'Technology', color: 'info' },
                { value: 'Innovation', color: 'success' },
                { value: 'Strategy', color: 'warning' },
              ]}
            />
          </div>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-blog' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
