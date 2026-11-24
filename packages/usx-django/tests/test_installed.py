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
from django.utils.html import format_html

from usx_django import get_contracts, render_component
from usx_django.core.registry import get_all_components
from usx_django.templatetags.usx_components import register


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
            '{% load usx_components %}{% label htmlFor="email" required=True %}'
            '{{ text }}{% endlabel %}'
        ).render(Context({"text": "Email <address>"}))
        self.assertIn('for="email"', html)
        self.assertIn("Email &lt;address&gt;", html)
        self.assertInHTML('<abbr title="Required" class="usx-required">*</abbr>', html)

    def test_legacy_load_name(self):
        html = Template('{% load components %}{% label %}Legacy{% endlabel %}').render(Context({}))
        self.assertIn('Legacy', html)

    def test_multiline_component_tag(self):
        html = Template(
            '{% load usx_components %}{% label\n  htmlFor="email"\n  required=True\n%}'
            'Email address{% endlabel %}'
        ).render(Context({}))
        self.assertIn('for="email"', html)
        self.assertIn('Email address', html)

    def test_props_and_assignment(self):
        props = {"htmlFor": "original", "className": "custom"}
        html = Template(
            '{% load usx_components %}{% label props=props htmlFor="override" as result %}'
            '<strong>{{ text }}</strong>{% endlabel %}{{ result }}'
        ).render(Context({"props": props, "text": "<Email>"}))
        self.assertIn('for="override"', html)
        self.assertIn("custom", html)
        self.assertInHTML("<strong>&lt;Email&gt;</strong>", html)
        self.assertEqual(props["htmlFor"], "original")

    def test_clickable_part_tags_are_bundled(self):
        for name in ("clickable", "clickable_link", "clickable_color_change", "clickable_bg_color_change"):
            self.assertIn(name, register.tags)
        html = Template(
            '{% load usx_components %}{% clickable href="/services" %}'
            '{% clickable_link as="strong" colorChange=True %}Services{% endclickable_link %}'
            '{% endclickable %}'
        ).render(Context({}))
        self.assertInHTML('<strong class="usx-clickable__link usx-clickable__color-on-hover">Services</strong>', html)

    def test_render_api_and_static_url(self):
        self.assertIn("Hello", render_component("label", {"label": "Hello"}))
        self.assertIn('/static/img/sprite.svg#check', render_component("icon", {"name": "check"}))
        with self.assertRaises(ValueError):
            render_component("label", {"unknownProp": True})
        with self.assertRaises(KeyError):
            render_component("unknown-component", {})

    def test_accordion_item_contract_and_renderers(self):
        manifest = get_contracts()["components"]
        self.assertEqual(manifest["accordion"]["props"]["items"]["items"]["component"], "accordion-item")
        self.assertIn("accordion_item", register.tags)
        html = render_component("accordion-item", {
            "id": "item", "title": "Title", "content": "Content", "expanded": True, "headingAs": "h2",
        })
        self.assertIn('<h2 id="item-heading"', html)
        self.assertIn('aria-controls="item-content"', html)
        self.assertIn('aria-expanded="true"', html)
        self.assertNotIn("hidden", html)
        html = render_component("accordion", {
            "id": "group", "headingAs": "h4", "headingClassName": "group-heading",
            "contentClassName": "group-content",
            "items": [{"title": "Title", "content": "Content", "headingAs": "h2",
                       "headingClassName": "item-heading", "contentClassName": "item-content"}],
        })
        self.assertIn('<h4 id="group-0-heading" class="usa-accordion__heading group-heading">', html)
        self.assertIn('id="group-0-content"', html)
        self.assertIn("usa-accordion__content usa-prose group-content", html)
        self.assertNotIn("item-heading", html)
        self.assertNotIn("item-content", html)
        html = Template(
            '{% load usx_components %}{% accordion_item id="tag-item" title="Title" content=content %}'
            '{% endaccordion_item %}'
        ).render(Context({"content": "<unsafe> & text"}))
        self.assertIn('id="tag-item-heading"', html)
        self.assertIn("&lt;unsafe&gt; &amp; text", html)
        html = Template(
            '{% load usx_components %}{% accordion_item id="tag-item" title="Title" content="Fallback" %}'
            '<p>{{ value }}</p>{% endaccordion_item %}'
        ).render(Context({"value": "<safe> & text"}))
        self.assertInHTML("<p>&lt;safe&gt; &amp; text</p>", html)
        self.assertNotIn("Fallback", html)
        html = render_component("accordion", {
            "id": "group", "items": [{"title": "Title", "content": "Fallback", "children": "Child"}],
        })
        self.assertIn("Child", html)
        self.assertNotIn("Fallback", html)

    def test_page_title_and_eyebrow(self):
        html = render_component("page", {
            "title": "Services", "titleId": "page-title", "eyebrow": "Programs", "content": "Content",
        })
        self.assertIn('aria-labelledby="page-title"', html)
        self.assertInHTML(
            '<h1 id="page-title" class="usx-page__title"><span class="usx-eyebrow">Programs</span>Services</h1>',
            html,
        )
        for title in (None, "", False, True):
            html = render_component("page", {
                "title": title, "titleId": "missing-title", "eyebrow": "Orphan", "content": "Content",
            })
            self.assertNotIn("<h1", html)
            self.assertNotIn("Orphan", html)
            self.assertNotIn("aria-labelledby", html)
            self.assertIn("Content", html)
        self.assertIn('aria-labelledby="external"', render_component(
            "page", {"title": "Services", "titleId": "page-title", "ariaLabelledby": "external"},
        ))
        self.assertIn('aria-labelledby="external"', render_component("page", {"ariaLabelledby": "external"}))
        html = render_component("page", {"title": 0, "titleId": "count"})
        self.assertIn('aria-labelledby="count"', html)
        self.assertInHTML('<h1 id="count" class="usx-page__title">0</h1>', html)

    def test_page_heading_slots_escape_text_and_render_safe_fragments(self):
        html = render_component("page", {
            "title": "<em>Services</em> & more", "eyebrow": "<b>Category</b>",
        })
        self.assertIn("&lt;em&gt;Services&lt;/em&gt; &amp; more", html)
        self.assertIn("&lt;b&gt;Category&lt;/b&gt;", html)
        html = render_component("page", {
            "title": format_html("<em>{}</em>", "Services & support"),
            "eyebrow": format_html("<strong>{}</strong>", "Category <one>"),
        })
        self.assertInHTML(
            '<h1 class="usx-page__title"><span class="usx-eyebrow">'
            '<strong>Category &lt;one&gt;</strong></span><em>Services &amp; support</em></h1>',
            html,
        )

    def test_modal_renders_complex_children_without_paragraph_nesting(self):
        html = render_component("modal", {
            "id": "modal", "heading": "Review", "description": "Fallback",
            "children": "<p>Details</p><ul><li>Item</li></ul>",
        })
        self.assertIn('aria-describedby="modal-description"', html)
        self.assertInHTML(
            '<div class="usa-prose usx-prose" id="modal-description">'
            '<p>Details</p><ul><li>Item</li></ul></div>', html,
        )
        self.assertNotIn("Fallback", html)
        for props in ({}, {"children": None}):
            html = render_component("modal", {"id": "modal", "description": "Simple description", **props})
            self.assertIn('aria-describedby="modal-description"', html)
            self.assertInHTML(
                '<div class="usa-prose usx-prose"><p id="modal-description">Simple description</p></div>',
                html,
            )
        for children in ("", False, True, 0):
            html = render_component("modal", {"id": "modal", "description": "Fallback", "children": children})
            self.assertNotIn("Fallback", html)
            self.assertIn('<div class="usa-prose usx-prose" id="modal-description">', html)
            if children is True:
                self.assertNotIn(">True", html)
            if children is not False and children is not True and children == 0:
                self.assertInHTML('<div class="usa-prose usx-prose" id="modal-description">0</div>', html)
        html = Template(
            '{% load usx_components %}{% modal id="modal" description="Fallback" %}'
            '<p>Details</p><ul><li>{{ item }}</li></ul>{% endmodal %}'
        ).render(Context({"item": "Item & more"}))
        self.assertInHTML('<ul><li>Item &amp; more</li></ul>', html)
        self.assertNotIn("Fallback", html)
        html = Template(
            '{% load usx_components %}{% modal id="modal" description="Simple description" %}{% endmodal %}'
        ).render(Context({}))
        self.assertInHTML('<p id="modal-description">Simple description</p>', html)

    def test_table_and_data_table_render(self):
        html = render_component("table", {
            "columns": [{"key": "name", "header": "Name"}],
            "data": [{"name": "Ada"}],
        })
        self.assertIn("Ada", html)
        self.assertIn("Name", html)
        advanced = render_component("data-table", {"columns": [{"key": "name", "header": "Name", "sortable": True}], "data": [{"id": 1, "name": "Ada"}], "searchable": True})
        self.assertIn("Ada", advanced)
        self.assertIn("data-usx-data-table", advanced)

    def test_data_table_content_is_complete_without_browser_javascript(self):
        html = render_component("data-table", {
            "id": "server-table",
            "columns": [
                {"key": "service", "header": "Service", "primary": True},
                {"key": "days", "header": "Schedule", "columns": [
                    {"key": "monday", "header": "Monday"},
                    {"key": "tuesday", "header": "Tuesday"},
                ]},
            ],
            "data": [
                {"id": 1, "service": "Permit desk", "monday": "Closed for training",
                 "cellProps": {"monday": {"colSpan": 2}}},
                {"id": 2, "service": "Records desk", "monday": "9–5", "tuesday": "9–5"},
            ],
        })
        self.assertIn("Permit desk", html)
        self.assertIn("Records desk", html)
        self.assertIn("Closed for training", html)
        self.assertIn('colspan="2"', html)
        self.assertIn('data-column-key="tuesday"', html)
        self.assertNotIn("data-column-key=\"tuesday\"", html.split("Permit desk", 1)[1].split("Records desk", 1)[0])

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
            '{% load usx_components %}{% container props=props as="section" %}'
            '<p>{{ text }}</p>{% endcontainer %}'
        ).render(Context({"props": props, "text": "<Child>"}))
        self.assertIn('<section class="usx-container ', html)
        self.assertIn("tablet:usx-container--direction-row", html)
        self.assertInHTML("<p>&lt;Child&gt;</p>", html)


if __name__ == "__main__":
    unittest.main()
