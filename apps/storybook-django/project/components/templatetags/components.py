"""
Template tags for components.

This module provides dynamically registered template tags for all discovered components.
"""

from django import template
from django.utils.safestring import mark_safe
from ..core.render import render_component
from ..core.registry import get_all_components

register = template.Library()

# Dynamically register tags for all discovered components
components = get_all_components()
for comp_name in components:
    def create_tag(comp_name):
        def tag(**props):
            return mark_safe(render_component(comp_name, props))
        return tag

    tag_func = create_tag(comp_name)
    tag_name = comp_name.replace('-', '_')
    register.simple_tag(tag_func, name=tag_name)