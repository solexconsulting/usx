---
'@solexllc/usx-theme': minor
---

Add shared Sass helpers for layout containers, gutters, and responsive queries.

- Add `layout-container($max-width: $usx-layout-max-width)` for centered, border-box containers and `layout-gutters` for responsive inline padding. Both support the existing runtime gutter hooks with static fallbacks.
- Expose `$usx-layout-gutter-mobile-default` and `$usx-layout-gutter-default`, defaulting to 12px and 32px, for consistent static spacing and sizing calculations.
- Extend `at-media` with an optional direction argument. `'max'` emits an exclusive upper bound, `'desktop'` reads `$usx-layout-breakpoint`, and the legacy `'mobile'` call continues to mean below tablet.
- Add the fixed `$uswds-header-breakpoint` compatibility reference and `at-media('uswds-header')` for appearance rules that must track upstream navigation. These helpers do not configure or rebuild USWDS.

Layout widths remain compile-time Sass values; this release does not add runtime width tokens.