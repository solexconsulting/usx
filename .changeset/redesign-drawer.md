---
'@solexllc/usx': minor
'@solexllc/usx-react': minor
'@solexllc/usx-contracts': minor
---

Redesign the Drawer to follow the USWDS mobile navigation: square edges by default, an icon close button styled like `usa-nav__close` (first in DOM order, named by `closeLabel`), a compact size as wide as `usa-nav`, and the same 1rem padding and 0.3s slide-in. Add `rounded` to round the edge facing the page and `actionRequired` to omit the close button and ignore Escape and outside clicks. Replace the text close button. The heading receives initial focus by default; with `focusHeading` off, mark a control in the content with `autofocus`.

Remove the modeless `modal={false}` option because it relied on the browser Popover API. Drawer panels are modal dialogs. A packaged enhancement supports their native open and close commands in browsers that support `<dialog>` but not invoker commands.

The packaged enhancement also closes ordinary drawers when the backdrop is clicked; `actionRequired` drawers remain open.
