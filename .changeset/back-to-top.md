---
'@solexllc/usx-react': minor
'@solexllc/usx-contracts': minor
---

Compose BackToTop with Button, rendering an anchor with href="#top" by default
and accepting a custom href. Share Button styling and icon rendering across both
React and Django, defaulting to a primary ghost button, with variant and ghost
configurable. Expose a focused subset of Button props alongside the arrow and
accessible-label options.
A host-provided onClick selects a button and takes precedence over href. React
accepts a callback; both renderers accept onClick=true for host-bound listeners.
Remove built-in scrolling behavior; BackToTop needs no USX enhancement.
