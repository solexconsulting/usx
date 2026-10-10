---
"@solexllc/usx-theme": patch
---

Set dark preset visited-link colors through the shared `color-visited` role instead of overriding `usx-link-text-visited`. Links now inherit changes to `--usx-color-visited` in the Theme Playground and exported themes while retaining their existing dark preset colors and support for explicit component overrides. Apply the same inheritance to randomized Playground themes.
