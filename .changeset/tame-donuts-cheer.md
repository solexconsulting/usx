---
'@solexllc/usx': patch
'@solexllc/usx-contracts': patch
'@solexllc/usx-react': patch
---

Identifier now renders its masthead logos with the shared Avatar component instead of duplicating its markup, and Avatar gains support for a custom image class via `imageClassName`. Identifier's `parentAgencies` entries also accept a `useThe` flag to omit the hardcoded "the" article before an agency name (e.g. for organizations like "SOLEX Consulting LLC").
