"""
Template tags for USX components.

Each component is registered as a BlockInclusionNode subclass, providing
{% component_name key=value %}...{% endcomponent_name %} syntax.
"""

import hashlib
import json
import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

from django import template
from django.conf import settings
from django.template import Context
from django.template.base import Parser, Token, token_kwargs

register = template.Library()


@register.simple_tag()
def generate_uuid() -> str:
    """
    Generate a UUID string. Used to create unique HTML element id attributes
    and ensure the accordion and side navigation components don't clash with
    other instances of themselves during visual regression testing.
    """

    uuid_value = uuid.uuid4()

    return str(uuid_value)


@register.simple_tag()
def generate_hash(*args: Any) -> str:
    """
    Create a hash of all supplied arguments. Used to generate a fallback
    `content_hash` attribute for `Site Alert` components if none is provided.
    """

    # Create hash container
    dhash = hashlib.sha256()

    instance_data = json.dumps(
        args,
        sort_keys=True,
        default=str,
    )

    # Convert data to bytes so we can hash it.
    encoded_data = instance_data.encode()

    # Hash data
    dhash.update(encoded_data)
    return dhash.hexdigest()


@register.filter()
def parse_iso(value: str):
    """
    Takes a ISO-formatted string and returns a datetime object for use in a
    template.
    """
    return datetime.fromisoformat(value)


@register.filter()
def enum_to_kebab_case(value: str) -> str:
    """
    Take a string value and convert it into kebab-case to fit the css class
    modifier format according to BEM. Created to be used with GraphQL enum
    values.
    """

    # strip whitespace
    value = value.strip()

    # turn to lowercase
    value = value.lower()

    # replace underscores with dashes
    value = value.replace("_", "-")

    return value


@register.filter()
def get_cell_header(headers: List[Dict[str, str]], index: int) -> str:
    """
    Returns the column header for the given column index.
    Used for the data-label attribute of the table cells, which is shown on
    mobile devices when the table responsive method is `stacks`.
    """
    try:
        return headers[index]["text"]
    except IndexError:
        raise IndexError(
            """
Cell header not found when trying to populate the data-label attributes of the
table cells. Ensure that the number of cell headers passed matches the number
of cells in each table row."""
        )


@register.simple_tag()
def bool(*args: Any) -> bool:
    """
    Checks that all arguments are truthy.

    Example usage:
        {% bool search_url search_button_text as search_enabled %}
    """
    return all(arg for arg in args)


@register.filter()
def default_bool(value: Any, default_value: bool) -> bool:
    """
    Returns `value` cast to bool if it is an actual Python bool,
    otherwise returns `default_value`.  This avoids the Django template
    quirk where missing context variables resolve to '' (empty string),
    which would be treated as falsy by the built-in `default` filter.

    Example usage:
        {% with expanded=defaultExpanded|default_bool:True %}
    """
    if type(value) is type(True):
        return value
    return default_value


class FragmentNode(template.Node):
    def __init__(self, nodelist: Any, target_var: str) -> None:
        self.nodelist = nodelist
        self.target_var = target_var

    def render(self, context: Any) -> str:
        fragment = self.nodelist.render(context) if self.nodelist else ""
        context[self.target_var] = fragment
        return ""


@register.tag(name="fragment")
def fragment(parser: Parser, token: Token) -> FragmentNode:
    """
    Store a template fragment as a variable to be user later.

    Usage:
        {% fragment as alert_title %}
            <strong>Warning</strong> {{ errors|count }} found.
        {% endfragment %}

        {% alert label=alert_title %}
    """

    error_message = (
        "The syntax for fragment is {% fragment as variable_name %}"
    )

    try:
        _tag_name, _, target_var = token.split_contents()
        nodelist = parser.parse(("endfragment",))
        parser.delete_first_token()
    except ValueError:
        if settings.DEBUG:
            raise template.TemplateSyntaxError(error_message)
        return FragmentNode(None, "")

    return FragmentNode(nodelist, target_var)


