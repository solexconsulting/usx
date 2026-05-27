import React from 'react';
import Button from './Button.jsx';
import buttonConfig from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(buttonConfig.props || {});

export default {
  title: 'React/Button',
  component: Button,
  tags: ['autodocs'],
  layout: 'fullwidth',
  argTypes: generatedArgTypes,
};

// Default variant
export const Default = {
  args: {
    label: 'Default',
    variant: 'primary'
  }
};

export const AllVariants = {
  render: () => (
    <>
      <h3>Primary</h3>
      <Button label="Default" variant="primary" />{" "}
      <Button label="Hover" variant="primary" className="usa-button--hover" />{" "}
      <Button label="Active" variant="primary" className="usa-button--active" />{" "}
      <Button label="Focus" variant="primary" className="usa-focus" />{" "}
      <Button label="Disabled" variant="primary" disabled />{" "}
      <Button label="aria-disabled" variant="primary" aria-disabled="true" />{" "}
      <Button label="Unstyled button" variant="unstyled" />
      <h3>Secondary</h3>
      <Button label="Default" variant="secondary" />{" "}
      <Button label="Hover" variant="secondary" className="usa-button--hover" />{" "}
      <Button label="Active" variant="secondary" className="usa-button--active" />{" "}
      <Button label="Focus" variant="secondary" className="usa-focus" />{" "}
      <Button label="Disabled" variant="secondary" disabled />{" "}
      <Button label="aria-disabled" variant="secondary" aria-disabled="true" />{" "}
      <Button label="Unstyled button" variant="unstyled" />
      <h3>Accent Cool</h3>
      <Button label="Default" variant="accent-cool" />{" "}
      <Button label="Hover" variant="accent-cool" className="usa-button--hover" />{" "}
      <Button label="Active" variant="accent-cool" className="usa-button--active" />{" "}
      <Button label="Focus" variant="accent-cool" className="usa-focus" />{" "}
      <Button label="Disabled" variant="accent-cool" disabled />{" "}
      <Button label="aria-disabled" variant="accent-cool" aria-disabled="true" />{" "}
      <Button label="Unstyled button" variant="unstyled" />
      <h3>Accent Warm</h3>
      <Button label="Default" variant="accent-warm" />{" "}
      <Button label="Hover" variant="accent-warm" className="usa-button--hover" />{" "}
      <Button label="Active" variant="accent-warm" className="usa-button--active" />{" "}
      <Button label="Focus" variant="accent-warm" className="usa-focus" />{" "}
      <Button label="Disabled" variant="accent-warm" disabled />{" "}
      <Button label="aria-disabled" variant="accent-warm" aria-disabled="true" />{" "}
      <Button label="Unstyled button" variant="unstyled" />
      <h3>Base</h3>
      <Button label="Default" variant="base" />{" "}
      <Button label="Hover" variant="base" className="usa-button--hover" />{" "}
      <Button label="Active" variant="base" className="usa-button--active" />{" "}
      <Button label="Focus" variant="base" className="usa-focus" />{" "}
      <Button label="Disabled" variant="base" disabled />{" "}
      <Button label="aria-disabled" variant="base" aria-disabled="true" />{" "}
      <Button label="Unstyled button" variant="unstyled" />
      <h3>Outline</h3>
      <Button label="Default" variant="outline" />{" "}
      <Button label="Hover" variant="outline" className="usa-button--hover" />{" "}
      <Button label="Active" variant="outline" className="usa-button--active" />{" "}
      <Button label="Focus" variant="outline" className="usa-focus" />{" "}
      <Button label="Disabled" variant="outline" disabled />{" "}
      <Button label="aria-disabled" variant="outline" aria-disabled="true" />{" "}
      <Button label="Unstyled button" variant="unstyled" />
      <h3>Outline Inverse</h3>
      <div style={{ backgroundColor: '#0f172a', padding: '1rem', marginLeft: '-1rem', width: 'fit-content' }}>
        <Button label="Default" variant="outline" inverse />{" "}
        <Button label="Hover" variant="outline" inverse className="usa-button--hover" />{" "}
        <Button label="Active" variant="outline" inverse className="usa-button--active" />{" "}
        <Button label="Focus" variant="outline" inverse className="usa-focus" />{" "}
        <Button label="Disabled" variant="outline" inverse disabled />{" "}
        <Button label="aria-disabled" variant="outline" inverse aria-disabled="true" />{" "}
        <Button label="Unstyled button" variant="unstyled" inverse />
      </div>
      <h3>Big</h3>
      <Button label="Default" big />{" "}
      <Button label="Active" big className="usa-button--active" />{" "}
      <Button label="Disabled" big disabled />{" "}
      <Button label="aria-disabled" big aria-disabled="true" />{" "}
      <Button label="Unstyled button" big variant="unstyled" />
      <h3>Unstyled</h3>
      <Button label="Default" variant="unstyled" />{" "}
      <Button label="Hover" variant="unstyled" className="usa-button--hover" />{" "}
      <Button label="Active" variant="unstyled" className="usa-button--active" />{" "}
      <Button label="Focus" variant="unstyled" className="usa-focus" />{" "}
      <Button label="Disabled" variant="unstyled" disabled />{" "}
      <Button label="aria-disabled" variant="unstyled" aria-disabled="true" />
    </>
  )
}

