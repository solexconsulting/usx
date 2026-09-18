
import Collection from '../../../../usx-react/src/components/collection/Collection.tsx';
import config from '../../../../usx-react/src/components/collection/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const ITEMS_DEFAULT = [
  {
    href: '#',
    heading: "Gears of Government President's Award winners",
    description: "The Administration announces the winners of the Gears of Government President's Award, recognizing federal employees who make a profound difference in the lives of the American people.",
    meta: [
      { text: 'By Sondra Ainsworth and Constance Lu' },
      { text: 'September 30, 2020', datetime: '2020-09-30T12:00:00+01:00' },
    ],
    tags: [{ label: 'New', isNew: true }, { label: 'PMA' }, { label: 'OMB' }],
  },
  {
    href: '#',
    heading: 'Women-owned small business dashboard',
    description: "In honor of National Women's Small Business Month, we've partnered with SBA to highlight the Women-Owned Small Businesses (WOSBs) data dashboard.",
    meta: [
      { text: 'By Constance Lu' },
      { text: 'September 30, 2020', datetime: '2020-09-30T12:00:00+01:00' },
    ],
    tags: [{ label: 'SBA' }],
  },
];

export const storyDefs = {
  Default: {
    items: ITEMS_DEFAULT,
  },
  WithThumbnail: {
    items: ITEMS_DEFAULT.map((item, i) => ({
      ...item,
      imgSrc: i === 0
        ? 'https://trumpadministration.archives.performance.gov/img/GoG/GoG-logo.png'
        : 'https://www.performance.gov/img/blog/wosb1.jpg',
      imgAlt: i === 0 ? "Gears of Government Award" : "Women-Owned Small Business",
    })),
  },
  Calendar: {
    items: [
      {
        href: '#',
        heading: "Gears of Government President's Award winners",
        description: "The Administration announces the winners of the Gears of Government President's Award.",
        calendarDate: '2020-09-30T12:00:00+01:00',
      },
      {
        href: '#',
        heading: 'Women-owned small business dashboard',
        description: "Highlighting the Women-Owned Small Businesses data dashboard.",
        calendarDate: '2020-09-30T12:00:00+01:00',
      },
      {
        href: '#',
        heading: 'September 2020 updates show progress on cross-agency goals',
        description: 'Progress updates for Cross-Agency Priority Goals and Agency Priority Goals for Q3 FY2020.',
        calendarDate: '2020-09-17T12:00:00+01:00',
      },
    ],
  },
  Condensed: {
    condensed: true,
    items: [
      { href: '#', heading: 'The eight principles of mobile-friendliness', meta: [{ text: 'Digital.gov' }] },
      { href: '#', heading: 'The USWDS maturity model', meta: [{ text: 'U.S. Web Design System' }] },
      { href: '#', heading: "A news item that's on our own site" },
      { href: '#', heading: 'The key role of product owners in federated data projects', meta: [{ text: '18F' }] },
    ],
  },
};

export default {
  title: 'React/USWDS/Collection',
  component: Collection,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const WithThumbnail = { args: storyDefs.WithThumbnail };
export const Calendar = { args: storyDefs.Calendar };
export const Condensed = { args: storyDefs.Condensed };
