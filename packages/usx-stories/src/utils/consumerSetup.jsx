import React from 'react';

function ConsumerSetup({ setup, args, children }) {
  const root = React.useRef(null);
  React.useEffect(() => setup(root.current, args), [setup, args]);
  return <div ref={root}>{children}</div>;
}

// Demo event handlers belong to the story lifecycle, not to a play test. Delegate
// from this stable wrapper so asynchronously rendered Django markup works too.
export const consumerSetup = (setup) =>
  function ConsumerDecorator(Story, context) {
    return (
      <ConsumerSetup setup={setup} args={context.args}>
        <Story />
      </ConsumerSetup>
    );
  };
