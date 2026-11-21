import { consumerSetup } from '../../utils/consumerSetup.jsx';

// Example host behavior, shared by the live stories and HTML snapshots.
export const scrollToTop = (event) =>
  event.currentTarget.ownerDocument.defaultView.scrollTo({ top: 0 });

export const hostClickDemo = consumerSetup((root) => {
  const click = (event) => {
    if (event.target.closest('button')) scrollToTop(event);
  };
  root.addEventListener('click', click);
  return () => root.removeEventListener('click', click);
});
