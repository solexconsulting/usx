from project.components.core.component import Component
from project.components.core.registry import register


@register
class Button(Component):
    name = 'button'
    template = 'button/button.django.html'
    props_file = 'button/button_config.json'


@register
class Icon(Component):
    name = 'icon'
    template = 'icon/icon.django.html'
    props_file = 'icon/icon_config.json'


@register
class Input(Component):
    name = 'input'
    template = 'input/input.django.html'
    props_file = 'input/input_config.json'


@register
class Alert(Component):
    name = 'alert'
    template = 'alert/alert.django.html'
    props_file = 'alert/alert_config.json'
