import config from '../../../../usx-react/src/components/details/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Details.React.stories.jsx';

export default {
  title: 'Django/USX/Details',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'details' });

/** A descriptive summary reveals optional help using the browser's native keyboard controls. */
export const Default = createStory(storyDefs.Default);

/** The disclosure can start open, and users can close it with the same summary control. */
export const Open = createStory(storyDefs.Open);

/** Children can compose paragraphs, lists, links, and other USX components. */
export const RichContent = createStory(storyDefs.RichContent);

/** Plain text preserves line breaks and indentation, and displays markup literally. */
export const PlainText = createStory(storyDefs.PlainText);

/** Typography example demonstrating custom font and text styles for the summary and content. */
export const Typography = createStory(storyDefs.Typography);

/** Color utility names independently style the marker, dotted underline, and content border. */
export const Colors = createStory(storyDefs.Colors);

/** Mono color example uses a single color for all decorative elements. */
export const MonoColor = createStory(storyDefs.MonoColor);

/** noContentBorder removes the left border and suppresses the contentBorderColor utility. */
export const Borderless = createStory(storyDefs.Borderless);

/** noSummaryUnderline removes the dotted underline while retaining the content border. */
export const NoSummaryUnderline = createStory(storyDefs.NoSummaryUnderline);

/** The two decoration switches can be combined without changing native disclosure behavior. */
export const MinimalDecoration = createStory(storyDefs.MinimalDecoration);

/** className applies font and spacing utilities to the whole disclosure, including its summary. */
export const CustomStyles = createStory(storyDefs.CustomStyles);

/** contentClassName styles only the revealed content, leaving the summary's typography unchanged. */
export const CustomContentStyles = createStory(storyDefs.CustomContentStyles);

/** Tough on the eyes example demonstrating all color utilities applied together for testing visual contrast and readability. */
export const ToughOnTheEyes = createStory(storyDefs.ToughOnTheEyes);

/** A nested disclosure retains its content border when its ancestors are borderless. */
export const NestedDetails = createStory(storyDefs.NestedDetails);
