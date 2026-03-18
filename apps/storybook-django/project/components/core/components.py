from project.components.core.component import Component
from project.components.core.registry import register


@register
class Button(Component):
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
        'type': {
            'type': 'select',
            'options': ['button', 'submit', 'reset'],
            'default': 'button'
        },
        'disabled': {
            'type': 'boolean',
            'default': False
        },
        'onClick': {
            'type': 'string',
            'default': ''
        },
        'href': {
            'type': 'string',
            'default': ''
        },
        'isExternal': {
            'type': 'boolean',
            'default': False
        },
        'big': {
            'type': 'boolean',
            'default': False
        },
        'inverse': {
            'type': 'boolean',
            'default': False
        },
        'leftIcon': {
            'type': 'object',
            'default': None
        },
        'rightIcon': {
            'type': 'object',
            'default': None
        },
        'className': {
            'type': 'string',
            'default': ''
        },
        'style': {
            'type': 'string',
            'default': ''
        }
    }


@register
class Icon(Component):
    name = 'icon'
    template = 'icon/icon.django.html'
    props = {
        'name': {
            'type': 'string',
            'default': 'accessibility_new'
        },
        'size': {
            'type': 'select',
            'options': [None, 3, 4, 5, 6, 7, 8, 9],
            'default': 2
        },
        'color': {
            'type': 'string',
            'default': ''
        },
        'staticUrlPrefix': {
            'type': 'string',
            'default': '/img/sprite.svg#'
        },
        'className': {
            'type': 'string',
            'default': ''
        },
        'style': {
            'type': 'string',
            'default': ''
        }
    }


@register
class Input(Component):
    name = 'input'
    template = 'input/input.django.html'
    props = {
        "label": {
            "type": "string",
            "default": "Label"
        },
        "id": {
            "type": "string",
            "default": None
        },
        "placeholder": {
            "type": "string",
            "default": "Placeholder text"
        },
        "error": {
            "type": "string",
            "default": None
        },
        "success": {
            "type": "string",
            "default": None
        },
        "disabled": {
            "type": "boolean",
            "default": False
        },
        "characterCount": {
            "type": "object",
            "default": None
        },
        "hint": {
            "type": "string",
            "default": None
        },
        "textArea": {
            "type": "boolean",
            "default": False
        },
        "className": {
            "type": "string",
            "default": ""
        },
        "style": {
            "type": "string",
            "default": ""
        }
    }


@register
class Alert(Component):
    name = 'alert'
    template = 'alert/alert.django.html'
    props = {
        'variant': {
            'type': 'select',
            'options': ['info', 'success', 'warning', 'error'],
            'default': 'info'
        },
        'heading': {
            'type': 'string',
            'default': 'Informative status'
        },
        'text': {
            'type': 'string',
            'default': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
        },
        'slim': {
            'type': 'boolean',
            'default': False
        },
        'noIcon': {
            'type': 'boolean',
            'default': False
        },

    }