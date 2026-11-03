"""
Template tags for USX components.

Component templates are discovered and registered as block tags, providing
{% component_name key=value %}...{% endcomponent_name %} syntax.
"""

import math
import re
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional
from urllib.parse import urlsplit, urlunsplit

from django import template
from django.conf import settings
from django.template import Context
from django.template.base import Parser, Token, token_kwargs
from django.templatetags.static import static
from django.utils.safestring import mark_safe

from ..core.registry import _find_repo_component_default_paths
from ..core.registry import get_component

register = template.Library()


@register.simple_tag()
def asset_url(asset_path: str, static_base_url: Optional[str] = None) -> str:
    parts = urlsplit(asset_path)
    if parts.scheme:
        return asset_path
    if static_base_url:
        return f"{static_base_url.rstrip('/')}/{asset_path.lstrip('/')}"
    parts = urlsplit(asset_path.lstrip('/'))
    resolved = static(parts.path.lstrip('/')) if settings.STATIC_URL else f"/{parts.path.lstrip('/')}"
    return urlunsplit((*urlsplit(resolved)[:3], parts.query, parts.fragment))


@register.simple_tag()
def asset_srcset(srcset: str, static_base_url: Optional[str] = None) -> str:
    return re.sub(
        r'(^\s*|,\s*)(\S*[^,\s])(?=,?(?:\s|$))',
        lambda match: match[1] + asset_url(match[2], static_base_url),
        srcset,
    )


@register.simple_tag(name="dict")
def make_dict(**values: Any) -> Dict[str, Any]:
    return {name.replace("_", "-"): value for name, value in values.items()}


@register.simple_tag(name="make_list")
def make_list(*values: Any) -> list:
    return list(values)


@register.filter()
def parse_iso(value: str):
    """
    Takes a ISO-formatted string and returns a datetime object for use in a
    template.
    """
    return datetime.fromisoformat(value)


@register.filter()
def megamenu_columns(links: List[Any]) -> List[List[Any]]:
    """
    Splits megamenu links into at most four columns of roughly equal size
    (one column per three links), as the React Header does.
    """
    links = list(links or [])
    if not links:
        return []
    columns = min(4, max(1, math.ceil(len(links) / 3)))
    per_column = math.ceil(len(links) / columns)
    return [links[start:start + per_column] for start in range(0, len(links), per_column)]


@register.filter()
def default_bool(value: Any, default_value: bool) -> bool:
    """
    Returns `value` cast to bool if it is an actual Python bool,
    otherwise returns `default_value`.  This avoids the Django template
    quirk where missing context variables resolve to '' (empty string),
    which would be treated as falsy by the built-in `default` filter.

    Example usage:
        {% with expanded=defaultExpanded|default_bool:True %}
    """
    if type(value) is type(True):
        return value
    return default_value


@register.filter()
def css_style(value: Any) -> str:
    if not isinstance(value, dict):
        return value or ''
    return '; '.join(
        f'{re.sub(r"([A-Z])", lambda match: "-" + match[1].lower(), key)}: {item}'
        for key, item in value.items()
        if item is not None
    )


@register.filter()
def as_list(value: Any) -> list:
    if value is None or value == "":
        return []
    return value if isinstance(value, (list, tuple)) else [value]


@register.filter()
def file_extension(value: str) -> str:
    """
    Returns a filename's extension, uppercased (e.g. "report.pdf" -> "PDF").
    Used to show a file's type alongside its size in FileList rows.
    """
    if not value or "." not in value:
        return ""
    return value.rsplit(".", 1)[-1].upper()


@register.filter()
def file_size(value) -> str:
    """
    Formats a byte count like the React FileList ("812 B", "7 KB", "1.2 MB").
    """
    try:
        size = float(value)
    except (TypeError, ValueError):
        return ""
    if size < 1024:
        return f"{int(size)} B"
    kb = size / 1024
    if kb < 1024:
        return f"{round(kb)} KB"
    return f"{kb / 1024:.1f} MB"


