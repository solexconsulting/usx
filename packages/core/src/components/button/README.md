# Button

Canonical button component for agency-ui-platform.

## HTML

```html
<button class="usa-button usx-button" type="button">Button</button>
```

## React

```jsx
import { Button } from '@agency-ui-platform/core/src';

<Button label="Button" variant="primary" />
```

## Django

```django
{% load agency_ui_tags %}
{% agency_button "Button" "primary" "button" %}
```

## Passive `usx-*` layer

`usx-button` and `usx-button--secondary` are passive by default and only apply overrides when `--usx-*` tokens are provided.

Example token configuration:

```css
.my-theme {
	--usx-button-background-color: #005ea2;
	--usx-button-text-color: #ffffff;
	--usx-button-border-radius: 0.5rem;
}
```
