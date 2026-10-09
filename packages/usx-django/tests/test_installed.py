import unittest
from importlib.resources import files

import django
from django.conf import settings

settings.configure(
    INSTALLED_APPS=["usx_django"],
    TEMPLATES=[{
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "APP_DIRS": True,
        "DIRS": [],
    }],
    STATIC_URL="/static/",
    SECRET_KEY="package-test-only",
)
django.setup()

from django.template import Context, Template
from django.template.loader import get_template
from django.test import SimpleTestCase

from usx_django import get_contracts, render_component
from usx_django.core.registry import get_all_components
from usx_django.templatetags.components import register


class InstalledPackageTests(SimpleTestCase):
    def test_contracts_and_registry(self):
        manifest = get_contracts()
        self.assertEqual(manifest["library"], "usx")
        self.assertEqual(manifest["schemaVersion"], 1)
        self.assertIn("label", manifest["components"])
        self.assertEqual(set(manifest["components"]), set(get_all_components()))
        for name, component in get_all_components().items():
            with self.subTest(component=name):
                self.assertEqual(component.load_props(), manifest["components"][name]["props"])
                self.assertTrue(name.replace("-", "_") in register.tags, f"Missing tag: {name}")

    def test_all_templates_compile(self):
        template_root = files("usx_django").joinpath("templates")
        for template_path in template_root.rglob("*.django.html"):
            with self.subTest(template=str(template_path)):
                get_template(template_path.relative_to(template_root).as_posix())

    def test_label_block_and_nested_required(self):
        html = Template(
            '{% load components %}{% label htmlFor="email" required=True %}'
            '{{ text }}{% endlabel %}'
        ).render(Context({"text": "Email <address>"}))
        self.assertIn('for="email"', html)
        self.assertIn("Email &lt;address&gt;", html)
        self.assertInHTML('<abbr title="Required" class="usx-required">*</abbr>', html)

    def test_props_and_assignment(self):
        props = {"htmlFor": "original", "className": "custom"}
        html = Template(
            '{% load components %}{% label props=props htmlFor="override" as result %}'
            '<strong>{{ text }}</strong>{% endlabel %}{{ result }}'
        ).render(Context({"props": props, "text": "<Email>"}))
        self.assertIn('for="override"', html)
        self.assertIn("custom", html)
        self.assertInHTML("<strong>&lt;Email&gt;</strong>", html)
        self.assertEqual(props["htmlFor"], "original")

    def test_render_api_and_static_url(self):
        self.assertIn("Hello", render_component("label", {"label": "Hello"}))
        self.assertIn('/static/img/sprite.svg#check', render_component("icon", {"name": "check"}))
        with self.assertRaises(ValueError):
            render_component("label", {"unknownProp": True})
        with self.assertRaises(KeyError):
            render_component("unknown-component", {})

    def test_table_helper_is_bundled(self):
        html = render_component("table", {
            "columns": [{"key": "name", "header": "Name"}],
            "data": [{"name": "Ada"}],
        })
        self.assertIn("Ada", html)
        self.assertIn("Name", html)

    def test_container_renders_without_component_specific_helpers(self):
        self.assertFalse(files("usx_django").joinpath("templatetags", "container.py").is_file())
        props = {
            "display": "flex", "direction": "column", "ariaLabel": "Application actions",
            "responsive": {"mobileLg": {"gap": "2"}, "tablet": {"direction": "row"}},
        }
        html = render_component("container", {**props, "content": "<p>Grouped content</p>"})
        self.assertIn("usx-container--direction-column", html)
        self.assertIn("mobile-lg:usx-container--gap-2", html)
        self.assertIn("tablet:usx-container--direction-row", html)
        self.assertIn('aria-label="Application actions"', html)
        self.assertInHTML("<p>Grouped content</p>", html)
        html = Template(
            '{% load components %}{% container props=props element="section" %}'
            '<p>{{ text }}</p>{% endcontainer %}'
        ).render(Context({"props": props, "text": "<Child>"}))
        self.assertIn('<section class="usx-container ', html)
        self.assertIn("tablet:usx-container--direction-row", html)
        self.assertInHTML("<p>&lt;Child&gt;</p>", html)


if __name__ == "__main__":
    unittest.main()
