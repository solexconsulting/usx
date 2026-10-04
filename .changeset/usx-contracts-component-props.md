---
'@solexllc/usx-contracts': minor
---

Add `staticBaseUrl` to the Banner, Icon, Spinner, Alert, Code, CopyToClipboard, Image, Header, and Footer contracts. Remove Icon's hardcoded `staticUrlPrefix` default so automatic asset resolution can apply. Describe Banner flag paths and Image responsive sources and `srcSet` candidates relative to the selected asset base.

Replace CopyToClipboard's `tooltip` and `copiedTooltip` fields with `tooltipProps`, referencing the Tooltip contract with an additional `copiedTooltip` field. Migrate stored values to `tooltipProps.label` and `tooltipProps.copiedTooltip`. Change Tooltip's `label` to a content slot and add `bodyClassName`.