class BlockInclusionNode(template.Node):
    """
    Create template-driven tags like Django's inclusion_tag / InclusionNode,
    but for block-level tags.

    Usage:
        {% my_tag status="test" label="Alert" %}
            Proceed with caution.
        {% endmy_tag %}

    Within `my_tag`'s template, the template fragment will be accessible as
    the {{ children }} context variable.

    The output can also be stored as a variable in the parent context:

        {% my_tag status="test" label="Alert" as my_variable %}
            Proceed with caution.
        {% endmy_tag %}

    This code is taken from https://github.com/mixxorz/slippers and simplified
    for use within the NCBI Design System.
    """

    template = ""

    def __init__(
        self,
        nodelist: Any,
        template: str,
        extra_context: Dict[str, Any],
        target_var: Optional[str] = None,
    ) -> None:
        if template:
            self.template = template
        else:
            raise NotImplementedError(
                f"Please add a `template` attribute to `{self.__class__.__name__}`."
            )

        self.nodelist = nodelist
        self.extra_context = extra_context
        self.target_var = target_var

    def get_context_data(
        self, parent_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        return parent_context

    def render(self, context: Any) -> str:
        children = self.nodelist.render(context) if self.nodelist else ""

        values = {
            # Resolve the tag's parameters within the current context.
            key: value.resolve(context)
            for key, value in self.extra_context.items()
        }

        t = context.template.engine.get_template(self.template)
        # Add the `children` variable in the rendered template's context.
        context_data = self.get_context_data({**values, "children": children})
        output = t.render(Context(context_data, autoescape=context.autoescape))

        if self.target_var:
            context[self.target_var] = output
            return ""

        return output

    @classmethod
    def handle(cls, parser: Parser, token: Token) -> "BlockInclusionNode":
        tag_name, *remaining_bits = token.split_contents()

        nodelist = parser.parse((f"end{tag_name}",))
        parser.delete_first_token()

        extra_context = token_kwargs(remaining_bits, parser)

        # Allow component fragment to be assigned to a variable
        target_var: Optional[str] = None
        if len(remaining_bits) >= 2 and remaining_bits[-2] == "as":
            target_var = remaining_bits[-1]

        return cls(nodelist, cls.template, extra_context, target_var)


# ── Component tags ────────────────────────────────────────────────────────────

class AccordionBlock(BlockInclusionNode):
    template = "accordion/accordion.django.html"

class AlertBlock(BlockInclusionNode):
    template = "alert/alert.django.html"

class BannerBlock(BlockInclusionNode):
    template = "banner/banner.django.html"

class BreadcrumbBlock(BlockInclusionNode):
    template = "breadcrumb/breadcrumb.django.html"

class ButtonBlock(BlockInclusionNode):
    template = "button/button.django.html"

class ButtonGroupBlock(BlockInclusionNode):
    template = "button-group/button-group.django.html"

class CalendarDateBlock(BlockInclusionNode):
    template = "calendar-date/calendar-date.django.html"

class CardBlock(BlockInclusionNode):
    template = "card/card.django.html"

class CardGroupBlock(BlockInclusionNode):
    template = "card-group/card-group.django.html"

class CarouselBlock(BlockInclusionNode):
    template = "carousel/carousel.django.html"

class CharacterCountBlock(BlockInclusionNode):
    template = "character-count/character-count.django.html"

class CheckboxBlock(BlockInclusionNode):
    template = "checkbox/checkbox.django.html"

class CollectionBlock(BlockInclusionNode):
    template = "collection/collection.django.html"

class ComboboxBlock(BlockInclusionNode):
    template = "combobox/combobox.django.html"

class DatePickerBlock(BlockInclusionNode):
    template = "date-picker/date-picker.django.html"

class FieldsetBlock(BlockInclusionNode):
    template = "fieldset/fieldset.django.html"

class FileInputBlock(BlockInclusionNode):
    template = "file-input/file-input.django.html"

class FooterBlock(BlockInclusionNode):
    template = "footer/footer.django.html"

class FormGroupBlock(BlockInclusionNode):
    template = "form-group/form-group.django.html"

class HeaderBlock(BlockInclusionNode):
    template = "header/header.django.html"

class HeroBlock(BlockInclusionNode):
    template = "hero/hero.django.html"

class IconBlock(BlockInclusionNode):
    template = "icon/icon.django.html"

class IdentifierBlock(BlockInclusionNode):
    template = "identifier/identifier.django.html"

class ImageBlock(BlockInclusionNode):
    template = "image/image.django.html"

class IndicatorBlock(BlockInclusionNode):
    template = "indicator/indicator.django.html"

class InPageNavBlock(BlockInclusionNode):
    template = "in-page-nav/in-page-nav.django.html"

class InputBlock(BlockInclusionNode):
    template = "input/input.django.html"

class LabelBlock(BlockInclusionNode):
    template = "label/label.django.html"

class LanguageSelectorBlock(BlockInclusionNode):
    template = "language-selector/language-selector.django.html"

class LayoutBlock(BlockInclusionNode):
    template = "layout/layout.django.html"

class LegendBlock(BlockInclusionNode):
    template = "legend/legend.django.html"

class LinkBlock(BlockInclusionNode):
    template = "link/link.django.html"

class ListBlock(BlockInclusionNode):
    template = "list/list.django.html"

class MemorableDateBlock(BlockInclusionNode):
    template = "memorable-date/memorable-date.django.html"

class ModalBlock(BlockInclusionNode):
    template = "modal/modal.django.html"

class PaginationBlock(BlockInclusionNode):
    template = "pagination/pagination.django.html"

class PaginationSummaryBlock(BlockInclusionNode):
    template = "pagination/summary/pagination-summary.django.html"

class PaginationStepOptionsBlock(BlockInclusionNode):
    template = "pagination/step-options/pagination-step-options.django.html"

class PaginationNavigationBlock(BlockInclusionNode):
    template = "pagination/navigation/pagination-navigation.django.html"

class ProcessListBlock(BlockInclusionNode):
    template = "process-list/process-list.django.html"

class ProseBlock(BlockInclusionNode):
    template = "prose/prose.django.html"

class RadioButtonsBlock(BlockInclusionNode):
    template = "radio-buttons/radio-buttons.django.html"

class RangeSliderBlock(BlockInclusionNode):
    template = "range-slider/range-slider.django.html"

class RequiredBlock(BlockInclusionNode):
    template = "required/required.django.html"

class SearchBlock(BlockInclusionNode):
    template = "search/search.django.html"

class SelectBlock(BlockInclusionNode):
    template = "select/select.django.html"

class SidenavBlock(BlockInclusionNode):
    template = "sidenav/sidenav.django.html"

class SiteAlertBlock(BlockInclusionNode):
    template = "site-alert/site-alert.django.html"

class SkipnavBlock(BlockInclusionNode):
    template = "skipnav/skipnav.django.html"

class SpinnerBlock(BlockInclusionNode):
    template = "spinner/spinner.django.html"

class StepIndicatorBlock(BlockInclusionNode):
    template = "step-indicator/step-indicator.django.html"

class SummaryBoxBlock(BlockInclusionNode):
    template = "summary-box/summary-box.django.html"

class TableBlock(BlockInclusionNode):
    template = "table/table.django.html"

class TableHeadBlock(BlockInclusionNode):
    template = "table/table-head.django.html"

class TableBodyBlock(BlockInclusionNode):
    template = "table/table-body.django.html"

class TableFootBlock(BlockInclusionNode):
    template = "table/table-foot.django.html"

class TableGroupBlock(BlockInclusionNode):
    template = "table/table-group.django.html"

class TableRowBlock(BlockInclusionNode):
    template = "table/table-row.django.html"

class TagBlock(BlockInclusionNode):
    template = "tag/tag.django.html"

class TagGroupBlock(BlockInclusionNode):
    template = "tag-group/tag-group.django.html"

class TextAreaBlock(BlockInclusionNode):
    template = "text-area/text-area.django.html"

class TimePickerBlock(BlockInclusionNode):
    template = "time-picker/time-picker.django.html"

class TooltipBlock(BlockInclusionNode):
    template = "tooltip/tooltip.django.html"


register.tag('accordion', AccordionBlock.handle)
register.tag('alert', AlertBlock.handle)
register.tag('banner', BannerBlock.handle)
register.tag('breadcrumb', BreadcrumbBlock.handle)
register.tag('button', ButtonBlock.handle)
register.tag('button_group', ButtonGroupBlock.handle)
register.tag('calendar_date', CalendarDateBlock.handle)
register.tag('card', CardBlock.handle)
register.tag('card_group', CardGroupBlock.handle)
register.tag('carousel', CarouselBlock.handle)
register.tag('character_count', CharacterCountBlock.handle)
register.tag('checkbox', CheckboxBlock.handle)
register.tag('collection', CollectionBlock.handle)
register.tag('combobox', ComboboxBlock.handle)
register.tag('date_picker', DatePickerBlock.handle)
register.tag('fieldset', FieldsetBlock.handle)
register.tag('file_input', FileInputBlock.handle)
register.tag('footer', FooterBlock.handle)
register.tag('form_group', FormGroupBlock.handle)
register.tag('header', HeaderBlock.handle)
register.tag('hero', HeroBlock.handle)
register.tag('icon', IconBlock.handle)
register.tag('identifier', IdentifierBlock.handle)
register.tag('image', ImageBlock.handle)
register.tag('indicator', IndicatorBlock.handle)
register.tag('in_page_nav', InPageNavBlock.handle)
register.tag('input', InputBlock.handle)
register.tag('label', LabelBlock.handle)
register.tag('language_selector', LanguageSelectorBlock.handle)
register.tag('layout', LayoutBlock.handle)
register.tag('legend', LegendBlock.handle)
register.tag('link', LinkBlock.handle)
register.tag('list', ListBlock.handle)
register.tag('memorable_date', MemorableDateBlock.handle)
register.tag('modal', ModalBlock.handle)
register.tag('pagination', PaginationBlock.handle)
register.tag('pagination_summary', PaginationSummaryBlock.handle)
register.tag('pagination_step_options', PaginationStepOptionsBlock.handle)
register.tag('pagination_navigation', PaginationNavigationBlock.handle)
register.tag('process_list', ProcessListBlock.handle)
register.tag('prose', ProseBlock.handle)
register.tag('radio_buttons', RadioButtonsBlock.handle)
register.tag('range_slider', RangeSliderBlock.handle)
register.tag('required', RequiredBlock.handle)
register.tag('search', SearchBlock.handle)
register.tag('select', SelectBlock.handle)
register.tag('sidenav', SidenavBlock.handle)
register.tag('site_alert', SiteAlertBlock.handle)
register.tag('skipnav', SkipnavBlock.handle)
register.tag('spinner', SpinnerBlock.handle)
register.tag('step_indicator', StepIndicatorBlock.handle)
register.tag('summary_box', SummaryBoxBlock.handle)
register.tag('table', TableBlock.handle)
register.tag('table_head', TableHeadBlock.handle)
register.tag('table_body', TableBodyBlock.handle)
register.tag('table_foot', TableFootBlock.handle)
register.tag('table_group', TableGroupBlock.handle)
register.tag('table_row', TableRowBlock.handle)
register.tag('tag', TagBlock.handle)
register.tag('tag_group', TagGroupBlock.handle)
register.tag('text_area', TextAreaBlock.handle)
register.tag('time_picker', TimePickerBlock.handle)
register.tag('tooltip', TooltipBlock.handle)