export const DefaultHover = {
  args: {
    label: 'Hover',
    variant: undefined,
    className: 'usa-button--hover'
  }
};

export const DefaultActive = {
  args: {
    label: 'Active',
    variant: undefined,
    className: 'usa-button--active'
  }
};

export const DefaultFocus = {
  args: {
    label: 'Focus',
    variant: undefined,
    className: 'usa-focus'
  }
};

export const DefaultDisabled = {
  args: {
    label: 'Disabled',
    variant: undefined,
    disabled: true
  }
};

export const DefaultAriaDisabled = {
  args: {
    label: 'aria-disabled',
    variant: undefined,
    'aria-disabled': true
  }
};

export const DefaultUnstyled = {
  args: {
    label: 'Unstyled button',
    variant: 'unstyled',
  }
};

// Secondary variant
export const Secondary = {
  args: {
    label: 'Default',
    variant: 'secondary'
  }
};

export const SecondaryHover = {
  args: {
    label: 'Hover',
    variant: 'secondary',
    className: 'usa-button--hover'
  }
};

export const SecondaryActive = {
  args: {
    label: 'Active',
    variant: 'secondary',
    className: 'usa-button--active'
  }
};

export const SecondaryFocus = {
  args: {
    label: 'Focus',
    variant: 'secondary',
    className: 'usa-focus'
  }
};

export const SecondaryDisabled = {
  args: {
    label: 'Disabled',
    variant: 'secondary',
    disabled: true
  }
};

export const SecondaryAriaDisabled = {
  args: {
    label: 'aria-disabled',
    variant: 'secondary',
    'aria-disabled': true
  }
};

// Accent Cool variant
export const AccentCool = {
  args: {
    label: 'Default',
    variant: 'accent-cool'
  }
};

export const AccentCoolHover = {
  args: {
    label: 'Hover',
    variant: 'accent-cool',
    className: 'usa-button--hover'
  }
};

export const AccentCoolActive = {
  args: {
    label: 'Active',
    variant: 'accent-cool',
    className: 'usa-button--active'
  }
};

export const AccentCoolFocus = {
  args: {
    label: 'Focus',
    variant: 'accent-cool',
    className: 'usa-focus'
  }
};

export const AccentCoolDisabled = {
  args: {
    label: 'Disabled',
    variant: 'accent-cool',
    disabled: true
  }
};

export const AccentCoolAriaDisabled = {
  args: {
    label: 'aria-disabled',
    variant: 'accent-cool',
    'aria-disabled': true
  }
};

// Accent Warm variant
export const AccentWarm = {
  args: {
    label: 'Default',
    variant: 'accent-warm'
  }
};

export const AccentWarmHover = {
  args: {
    label: 'Hover',
    variant: 'accent-warm',
    className: 'usa-button--hover'
  }
};

export const AccentWarmActive = {
  args: {
    label: 'Active',
    variant: 'accent-warm',
    className: 'usa-button--active'
  }
};

export const AccentWarmFocus = {
  args: {
    label: 'Focus',
    variant: 'accent-warm',
    className: 'usa-focus'
  }
};

