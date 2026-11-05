import React from 'react';
import PropTypes from 'prop-types';

// Storybook acts as the host that sets the browser-only checkbox state.
export default function IndeterminateHost({ children, idSuffix }) {
  React.useEffect(() => {
    const setIndeterminate = () => {
      document.querySelectorAll('input.usa-checkbox__input').forEach((input) => {
        if (input.id.endsWith(idSuffix)) input.indeterminate = true;
      });
    };

    setIndeterminate();
    const observer = new MutationObserver(setIndeterminate);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [idSuffix]);

  return children;
}

IndeterminateHost.propTypes = {
  children: PropTypes.node.isRequired,
  idSuffix: PropTypes.string.isRequired,
};
