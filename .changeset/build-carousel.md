---
'@solexllc/usx': minor
'@solexllc/usx-react': minor
'@solexllc/usx-contracts': minor
'@solexllc/usx-theme': patch
---

Build an accessible Carousel with a packaged USWDS-style JavaScript initializer. React and Django render scrollable slide markup, while initialization adds navigation controls and selected-slide state and skips elements marked `data-enhanced`. Native scroll snapping supports touch dragging; arrow and dot controls animate between slides, respect reduced-motion preferences, and keep slide status in sync with scrolling and keyboard navigation.

Improve Card, Carousel, and Image composition: Card supports `containerClassName`, image carousels fill card media space at a stable aspect ratio, and captioned Images retain their links and screen-reader captions. Update the Card and Carousel contracts for their revised props, and expand standalone HTML examples across components to cover the React variants.

Default Carousel dot colors to the primary, primary-dark, and primary-darker tokens, with a focus-color fallback.