export const AccentWarmDisabled = {
  args: {
    label: 'Disabled',
    variant: 'accent-warm',
    disabled: true
  }
};

export const AccentWarmAriaDisabled = {
  args: {
    label: 'aria-disabled',
    variant: 'accent-warm',
    'aria-disabled': true
  }
};

// Base variant
export const Base = {
  args: {
    label: 'Default',
    variant: 'base'
  }
};

export const BaseHover = {
  args: {
    label: 'Hover',
    variant: 'base',
    className: 'usa-button--hover'
  }
};

export const BaseActive = {
  args: {
    label: 'Active',
    variant: 'base',
    className: 'usa-button--active'
  }
};

export const BaseFocus = {
  args: {
    label: 'Focus',
    variant: 'base',
    className: 'usa-focus'
  }
};

export const BaseDisabled = {
  args: {
    label: 'Disabled',
    variant: 'base',
    disabled: true
  }
};

export const BaseAriaDisabled = {
  args: {
    label: 'aria-disabled',
    variant: 'base',
    'aria-disabled': true
  }
};

// Outline variant
export const Outline = {
  args: {
    label: 'Default',
    variant: 'outline'
  }
};

export const OutlineHover = {
  args: {
    label: 'Hover',
    variant: 'outline',
    className: 'usa-button--hover'
  }
};

export const OutlineActive = {
  args: {
    label: 'Active',
    variant: 'outline',
    className: 'usa-button--active'
  }
};

export const OutlineFocus = {
  args: {
    label: 'Focus',
    variant: 'outline',
    className: 'usa-focus'
  }
};

export const OutlineDisabled = {
  args: {
    label: 'Disabled',
    variant: 'outline',
    disabled: true
  }
};

export const OutlineAriaDisabled = {
  args: {
    label: 'aria-disabled',
    variant: 'outline',
    'aria-disabled': true
  }
};

export const OutlineInverse = {
  render: () => (
    <div style={{backgroundColor: '#0f172a', padding: '1rem'}}>
      <Button label="Default" variant="outline" inverse />
    </div>
  )
}

export const OutlineInverseHover = {
  render: () => (
    <div style={{backgroundColor: '#0f172a', padding: '1rem'}}>
      <Button label="Hover" variant="outline" inverse className="usa-button--hover" />
    </div>
  )
}

export const OutlineInverseActive = {
  render: () => (
    <div style={{backgroundColor: '#0f172a', padding: '1rem'}}>
      <Button label="Active" variant="outline" inverse className="usa-button--active" />
    </div>
  )
}

export const OutlineInverseFocus = {
  render: () => (
    <div style={{backgroundColor: '#0f172a', padding: '1rem'}}>
      <Button label="Focus" variant="outline" inverse className="usa-focus" />
    </div>
  )
}

export const OutlineInverseDisabled = {
  args: {
    label: 'Disabled',
    variant: 'outline',
    inverse: true,
    disabled: true
  }
};

export const OutlineInverseAriaDisabled = {
  args: {
    label: 'aria-disabled',
    variant: 'outline',
    inverse: true,
    'aria-disabled': true
  }
};

// Big button
export const Big = {
  args: {
    label: 'Default',
    big: true
  }
};

export const BigDisabled = {
  args: {
    label: 'Disabled',
    big: true,
    disabled: true
  }
};

export const BigAriaDisabled = {
  args: {
    label: 'aria-disabled',
    big: true,
    'aria-disabled': true
  }
};

export const BigUnstyled = {
  args: {
    label: 'Unstyled button',
    big: true,
    variant: 'unstyled',
  }
};

export const Ghost = {
  args: {
    label: 'Ghost',
    ghost: true
  }
};

export const GhostPrimary = {
  args: {
    label: 'Primary Ghost',
    variant: 'primary',
    ghost: true,
  }
};

export const GhostSecondary = {
  args: {
    label: 'Secondary Ghost',
    variant: 'secondary',
    ghost: true,
  }
};

export const GhostAccentCool = {
  args: {
    label: 'Accent Cool Ghost',
    variant: 'accent-cool',
    ghost: true,
  }
};

export const GhostAccentWarm = {
  args: {
    label: 'Accent Warm Ghost',
    variant: 'accent-warm',
    ghost: true,
  }
};

