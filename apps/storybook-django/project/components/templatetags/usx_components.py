"""
Template tags for USX components.

Component templates are discovered and registered as block tags, providing
{% component_name key=value %}...{% endcomponent_name %} syntax.
"""

import math
import re
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional
from urllib.parse import urlsplit, urlunsplit

from django import template
from django.conf import settings
from django.template import Context
from django.template.base import Parser, Token, token_kwargs
from django.templatetags.static import static
from django.utils.html import escape
from django.utils.safestring import mark_safe

from ..core.registry import _find_repo_component_default_paths
from ..core.registry import get_component

register = template.Library()


@register.filter
def chat_formatted_text(value: Any) -> str:
    """Render the Chat composer subset while escaping every host-supplied character."""
    text = str(value or '')
    inline_pattern = re.compile(r'(\*\*([^*\n]+)\*\*|\*([^*\n]+)\*|<u>([^<\n]+)</u>|~~([^~\n]+)~~|`([^`\n]+)`)')

    def inline(part: str) -> str:
        output, cursor = [], 0
        for match in inline_pattern.finditer(part):
            output.append(str(escape(part[cursor:match.start()])))
            tag, content = next((tag, match.group(index)) for index, tag in [(2, 'strong'), (3, 'em'), (4, 'u'), (5, 's'), (6, 'code')] if match.group(index) is not None)
            output.append(f'<{tag}>{escape(content)}</{tag}>')
            cursor = match.end()
        output.append(str(escape(part[cursor:])))
        return ''.join(output)

    def quote_prefix(line: str) -> tuple[int, str]:
        offset = depth = 0
        while offset < len(line) and line[offset] == '>':
            depth += 1
            offset += 1
            while offset < len(line) and line[offset] in ' \t':
                offset += 1
        return depth, line[offset:]

    def quoted_block(quoted_lines: list[str]) -> str:
        output = []
        level = 0
        for quoted_line in quoted_lines:
            depth, content = quote_prefix(quoted_line)
            while level < depth:
                output.append('<blockquote>')
                level += 1
            while level > depth:
                output.append('</blockquote>')
                level -= 1
            output.append(f'<p>{inline(content)}</p>')
        output.extend('</blockquote>' for _ in range(level))
        return ''.join(output)

    lines, blocks, index = text.split('\n'), [], 0
    while index < len(lines):
        line = lines[index]
        if not line.strip():
            index += 1
            continue
        if line.startswith('```'):
            code = []
            index += 1
            while index < len(lines) and not re.match(r'^```\s*$', lines[index]):
                code.append(lines[index])
                index += 1
            if index < len(lines):
                index += 1
            blocks.append(f'<pre><code>{escape(chr(10).join(code))}</code></pre>')
            continue
        if quote_prefix(line)[0]:
            quoted = []
            while index < len(lines) and quote_prefix(lines[index])[0]:
                quoted.append(lines[index])
                index += 1
            blocks.append(quoted_block(quoted))
            continue
        ordered = bool(re.match(r'^\d+\. ', line))
        unordered = bool(re.match(r'^[-*] ', line))
        if ordered or unordered:
            pattern = r'^\d+\. ' if ordered else r'^[-*] '
            items = []
            while index < len(lines) and re.match(pattern, lines[index]):
                items.append(f'<li>{inline(re.sub(pattern, "", lines[index]))}</li>')
                index += 1
            tag = 'ol' if ordered else 'ul'
            blocks.append(f'<{tag}>{"".join(items)}</{tag}>')
            continue
        paragraph = []
        while index < len(lines) and lines[index].strip() and not re.match(r'^(?:```|> ?|\d+\. |[-*] )', lines[index]):
            paragraph.append(inline(lines[index]))
            index += 1
        blocks.append(f'<p>{"<br>".join(paragraph)}</p>')
    return mark_safe(''.join(blocks))


@register.filter()
def get_optional(value: Any, key: str) -> Any:
    """Read an optional mapping field, preserving empty values and returning None if absent."""
    return value.get(key) if isinstance(value, dict) else None


@register.filter
def get_item(value: Any, key: str) -> Any:
    """Read a record field while keeping one table cell per configured column."""
    return value.get(key, '') if isinstance(value, dict) else ''


