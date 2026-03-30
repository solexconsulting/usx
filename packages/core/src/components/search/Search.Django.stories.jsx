import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Search',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'search', props: {} })
      }
    }
  },
  render: djangoComponent('search')
};

export const CustomPlaceholder = {
  args: {
    placeholder: 'Custom placeholder...',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'search', props: { placeholder: 'Custom placeholder...' } })
      }
    }
  },
  render: djangoComponent('search')
};

export const WithDefaultValue = {
  args: {
    defaultValue: 'Default search value',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'search', props: { defaultValue: 'Default search value' } })
      }
    }
  },
  render: djangoComponent('search')
};

export const Big = {
  args: {
    big: true,
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'search', props: { big: true } })
      }
    }
  },
  render: djangoComponent('search')
};

export const IconOnly = {
  args: {
    iconOnly: true,
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'search', props: { iconOnly: true } })
      }
    }
  },
  render: djangoComponent('search')
};

export const BigIconOnly = {
  args: {
    big: true,
    iconOnly: true,
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'search', props: { big: true, iconOnly: true } })
      }
    }
  },
  render: djangoComponent('search')
};

export const NonStandardIcon = {
  args: {
    icon: 'insights',
    iconOnly: true,
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'search', props: { icon: 'insights', iconOnly: true } })
      }
    }
  },
  render: djangoComponent('search')
};

export const WithCustomButtonVariant = {
  args: {
    buttonVariant: 'accent-cool',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'search', props: { buttonVariant: 'accent-cool' } })
      }
    }
  },
  render: djangoComponent('search')
};

export const GoogleAction = {
  args: {
    action: 'https://www.google.com/search',
    placeholder: 'Search Google...',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'search', props: { action: 'https://www.google.com/search', placeholder: 'Search Google...' } })
      }
    }
  },
  render: djangoComponent('search')
};

export const PathAction = {
  args: {
    action: '/searching-with-an-action/',
    placeholder: 'Search the site...',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'search', props: { action: '/searching-with-an-action/', placeholder: 'Search the site...' } })
      }
    }
  },
  render: djangoComponent('search')
};

export const WithOnSubmit = {
  args: {
    id: 'search-with-onsubmit',
    placeholder: 'Type something and submit...',
    onSubmit: '(query) => alert("Search submitted: " + query)'
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'search',
          props: {
            id: 'search-with-onsubmit',
            placeholder: 'Type something and submit...',
            onSubmit: '(query) => alert("Search submitted: " + query)'
          }
        })
      }
    }
  },
  render: djangoComponent('search')
};
