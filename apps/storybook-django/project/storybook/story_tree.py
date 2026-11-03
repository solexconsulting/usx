"""Compile a Storybook render tree into the Django template shown in its docs."""

import html
import json
import re

from django.template import Context, Template


class StoryTemplate:
    def __init__(self):
        self.context = {}
        self.count = 0
        self.comments = []

    def variable(self, value, hint='value', document=False):
        name = f"{re.sub(r'[^a-zA-Z0-9_]', '_', hint).lower()}_{self.count}"
        self.count += 1
        self.context[name] = value
        if document:
            serialized = json.dumps(value, ensure_ascii=False).replace('#}', '#\\u007d')
            self.comments.append(f'{{# {name} = {serialized} #}}')
        return name

    def literal(self, value, hint):
        if value is None:
            return 'None'
        if value is True:
            return 'True'
        if value is False:
            return 'False'
        if isinstance(value, (int, float)):
            return str(value)
        if isinstance(value, str):
            if not any(token in value for token in ('\\', '"', '\n', '{%', '{{', '{#')):
                return f'"{value}"'
            if not any(token in value for token in ('\\', "'", '\n', '{%', '{{', '{#')):
                return f"'{value}'"
        return self.variable(value, hint, document=True)

    @staticmethod
    def nested(content):
        return '\n' + '\n'.join('  ' + line for line in content.splitlines()) + '\n'

    def content(self, node):
        rendered = self.compile(node)
        if isinstance(node, (list, dict)) and rendered and not (
            isinstance(node, dict) and node.get('__usxNode') in ('text', 'html')
        ):
            return self.nested(rendered)
        return rendered

    @staticmethod
    def has_node(value):
        if isinstance(value, dict):
            return '__usxNode' in value or any(StoryTemplate.has_node(item) for item in value.values())
        if isinstance(value, list):
            return any(StoryTemplate.has_node(item) for item in value)
        return False

    def expression(self, value, hint):
        if not self.has_node(value):
            return '', self.literal(value, hint)
        target = self.variable(None, hint)
        if isinstance(value, dict) and '__usxNode' in value:
            return f'{{% fragment as {target} %}}{self.content(value)}{{% endfragment %}}\n', target
        if isinstance(value, list):
            compiled = [self.expression(item, f'{hint}_item') for item in value]
            prefix = ''.join(item[0] for item in compiled)
            args = ' '.join(item[1] for item in compiled)
            return prefix + f'{{% make_list {args} as {target} %}}\n', target
        compiled = [(key, *self.expression(item, f'{hint}_{key}')) for key, item in value.items()]
        prefix = ''.join(item[1] for item in compiled)
        args = ' '.join(f'{key}={expression}' for key, _, expression in compiled)
        return prefix + f'{{% dict {args} as {target} %}}\n', target

    def compile(self, node):
        if isinstance(node, list):
            pieces = []
            previous_text = False
            for part in node:
                if part is None:
                    continue
                current_text = isinstance(part, str) or (
                    isinstance(part, dict) and part.get('__usxNode') == 'text'
                )
                if pieces and not (previous_text and current_text):
                    pieces.append('\n')
                pieces.append(self.compile(part))
                previous_text = current_text
            return ''.join(pieces)
        if isinstance(node, str):
            if '{%' not in node and '{{' not in node and '{#' not in node:
                return node
            label = f'raw_{self.count}'
            self.count += 1
            return f'{{% verbatim {label} %}}{node}{{% endverbatim {label} %}}'
        if node is None or node is False:
            return ''
        if not isinstance(node, dict) or '__usxNode' not in node:
            raise ValueError('Invalid story render node')

        kind = node['__usxNode']
        if kind == 'text':
            return self.compile(html.escape(str(node['value'])))
        if kind == 'html':
            return self.compile(node['value'])
        if kind == 'element':
            return self.compile(node['open']) + self.content(node.get('children')) + self.compile(node['close'])
        if kind == 'fragment':
            return self.compile(node.get('children'))
        if kind != 'component':
            raise ValueError(f'Unknown story render node: {kind}')

        name = node['name']
        if not isinstance(name, str) or not name.replace('_', '').isalnum():
            raise ValueError(f'Invalid component name: {name}')
        props = dict(node.get('props') or {})
        children = node.get('children', props.pop('children', None))
        if children == '':
            props['children'] = ''
        if name == 'carousel' and isinstance(children, list):
            props['children'] = children
            children = None
        compiled = [(key, *self.expression(value, f'{name}_{key}')) for key, value in props.items()]
        prefix = ''.join(item[1] for item in compiled)
        arguments = '\n'.join(f'  {key}={expression}' for key, _, expression in compiled)
        content = self.content(children)
        opening = f'{{% {name}\n{arguments}\n%}}' if arguments else f'{{% {name} %}}'
        return prefix + opening + content + f'{{% end{name} %}}'


def render_story_tree(tree):
    builder = StoryTemplate()
    body = builder.compile(tree)
    source = '{% load usx_components %}\n' + '\n'.join(builder.comments + [body])
    return Template(source).render(Context(builder.context)), source
