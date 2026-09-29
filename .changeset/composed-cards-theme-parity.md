---
'@solexllc/usx': minor
'@solexllc/usx-react': minor
'@solexllc/usx-contracts': minor
'@solexllc/usx-theme': minor
---

Expand component theming and align React and Django rendering.

- Add Card tokens for surfaces, text, borders, and corner radii, including inset, exdent, and flag media variants. Apply theme fonts to Card, Page, and Section headings.
- Add semantic radius utilities and themed border-width utilities; constrain avatar images to their containers.
- Add Accordion heading/content class targets and ButtonGroup item classes, with matching Django templates and generated contracts.
- Align Card content precedence, image props, carousel classes, dot visibility, IDs, and accessibility markup across React and Django. Repair action-button rendering and use Carousel's declared slide contract.
- Default buttons to the primary variant, align Django's button type default, remove CheckboxGroup's implicit legend, and add spacing after Required markers.
- Support separate visible and screen-reader Spinner labels, with animation limited to the icon.

Migration notes:

- Spinner no longer supplies a default loading label. Use `label` for visible text or `screenReaderLabel` for assistive text. Remove `omitLabel`; omit both label props for an unlabelled spinner. The `usx-spinner` class now belongs to the wrapper rather than the SVG.
- Accordion `className` now targets only the root. Use top-level `headingClassName` and `contentClassName` for inner elements instead of relying on root or item `className` propagation.
- The default heading font is now Merriweather instead of inheriting the body font. Set `--usx-font-family-heading: var(--usx-font-family)` to retain inheritance.
- Layout no longer enforces `min-height: 100vh`; apply a minimum height in the consuming application when needed. Supply a CheckboxGroup `legend` explicitly where required.