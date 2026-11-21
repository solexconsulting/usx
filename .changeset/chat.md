---
'@solexllc/usx-react': minor
'@solexllc/usx-contracts': minor
'@solexllc/usx': minor
---

Add Chat and its composable React and Django parts, including directories, threads,
message actions, attachments, and a composer with optional formatting and emoji.
Renderers provide markup; shared enhancement handles interactions, while hosts own
conversation state, sending, permissions, and persistence. Include component stories,
HTML snapshot play tests, and renderer parity fixtures.

Chat is opt-in: import `@solexllc/usx-react/chat`, include `pkg:@solexllc/usx/chat`
(or `/chat/themed`) styles, and initialize `@solexllc/usx/js/chat` alongside Popover.
Core imports and automatic startup exclude Chat. Hosts control the launcher through
`summaryProps` and their own layout.
