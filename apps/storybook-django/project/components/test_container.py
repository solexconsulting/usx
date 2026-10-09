from copy import deepcopy
from xml.etree.ElementTree import fromstring

from django.template import Context, Template
from django.test import SimpleTestCase

from .core.registry import get_component
from .core.render import render_component


class ContainerTests(SimpleTestCase):
    def test_contract_layout_options_render_at_every_breakpoint(self):
        props = get_component("container").load_props()
        breakpoints = tuple(props["responsive"]["properties"])
        self.assertEqual(breakpoints, ("mobileLg", "tablet", "desktop"))
        breakpoint_prefixes = {"mobileLg": "mobile-lg", "tablet": "tablet", "desktop": "desktop"}
        class_prefixes = {
            "column": "grid-col-", "offset": "grid-offset-",
            "gutters": "grid-gap-", "alignSelf": "usx-container--align-self-",
        }
        for name, definition in props.items():
            if "options" not in definition or name in ("element", "gridContainer"):
                continue
            for value in definition["options"]:
                with self.subTest(prop=name, value=value):
                    # Publishing a CMS option must make it usable at every width.
                    root = fromstring(render_component("container", {
                        name: value,
                        "responsive": {breakpoint: {name: value} for breakpoint in reversed(breakpoints)},
                    }))
                    expected_class = class_prefixes.get(name, f"usx-container--{name}-") + value
                    self.assertEqual(root.attrib["class"].split(), [
                        "usx-container", expected_class,
                        *(f"{breakpoint_prefixes[breakpoint]}:{expected_class}" for breakpoint in breakpoints),
                    ])

    def test_contract_grid_container_sizes_render(self):
        props = get_component("container").load_props()
        for value in props["gridContainer"]["options"]:
            with self.subTest(value=value):
                root = fromstring(render_component("container", {"gridContainer": value}))
                expected_class = "grid-container" if value == "default" else f"grid-container-{value}"
                self.assertEqual(root.attrib["class"].split(), ["usx-container", expected_class])

    def test_default_container_has_no_layout_classes(self):
        root = fromstring(render_component("container", {"content": "<p>Content</p>"}))
        self.assertEqual(root.tag, "div")
        self.assertEqual(root.attrib, {"class": "usx-container"})
        self.assertEqual(root.find("p").text, "Content")

    def test_responsive_layout_uses_fixed_mobile_first_order(self):
        props = {
            "display": "flex",
            "direction": "column",
            "gap": "2",
            "responsive": {
                "desktop": {"column": "4", "alignSelf": "end", "direction": "row"},
                "tablet": {"column": "6", "gap": "4", "direction": "row"},
                "mobileLg": {"column": "12"},
            },
            "className": "custom-container",
        }
        original = deepcopy(props)
        root = fromstring(render_component("container", props))
        self.assertEqual(root.attrib["class"].split(), [
            "usx-container", "usx-container--display-flex",
            "usx-container--direction-column", "usx-container--gap-2",
            "mobile-lg:grid-col-12", "tablet:usx-container--direction-row",
            "tablet:usx-container--gap-4", "tablet:grid-col-6",
            "desktop:usx-container--direction-row", "desktop:usx-container--align-self-end",
            "desktop:grid-col-4", "custom-container",
        ])
        self.assertEqual(props, original)

    def test_grid_classes_can_be_combined_and_reset_at_breakpoints(self):
        root = fromstring(render_component("container", {
            "gridContainer": "widescreen", "gridRow": True,
            "column": "12", "offset": "2", "gutters": "2",
            "responsive": {"tablet": {"column": "fill", "offset": "none", "gutters": "0"}},
        }))
        self.assertEqual(root.attrib["class"].split(), [
            "usx-container", "grid-container-widescreen", "grid-row",
            "grid-col-12", "grid-offset-2", "grid-gap-2",
            "tablet:grid-col-fill", "tablet:grid-offset-none", "tablet:grid-gap-0",
        ])

    def test_invalid_cms_values_are_ignored(self):
        props = {
            "element": "script", "gridContainer": ["default"], "gridRow": "true",
            "display": {"value": "flex"}, "direction": "diagonal", "column": True,
            "offset": "13", "gap": "100", "flex": "2", "gutters": "default",
            "responsive": {
                "phone": {"display": "none"},
                "mobileLg": ["flex"],
                "tablet": {"display": "flex injected", "gridRow": True, "className": "injected", "gutters": "default"},
                "desktop": {"element": "section", "responsive": {"tablet": {"display": "flex"}}},
            },
        }
        root = fromstring(render_component("container", props))
        self.assertEqual(root.tag, "div")
        self.assertEqual(root.attrib, {"class": "usx-container"})

    def test_unknown_responsive_keys_cannot_override_dictionary_lookup(self):
        for value in (None, "x", ["x"], {"unexpected": "value"}, [["mobileLg", {"display": "none"}]]):
            with self.subTest(value=value):
                root = fromstring(render_component("container", {
                    "responsive": {
                        "items": value, "keys": value, "values": value,
                        "mobileLg": {"direction": "row"}, "tablet": {"display": "flex"},
                    },
                }))
                self.assertEqual(root.attrib["class"].split(), [
                    "usx-container", "mobile-lg:usx-container--direction-row",
                    "tablet:usx-container--display-flex",
                ])

    def test_empty_and_non_string_layout_values_are_ignored(self):
        props = get_component("container").load_props()
        layout_names = [
            name for name, definition in props.items()
            if "options" in definition and name not in ("element", "gridContainer")
        ]
        for value in (None, "", False, True, 0, 1, [], {}):
            with self.subTest(value=value):
                layout = dict.fromkeys(layout_names, value)
                root = fromstring(render_component("container", {
                    **layout,
                    "responsive": {breakpoint: layout for breakpoint in props["responsive"]["properties"]},
                }))
                self.assertEqual(root.attrib, {"class": "usx-container"})

    def test_semantic_elements_and_attributes_are_escaped(self):
        for element in get_component("container").load_props()["element"]["options"]:
            with self.subTest(element=element):
                props = {
                    "element": element, "id": 'layout" onclick="bad()',
                    "ariaLabel": "Content & information", "ariaLabelledby": "heading",
                    "role": "group", "className": 'custom" data-injected="yes',
                }
                root = fromstring(render_component("container", props))
                self.assertEqual(root.tag, element)
                self.assertEqual(root.attrib, {
                    "class": f'usx-container {props["className"]}',
                    "id": props["id"], "aria-label": props["ariaLabel"],
                    "aria-labelledby": "heading", "role": "group",
                })

    def test_empty_string_attributes_are_preserved(self):
        root = fromstring(render_component("container", {
            "id": "", "role": "", "ariaLabel": "", "ariaLabelledby": "",
        }))
        self.assertEqual(root.attrib, {
            "class": "usx-container", "id": "", "role": "",
            "aria-label": "", "aria-labelledby": "",
        })

    def test_non_string_attributes_and_class_names_are_ignored(self):
        for value in (None, False, True, 0, 1, [], {}):
            with self.subTest(value=value):
                root = fromstring(render_component("container", {
                    "id": value, "role": value, "ariaLabel": value,
                    "ariaLabelledby": value, "className": value,
                }))
                self.assertEqual(root.attrib, {"class": "usx-container"})

    def test_children_use_nullish_fallback(self):
        for children, expected in ((None, "Fallback"), ("", None), (0, "0"), (False, None), ("Children", "Children")):
            with self.subTest(children=children):
                root = fromstring(render_component("container", {"children": children, "content": "Fallback"}))
                self.assertEqual(root.text, expected)

    def test_direct_include_and_nested_block_tags(self):
        props = {"display": "flex", "responsive": {"tablet": {"direction": "row"}}}
        html = Template('{% include "container/container.django.html" %}').render(Context(props))
        self.assertEqual(fromstring(html).attrib["class"].split(), [
            "usx-container", "usx-container--display-flex", "tablet:usx-container--direction-row",
        ])

        html = Template('''{% load components %}
            {% container props=layout element="section" %}{% container element="article" column="6" %}<p>{{ text }}</p>{% endcontainer %}{% endcontainer %}
        ''').render(Context({"layout": props, "text": "<Child>"}))
        root = fromstring(html)
        self.assertEqual(root.tag, "section")
        self.assertIn("tablet:usx-container--direction-row", root.attrib["class"])
        child = root.find("article")
        self.assertEqual(child.attrib["class"], "usx-container grid-col-6")
        self.assertEqual(child.find("p").text, "<Child>")
