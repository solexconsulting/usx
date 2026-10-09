import React from 'react';
import Quote from '../../../../usx-react/src/components/quote/Quote.tsx';
import config from '../../../../usx-react/src/components/quote/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const attributionProps = { primary: 'George Washington', secondary: 'First President of the United States', className: 'font-sans-sm' };
const avatarAttribution = {
  ...attributionProps,
  avatarProps: {
    "href": "#",
    "src": "./george_washington.png",
    "alt": "George Washington",
    "shape": "circle"
  },
};
const content = 'The time is always right to do what is right.';
const sourceLinkProps = { href: 'https://example.com/report', external: true };
const sourceLinkPropsWMargin = { href: 'https://example.com/report', external: true, className: 'margin-top-1' };

export const storyDefs = {
  Default: { content },
  WithAttribution: { content, blockquoteClassName: 'font-serif-lg text-italic', attributionProps, calloutProps: { strokeColor: 'info' } },
  WithAvatar: { content, blockquoteClassName: 'font-serif-lg text-italic', attributionProps: avatarAttribution, calloutProps: { strokeColor: 'info' } },
  Vertical: { content, blockquoteClassName: 'font-serif-lg', calloutProps: { orientation: 'vertical', strokeColor: 'info' }, attributionProps: avatarAttribution },
  WithCalloutProps: { content, calloutProps: { big: false, strokeColor: 'primary', backgroundColor: 'base-lightest', textColor: 'primary', indent: 'sm', className: 'padding-y-2 padding-right-2' }, attributionProps },
  WithSource: { content, sourceLinkProps, sourceTitle: 'Service research report' },
  WithAvatarAndSource: { content, sourceLinkProps: sourceLinkPropsWMargin, sourceTitle: 'Service research report', blockquoteClassName: 'font-serif-lg', attributionProps: avatarAttribution, calloutProps: { orientation: 'vertical', big: true, strokeColor: 'info' } },
  SourceTitleOnly: { content, sourceTitle: 'Service research report' },
  SourceLinkOnly: { content, sourceLinkProps: sourceLinkPropsWMargin },
  ChildrenOverride: { content: 'This fallback must not appear.', children: <p><strong>Listen first.</strong> Then design around what people need.</p>, calloutProps: { orientation: 'vertical' }, attributionProps },
  EmptyChildren: { children: '', content: 'This fallback must not appear.', attributionProps },
  CustomAttribution: { content, attributionProps: { children: <span>Prepared by the <strong>Service research team</strong></span> } },
};

export default {
  title: 'React/USX/Quote',
  component: Quote,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  decorators: [(Story) => <div className="padding-3"><Story /></div>],
};

export const Default = { args: storyDefs.Default };
export const WithAttribution = { args: storyDefs.WithAttribution };
export const WithAvatar = { args: storyDefs.WithAvatar };
export const Vertical = { args: storyDefs.Vertical };
export const WithCalloutProps = { args: storyDefs.WithCalloutProps };
export const WithSource = { args: storyDefs.WithSource };
export const WithAvatarAndSource = { args: storyDefs.WithAvatarAndSource };
export const SourceTitleOnly = { args: storyDefs.SourceTitleOnly };
export const SourceLinkOnly = { args: storyDefs.SourceLinkOnly };
export const ChildrenOverride = { args: storyDefs.ChildrenOverride };
export const EmptyChildren = { args: storyDefs.EmptyChildren };
export const CustomAttribution = { args: storyDefs.CustomAttribution };
