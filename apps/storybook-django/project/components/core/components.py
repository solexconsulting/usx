from project.components.core.component import Component
from project.components.core.registry import register


@register
class Button(Component):
    name = 'button'
    template = 'button/button.django.html'
    props_file = 'button/config.json'


@register
class Icon(Component):
    name = 'icon'
    template = 'icon/icon.django.html'
    props_file = 'icon/config.json'


@register
class Input(Component):
    name = 'input'
    template = 'input/input.django.html'
    props_file = 'input/config.json'


@register
class Alert(Component):
    name = 'alert'
    template = 'alert/alert.django.html'
    props_file = 'alert/config.json'


@register
class Prose(Component):
    name = 'prose'
    template = 'prose/prose.django.html'
    props_file = 'prose/config.json'


@register
class Accordion(Component):
    name = 'accordion'
    template = 'accordion/accordion.django.html'
    props_file = 'accordion/config.json'


@register
class MyWidget(Component):
    name = 'my-widget'
    template = 'my-widget/my-widget.django.html'
    props_file = 'my-widget/config.json'