@register.filter
def contains(values: Any, value: Any) -> bool:
    return value in values if isinstance(values, (list, tuple, set)) else False


@register.filter()
def has_sortable(columns: Any) -> bool:
    return isinstance(columns, (list, tuple)) and any(
        isinstance(column, dict) and column.get('sortable') for column in columns
    )


@register.simple_tag()
def asset_url(asset_path: str, static_base_url: Optional[str] = None) -> str:
    parts = urlsplit(asset_path)
    if parts.scheme:
        return asset_path
    if static_base_url:
        return f"{static_base_url.rstrip('/')}/{asset_path.lstrip('/')}"
    parts = urlsplit(asset_path.lstrip('/'))
    resolved = static(parts.path.lstrip('/')) if settings.STATIC_URL else f"/{parts.path.lstrip('/')}"
    return urlunsplit((*urlsplit(resolved)[:3], parts.query, parts.fragment))


@register.simple_tag()
def asset_srcset(srcset: str, static_base_url: Optional[str] = None) -> str:
    return re.sub(
        r'(^\s*|,\s*)(\S*[^,\s])(?=,?(?:\s|$))',
        lambda match: match[1] + asset_url(match[2], static_base_url),
        srcset,
    )


@register.simple_tag(name="dict")
def make_dict(**values: Any) -> Dict[str, Any]:
    return {name.replace("_", "-"): value for name, value in values.items()}


@register.simple_tag(name="make_list")
def make_list(*values: Any) -> list:
    return list(values)


@register.filter()
def parse_iso(value: str):
    """
    Takes a ISO-formatted string and returns a datetime object for use in a
    template.
    """
    return datetime.fromisoformat(value)


@register.filter()
def chat_group_messages(messages: Any, minutes: Any = 5) -> list:
    """Add bubble positions for adjacent messages from one sender within a time window."""
    if not isinstance(messages, (list, tuple)):
        return []
    try:
        window_seconds = max(0, float(minutes)) * 60
    except (TypeError, ValueError):
        window_seconds = 300

    def adjacent(first: dict, second: dict) -> bool:
        if first.get('_usxThreadRoot'):
            return False
        if first.get('deliveryState') or second.get('deliveryState'):
            return False
        if first.get('senderId') != second.get('senderId'):
            return False
        try:
            start = datetime.fromisoformat(first['sentAt'].replace('Z', '+00:00'))
            end = datetime.fromisoformat(second['sentAt'].replace('Z', '+00:00'))
            gap = (end - start).total_seconds()
            return 0 <= gap <= window_seconds
        except (KeyError, TypeError, ValueError):
            return False

    output = []
    for index, message in enumerate(messages):
        if not isinstance(message, dict):
            continue
        before = index > 0 and isinstance(messages[index - 1], dict) and adjacent(messages[index - 1], message)
        after = index + 1 < len(messages) and isinstance(messages[index + 1], dict) and adjacent(message, messages[index + 1])
        position = 'middle' if before and after else 'last' if before else 'first' if after else 'single'
        thread_boundary = message.get('_usxThreadRoot') or (
            index > 0
            and isinstance(messages[index - 1], dict)
            and messages[index - 1].get('_usxThreadRoot')
        )
        output.append({
            **message,
            'groupPosition': position if thread_boundary or message.get('deliveryState') else message.get('groupPosition') or position,
        })
    return output


@register.filter()
def chat_summary_props(props: Any) -> dict:
    """Keep the chat launcher styled when callers customize Summary props."""
    props = props if isinstance(props, dict) else {}
    return {
        'label': 'Open chat',
        **props,
        'className': props['className'] if 'className' in props else 'usa-button usx-button usa-button--primary usx-chat__trigger',
    }


@register.filter()
def chat_initials(name: Any) -> str:
    """Use the first letters of up to two words in the fallback avatar."""
    return ''.join(word[0] for word in str(name or '').split()[:2]).upper()


