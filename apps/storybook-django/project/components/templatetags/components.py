"""
Template tags for components.

This module provides dynamically registered template tags for all discovered components.
"""

from django import template
from django.utils.safestring import mark_safe
from ..core.render import render_component
from ..core.registry import get_all_components, _autodiscover_components

# Force discovery of components at import time
_autodiscover_components()

register = template.Library()

# Dynamically register tags for all discovered components
components = get_all_components()
for comp_name in components:
    def create_block_tag(comp_name):
        def block_tag(parser, token):
            bits = token.split_contents()
            tag_name = bits[0]
            props = {}
            for bit in bits[1:]:
                if '=' in bit:
                    key, value = bit.split('=', 1)
                    value = value.strip()
                    if value.startswith('"') and value.endswith('"'):
                        value = value[1:-1]
                    elif value.startswith("'") and value.endswith("'"):
                        value = value[1:-1]
                    props[key] = value
            nodelist = parser.parse((f'end{tag_name}',))
            parser.delete_first_token()
            return ComponentNode(nodelist, props, comp_name)
        return block_tag

    block_tag_func = create_block_tag(comp_name)
    tag_name = comp_name.replace('-', '_')
    register.tags[tag_name] = block_tag_func

class ComponentNode(template.Node):
    def __init__(self, nodelist, props, comp_name):
        self.nodelist = nodelist
        self.props = props
        self.comp_name = comp_name

    def render(self, context):
        children_html = self.nodelist.render(context)
        resolved_props = {}
        for k, v in self.props.items():
            try:
                resolved_props[k] = template.Variable(v).resolve(context)
            except (template.VariableDoesNotExist, template.TemplateSyntaxError):
                # If Variable fails, try rendering as template
                try:
                    resolved_props[k] = template.Template(v).render(context).strip()
                except:
                    resolved_props[k] = v  # fallback to literal
        if children_html.strip():
            resolved_props['children'] = children_html
        html = render_component(self.comp_name, resolved_props)
        return mark_safe(html)
