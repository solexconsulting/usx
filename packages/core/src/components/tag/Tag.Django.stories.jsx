import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Tag',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const defaultArgs = {
  children: 'Info',
};

const bigArgs = {
  children: 'Big',
  big: true,
};

const primaryArgs = {
  children: 'Primary',
  color: 'primary',
};

const secondaryArgs = {
  children: 'Secondary',
  color: 'secondary',
};

const accentCoolArgs = {
  children: 'Accent Cool',
  color: 'accent-cool',
};

const blueArgs = {
  children: 'Blue',
  color: 'blue',
};

const baseArgs = {
  children: 'Base',
  color: 'base',
};

export const Default = {
  args: defaultArgs,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'tag', props: defaultArgs })
      }
    }
  },
  render: djangoComponent('tag')
};

export const Big = {
  name: 'Big tag',
  args: bigArgs,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'tag', props: bigArgs })
      }
    }
  },
  render: djangoComponent('tag')
};

export const Primary = {
  name: 'Primary color',
  args: primaryArgs,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'tag', props: primaryArgs })
      }
    }
  },
  render: djangoComponent('tag')
};

export const Secondary = {
  name: 'Secondary color',
  args: secondaryArgs,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'tag', props: secondaryArgs })
      }
    }
  },
  render: djangoComponent('tag')
};

export const AccentCool = {
  name: 'Accent Cool color',
  args: accentCoolArgs,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'tag', props: accentCoolArgs })
      }
    }
  },
  render: djangoComponent('tag')
};

export const Blue = {
  name: 'Blue color',
  args: blueArgs,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'tag', props: blueArgs })
      }
    }
  },
  render: djangoComponent('tag')
};

export const Base = {
  name: 'Base color',
  args: baseArgs,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'tag', props: baseArgs })
      }
    }
  },
  render: djangoComponent('tag')
};
