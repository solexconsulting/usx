import React from 'react';

// USWDS footer.init() replaces headings with buttons. Call it once after the
// story's footer mounts; observing its own replacements would call init forever.
export function FooterInitOnce(Story) {
  React.useEffect(() => {
    let active = true;
    let observer;
    let footer;
    let initialized = false;
    import('@uswds/uswds/js/usa-footer').then((module) => {
      if (!active) return;
      footer = module.default || module;
      const initIfMounted = () => {
        if (!document.querySelector('.usa-footer--big')) return;
        observer?.disconnect();
        footer.init();
        initialized = true;
        document.body.dataset.usxReady = 'true';
      };
      observer = new MutationObserver(initIfMounted);
      observer.observe(document.body, { childList: true, subtree: true });
      initIfMounted();
    });
    return () => {
      active = false;
      observer?.disconnect();
      if (initialized) footer.teardown?.();
      delete document.body.dataset.usxReady;
    };
  }, []);
  return <Story />;
}