class FragmentNode(template.Node):
    def __init__(self, nodelist: Any, target_var: str) -> None:
        self.nodelist = nodelist
        self.target_var = target_var

    def render(self, context: Any) -> str:
        # The fragment has already rendered and escaped its variables.
        fragment = self.nodelist.render(context) if self.nodelist else ""
        context[self.target_var] = mark_safe(fragment)
        return ""


@register.tag(name="fragment")
def fragment(parser: Parser, token: Token) -> FragmentNode:
    """Store rendered markup in a template variable."""

    error_message = (
        "The syntax for fragment is {% fragment as variable_name %}"
    )

    try:
        _tag_name, _, target_var = token.split_contents()
        nodelist = parser.parse(("endfragment",))
        parser.delete_first_token()
    except ValueError:
        if settings.DEBUG:
            raise template.TemplateSyntaxError(error_message)
        return FragmentNode(None, "")

    return FragmentNode(nodelist, target_var)


class BlockInclusionNode(template.Node):
    """Render a component template with props and block children."""

    template = ""

    def __init__(
        self,
        nodelist: Any,
        template: str,
        extra_context: Dict[str, Any],
        target_var: Optional[str] = None,
    ) -> None:
        if template:
            self.template = template
        else:
            raise NotImplementedError(
                f"Please add a `template` attribute to `{self.__class__.__name__}`."
            )

        self.nodelist = nodelist
        self.extra_context = extra_context
        self.target_var = target_var

    def get_context_data(
        self, parent_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        name = self.template.split('/')[0]
        if self.template != f'{name}/{name}.django.html':
            return parent_context
        try:
            component = get_component(name)
        except KeyError:
            return parent_context
        component.load_props()
        merged = {
            **{
                key: definition['default']
                for key, definition in component.props.items()
                if 'default' in definition
            },
            **parent_context,
        }
        return component.get_context(merged)

    def render(self, context: Any) -> str:
        # Preserve composed markup; nodelist.render has already escaped text.
        children = mark_safe(self.nodelist.render(context)) if self.nodelist else ""

        values = {
            # Resolve the tag's parameters within the current context.
            key: value.resolve(context)
            for key, value in self.extra_context.items()
        }
        base_props = values.pop("props", None) or {}
        if not children:
            if "children" in values:
                children = values["children"]
            elif "children" in base_props:
                children = base_props["children"]
            else:
                children = None

        t = context.template.engine.get_template(self.template)
        # Add the `children` variable in the rendered template's context.
        context_data = self.get_context_data({**base_props, **values, "children": children})
        output = t.render(Context(context_data, autoescape=context.autoescape))

        if self.target_var:
            context[self.target_var] = output
            return ""

        return output

    @classmethod
    def handle(cls, parser: Parser, token: Token) -> "BlockInclusionNode":
        tag_name, *remaining_bits = token.split_contents()

        nodelist = parser.parse((f"end{tag_name}",))
        parser.delete_first_token()

        extra_context = token_kwargs(remaining_bits, parser)

        # Allow component fragment to be assigned to a variable
        target_var: Optional[str] = None
        if len(remaining_bits) >= 2 and remaining_bits[-2] == "as":
            target_var = remaining_bits[-1]

        return cls(nodelist, cls.template, extra_context, target_var)


def _register_template_tags():
    bundled_templates = Path(__file__).resolve().parents[1] / "templates"
    template_roots = (
        [bundled_templates] if bundled_templates.is_dir()
        else [Path(directory) for directory in _find_repo_component_default_paths()]
    )
    for template_root in template_roots:
        for template_path in sorted(template_root.rglob("*.django.html")):
            if template_path.name.startswith('_'):
                continue
            tag_name = template_path.name.removesuffix(".django.html").replace("-", "_")
            if tag_name not in register.tags:
                block = type(tag_name, (BlockInclusionNode,), {
                    "template": template_path.relative_to(template_root).as_posix(),
                })
                register.tag(tag_name, block.handle)


_register_template_tags()
