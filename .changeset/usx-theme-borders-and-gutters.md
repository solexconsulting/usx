---
'@solexllc/usx-theme': minor
---

Add independent Header and Footer border tokens accepting complete border values, such as `1px solid var(--usx-color-border)` or `none`, and update prebuilt themes to use them.

Migrate existing color-only CSS custom properties and their corresponding Sass variables:

- `usx-header-border` to `usx-header-border-top`.
- `usx-header-nav-top-border` to `usx-header-border-separator`.
- `usx-header-nav-bottom-border` to `usx-header-border-bottom`.
- `usx-footer-border` to `usx-footer-border-top`.
- `usx-footer-primary-section-border` to `usx-footer-primary-section-border-top`.
- `usx-footer-secondary-section-border` to `usx-footer-secondary-section-border-top`.

Supply a full border value instead of a color. Separate tokens now control Header mobile boundaries and menu dividers, plus Footer bottom borders and navigation dividers.

Increase the default mobile layout gutter from `0.75rem` (12px) to `1rem`. Change `at-media('mobile')` to target the mobile minimum width; use `at-media('tablet', 'max')` for the previous below-tablet behavior.