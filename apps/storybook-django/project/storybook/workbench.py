"""Validate and render user-authored component templates for the Storybook workbench."""

import math
import re

from django.template import Context, Engine, Template
from django.template.base import Lexer, Parser, TokenType, Variable
from django.template.exceptions import TemplateSyntaxError

from project.components.core.registry import get_component
from project.components.templatetags.usx_components import BlockInclusionNode, register


NAME = re.compile(r'^[A-Za-z][A-Za-z0-9_]*$')
REFERENCE = re.compile(r'^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)*$')
CONTROL_TAGS = {'if': 'endif', 'with': 'endwith', 'fragment': 'endfragment', 'comment': 'endcomment'}
SAFE_FILTERS = {'default', 'default_if_none', 'escape', 'length', 'lower', 'safe', 'title', 'upper'}
COMPONENT_TAGS = {
    name for name, handler in register.tags.items()
    if isinstance(getattr(handler, '__self__', None), type)
    and issubclass(handler.__self__, BlockInclusionNode)
}


def check_context(value, depth=0):
    if depth > 8:
        raise ValueError('Props are nested too deeply.')
    if isinstance(value, dict):
        if len(value) > 80:
            raise ValueError('Too many props.')
        for key, item in value.items():
            if not isinstance(key, str) or len(key) > 100:
                raise ValueError('Prop names must be short strings.')
            check_context(item, depth + 1)
    elif isinstance(value, list):
        if len(value) > 80:
            raise ValueError('A prop list has too many items.')
        for item in value:
            check_context(item, depth + 1)
    elif isinstance(value, str) and len(value) > 4000:
        raise ValueError('A prop value is too long.')
    elif isinstance(value, float) and not math.isfinite(value):
        raise ValueError('Prop numbers must be finite.')


def contract_props(tag):
    try:
        component = get_component(tag.replace('_', '-'))
    except KeyError:
        return {}
    component.load_props()
    return component.props


def inspect_template(source):
    """Return input bindings after rejecting tags outside the workbench grammar."""
    engine = Engine.get_default()
    parser = Parser([], libraries=engine.template_libraries, builtins=engine.template_builtins)
    parser.add_library(register)
    bindings = {}
    stack = []
    locals_ = set()
    tag_count = 0

    def add_reference(expression, component=None, prop=None, metadata=None):
        compiled = parser.compile_filter(expression)
        if any(function.__name__ not in SAFE_FILTERS for function, _ in compiled.filters):
            raise ValueError('That template filter is not available in this workbench.')
        value = compiled.var
        if not isinstance(value, Variable) or not value.lookups:
            return
        name = value.lookups[0]
        if not isinstance(name, str) or not NAME.fullmatch(name) or name in locals_ or name in ('True', 'False', 'None'):
            return
        meta = metadata or {}
        entry = {'name': name, 'type': meta.get('type', 'string')}
        if component:
            entry.update(component=component, prop=prop)
        if prop == 'props':
            entry['type'] = 'object'
            entry['default'] = {}
            entry['fields'] = {
                key: {field: definition[field] for field in ('type', 'options', 'default') if field in definition}
                for key, definition in contract_props(component).items()
                if definition.get('type') != 'function'
            }
        else:
            for field in ('options', 'default'):
                if field in meta:
                    entry[field] = meta[field]
        if name not in bindings or (component and not bindings[name].get('component')):
            bindings[name] = entry

    for token in Lexer(source).tokenize():
        if stack and stack[-1][0] == 'endcomment':
            if token.token_type == TokenType.BLOCK and token.split_contents()[0] == 'endcomment':
                stack.pop()
            continue
        if token.token_type == TokenType.VAR:
            add_reference(token.contents)
            continue
        if token.token_type != TokenType.BLOCK:
            continue
        parts = token.split_contents()
        tag = parts[0]
        tag_count += 1
        if tag_count > 80:
            raise ValueError('The template has too many tags.')
        if tag == 'load':
            if parts not in (['load', 'usx_components'], ['load', 'components']):
                raise ValueError('Only {% load usx_components %} or {% load components %} is allowed.')
            continue
        if tag in ('else', 'elif'):
            if not stack or stack[-1][0] != 'endif':
                raise ValueError(f'{{% {tag} %}} needs a matching if block.')
            if tag == 'elif':
                if '|' in token.contents:
                    raise ValueError('Filters in if blocks are not available in this workbench.')
                for word in parts[1:]:
                    if REFERENCE.fullmatch(word):
                        add_reference(word)
            continue
        if tag.startswith('end'):
            if not stack or tag != stack[-1][0]:
                raise ValueError(f'Unexpected {{% {tag} %}}.')
            _, previous_locals = stack.pop()
            if tag == 'endwith':
                locals_ = previous_locals
            continue
        if tag not in COMPONENT_TAGS and tag not in CONTROL_TAGS:
            raise ValueError(f'{{% {tag} %}} is not available in this workbench.')
        closing = f'end{tag}' if tag in COMPONENT_TAGS else CONTROL_TAGS[tag]
        stack.append((closing, locals_.copy() if tag == 'with' else None))
        if len(stack) > 12:
            raise ValueError('The template is nested too deeply.')
        if tag in COMPONENT_TAGS:
            definitions = contract_props(tag)
            for argument in parts[1:]:
                if '=' in argument:
                    prop, expression = argument.split('=', 1)
                    if not NAME.fullmatch(prop):
                        raise ValueError(f'Invalid prop name: {prop}')
                    add_reference(expression, tag, prop, definitions.get(prop))
            if len(parts) >= 3 and parts[-2] == 'as' and NAME.fullmatch(parts[-1]):
                locals_.add(parts[-1])
        elif tag == 'if':
            if '|' in token.contents:
                raise ValueError('Filters in if blocks are not available in this workbench.')
            for word in parts[1:]:
                if REFERENCE.fullmatch(word) and word not in ('not', 'and', 'or', 'in', 'is', 'True', 'False', 'None'):
                    add_reference(word, metadata={'type': 'boolean'})
        elif tag == 'with':
            for argument in parts[1:]:
                if '=' not in argument:
                    raise ValueError('Use {% with name=value %} in this workbench.')
                name, expression = argument.split('=', 1)
                if not NAME.fullmatch(name):
                    raise ValueError(f'Invalid variable name: {name}')
                add_reference(expression)
                locals_.add(name)
        elif tag == 'fragment' and len(parts) == 3 and parts[1] == 'as':
            locals_.add(parts[2])

    if stack:
        raise ValueError(f'Missing {{% {stack[-1][0]} %}}.')
    return list(bindings.values())


def render_workbench(source, props):
    if not isinstance(source, str) or len(source) > 12000:
        raise ValueError('Template must be text under 12,000 characters.')
    if not isinstance(props, dict) or any(not NAME.fullmatch(key) for key in props):
        raise ValueError('Props must be a JSON object with simple names.')
    check_context(props)
    bindings = inspect_template(source)
    props = {**props, **{
        binding['name']: binding['default']
        for binding in bindings
        if binding['name'] not in props and 'default' in binding
    }}
    template = Template('{% load usx_components %}\n' + source)
    html = template.render(Context(props))
    if len(html) > 500000:
        raise ValueError('Rendered output is too large.')
    return {'html': html, 'bindings': bindings, 'props': props}