@register.filter()
def avatar_group_props(value: Any) -> dict:
    """Apply AvatarGroup's aliases and inferred variant to one Avatar item."""
    props = dict(value) if isinstance(value, dict) else {}
    initials = props.pop('initials', None)
    initials_class = props.pop('initialsClassName', None)
    props['variant'] = props.get('variant') or ('image' if props.get('src') else 'initials')
    if props.get('value') is None:
        props['value'] = initials
    if props.get('contentClassName') is None:
        props['contentClassName'] = initials_class
    return props


@register.filter()
def chat_conversation(conversations: Any, conversation_id: Any) -> dict:
    """Select a conversation without requiring template authors to reshape data."""
    return next((item for item in (conversations or []) if isinstance(item, dict) and item.get('id') == conversation_id), {})


@register.filter()
def chat_thread_messages(messages: Any, root_id: Any) -> list:
    """Show a root message followed by its supplied replies."""
    if not root_id:
        return list(messages or [])
    root = next((item for item in (messages or []) if isinstance(item, dict) and item.get('id') == root_id), None)
    return [{**root, '_usxThreadRoot': True}, *(root.get('replies') or [])] if root else []


@register.simple_tag()
def chat_visible_messages(messages: Any, view: Any, root_id: Any) -> list:
    """Keep an unresolved thread from falling back to the main conversation."""
    if view == 'thread':
        return chat_thread_messages(messages, root_id) if root_id else []
    return list(messages or [])


@register.simple_tag()
def chat_older_history(default: Any, conversation: Any, messages: Any, recipient_id: Any, view: Any, root_id: Any) -> dict:
    """Resolve the paging state of the active conversation or thread."""
    if view == 'thread':
        root = next((item for item in (messages or []) if isinstance(item, dict) and item.get('id') == root_id), None)
        return (root.get('olderReplies') or {}) if root else {}
    if isinstance(conversation, dict) and conversation:
        return conversation.get('olderHistory') or {}
    return {} if recipient_id else (default or {})


@register.filter()
def chat_person(participants: Any, participant_id: Any) -> dict:
    return next((item for item in (participants or []) if isinstance(item, dict) and item.get('id') == participant_id), {})


def _chat_group_avatar(person: dict) -> dict:
    name = str(person.get('name') or person.get('id') or '')
    custom = person.get('avatarProps')
    props = {
        'variant': 'initials',
        'value': chat_initials(name),
        'alt': name,
        'shape': 'circle',
        **(custom if isinstance(custom, dict) else {}),
    }
    props['className'] = ' '.join(filter(None, ('usx-chat__avatar', props.get('className'))))
    props['contentClassName'] = 'bg-primary-light text-inverse'
    return props


@register.simple_tag()
def chat_inbox_members(conversation: Any, participants: Any, current_user_id: Any) -> dict:
    """Resolve the other members and cap the visible group avatar stack."""
    seen = set()
    people = []
    current_user_id = current_user_id or 'user'
    for participant_id in (conversation or {}).get('participantIds') or []:
        if participant_id == current_user_id or participant_id in seen:
            continue
        seen.add(participant_id)
        person = chat_person(participants, participant_id)
        people.append(person or {'id': participant_id, 'name': str(participant_id)})
    remaining = len(people) - 2 if len(people) > 3 else 0
    visible = people[:2] if remaining else people[:3]
    group_avatars = [_chat_group_avatar(person) for person in visible]
    if remaining:
        group_avatars.append({
            'variant': 'initials',
            'value': f'+{remaining}',
            'alt': f'{remaining} more participants',
            'shape': 'circle',
            'className': 'usx-chat__avatar',
            'contentClassName': 'bg-base-darker text-white',
        })
    return {
        'people': people,
        'visible': visible,
        'groupAvatarProps': group_avatars,
        'isGroup': bool((conversation or {}).get('isGroup')) or len(people) > 1,
        'overflowLabel': f'+{remaining}' if remaining else '',
        'overflowAlt': f'{remaining} more participants' if remaining else '',
    }


@register.simple_tag()
def chat_typing_avatar_props(typing_ids: Any, participants: Any) -> list:
    """Pass typing participants through AvatarGroup's avatarProps API."""
    return [_chat_group_avatar(chat_person(participants, person_id) or {'id': person_id, 'name': str(person_id)}) for person_id in (typing_ids or [])]


