---
'@solexllc/usx-react': patch
---

Remove the unused early variables import from the Sass entry so the existing themed entry initializes runtime hooks before component styles. This avoids requiring a separate hooks import in consuming stylesheets when theme modules resolve to one canonical path.

Document shared layout and gutter helpers, custom breakpoint configuration, and integration with unchanged precompiled USWDS CSS. Clarify the distinction between USX layout breakpoints and the upstream Header navigation transition.