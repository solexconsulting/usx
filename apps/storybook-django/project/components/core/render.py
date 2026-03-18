"""
Render function for components.

This module provides the render_component function, which looks up a component,
merges default props, validates prop names, and renders the template.
"""

from django.template.loader import render_to_string
from .registry import get_component

def render_component(name, props):
    """
    Render a component by name with given props.

    This function performs the following steps:
    1. Look up the component in the registry.
    2. Merge default props with provided props.
    3. Validate that all provided props are defined in the component's props.
    4. Prepare the context using the component's get_context method.
    5. Render the template using Django's render_to_string.

    Args:
        name (str): The name of the component.
        props (dict): The props to pass to the component.

    Returns:
        str: The rendered HTML.

    Raises:
        KeyError: If the component is not registered.
        ValueError: If an invalid prop is provided.
    """
    component = get_component(name)

    # Merge default props (but only if not provided)
    merged_props = {}
    for prop_name, prop_def in component.props.items():
        if prop_name in props:
            merged_props[prop_name] = props[prop_name]
        elif 'default' in prop_def:
            merged_props[prop_name] = prop_def['default']

    # Validate prop names
    allowed_props = set(component.props.keys())
    provided_props = set(props.keys())
    invalid_props = provided_props - allowed_props
    if invalid_props:
        raise ValueError(f"Invalid props for component '{name}': {invalid_props}")

    # Get context
    context = component.get_context(**merged_props)

    # Render template
    return render_to_string(component.template, context)