@register.filter()
def chat_presence_ring_color(person: Any) -> Optional[str]:
    """Map chat presence to a theme border color utility."""
    if not isinstance(person, dict):
        return None
    if person.get('presence') == 'online':
        return 'success'
    if person.get('presence') == 'away':
        return 'warning'
    avatar_props = person.get('avatarProps') or {}
    return avatar_props.get('statusRingColor') if isinstance(avatar_props, dict) else None


@register.filter()
def chat_presence_label(person: Any) -> Optional[str]:
    """Map chat presence to accessible text, preserving a host-supplied label otherwise."""
    if not isinstance(person, dict):
        return None
    if person.get('presence') == 'online':
        return 'Online'
    if person.get('presence') == 'away':
        return 'Away'
    avatar_props = person.get('avatarProps') or {}
    return avatar_props.get('statusLabel') if isinstance(avatar_props, dict) else None


@register.filter()
def chat_presence_tooltip(person: Any) -> Optional[dict]:
    """Show the resolved presence or custom status in Avatar's tooltip."""
    status_label = chat_presence_label(person)
    if status_label:
        return {'label': status_label, 'position': 'right'}
    avatar_props = person.get('avatarProps') or {} if isinstance(person, dict) else {}
    return avatar_props.get('tooltipProps') if isinstance(avatar_props, dict) else None


@register.filter()
def chat_default_view(value: Any, conversations: Any) -> str:
    return value or ('inbox' if conversations else 'conversation')


@register.filter()
def chat_reply_count(message: Any) -> int:
    return message.get('replyCount') if message.get('replyCount') is not None else len(message.get('replies') or [])


@register.simple_tag()
def chat_messages(conversation: Any, messages: Any, recipient_id: Any) -> list:
    if conversation:
        return conversation.get('messages') or []
    return [] if recipient_id else list(messages or [])


@register.simple_tag()
def chat_unread_boundary(conversation: Any, fallback: Any) -> str:
    if isinstance(conversation, dict) and conversation:
        return conversation.get('firstUnreadMessageId') or ''
    return str(fallback or '')


@register.simple_tag()
def chat_can_attach(default: Any, conversation: Any, contacts: Any, recipient_id: Any) -> bool:
    """Resolve upload capability for a selected conversation or new recipient."""
    if isinstance(conversation, dict) and conversation.get('allowAttachments') is not None:
        return bool(conversation['allowAttachments'])
    if recipient_id:
        contact = next((item for item in (contacts or []) if isinstance(item, dict) and item.get('participantId') == recipient_id), None)
        if contact and contact.get('allowAttachments') is not None:
            return bool(contact['allowAttachments'])
    return bool(default)


@register.simple_tag()
def chat_reaction_options(message: Any, default: Any, emoji_pack: Any) -> list:
    if isinstance(message, dict) and 'reactionOptions' in message:
        return list(message.get('reactionOptions') or [])[:100]
    return list(default if default is not None else emoji_pack or [])[:100]


def chat_reaction_selected(reactions: Any, label: Any) -> bool:
    return any(isinstance(item, dict) and item.get('label') == label and item.get('selected') for item in (reactions or []))


@register.simple_tag()
def chat_reaction_attributes(reaction: Any) -> dict:
    return {
        'data-usx-chat-reaction': reaction['label'],
        'aria-label': f"{reaction['label']}, {reaction['count']}",
        'aria-pressed': 'true' if reaction.get('selected') else 'false',
    }


@register.simple_tag()
def chat_reaction_menu_items(message: Any, options: Any) -> list:
    reactions = message.get('reactions') or [] if isinstance(message, dict) else []
    return [
        {
            'id': option['label'],
            'text': option['emoji'],
            'type': 'button',
            'extraAttributes': {
                'data-usx-chat-reaction': option['label'],
                'aria-label': option['label'],
                'title': f":{option['name']}:" if option.get('name') else option['label'],
                'aria-pressed': 'true' if chat_reaction_selected(reactions, option['label']) else 'false',
            },
        }
        for option in (options or [])
    ]


