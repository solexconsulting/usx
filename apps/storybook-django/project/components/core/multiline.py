"""Allow Django template tags to span lines, including USX component tags."""

import re

from django.template import base


def enable_multiline_tags():
    # Django's default tag expression does not match newlines inside {% ... %}.
    # Keep variable and comment tokenization unchanged.
    base.tag_re = re.compile(r'({%[\s\S]*?%}|{{.*?}}|{#.*?#})')
