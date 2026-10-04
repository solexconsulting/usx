---
'@solexllc/usx-react': minor
---

Add `staticBaseUrl` to Banner, Icon, Spinner, Alert, Code, CopyToClipboard, Image, Header, and Footer. Asset paths resolve against a non-empty component override, then `window.usxBaseUrl`, then `/`; Django templates use `STATIC_URL` as their fallback. Header resolves branding images, while Footer also resolves social images. Image supports automatic resolution of responsive sources and `srcSet` candidates.

Pass asset-relative filenames instead of paths already prefixed with the asset base. Fully qualified and data URLs remain unchanged, and link destinations are unaffected. Icon's explicit `staticUrlPrefix` still overrides automatic sprite resolution.

Replace CopyToClipboard's `tooltip` and `copiedTooltip` props with `tooltipProps.label` and `tooltipProps.copiedTooltip`. Other Tooltip props pass through; omitting `tooltipProps` now renders no tooltip wrapper. Tooltip accepts rich labels and a `bodyClassName`. Code displays a left-positioned Copy/Copied tooltip, and its copy action now requires the Clipboard API rather than falling back to `execCommand`.

Button no longer adds the primary variant class when `variant` is omitted; pass `variant="primary"` explicitly. Spinner's React types now expose `screenReaderLabel` instead of the unused `omitLabel` prop and accept sizes 1 through 9. Slim Footer contact links use individual responsive columns and no longer display the contact heading.

Update Django component tag libraries to provide `asset_url`, `asset_srcset`, `dict` (renamed from `html_attrs`), and the `code` and `copy_to_clipboard` block tags. Composed block tags require `props=` mapping support, with explicit arguments taking precedence. Clipboard tooltip markup no longer introduces template whitespace that increases its height.