@register.simple_tag()
def chat_emoji_menu_items(emoji_pack: Any) -> list:
    return [
        {
            'id': option['name'],
            'text': option['emoji'],
            'type': 'button',
            'extraAttributes': {
                'aria-label': option['label'],
                'title': f":{option['name']}:",
                'data-usx-chat-emoji': option['emoji'],
                'data-usx-chat-emoji-name': option['name'],
                'data-usx-chat-emoji-aliases': ','.join(option.get('aliases') or []),
            },
        }
        for option in (emoji_pack or [])[:100]
    ]


@register.filter()
def chat_has_text(value: Any) -> bool:
    return bool(str(value or '').strip())


@register.filter()
def chat_equals(value: Any, other: Any) -> bool:
    return value == other


@register.simple_tag()
def chat_message_state(message: dict, participant: Any, is_thread: bool, allow_forward: bool) -> dict:
    """Resolve a message's presentation without adding interaction behavior."""
    unconfirmed = bool(message.get('deliveryState'))
    position = 'single' if unconfirmed else message.get('groupPosition') or 'single'
    person = participant if isinstance(participant, dict) else {}
    name = person.get('name') or message.get('senderId', '')
    interactive = message.get('layout') != 'panel' and not unconfirmed
    return {
        'senderName': name,
        'avatarProps': _chat_group_avatar({**person, 'name': name}),
        'position': position,
        'showIdentity': position in ('single', 'first'),
        'showTime': position in ('single', 'last'),
        'deliveryStatus': message.get('deliveryStatus') if message.get('deliveryStatus') is not None else 'Sending…' if message.get('deliveryState') == 'sending' else '',
        'canOpenThread': interactive and not is_thread and bool(message.get('canReplyInThread') or message.get('replyCount') or message.get('replies')),
        'canForward': interactive and bool(allow_forward),
    }


@register.simple_tag()
def chat_window_state(view: str, conversations: Any, contacts: Any, copy: bool, status: Any, conversation: Any, title: Any) -> dict:
    """Resolve shell presentation from the parent Chat's selected view."""
    conversation_title = conversation.get('title') if isinstance(conversation, dict) else None
    return {
        'showBack': view in ('thread', 'contacts') or (view == 'conversation' and bool(conversations)),
        'showNewMessage': view == 'inbox' and bool(contacts),
        'showCopyAction': bool(copy) and view in ('conversation', 'thread'),
        'conversationActions': (conversation.get('actions') or []) if isinstance(conversation, dict) and view in ('conversation', 'thread') else [],
        'status': f"In {conversation_title or title or 'Chat'}" if view == 'thread' else status if view == 'conversation' else '',
    }


@register.simple_tag()
def chat_message_menu_items(message: Any, can_copy: bool) -> list:
    items = []
    if can_copy:
        items.append({
            'text': 'Copy message',
            'icon': {'name': 'content_copy'},
            'type': 'button',
            'extraAttributes': {'data-usx-chat-copy-message': ''},
        })
    for action in (message.get('actions') or []) if isinstance(message, dict) else []:
        items.append({
            'id': action['id'],
            'text': action['label'],
            'type': 'button',
            'disabled': action.get('disabled', False),
            'extraAttributes': {'data-usx-chat-message-action': action['id']},
        })
    return items


@register.simple_tag()
def chat_directory_menu_items(actions: Any, conversation_id: Any, participant_id: Any) -> list:
    return [{
        'id': action['id'],
        'text': action['label'],
        'type': 'button',
        'disabled': action.get('disabled', False),
        'extraAttributes': {
            'data-usx-chat-directory-action': action['id'],
            **({'data-usx-chat-conversation-id': conversation_id} if conversation_id else {}),
            **({'data-usx-chat-participant-id': participant_id} if participant_id else {}),
        },
    } for action in (actions or [])]


@register.simple_tag()
def chat_conversation_menu_items(can_copy: bool, actions: Any, conversation_id: Any) -> list:
    return ([{
        'text': 'Copy conversation',
        'icon': {'name': 'content_copy'},
        'type': 'button',
        'extraAttributes': {'data-usx-chat-copy': ''},
    }] if can_copy else []) + chat_directory_menu_items(actions, conversation_id, None)


