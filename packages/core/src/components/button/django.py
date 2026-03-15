from django import template
from django.utils.html import format_html

register = template.Library()


@register.simple_tag
def agency_button(label="Button", variant="", big=False, inverse=False, unstyled=False, button_type="button"):
    variant_classes = {
        'secondary': 'usa-button--secondary usx-button--secondary',
        'accent-cool': 'usa-button--accent-cool usx-button--accent-cool',
        'accent-warm': 'usa-button--accent-warm usx-button--accent-warm',
        'base': 'usa-button--base usx-button--base',
        'outline': 'usa-button--outline usx-button--outline',
    }

    variant_class = variant_classes.get(variant, '')
    modifier_classes = [
        big and 'usa-button--big usx-button--big',
        inverse and 'usa-button--inverse usx-button--inverse',
        unstyled and 'usa-button--unstyled usx-button--unstyled',
    ]
    modifier_class = ' '.join(cls for cls in modifier_classes if cls)

    classes = ' '.join(cls for cls in ['usa-button', 'usx-button', variant_class, modifier_class] if cls)
    return format_html(
        '<button type="{}" class="{}">{}</button>',
        button_type,
        classes,
        label,
    )
