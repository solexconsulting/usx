---
"@solexllc/usx-theme": minor
"@solexllc/usx": minor
---

Add subtle, muted, and inverse border color tokens alongside the strong default border role, with matching Sass variables and `.border-default`, `.border-subtle`, `.border-muted`, and `.border-inverse` utilities. Consolidate neutral component borders under these roles, including previously unthemed combo-box dividers. Preserve form validation, selection, and disabled borders when applying the neutral scale.

Keep table rules, collection separators, and checkbox/radio outlines ink-colored and independent of the border scale. Their Sass overrides default to null without hooks; runtime tokens default to currentColor and can explicitly reference a border role.

Keep step-indicator segment bars and counter outlines aligned with their label colors, including the pending state's muted text color, independently of the border scale.

Process-list counter outlines inherit text-ink by default and retain an independent override. Expose the process list's heading, connecting line, counter text, counter outline, and counter background/ring in a dedicated Theme Playground component-color group.

Improve Theme Playground color controls to preview inherited CSS variable values without replacing their references, and support switching between currentColor and custom colors. Add a dedicated Collection color group alongside the Process List controls.

Refine primary palette tints in the Sunset, Aurora, Borealis, Carbon, and GOV.UK presets. Customize Carbon's box, button, field, and selector radii, with component overrides for accordions, alerts, tags, and checkbox/radio tiles.

The default border color changes to `#565c65`; muted defaults to `#a9aeb1`, subtle to `#dfe1e2`, and inverse to `#ffffff`. Dark themes define a matching scale. Existing themes that set only `--usx-color-border` should also configure `--usx-color-border-muted` and `--usx-color-border-subtle` to customize all three border strengths. Explicitly configure the table, collection, and checkable border hooks to include them in that scale. Component-specific overrides retain precedence; inverse has no default component assignments.
