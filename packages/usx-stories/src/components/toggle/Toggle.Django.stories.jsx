import React, { useEffect, useState } from 'react';
import config from '../../../../usx-react/src/components/toggle/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Toggle.React.stories.jsx';

export default {
  title: 'Django/USWDS-Inspired/Toggle',
  tags: ['USWDS-Inspired', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'toggle' });

export const Default = createStory(storyDefs.Default);
export const Icon = createStory(storyDefs.IconVariant);
const controlled = createStory(storyDefs.Controlled);
const ControlledExample = (args) => {
  const [selected, setSelected] = useState(args.value);
  useEffect(() => {
    setSelected(args.value);
    const onChange = (event) => {
      if (event.target.matches(`#${args.id} input[type="radio"]`)) setSelected(event.target.value);
    };
    document.addEventListener('change', onChange);
    return () => document.removeEventListener('change', onChange);
  }, [args.id, args.value]);
  return <>{controlled.render(args)}<p>Selected: {selected}</p></>;
};
export const Controlled = {
  ...controlled,
  render: (args) => <ControlledExample {...args} />,
};
export const TotallyDisabled = createStory(storyDefs.TotallyDisabled);
export const PartiallyDisabled = createStory(storyDefs.PartiallyDisabled);

export const Required = {
  ...createStory(storyDefs.Required),
  render: (args) => (
    <form onSubmit={(event) => event.preventDefault()}>
      {createStory(storyDefs.Required).render(args)}
      <div className="margin-top-2"><button className="usa-button usx-button usa-button--primary" type="submit">Submit</button> <button className="usa-button usx-button usa-button--outline" type="reset">Reset</button></div>
    </form>
  ),
};
export const Numeric = createStory(storyDefs.Numeric);
export const PrimitiveOptions = createStory(storyDefs.PrimitiveOptions);
