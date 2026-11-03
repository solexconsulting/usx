Django server for Storybook's `Django/*` stories. It renders the canonical
templates in `packages/usx-react/src/components/`.

## Run

```bash
cd apps/storybook-django
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver 0.0.0.0:9090
```

Storybook connects to `http://<current-hostname>:9090` by default. Set
`window.USX_DJANGO_URL` to use another address.

## Stories

Paired stories share React `storyDefs`. Django story children can mix text, HTML,
and nested components. The same Django template supplies the preview and
**Show code**, using the current Storybook controls.

Use **Documentation / USX Django / Workbench** in Storybook to choose a
component or write a template, edit props, and preview it in isolation. Component
tags may span lines, as they do in the Django stories' **Show code** blocks.

For use outside Storybook, see the [Django package guide](../../packages/usx-django/README.md).
After changing templates or shared component code, run `pnpm generate:django`
before building that package.
