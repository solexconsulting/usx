import React from 'react';
import Skipnav from '../../../usx-react/src/components/skipnav/Skipnav.tsx';
import Banner from '../../../usx-react/src/components/banner/Banner.tsx';
import MiscBanner from '../../../usx-react/src/components/misc-banner/MiscBanner.tsx';
import Header from '../../../usx-react/src/components/header/Header.tsx';
import Footer from '../../../usx-react/src/components/footer/Footer.tsx';
import Block from '../../../usx-react/src/components/block/Block.tsx';
import Image from '../../../usx-react/src/components/image/Image.tsx';
import Identifier from '../../../usx-react/src/components/identifier/Identifier.tsx';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import Prose from '../../../usx-react/src/components/prose/Prose.tsx';
import SideNav from '../../../usx-react/src/components/sidenav/SideNav.tsx';
import TagGroup from '../../../usx-react/src/components/tag-group/TagGroup.tsx';
import { headerArgs, footerArgs, identifierArgs, miscBannerArgs } from './commonArgs.js';

export default {
  title: 'Examples/Data Display',
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
        content={
          <Page id="blog-post-example" title="The Future of Digital Transformation">
            <article>
              <div className="margin-bottom-3">
                <p className="text-base color-base-dark font-sans-xs">
                  <span>By John Doe</span>
                  <span className="margin-left-2">Published March 15, 2024</span>
                  <span className="margin-left-2">5 min read</span>
                </p>
                <TagGroup
                  tagProps={[
                    { value: 'Technology', color: 'info' },
                    { value: 'Innovation', color: 'success' },
                  ]}
                  className="margin-top-1"
                />
              </div>

              <Image
                src="https://picsum.photos/800/400?random=3"
                alt="Digital transformation concept"
                rounded
                className="margin-bottom-3"
              />

              <Prose>
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

                <Block variant="quote">
                  <p>&quot;Digital transformation is not about technology—it&apos;s about people and processes.&quot;</p>
                  <cite>— John Doe, CTO</cite>
                </Block>

                <p>As we look to the future, the organizations that thrive will be those that embrace digital transformation not as a one-time project, but as an ongoing journey of innovation and adaptation.</p>
              </Prose>
            </article>
          </Page>
        }
        leftSidebar={
          <SideNav
            items={[
              { text: 'Home', href: '#', current: true },
              { text: 'About', href: '#' },
              { text: 'Blog', href: '#' },
              { text: 'Contact', href: '#' },
            ]}
            sticky={true}
          />
        }
        rightSidebar={
          <div className="display-flex flex-column margin-top-3 margin-right-1 gap-2">
            <h3 className="text-ink margin-bottom-1">Related Articles</h3>
            <ul className="usa-list usa-list--unstyled">
              <li className="margin-bottom-1"><a className="usa-link usx-link" href="#">Cloud Migration Strategies</a></li>
              <li className="margin-bottom-1"><a className="usa-link usx-link" href="#">AI in Modern Business</a></li>
              <li className="margin-bottom-1"><a className="usa-link usx-link" href="#">Cybersecurity Best Practices</a></li>
              <li><a className="usa-link usx-link" href="#">Agile Development Methods</a></li>
            </ul>

            <h3 className="text-ink margin-bottom-1">Tags</h3>
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
