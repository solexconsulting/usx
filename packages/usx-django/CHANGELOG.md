# @solexllc/usx-django

## 1.1.0

### Minor Changes

- [`2ef9d88`](https://github.com/solexconsulting/usx/commit/2ef9d885db1a00085c71fe81a98fd6ace9f64ea7) Thanks [@olsonap](https://github.com/olsonap)! - Identify components and parent-dependent subcomponents in the contract. Subcomponents declare their parents, and the generated manifest lists each parent's subcomponents separately from ordinary component composition. Pagination Navigation, Step Options, and Summary now have their own contracts, exports, and stories.

## 1.0.0

### Major Changes

- [`be053b2`](https://github.com/solexconsulting/usx/commit/be053b2204d15dc91a3488fbd44c032f04a57ee9) Thanks [@olsonap](https://github.com/olsonap)! - Use `data-usx-theme` for named theme CSS and make ThemePicker's JavaScript apply every variant's selected value to the document. React and Django render matching selection markup; the React `onChange` prop is removed. Replace the ghost-select variant with an aligned Popover and use the Swap button mode for the two-theme variant. Hide every variant until JavaScript enhancement and remove the inactive fallback select.

### Minor Changes

- [`1dc6927`](https://github.com/solexconsulting/usx/commit/1dc6927a1807b02d52ec5b1ae0922a6c60b695d2) Thanks [@olsonap](https://github.com/olsonap)! - Add tight padding to Button, with regular, big, and icon-only examples. Use it for compact actions in Modal, Popover, and Chat, and add a story for Popover's close icon.

- [`46cacb5`](https://github.com/solexconsulting/usx/commit/46cacb5da2fe528c7fe8363193f8d89c46072652) Thanks [@olsonap](https://github.com/olsonap)! - Add a Swap button mode that switches text or icons on click and exposes the native button click event. React and Django render the same accessible toggle button markup, and USX JavaScript enhances its pressed state.

### Patch Changes

- [`42ca44c`](https://github.com/solexconsulting/usx/commit/42ca44c47adc0b5a129b2c5ed9f1876a1d93c6e0) Thanks [@olsonap](https://github.com/olsonap)! - Hide pagination navigation when a bounded result has at most one page. Keep the item summary and page-size selector visible, including for zero results.

## 0.2.0

### Minor Changes

- [`0ac5232`](https://github.com/solexconsulting/usx/commit/0ac5232424c5399813065e547488640da436bd87) Thanks [@olsonap](https://github.com/olsonap)! - Automate Django releases to PyPI through the shared Changesets release PR.
