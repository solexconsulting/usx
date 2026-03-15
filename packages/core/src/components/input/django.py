from django import template
from django.utils.html import format_html, mark_safe

register = template.Library()


@register.simple_tag
def agency_input(
    label="Label",
    input_id=None,
    input_type="input",
    placeholder="Type here",
    error=None,
    success=None,
    disabled=False,
    character_count=None,
    hint=None,
    class_name=""
):
    input_id = input_id or f"input-{hash(label) % 10000}"
    hint_id = f"{input_id}-hint" if hint else None
    info_id = f"{input_id}-info" if character_count else None
    aria_described_by = " ".join(filter(None, [hint_id, info_id])) or None

    has_error = bool(error)
    has_success = bool(success)
    is_textarea = input_type == "textarea"

    form_group_classes = [
        "usa-form-group",
        "usx-form-group",
        has_error and "usa-form-group--error",
        has_error and "usx-form-group--error",
    ]
    form_group_classes = " ".join(filter(None, form_group_classes))

    label_classes = "usa-label usx-label"

    input_classes = [
        "usa-textarea" if is_textarea else "usa-input",
        "usx-textarea" if is_textarea else "usx-input",
        has_error and ("usa-textarea--error" if is_textarea else "usa-input--error"),
        has_error and ("usx-textarea--error" if is_textarea else "usx-input--error"),
        has_success and ("usa-textarea--success" if is_textarea else "usx-input--success"),
        has_success and ("usx-textarea--success" if is_textarea else "usx-input--success"),
        class_name,
    ]
    input_classes = " ".join(filter(None, input_classes))

    input_tag = "textarea" if is_textarea else "input"
    input_attrs = [
        f'id="{input_id}"',
        f'class="{input_classes}"',
        f'placeholder="{placeholder}"',
    ]
    if not is_textarea:
        input_attrs.append('type="text"')
    if disabled:
        input_attrs.append('disabled')
    if aria_described_by:
        input_attrs.append(f'aria-describedby="{aria_described_by}"')
    if character_count:
        input_attrs.append(f'maxlength="{character_count["max"]}"')
    input_html = f'<{input_tag} {" ".join(input_attrs)}></{input_tag}>'

    html_parts = [
        f'<label class="{label_classes}" for="{input_id}">{label}</label>',
    ]

    if hint:
        html_parts.append(f'<span id="{hint_id}" class="usa-hint">{hint}</span>')

    html_parts.append(input_html)

    if character_count:
        html_parts.append(f'<span id="{info_id}" class="usa-character-count__message">{character_count["message"]}</span>')

    if has_error:
        error_msg = error if isinstance(error, str) else "Error message goes here."
        html_parts.append(f'<span class="usa-error-message usx-error-message">{error_msg}</span>')

    if has_success:
        success_msg = success if isinstance(success, str) else "Success message goes here."
        html_parts.append(f'<span class="usa-success-message usx-success-message">{success_msg}</span>')

    inner_html = "".join(html_parts)

    if has_error or character_count:
        return format_html('<div class="{}">{}</div>', form_group_classes, mark_safe(inner_html))
    else:
        return mark_safe(inner_html)
