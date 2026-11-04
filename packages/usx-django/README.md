# USX Django

`solex-usx-django` provides USX Django templates, block tags, Python rendering,
and the canonical component contracts. Python 3.12+ and Django 5.2 through 6.x are
supported. Node.js and a monorepo checkout are not required at runtime.

## Installation

```bash
pip install solex-usx-django
```

Add `"usx_django"` to `INSTALLED_APPS` and enable `APP_DIRS: True` in the
`DjangoTemplates` backend. No custom template directories or
`USX_COMPONENT_PATHS` are needed. Existing `{% load components %}` templates
still work; use `usx_components` in new templates.

```django
{% load usx_components %}
{% label
  htmlFor="email"
  required=True
%}Email address{% endlabel %}
```

Component tags may span lines; the installed USX app enables this syntax.

Tag names use underscores for hyphenated component names, for example
`{% form_group %}...{% endform_group %}`. Every component tag requires its
closing tag. Keyword arguments are props; `props=my_dict` forwards a dictionary,
with explicit keywords taking precedence. `as variable` captures the output.

Clickable's React composition helpers have matching Django block tags:

```django
{% clickable href="/services" %}
  {% clickable_bg_color_change %}Featured{% endclickable_bg_color_change %}
  {% clickable_link as="strong" colorChange=True %}Explore services{% endclickable_link %}
  {% clickable_color_change as="em" %}Today{% endclickable_color_change %}
{% endclickable %}
```

The part tags default to `span`; `as` selects the element.

```python
from usx_django import get_contracts, render_component

html = render_component("label", {"htmlFor": "email", "label": "Email address"})
label_contract = get_contracts()["components"]["label"]
```

The Python renderer applies contract defaults and rejects unknown props. Block
tags also apply defaults, but do not validate props.

DataTable renders its headers, rows, groups, spans, and footer as HTML before
JavaScript loads. Its Django context module only plans that markup from the
component props. `@solexllc/usx/js/data-table` enhances the rendered table with
sorting, searching, pagination, selection, and disclosure behavior in the browser.

Ordinary template variables are escaped. Props that intentionally accept HTML
or JavaScript handlers must contain trusted content, not unsanitized user input.

## Styles And Assets

This is a server-rendering package, not a frontend bundle. Supply the USWDS/USX
CSS, fonts, images, sprites, and required JavaScript separately through your
frontend build or static hosting. Configure Django's `STATIC_URL` or pass
`staticBaseUrl` to asset-aware components. Installing this package alone does
not style components or initialize interactive behaviors.

## Building And Publishing

From the repository root, in an activated Python virtual environment:

```bash
pnpm install
python -m pip install build twine
pnpm generate:django
python -m build packages/usx-django
python -m twine check packages/usx-django/dist/*
```

The generator validates the canonical configs, copies the shared Python runtime
from `apps/storybook-django/project/components`, and bundles every
`*.django.html` and `config.json` from `packages/usx-react/src/components`.
Generated package files are ignored by Git;
edit those source locations and regenerate before every build. The source
distribution is self-contained and can rebuild a wheel without Node.js or
the original checkout.

Test the wheel in a separate environment before upload:

```bash
python -m venv /tmp/usx-wheel-test
/tmp/usx-wheel-test/bin/pip install packages/usx-django/dist/*.whl
/tmp/usx-wheel-test/bin/python -I packages/usx-django/tests/test_installed.py
```

Set a new version in `pyproject.toml` for each release and remove old artifacts
from the package's `dist/` before rebuilding. Python releases are independent
of npm Changesets. With your own PyPI credentials or trusted publishing setup:

```bash
python -m twine upload --repository testpypi packages/usx-django/dist/*
python -m twine upload packages/usx-django/dist/*
```

Confirm ownership/availability of `solex-usx-django` on PyPI before the first
upload. Never commit registry credentials. Building does not publish anything.
