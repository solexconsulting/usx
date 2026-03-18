"""
Button component.

This component renders a button with optional variant and disabled state.
"""

from ...core.component import Component
from ...core.registry import register

@register
class Button2(Component):
    name = 'button'
    template = 'button/button.django.html'
    props = {
        'label': {
            'type': 'string',
            'default': 'Button'
        },
        'variant': {
            'type': 'select',
            'options': ['primary', 'secondary', 'accent-cool', 'accent-warm', 'base', 'outline'],
            'default': 'primary'
        },
        'disabled': {
            'type': 'boolean',
            'default': False
        }
    }