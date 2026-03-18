"""
Template tags for components.

This module provides the 'component' template tag, which allows rendering components
in Django templates.
"""

from django import template
from django.utils.safestring import mark_safe
from ..core.render import render_component

register = template.Library()

@register.simple_tag
def component(component_name, **props):
    """
    Template tag to render a component.

    Usage:
        {% component "usx/button" label="Save" variant="secondary" %}

    Args:
        component_name (str): The name of the component.
        **props: The props to pass to the component.

    Returns:
        str: The rendered HTML, marked as safe.
    """
    html = render_component(component_name, props)
    return mark_safe(html)