---
"@solexllc/usx-theme": patch
---

Fix `@use 'pkg:@solexllc/usx-theme/themes'` failing with "Unable to determine which of multiple potential resolutions" under Sass's `NodePackageImporter`. Sass probes `themes.css` when resolving that subpath, and the sibling `./themes.css` export made the Sass module ambiguous. The all-themes stylesheet moved to `@solexllc/usx-theme/themes/all.css`; the `./themes.css` subpath is gone.
