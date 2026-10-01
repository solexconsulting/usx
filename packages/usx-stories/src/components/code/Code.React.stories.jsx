
import Code from '../../../../usx-react/src/components/code/Code.tsx';
import { expect } from 'storybook/test';
import config from '../../../../usx-react/src/components/code/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const defaultLines = [
  { code: 'npm install @solexllc/usx', prefix: '$' },
  { code: 'installing...', prefix: '>', className: 'text-warning' },
  { code: 'Done!', prefix: '>', className: 'text-success' },
];

const htmlMarkup = `<section aria-label="Account & settings">
  <h2>Contact information</h2>
  <p>Use &lt;Page&gt; to define the page.</p>
</section>`;
const reactMarkup = `<Layout>
  <Page title="Account" tabIndex={-1}>
    <Section title="Contact information">
      <ContactDetails user={currentUser} />
    </Section>
  </Page>
</Layout>`;
const markupLines = (source) => source.split('\n').map((code, index) => ({ code, prefix: String(index + 1) }));
const checkLiteralMarkup = async ({ canvasElement, args }) => {
  const elements = canvasElement.querySelectorAll('.usx-mockup-code code');
  await expect(elements.length).toBe(args.lines.length);
  for (const [index, element] of [...elements].entries()) {
    await expect(element.textContent).toBe(args.lines[index].code);
    await expect(element.childElementCount).toBe(0);
  }
};

export const storyDefs = {
  Default: { lines: defaultLines },
  WithLineNumbers: {
    lines: [
      { code: 'npm install @solexllc/usx', prefix: '1' },
      { code: 'installing...', prefix: '2', className: 'text-warning' },
      { code: 'Done!', prefix: '3', className: 'text-success' },
    ],
  },
  HighlightedLine: {
    lines: [
      { code: 'npm install @solexllc/usx', prefix: '$' },
      { code: 'installing...', prefix: '>', className: 'text-warning' },
      { code: 'Error!', prefix: '>', className: 'text-ink bg-warning' },
    ],
  },
  LongLine: {
    lines: [
      { code: 'Magnam dolore beatae necessitatibus nemopsum itaque sit. Et porro quae qui et et dolore ratione.', prefix: '~' },
    ],
  },
  WithHTMLFragment: {
    allowHtml: true,
    lines: [
      { code: 'npm install @solexllc/usx', prefix: '$' },
      { code: 'This <em>line</em> has <strong>HTML fragments</strong>', prefix: '>', className: 'text-warning' },
      { code: 'Done!', prefix: '>', className: 'text-success' },
    ],
  },
  WithoutPrefix: {
    lines: [{ code: 'without prefix' }],
  },
  WithHTMLMarkup: {
    lines: markupLines(htmlMarkup),
    copyText: htmlMarkup,
  },
  WithReactMarkup: {
    lines: markupLines(reactMarkup),
    copyText: reactMarkup,
  },
  ReactMarkupWithHTMLFragment: {
    allowHtml: true,
    lines: markupLines(`&lt;Layout&gt;
  &lt;Page title="<strong>Account</strong>" tabIndex={-1}&gt;
    &lt;Section title="Contact information"&gt;
      &lt;ContactDetails user={currentUser} /&gt;
    &lt;/Section&gt;
  &lt;/Page&gt;
&lt;/Layout&gt;`),
    copyText: reactMarkup,
  },
  WithColor: {
    lines: defaultLines,
    className: 'bg-primary-darker text-magenta',
  },
  WithCopyButton: {
    lines: defaultLines,
    copyText: 'npm install @solexllc/usx\ninstalling...\nDone!',
  },
};

export default {
  title: 'React/USX/Code',
  component: Code,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const WithLineNumbers = { args: storyDefs.WithLineNumbers };
export const HighlightedLine = { args: storyDefs.HighlightedLine };
export const LongLine = { args: storyDefs.LongLine };
export const WithHTMLFragment = { args: storyDefs.WithHTMLFragment };
export const WithHTMLMarkup = {
  args: storyDefs.WithHTMLMarkup,
  play: checkLiteralMarkup,
};
export const WithReactMarkup = {
  args: storyDefs.WithReactMarkup,
  play: checkLiteralMarkup,
};
export const ReactMarkupWithHTMLFragment = {
  args: storyDefs.ReactMarkupWithHTMLFragment,
  parameters: {
    docs: {
      description: {
        story: 'With `allowHtml` enabled, escape the source markup as `&lt;` and `&gt;`, but leave the formatting `<strong>` element unescaped. Only Account is bold; the surrounding JSX remains visible source. `copyText` contains the original JSX without formatting tags.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const lines = [...canvasElement.querySelectorAll('.usx-mockup-code code')];
    await expect(lines.map((line) => line.textContent).join('\n')).toBe(args.copyText);
    const fragments = canvasElement.querySelectorAll('.usx-mockup-code code *');
    await expect(fragments.length).toBe(1);
    await expect(fragments[0].tagName).toBe('STRONG');
    await expect(fragments[0].textContent).toBe('Account');
  },
};
export const WithoutPrefix = { args: storyDefs.WithoutPrefix };
export const WithColor = { args: storyDefs.WithColor };
export const WithCopyButton = { args: storyDefs.WithCopyButton };
