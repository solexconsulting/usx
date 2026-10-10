---
"@solexllc/usx-theme": minor
"@solexllc/usx": patch
---

Add a configurable `surface-inverse` role that defaults to `text-ink` and powers inverse surface utilities. Tooltips now inherit their background and arrow color from `surface-inverse` and their text color from `text-inverse`, while retaining independent component overrides. Preserve this inheritance across presets and randomized Playground themes, and expose the inverse surface in the Playground.
