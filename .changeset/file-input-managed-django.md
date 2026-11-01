---
'@solexllc/usx': minor
'@solexllc/usx-react': patch
'@solexllc/usx-contracts': minor
---

Add `fileInput.on(root)` for managed file lists in server-rendered markup. The handler adds and deletes individual files and emits `usx:files-change` with current browser files. React keeps its existing state handler. Django File Input now renders managed and preloaded lists inside the form group.
