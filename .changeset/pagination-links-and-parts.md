---
'@solexllc/usx-react': minor
'@solexllc/usx-contracts': minor
---

Support URLs and fragments through `pageUrlPrefix`, while preserving literal `#` links for consumer click handlers when it is omitted. Add `renderPart` for standalone navigation, step options, and summary composition, and `stepOptionsId` for distinct controls on pages with multiple paginations.

Pagination now renders only markup. Consumers can handle page clicks and page-size changes through the rendered `data-usx-pagination-*` attributes and supply the next `currentPage` and `pageSize`; the component has no internal state or event handlers.
