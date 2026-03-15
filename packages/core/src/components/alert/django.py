from django import template
from django.utils.html import format_html

register = template.Library()


@register.simple_tag
def agency_alert(
    heading="Informative status",
    message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    variant="info",
    slim=False,
    no_icon=False,
):
    normalized_variant = variant if variant in {"info", "warning", "success", "error", "emergency"} else "info"
    variant_class = f"usa-alert--{normalized_variant} usx-alert--{normalized_variant}"
    slim_class = "usa-alert--slim usx-alert--slim" if slim else ""
    no_icon_class = "usa-alert--no-icon usx-alert--no-icon" if no_icon else ""
    role_attr = ' role="alert"' if normalized_variant in {"error", "emergency"} else ""
    heading_markup = "" if slim else format_html('<h4 class="usa-alert__heading usx-alert__heading">{}</h4>', heading)

    return format_html(
        '<div class="usa-alert usx-alert {} {} {}"{}><div class="usa-alert__body usx-alert__body">{}<p class="usa-alert__text usx-alert__text">{}</p></div></div>',
        variant_class,
        slim_class,
        no_icon_class,
        format_html(role_attr),
        heading_markup,
        message,
    )
