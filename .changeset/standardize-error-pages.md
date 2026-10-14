---
'@solexllc/usx': minor
'@solexllc/usx-react': minor
'@solexllc/usx-contracts': minor
'@solexllc/usx-theme': patch
---

Add ErrorPage and Details components with matching React and Django contracts and HTML story snapshots.

- Details uses native details/summary elements for plain text or composed content. It supports initial open state, marker and border colors, summary and content classes, and independent border and underline switches that also work in nested disclosures.
- ErrorPage composes USX Page, Prose, ButtonGroup, Button, Link, Image, and Details for recovery actions, support channels, public error metadata, optional diagnostics, and opt-in HTTP Cats illustrations. ErrorPage does not set a tabindex on Page.
- Page supports shared heading IDs, root labeling, and optional programmatic focus props in React and Django.
- Callout supports paragraph roots alongside div, section, and aside. Remove its blockquote root and cite prop; use Quote for quotations.
- Code supports contentClassName for styling its content independently.
- Add marker color utilities and the ink border color utility used by Details.
