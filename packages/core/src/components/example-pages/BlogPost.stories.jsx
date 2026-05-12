import React from 'react';
import Skipnav from '../skipnav/Skipnav';
import Banner from '../banner/Banner';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Image from '../image/Image';
import Identifier from '../identifier/Identifier';
import Layout from '../layout/Layout';
import Prose from '../prose/Prose';
import SideNav from '../sidenav/SideNav';
import Tag from '../tag/Tag';
import { headerArgs, footerArgs, identifierArgs } from './commonArgs';

export default {
  title: 'Examples',
};

export const BlogPost = {
  render: () => (
    <>
      <Skipnav target="blog-post-example" />
      <Banner
        id="example-1-banner"
        ariaLabel="Example banner"
      />
      <Header
        id="blog-header"
        {...headerArgs}
      />
      <Layout
        variant="grid"
        content={
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
          </article>
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
        expandRightSidebar={true}
        rightSidebar={
          <>
            <div className="border border-base-lighter border-1px padding-4 margin-bottom-3">
              <h3>Related Articles</h3>
              <ul className="usa-list usa-list--unstyled">
                <li><a className="usa-link" href="#">Cloud Migration Strategies</a></li>
                <li><a className="usa-link" href="#">AI in Modern Business</a></li>
                <li><a className="usa-link" href="#">Cybersecurity Best Practices</a></li>
                <li><a className="usa-link" href="#">Agile Development Methods</a></li>
              </ul>
            </div>

            <div className="border border-base-lighter border-1px padding-3">
              <h3>Tags</h3>
              <div className="margin-top-2 display-flex flex-wrap">
                <Tag value="Digital Transformation" color="primary" className="margin-05" />
                <Tag value="Technology" color="info" className="margin-05" />
                <Tag value="Innovation" color="success" className="margin-05" />
                <Tag value="Business Strategy" color="warning" className="margin-05" />
              </div>
            </div>
          </>
        }
      />
      <Footer {...footerArgs} signUp={{ ...footerArgs.signUp, emailId: 'footer-email-blog' }} />
      <Identifier {...identifierArgs} />
    </>
  ),
};
