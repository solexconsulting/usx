import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';

export default {
  title: 'Django/Swap',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('swap');

export const Default = createStory({
  onContent: 'ON',
  offContent: 'OFF',
  variant: 'default',
});

export const DefaultIcon = createStory({
  onContent: '<svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img"><use href="/img/sprite.svg#visibility"></use></svg>',
  offContent: '<svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img"><use href="/img/sprite.svg#info"></use></svg>',
});

export const ActiveAlwaysOn = createStory({
  onContent: 'ACTIVE',
  offContent: 'INACTIVE',
  variant: 'active',
  includeInput: false,
});

export const RotateText = createStory({
  onContent: 'Hello',
  offContent: 'Goodbye',
  variant: 'rotate',
});

export const RotateIcon = createStory({
  onContent: '<svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img"><use href="/img/sprite.svg#security"></use></svg>',
  offContent: '<svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img"><use href="/img/sprite.svg#support_agent"></use></svg>',
  variant: 'rotate',
});

export const FlipText = createStory({
  onContent: '👍',
  offContent: '👎',
  variant: 'flip',
});

export const FlipEmoji = createStory({
  onContent: '😊',
  offContent: '😞',
  variant: 'flip',
});

export const ColorChangeIcon = createStory({
  onContent: '<svg class="usa-icon usa-icon--size-3 text-success" aria-hidden="true" focusable="false" role="img"><use href="/img/sprite.svg#check_circle"></use></svg>',
  offContent: '<svg class="usa-icon usa-icon--size-3 text-error" aria-hidden="true" focusable="false" role="img"><use href="/img/sprite.svg#check_circle"></use></svg>',
});

export const AdvancedCustomChildren = createStory({
  children: '<input type="checkbox" autocomplete="off"/><span class="usx-swap-on">Custom ON</span><span class="usx-swap-off">Custom OFF</span>',
});

export const ViewMoreViewLess = createStory({
  onContent: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
  offContent: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...</p>',
});

export const TriggerAlertOnSwap = createStory({
  onContent: 'ON',
  offContent: 'OFF',
  inputProps: {
    onchange: "exampleEventTrigger('Swap triggered!')",
  },
});