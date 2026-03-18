"""
Component registry for managing registered components.

This module provides a decorator to register components and a registry to look them up.
The registry maps component names to their instances.
"""

from .component import Component

# Global registry dictionary: component_name -> component_instance
_registry = {}

def register(component_class):
    """
    Decorator to register a component class.

    This decorator instantiates the component class and registers it in the global registry
    using the component's name as the key.

    Args:
        component_class (type): The component class to register (must inherit from Component).

    Returns:
        type: The original component class, unchanged.

    Raises:
        ValueError: If the component class does not have a 'name' attribute.
    """
    if not hasattr(component_class, 'name') or not component_class.name:
        raise ValueError(f"Component class {component_class.__name__} must have a 'name' attribute.")

    instance = component_class()
    _registry[instance.name] = instance
    return component_class

def get_component(name):
    """
    Retrieve a registered component by name.

    Args:
        name (str): The name of the component.

    Returns:
        Component: The component instance.

    Raises:
        KeyError: If the component is not registered.
    """
    if name not in _registry:
        raise KeyError(f"Component '{name}' is not registered.")
    return _registry[name]

def get_all_components():
    """
    Get all registered components.

    Returns:
        dict: A dictionary of component_name -> component_instance.
    """
    return _registry.copy()