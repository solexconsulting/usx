---
'@solexllc/usx': minor
---

Align component containers and responsive styles with the shared USX layout settings.

- Apply the shared maximum width and responsive gutters to Header, Banner, Footer, Hero, MiscBanner, grid containers, and Identifier containers. Allow expanded Banner guidance to use wider layouts and keep Page paragraph widths aligned with the layout maximum.
- Align desktop navigation link text with page content without widening the navigation container or affecting the mobile drawer. Adjust MiscBanner's mobile action spacing to match its gutters.
- Replace scattered component media queries with shared desktop and tablet helpers. Keep Header and branding appearance rules aligned with the unchanged upstream USWDS navigation breakpoint.
- Use the shared static gutter defaults in Layout's CSS-only sizing calculations.
- Tint Hero backgrounds with an inset shadow instead of a positioned overlay. Preserve overlay color and opacity controls without painting over preceding Header focus outlines or tinting Hero content.
- Let Footer sign-up forms use their available column width through a shared stylesheet rule covering React, Django, and HTML markup.

Review custom spacing overrides: Hero's horizontal tablet gutter now follows Layout, and existing grid containers receive shared container sizing. USX-owned desktop transitions follow `$usx-layout-breakpoint`; upstream USWDS responsive utilities and navigation behavior remain unchanged. Runtime gutter overrides still require matching compile-time lengths for Layout's container-query thresholds.