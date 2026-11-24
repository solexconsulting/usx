# USX Django

`solex-usx-django` provides USX Django templates, block tags, Python rendering,
and the canonical component contracts. Python 3.12+ and Django 5.2 through 6.x are
supported. Node.js and a monorepo checkout are not required at runtime.

## Installation

Chat templates and tags are included with the other components, but their
browser assets are opt-in. Pages using Chat must include its
[separate stylesheet and enhancement](../usx/README.md#optional-chat);
the default USX styles and `js/start` exclude Chat.

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

Accordion renders each entry in `items` with the `accordion-item` component.
The parent supplies the heading level and heading/content classes for all
items; an item without an ID uses the accordion ID and its index. The
`accordion_item` tag is also available for custom composition inside a
`usa-accordion` container:

```django
{% load usx_components %}
<div class="usa-accordion usx-accordion">
  {% accordion_item id="eligibility" title="Eligibility" %}<p>Check the requirements.</p>{% endaccordion_item %}
</div>
```

Give each item a unique ID and load or initialize the USWDS accordion
enhancement for interactive behavior. Django escapes ordinary `title` and
`content` and `children` strings; use safely constructed markup when rich
content is needed. A provided `children` value or tag body takes precedence
over `content`.

DataTable renders its headers, rows, groups, spans, and footer as HTML before
JavaScript loads. Its Django context module only plans that markup from the
component props. `@solexllc/usx/js/data-table` enhances the rendered table with
sorting, searching, pagination, selection, and disclosure behavior in the browser.
Load `@solexllc/usx/js/start` once or call `dataTable.init(root)` after
inserting table markup. The same initializer enhances React and static HTML
tables. USWDS components use their own JavaScript: `uswds.min.js` handles
markup present when it runs, while HTML inserted later needs the relevant
USWDS module's `init(root)`. See Storybook's **Documentation → USX React →
JavaScript Enhancement** guide.

Ordinary template variables are escaped. Props that intentionally accept HTML
or JavaScript handlers must contain trusted content, not unsanitized user input.

### Page heading slots

Page requires a descriptive `title`; `eyebrow` is optional and appears inside
the heading. Both accept plain text or inline markup. Plain strings are escaped
in Django and React. For rich content, pass React nodes in React and use Django
safe markup, such as a rendered template fragment or `format_html`, in Django:

```python
from django.utils.html import format_html
from usx_django import render_component

html = render_component("page", {
    "title": format_html("<em>{}</em>", "Services & support"),
    "eyebrow": format_html("<strong>{}</strong>", "Programs"),
})
```

`format_html` escapes interpolated values; never mark untrusted input as safe.
Use appropriate inline content inside the heading, not nested headings or
interactive elements.
In Django templates, quoted literals are trusted by Django; use variables for
untrusted text and `{% fragment as heading %}...{% endfragment %}` for markup
whose interpolated values should be escaped.

## Styles And Assets

This is a server-rendering package, not a frontend bundle. Supply the USWDS/USX
CSS, fonts, images, sprites, and required JavaScript separately through your
frontend build or static hosting. Configure Django's `STATIC_URL` or pass
`staticBaseUrl` to asset-aware components. Installing this package alone does
not style components or initialize interactive behaviors.

## Building And Publishing

Releases use the same **Version Packages** PR and GitHub Actions workflow as npm.
Run `pnpm changeset` and select `@solexllc/usx-django` for changes to Django
templates, component configs, the shared Python runtime, or Python packaging.
Also select `@solexllc/usx-contracts` for the updated Django version in its
manifest, plus other affected packages as usual. CSS/JS-only changes do not
require a Django changeset.

The private `package.json` exists only so Changesets can manage Django's version
and changelog; it is never published to npm. `pnpm version-packages` copies its
version into `pyproject.toml` and regenerates the shared contract manifest.
Do not bump these versions manually. Releases currently use stable
`major.minor.patch` versions.

After the release PR is merged, CI skips complete versions already on PyPI.
Otherwise it builds the distributions, tests the installed wheel, and publishes
through the PyPI publishing action, which validates metadata before uploading.
Re-run a failed workflow to retry incomplete uploads; existing files are skipped.

### One-time registry setup

Create a GitHub environment named `pypi` in `solexconsulting/usx` and restrict its
deployment branches to `main`. On PyPI, configure the project's
[Trusted Publisher](https://docs.pypi.org/trusted-publishers/adding-a-publisher/)
with these exact values:

| Field | Value |
| --- | --- |
| PyPI project | `solex-usx-django` |
| GitHub owner | `solexconsulting` |
| Repository | `usx` |
| Workflow filename | `release.yml` |
| Environment | `pypi` |

If the project does not exist yet, add a
[pending publisher](https://docs.pypi.org/trusted-publishers/creating-a-project-through-oidc/)
in your PyPI account's Publishing settings. This authorization must be configured
before the first release. No PyPI API token or password is stored in GitHub.

### Local build verification

From the repository root, in an activated Python virtual environment, remove old
artifacts from `packages/usx-django/dist/` and run:

```bash
pnpm install
python -m pip install build twine
pnpm generate:django
python -m build packages/usx-django
python -m twine check packages/usx-django/dist/*
python -m venv /tmp/usx-wheel-test
/tmp/usx-wheel-test/bin/pip install packages/usx-django/dist/*.whl
/tmp/usx-wheel-test/bin/python -I packages/usx-django/tests/test_installed.py
```

The generator validates the canonical configs, copies the shared Python runtime
from `apps/storybook-django/project/components`, and bundles every
`*.django.html` and `config.json` from `packages/usx-react/src/components`.
Generated package files are ignored by Git; edit those source locations and
regenerate before every build. The source distribution is self-contained and can
rebuild a wheel without Node.js or the original checkout. Local builds do not
publish anything.
