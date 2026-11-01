---
'@solexllc/usx': minor
'@solexllc/usx-react': minor
---

Add `@solexllc/usx/js/layout` (also started by `@solexllc/usx/js/start`), which toggles the Layout expand button in static markup through a `data-usx-layout-toggle` attribute. The Django Layout template no longer emits an inline `onclick` and ignores `onToggleExpanded`; call `layout.on(root)` or import `@solexllc/usx/js/start`. React Layout keeps handling its own click.
