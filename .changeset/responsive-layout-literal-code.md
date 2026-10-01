---
'@solexllc/usx': minor
'@solexllc/usx-react': minor
'@solexllc/usx-theme': minor
'@solexllc/usx-contracts': minor
---

Refine responsive page layouts and support literal HTML and JSX in Code examples.

- Use CSS container queries for Layout sidebar capacity and expand-button availability across React, Django, and HTML. Center the main column, preserve readable width, contain vertical margins consistently, and keep responsive outer gutters separate from inner sidebar gaps.
- Consolidate Layout visibility rules to reduce generated CSS and repeated relational selectors. Add configurable Sass sizing profiles and runtime gutter tokens, accessible expand-button state, and sidebar expansion props in the component contract.
- Make Hero height content-driven with responsive outer and callout padding. Align mobile branding and miscellaneous-banner spacing, use body typography for alert headings, and remove Page's automatic surface-background fallback.
- Render Code lines as literal text by default. Add explicit `allowHtml` support for trusted formatting, including escaped JSX with a real bold fragment, with matching React, Django, HTML, and generated contracts.
- Standardize complete examples and page-pattern stories on Layout, Page, and Section; correct duplicate headings, nested landmarks, and skip targets. Add page-anatomy documentation, markup examples, USWDS adoption research, and focused rendering and responsive-layout regression coverage.

Migration notes:

- Code no longer interprets line strings as HTML by default. Pass raw HTML or JSX source without pre-escaping it. Existing formatted fragments must set `allowHtml: true`; that mode does not sanitize HTML. For mixed source and formatting, escape the displayed markup but leave trusted formatting tags unescaped, and supply plain source separately through `copyText`.
- Layout owns the responsive outer padding; the single-column and main-content wrappers are unpadded, and sidebars own their inner gaps. Review CSS that targets the previous padding placement. Keep custom runtime gutter values synchronized with the `layout.sizing()` mixin's `$gutter-mobile` and `$gutter` arguments because CSS size-query thresholds cannot read custom properties.
- Hero no longer supplies a fixed minimum height. Add an explicit minimum height when required. Pages that need their own surface fill should explicitly configure their background rather than relying on the previous fallback.