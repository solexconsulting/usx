---
'@solexllc/usx': minor
'@solexllc/usx-react': minor
'@solexllc/usx-contracts': minor
---

Add a semantic Tree driven by recursive `items` data. Each item sets an explicit `type`: `link` uses Link, `details` uses Details with `summaryProps` and either nested `items` or paragraph `text`, and `text` renders a plain label. Nested branches need no authored list markup or JavaScript.

Add raw and padded variants. Raw preserves Details styling; padded adds row spacing, alignment, and hover surfaces for links and summaries.
