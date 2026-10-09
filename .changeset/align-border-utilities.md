---
"@solexllc/usx": minor
"@solexllc/usx-theme": minor
"@solexllc/usx-react": minor
---

Align border color utilities with USWDS and clarify border width utility names. Update React and Django callouts, examples, and utility documentation, including grid layouts for radius demonstrations.

Migration:
- Replace `.usx-border-{color}` with `.border-{color}`.
- Replace `.usx-border-{size}` with `.usx-border-width-{size}`.
- Rename Sass maps: `$colors` to `$usx-colors`, `$text-colors` to `$usx-text-colors`, `$surface-colors` to `$usx-surface-colors`, `$border-radius` to `$usx-border-radiuses`, and `$border-width` to `$usx-border-widths`.
