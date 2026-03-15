# Input

Canonical input component for agency-ui-platform.

## HTML

```html
<label>
  <span>Label</span>
  <input class="usa-input usx-input" type="text" placeholder="Type here" />
</label>
```

## React

```jsx
import { Input } from '@agency-ui-platform/core/src';

<Input label="Label" placeholder="Type here" />
```

## Django

```django
{% load agency_ui_tags %}
{% agency_input "Label" "Type here" "text" %}
```

## Passive `usx-*` layer

`usx-input` is passive by default and only applies overrides when `--usx-*` tokens are configured.

Example token configuration:

```css
.my-theme {
  --usx-input-border-color: #2e2e2e;
  --usx-input-border-radius: 0.25rem;
  --usx-input-focus-outline: 3px solid #2491ff;
}
```
