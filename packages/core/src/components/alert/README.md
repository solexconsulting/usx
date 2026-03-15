# Alert

Canonical alert component for agency-ui-platform.

## HTML

```html
<div class="usa-alert usa-alert--info usx-alert usx-alert--info">
  <div class="usa-alert__body usx-alert__body">
    <h4 class="usa-alert__heading usx-alert__heading">Informative status</h4>
    <p class="usa-alert__text usx-alert__text">Alert message</p>
  </div>
</div>
```

## React

```jsx
import { Alert } from '@agency-ui-platform/core/src';

<Alert
  variant="warning"
  heading="Warning status"
  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
  slim={false}
  noIcon={false}
/>
```

## Django

```django
{% load agency_ui_tags %}
{% agency_alert "Informative status" "Lorem ipsum dolor sit amet." "info" False False %}
```

## Supported variants

- `info`
- `warning`
- `success`
- `error`
- `emergency`

Supported modifiers:

- `slim`
- `noIcon`

## Passive `usx-*` layer

`usx-alert` and all `usx-alert--*` / `usx-alert__*` classes are passive by default and only apply overrides when `--usx-*` tokens are configured.

Example token configuration:

```css
.my-theme {
  --usx-alert-border-radius: 0.5rem;
  --usx-alert-warning-border-color: #ffbe2e;
  --usx-alert-info-border-color: #005ea2;
  --usx-alert-success-border-color: #00a91c;
  --usx-alert-error-border-color: #d54309;
  --usx-alert-emergency-border-color: #b50909;
}
```