export const GhostBase = {
  args: {
    label: 'Base Ghost',
    variant: 'base',
    ghost: true,
  }
};

export const GhostInverse = {
  args: {
    label: 'Inverse Ghost',
    inverse: true,
    ghost: true,
  },
  render: (args) => (
    <div style={{backgroundColor: '#333', padding: '1rem'}}>
      <Button {...args} />
    </div>
  )
}

export const GhostDisabled = {
  args: {
    label: 'Ghost Disabled',
    variant: 'primary',
    ghost: true,
    disabled: true
  }
};

export const GhostAriaDisabled = {
  args: {
    label: 'Ghost aria-disabled',
    variant: 'primary',
    ghost: true,
    'aria-disabled': true
  }
};

export const GhostWithIcon = {
  args: {
    label: 'Ghost with icon',
    variant: 'primary',
    ghost: true,
    leftIcon: { name: 'arrow_back', size: 2 }
  }
};

export const storyDefs = {
  Default: Default.args,
  DefaultHover: DefaultHover.args,
  DefaultActive: DefaultActive.args,
  DefaultFocus: DefaultFocus.args,
  DefaultDisabled: DefaultDisabled.args,
  DefaultAriaDisabled: DefaultAriaDisabled.args,
  DefaultUnstyled: DefaultUnstyled.args,

  Secondary: Secondary.args,
  SecondaryHover: SecondaryHover.args,
  SecondaryActive: SecondaryActive.args,
  SecondaryFocus: SecondaryFocus.args,
  SecondaryDisabled: SecondaryDisabled.args,
  SecondaryAriaDisabled: SecondaryAriaDisabled.args,

  AccentCool: AccentCool.args,
  AccentCoolHover: AccentCoolHover.args,
  AccentCoolActive: AccentCoolActive.args,
  AccentCoolFocus: AccentCoolFocus.args,
  AccentCoolDisabled: AccentCoolDisabled.args,
  AccentCoolAriaDisabled: AccentCoolAriaDisabled.args,

  AccentWarm: AccentWarm.args,
  AccentWarmHover: AccentWarmHover.args,
  AccentWarmActive: AccentWarmActive.args,
  AccentWarmFocus: AccentWarmFocus.args,
  AccentWarmDisabled: AccentWarmDisabled.args,
  AccentWarmAriaDisabled: AccentWarmAriaDisabled.args,

  Base: Base.args,
  BaseHover: BaseHover.args,
  BaseActive: BaseActive.args,
  BaseFocus: BaseFocus.args,
  BaseDisabled: BaseDisabled.args,
  BaseAriaDisabled: BaseAriaDisabled.args,

  Outline: Outline.args,
  OutlineHover: OutlineHover.args,
  OutlineActive: OutlineActive.args,
  OutlineFocus: OutlineFocus.args,
  OutlineDisabled: OutlineDisabled.args,
  OutlineAriaDisabled: OutlineAriaDisabled.args,
  OutlineInverse: { label: 'Default', variant: 'outline', inverse: true },
  OutlineInverseHover: { label: 'Hover', variant: 'outline', inverse: true, className: 'usa-button--hover' },
  OutlineInverseActive: { label: 'Active', variant: 'outline', inverse: true, className: 'usa-button--active' },
  OutlineInverseFocus: { label: 'Focus', variant: 'outline', inverse: true, className: 'usa-focus' },
  OutlineInverseDisabled: OutlineInverseDisabled.args,
  OutlineInverseAriaDisabled: OutlineInverseAriaDisabled.args,

  Big: Big.args,
  BigDisabled: BigDisabled.args,
  BigAriaDisabled: BigAriaDisabled.args,
  BigUnstyled: BigUnstyled.args,

  Ghost: Ghost.args,
  GhostPrimary: GhostPrimary.args,
  GhostSecondary: GhostSecondary.args,
  GhostAccentCool: GhostAccentCool.args,
  GhostAccentWarm: GhostAccentWarm.args,
  GhostBase: GhostBase.args,
  GhostInverse: GhostInverse.args,
  GhostDisabled: GhostDisabled.args,
  GhostAriaDisabled: GhostAriaDisabled.args,
  GhostWithIcon: GhostWithIcon.args,
};