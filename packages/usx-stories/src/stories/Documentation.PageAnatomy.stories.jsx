import React from 'react';
import Layout from '../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../usx-react/src/components/page/Page.tsx';
import Section from '../../../usx-react/src/components/section/Section.tsx';
import Code from '../../../usx-react/src/components/code/Code.tsx';

const singleColumnMarkup = `<ExampleFrame target="account-content">
  <Layout>
    <Page id="account-content" title="Account" tabIndex={-1}>
      <p>Manage your account information.</p>
      <Section title="Contact information">
        <ContactDetails />
      </Section>
      <Section title="Recent activity">
        <ActivityList />
      </Section>
    </Page>
  </Layout>
</ExampleFrame>`;

const gridMarkup = `<ExampleFrame target="settings-content">
  <Layout
    variant="grid"
    leftSidebar={<SideNav items={settingsNavigation} />}
    content={
      <Page element="div" id="settings-content" title="Settings" tabIndex={-1}>
        <Section title="Profile settings">
          <ProfileForm />
        </Section>
      </Page>
    }
  />
</ExampleFrame>`;

export default {
  title: 'Documentation/Page Anatomy',
  parameters: { layout: 'fullscreen' },
};

export const PageAnatomy = {
  render: () => (
    <Layout>
      <Page title="Page anatomy" className="usa-prose usx-prose">
        <p>
          Compose complete pages as site shell, Layout, Page, Section, then content components.
          Each layer has a distinct responsibility; reusable content patterns do not need to
          own all of them.
        </p>

        <Section title="Responsibilities">
          <dl>
            <dt>Site shell</dt>
            <dd>
              Skipnav, Banner, Header, Footer, and Identifier frame the page. Keep Banner present
              in federal examples. ExampleFrame provides this shell, but does not add Layout or Page.
              A full-width Hero may sit between Header and Layout. Set its headingLevel to h2
              when Page supplies the h1.
            </dd>
            <dt>Layout</dt>
            <dd>
              Owns horizontal width, gutters, sidebars, and expansion. Use its single-column or
              grid variant instead of recreating the page container with max-width and padding
              utilities. Sizing and sidebar visibility are controlled by CSS/SCSS, not JavaScript
              measurement. Expanded state does not change the content hierarchy.
            </dd>
            <dt>Page</dt>
            <dd>
              Owns the page title, optional eyebrow, content wrapper, and page-level vertical
              spacing. It always renders one h1 and defaults to a main element. Short introductory
              copy can appear before the first Section.
            </dd>
            <dt>Section</dt>
            <dd>
              Groups a logical region of the page. Its optional title renders an h2; its content
              wrapper contains forms, tables, cards, prose, or other patterns. Omit the title when
              content already supplies an appropriate heading or legend. An aria-label can name
              a region without repeating a visible heading.
            </dd>
          </dl>
        </Section>

        <Section title="Single-column page">
          <p>
            A single-column Layout does not create a main landmark. Let Page provide it, and point
            Skipnav at a stable, focusable target. Breadcrumbs may precede Page inside Layout.
          </p>
          <Code
            lines={singleColumnMarkup.split('\n').map((code, index) => ({ code, prefix: String(index + 1) }))}
            copyText={singleColumnMarkup}
            className="text-white"
          />
        </Section>

        <Section title="Grid page">
          <p>
            Grid Layout already renders main around its content and aside around each sidebar.
            Set Page element to div or article inside it. Supply sidebar content directly, not
            another aside, and do not add a second Page or h1 in a sidebar.
          </p>
          <Code
            lines={gridMarkup.split('\n').map((code, index) => ({ code, prefix: String(index + 1) }))}
            copyText={gridMarkup}
            className="text-white"
          />
          <p>
            Sidebars can disappear when their container is too narrow. Essential actions and
            filters must remain reachable in the main content at those sizes.
          </p>
        </Section>

        <Section title="Content and headings">
          <ul>
            <li>Use one main landmark and one page h1 in a complete page.</li>
            <li>
              Use Section titles for peer h2 regions. Subsections within them use h3 or lower;
              do not nest titled Sections when that would repeat h2 at the wrong level.
            </li>
            <li>
              Keep form groups as Fieldset and legend. Section supplies page structure, not a
              replacement for form semantics. Prose can retain its own narrative headings.
            </li>
            <li>
              Keep loading, empty, error, denied, and success states inside the same Page and
              Section structure so the title and navigation remain available.
            </li>
            <li>
              Use component spacing first. Add utilities for deliberate local grouping, not to
              reproduce Page margins or compensate for Layout margin collapse.
            </li>
          </ul>
        </Section>

        <Section title="Stories and reusable patterns">
          <p>
            Complete examples own a shell and page anatomy and use Storybook fullscreen layout.
            Page-level patterns such as Search Results own Layout and Page themselves; do not
            wrap them in a second Layout or Page. Content patterns such as DataTablePattern remain
            embeddable Sections; their example or story supplies Layout and Page.
          </p>
          <p>
            Building-block stories use a page decorator to demonstrate content in context.
            Individual component stories, layout comparison fixtures, theme specimens, and
            reference documentation may intentionally be isolated demonstrations rather than full
            application pages. Do not add a Page around a Page story, or a global wrapper around
            every story. Multiple previews in an autodocs page are separate examples.
          </p>
          <p>
            React examples define the intended composition. HTML and Django compositions should
            reproduce the rendered structure and classes, including non-main page wrappers inside
            a grid, rather than blindly nesting components that both emit main.
          </p>
        </Section>

        <Section title="Review checklist">
          <ul>
            <li>Does the complete page contain Layout, one Page, and logical Sections?</li>
            <li>Is there exactly one main and h1, with no nested main or aside landmarks?</li>
            <li>Does the skip link resolve to a unique target with tabIndex=-1?</li>
            <li>Are sidebar actions still available on narrow containers?</li>
            <li>Do all data and workflow states preserve the same outer structure?</li>
            <li>Are Banner, navigation, actions, and existing interactions preserved?</li>
          </ul>
        </Section>
      </Page>
    </Layout>
  ),
};