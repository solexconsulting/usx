---
"@solexllc/usx-theme": minor
---

Require canonical unprefixed configuration keys across theme presets, Playground controls, resolved theme objects, and Sass theme maps. JavaScript theme objects and Sass theme maps reject unknown or prefixed keys. For example, configure `accordion-radius` while retaining `$usx-accordion-radius` and `--usx-accordion-radius` as the published Sass and CSS variables. CSS exports and variable references remain prefixed, and utility class names are unchanged.

Namespace the separate primitive stylesheet's CSS variables as `--usx-primitive-<group>-<name>` to avoid collisions with semantic theme tokens. Consumers of `tokens.css` should replace names such as `--color-primary` with `--usx-primitive-color-primary`. The primitive JavaScript data structure is unchanged.
