---
'@solexllc/usx': minor
'@solexllc/usx-react': minor
'@solexllc/usx-contracts': minor
---

Standardize element props: `as` chooses a component root and `headingAs` chooses a child heading. Rename `element` to `as` on Callout and Container, `tag` to `as` on Card, `containerElement` to `as` on Prose, `headingLevel` to `headingAs` on Accordion, Hero, Popover, and Section, `headingTag` to `headingAs` on StepIndicator and ProcessList items, and `titleHeadingLevel` to `titleAs` on InPageNav. Page gains a contract-level `as` prop (`main`, `div`, `section`, or `article`; default `main`), so Django pages can render the same root element as React. Card `as` accepts `div`, `li`, or `article`. Update story arguments and templates to the new names.
