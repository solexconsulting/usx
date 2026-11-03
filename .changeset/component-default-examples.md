---
'@solexllc/usx-react': patch
'@solexllc/usx-contracts': minor
---

Provide representative default props in each component config and expose them in generated contracts. Storybook Default stories and the Django template workbench use these shared examples. Also fix controlled React Text Area usage by omitting `defaultValue` when `value` is supplied.
