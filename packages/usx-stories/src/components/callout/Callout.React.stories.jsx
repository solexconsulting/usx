import React from 'react';
import Callout from '../../../../usx-react/src/components/callout/Callout.tsx';
import config from '../../../../usx-react/src/components/callout/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: { content: 'Related information goes here.' },
  ThinHorizontal: { big: false, strokeColor: 'info', content: 'A horizontal callout with a thinner left border.' },
  Vertical: { orientation: 'vertical', content: 'A vertical callout with its default top border.' },
  BigVertical: { orientation: 'vertical', big: true, strokeColor: 'info', content: 'A vertical callout with a thicker top border.' },
  Colors: { strokeColor: 'primary', backgroundColor: 'base-lightest', textColor: 'primary', className: 'padding-y-2 padding-right-2', content: 'Independent border, background, text, and spacing styles.' },
  IndentSM: { indent: 'sm', content: 'Indent: sm.' },
  IndentMD: { indent: 'md', content: 'Indent: md.' },
  IndentLG: { indent: 'lg', content: 'Indent: lg.' },
  IndentXL: { indent: 'xl', content: 'Indent: xl.' },
  Dedent: { dedent: true, content: 'Pulled left beyond the normal content edge.' },
  Section: { element: 'section', children: <><h3>Program details</h3><p>Related information in a semantic section.</p></> },
  Aside: { element: 'aside', content: 'Supplementary information in an aside.' },
  Blockquote: { element: 'blockquote', cite: 'https://example.com/report', content: 'A sourced quotation using the blockquote root.' },
  ChildrenOverride: { content: 'This fallback must not appear.', children: <p><strong>Children win.</strong> Rich content can include <a className="usa-link usx-link usa-link--external" href="#details">links</a> and emphasis.</p> },
  EmptyChildren: { children: '', content: 'This fallback must not appear.', className: 'padding-y-2' },
};

export default {
  title: 'React/USX/Callout',
  component: Callout,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  decorators: [(Story) => <div className="padding-3"><Story /></div>],
};

export const Default = { args: storyDefs.Default };
export const ThinHorizontal = { args: storyDefs.ThinHorizontal };
export const Vertical = { args: storyDefs.Vertical };
export const BigVertical = { args: storyDefs.BigVertical };
export const Colors = { args: storyDefs.Colors };
export const IndentSM = { args: storyDefs.IndentSM };
export const IndentMD = { args: storyDefs.IndentMD };
export const IndentLG = { args: storyDefs.IndentLG };
export const IndentXL = { args: storyDefs.IndentXL };
export const Dedent = { args: storyDefs.Dedent };
export const Section = { args: storyDefs.Section };
export const Aside = { args: storyDefs.Aside };
export const Blockquote = { args: storyDefs.Blockquote };
export const ChildrenOverride = { args: storyDefs.ChildrenOverride };
export const EmptyChildren = { args: storyDefs.EmptyChildren };