@register.simple_tag()
def chat_can_copy_message(message: Any, enabled: Any) -> bool:
    if enabled is False or not isinstance(message, dict):
        return False
    content = message.get('content')
    return bool(message.get('exportText') or message.get('text') or (content if isinstance(content, str) else '') or message.get('attachments'))


@register.filter()
def megamenu_columns(links: List[Any]) -> List[List[Any]]:
    """
    Splits megamenu links into at most four columns of roughly equal size
    (one column per three links), as the React Header does.
    """
    links = list(links or [])
    if not links:
        return []
    columns = min(4, max(1, math.ceil(len(links) / 3)))
    per_column = math.ceil(len(links) / columns)
    return [links[start:start + per_column] for start in range(0, len(links), per_column)]


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


@register.filter()
def css_style(value: Any) -> str:
    if not isinstance(value, dict):
        return value or ''
    return '; '.join(
        f'{re.sub(r"([A-Z])", lambda match: "-" + match[1].lower(), key)}: {item}'
        for key, item in value.items()
        if item is not None
    )


@register.filter()
def as_list(value: Any) -> list:
    if value is None or value == "":
        return []
    return value if isinstance(value, (list, tuple)) else [value]


@register.filter()
def file_extension(value: str) -> str:
    """
    Returns a filename's extension, uppercased (e.g. "report.pdf" -> "PDF").
    Used to show a file's type alongside its size in FileList rows.
    """
    if not value or "." not in value:
        return ""
    return value.rsplit(".", 1)[-1].upper()


@register.filter()
def file_size(value) -> str:
    """
    Formats a byte count like the React FileList ("812 B", "7 KB", "1.2 MB").
    """
    try:
        size = float(value)
    except (TypeError, ValueError):
        return ""
    if size < 1024:
        return f"{int(size)} B"
    kb = size / 1024
    if kb < 1024:
        return f"{round(kb)} KB"
    return f"{kb / 1024:.1f} MB"


class FragmentNode(template.Node):
    def __init__(self, nodelist: Any, target_var: str) -> None:
        self.nodelist = nodelist
        self.target_var = target_var

    def render(self, context: Any) -> str:
        # The fragment has already rendered and escaped its variables.
        fragment = self.nodelist.render(context) if self.nodelist else ""
        context[self.target_var] = mark_safe(fragment)
        return ""


@register.tag(name="fragment")
def fragment(parser: Parser, token: Token) -> FragmentNode:
    """Store rendered markup in a template variable."""

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
    """Render a component template with props and block children."""

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
        name = self.template.split('/')[0]
        if self.template != f'{name}/{name}.django.html':
            return parent_context
        try:
            component = get_component(name)
        except KeyError:
            return parent_context
        component.load_props()
        merged = {
            **{
                key: definition['default']
                for key, definition in component.props.items()
                if 'default' in definition
            },
            **parent_context,
        }
        return component.get_context(merged)

    def render(self, context: Any) -> str:
        # Preserve composed markup; nodelist.render has already escaped text.
        children = mark_safe(self.nodelist.render(context)) if self.nodelist else ""

        values = {
            # Resolve the tag's parameters within the current context.
            key: value.resolve(context)
            for key, value in self.extra_context.items()
        }
        base_props = values.pop("props", None) or {}
        if not children:
            if "children" in values:
                children = values["children"]
            elif "children" in base_props:
                children = base_props["children"]
            else:
                children = None

        t = context.template.engine.get_template(self.template)
        # Add the `children` variable in the rendered template's context.
        context_data = self.get_context_data({**base_props, **values, "children": children})
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


def _register_template_tags():
    bundled_templates = Path(__file__).resolve().parents[1] / "templates"
    template_roots = (
        [bundled_templates] if bundled_templates.is_dir()
        else [Path(directory) for directory in _find_repo_component_default_paths()]
    )
    for template_root in template_roots:
        for template_path in sorted(template_root.rglob("*.django.html")):
            if template_path.name.startswith('_'):
                continue
            tag_name = template_path.name.removesuffix(".django.html").replace("-", "_")
            if tag_name not in register.tags:
                block = type(tag_name, (BlockInclusionNode,), {
                    "template": template_path.relative_to(template_root).as_posix(),
                })
                register.tag(tag_name, block.handle)


_register_template_tags()
