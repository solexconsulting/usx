---
'@solexllc/usx': patch
'@solexllc/usx-react': patch
---

Move CopyToClipboard behavior into shared USX enhancement for React, Django, and
HTML. Initialize `@solexllc/usx/js/copy-to-clipboard` or use `@solexllc/usx/js/start`.
Keep Code's copy buttons and stories connected to the same enhancement.

Support network HTTP previews using the browser's copy command when the Clipboard
API is unavailable. Show copied feedback only after success, including keyboard
activation, and emit `usx:copy-error` when copying fails.
