import { storyDefs } from './Tooltip.React.stories.jsx';
import { createDjangoStory } from '../../utils/storyHelpers';

export default {
  title: 'Django/Tooltip',
  tags: ['autodocs'],
  parameters: {
    renderer: 'django',
    docs: {
      description: {
        component: 'Django Tooltip component - consumes React storyDefs',
      },
    },
  },
};

const createStory = (args, children = '') => createDjangoStory({ componentName: 'tooltip' })({ ...args, children });

export const OnButton = createStory(storyDefs.OnButton, '<button type="button" class="usa-button usx-button usa-button--primary">Hover me</button>');
export const Top = createStory(storyDefs.Top, '<button type="button" class="usa-button usx-button usa-button--primary">Top</button>');
export const Bottom = createStory(storyDefs.Bottom, '<button type="button" class="usa-button usx-button usa-button--primary">Bottom</button>');
export const Left = createStory(storyDefs.Left, '<button type="button" class="usa-button usx-button usa-button--primary">Left</button>');
export const Right = createStory(storyDefs.Right, '<button type="button" class="usa-button usx-button usa-button--primary">Right</button>');
export const OnLink = createStory(storyDefs.OnLink, '<a href="#" class="usa-link usx-link">Hover over this link</a>');
export const OnIcon = createStory(storyDefs.OnIcon, '<svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img" tabindex="0"><use href="./img/sprite.svg#info" /></svg>');
export const OnAbbreviation = createStory(storyDefs.OnAbbreviation, '<abbr title="" tabindex="0">SSN</abbr>');
