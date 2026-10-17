---
'@solexllc/usx': minor
'@solexllc/usx-react': minor
'@solexllc/usx-contracts': minor
---

Add an experimental positioned Popover built on native `details` and `summary`, with themed panels and CSS placement on four sides and three alignments.

Authors own the summary and content appearance. Popover adds no summary classes or styles and has no navigation-specific CSS. Use existing USWDS/USX components and utilities for panel contents.

Use `popover.on/off` for outside dismissal, Escape with focus return, and nested Popover cleanup. Native `name` groups control exclusive opening. A composition story pairs Popover with Tree on small screens and a list with nested Popovers on larger screens. Include React, Django, and HTML stories for evaluation; do not use in production yet.
