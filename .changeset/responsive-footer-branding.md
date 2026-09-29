---
'@solexllc/usx': patch
'@solexllc/usx-react': patch
'@solexllc/usx-theme': patch
---

Fix responsive footer branding and social-icon theming.

- Render responsive normal and inverse logo sources in Django Footer across big, medium, and slim layouts, including branding without a link.
- Update HTML footer branding and shared React/Django Footer stories to use responsive, theme-adaptive artwork. Apply matching inverse branding to example-page headers and footers, including Login.
- Connect footer social-link backgrounds, hover backgrounds, and icon filters to runtime theme tokens. Use white icons in Borealis, Midnight, and Carbon while preserving readable forced-colors rendering.
- Add regression coverage for Django responsive branding and social-icon preset values.