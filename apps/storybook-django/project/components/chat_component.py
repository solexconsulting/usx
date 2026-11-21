"""Prepare Chat markup from contract props; interaction belongs to chat.mjs."""

import re
from datetime import datetime, timezone
from typing import Any

from django.utils.html import escape
from django.utils.safestring import mark_safe

from .core.component import Component


def _formatted_text(value: Any) -> str:
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
        ordered = bool(re.match(r'^[0-9]+\. ', line))
        unordered = bool(re.match(r'^[-*] ', line))
        if ordered or unordered:
            pattern = r'^[0-9]+\. ' if ordered else r'^[-*] '
            items = []
            while index < len(lines) and re.match(pattern, lines[index]):
                items.append(f'<li>{inline(re.sub(pattern, "", lines[index]))}</li>')
                index += 1
            tag = 'ol' if ordered else 'ul'
            blocks.append(f'<{tag}>{"".join(items)}</{tag}>')
            continue
        paragraph = []
        while index < len(lines) and lines[index].strip() and not re.match(r'^(?:```|> ?|[0-9]+\. |[-*] )', lines[index]):
            paragraph.append(inline(lines[index]))
            index += 1
        blocks.append(f'<p>{"<br>".join(paragraph)}</p>')
    return mark_safe(''.join(blocks))


def _grouping_time(value: Any) -> int | None:
    """UTC milliseconds for grouping only; missing zones mean UTC, not server local time."""
    match = re.fullmatch(r'([0-9]{4}-[0-9]{2}-[0-9]{2})T((?:[01][0-9]|2[0-3]):[0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]+))?)?(Z|[+-](?:[01][0-9]|2[0-3]):[0-5][0-9])?', value or '')
    if not match:
        return None
    date, time, seconds, fraction, zone = match.groups()
    try:
        instant = datetime.fromisoformat(
            f"{date}T{time}:{seconds or '00'}.{(fraction or '')[:3]:0<3}{zone if zone and zone != 'Z' else '+00:00'}"
        )
        delta = instant - datetime(1970, 1, 1, tzinfo=timezone.utc)
        return (delta.days * 86400 + delta.seconds) * 1000 + delta.microseconds // 1000
    except ValueError:
        return None


def _group_messages(messages: Any, minutes: Any = 5) -> list:
    """Add bubble positions for adjacent messages from one sender within a time window."""
    if not isinstance(messages, (list, tuple)):
        return []
    try:
        window_seconds = float(minutes) * 60
    except (TypeError, ValueError):
        window_seconds = 300

    def adjacent(first: dict, second: dict) -> bool:
        if first.get('_usxThreadRoot'):
            return False
        if first.get('deliveryState') or second.get('deliveryState'):
            return False
        if first.get('senderId') != second.get('senderId'):
            return False
        start, end = _grouping_time(first.get('sentAt')), _grouping_time(second.get('sentAt'))
        return start is not None and end is not None and 0 <= end - start <= window_seconds * 1000

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


def _initials(name: Any) -> str:
    """Use the first letters of up to two words in the fallback avatar."""
    return ''.join(word[0] for word in str(name or '').split()[:2]).upper()


def _person(participants: Any, participant_id: Any) -> dict:
    return next((item for item in (participants or []) if isinstance(item, dict) and item.get('id') == participant_id), {})


def _group_avatar(person: dict) -> dict:
    name = str(person.get('name', person.get('id', '')))
    custom = person.get('avatarProps')
    props = {
        'variant': 'initials',
        'value': _initials(name),
        'alt': name,
        'shape': 'circle',
        'contentClassName': 'bg-primary-light text-inverse',
        **(custom if isinstance(custom, dict) else {}),
    }
    props['className'] = ' '.join(filter(None, ('usx-chat__avatar', props.get('className'))))
    return props


def _avatar_props(person: Any, name: str, presence: bool = False) -> dict:
    person = person if isinstance(person, dict) else {}
    props = _group_avatar({**person, 'name': name})
    if presence:
        color, label = {
            'online': ('success', 'Online'),
            'away': ('warning', 'Away'),
        }.get(person.get('presence'), (props.get('statusRingColor'), props.get('statusLabel')))
        props.update(
            statusRingColor=color,
            statusLabel=label,
            tooltipProps={'label': label, 'position': 'right'} if label else props.get('tooltipProps'),
        )
    return props


def _inbox_members(conversation: Any, participants: Any, current_user_id: Any) -> dict:
    """Resolve the other members and cap the visible group avatar stack."""
    seen = set()
    people = []
    current_user_id = 'user' if current_user_id is None else current_user_id
    for participant_id in (conversation or {}).get('participantIds') or []:
        if participant_id == current_user_id or participant_id in seen:
            continue
        seen.add(participant_id)
        person = _person(participants, participant_id)
        people.append(person or {'id': participant_id, 'name': str(participant_id)})
    remaining = len(people) - 2 if len(people) > 3 else 0
    visible = people[:2] if remaining else people[:3]
    group_avatars = [_group_avatar(person) for person in visible]
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
        'groupAvatarProps': group_avatars,
        'isGroup': bool((conversation or {}).get('isGroup')) or len(people) > 1,
    }


def _directory_avatars(avatar_props: Any) -> list:
    return [{**avatar, 'className': ' '.join(dict.fromkeys(
        ('usx-chat__avatar ' + (avatar.get('className') or '')).split()
    ))} for avatar in (avatar_props or [])]


def _directory_items(context: dict) -> list:
    """Resolve directory data into the shared row component's props."""
    participants = context.get('participants') or []
    directory_id = context.get('id', 'chat-directory')
    if context.get('view') == 'contacts':
        items = []
        for contact in context.get('contacts') or []:
            participant_id = contact['participantId']
            person = _person(participants, participant_id)
            title = person.get('name', participant_id)
            items.append({
                'id': f'{directory_id}-recipient-{participant_id}',
                'title': title, 'subtitle': contact.get('description'),
                'avatarProps': [_avatar_props(person, title, True)],
                'href': contact.get('href'), 'conversationId': contact.get('conversationId'),
                'participantId': participant_id, 'actions': contact.get('actions', []),
                'selectable': context.get('selectable', False),
                'selected': participant_id in (context.get('recipientIds') or []),
                'formId': context.get('formId'), 'disabled': context.get('disabled', False),
            })
        return items
    items = []
    for conversation in context.get('conversations') or []:
        title = conversation['title']
        members = _inbox_members(conversation, participants, context.get('currentUserId', 'user'))
        if members['isGroup'] and conversation.get('avatarProps') is not None:
            avatars = [_avatar_props(conversation, title)]
        elif members['isGroup'] and len(members['people']) > 1:
            avatars = members['groupAvatarProps']
        elif members['isGroup']:
            avatars = [_avatar_props({'avatarProps': {
                'variant': 'icon', 'value': 'groups', 'alt': f'{title} group',
            }}, title)]
        else:
            person = next(iter(members['people']), {})
            avatars = [_avatar_props(person, person.get('name', title), True)]
        preview = conversation.get('preview')
        sender_id = conversation.get('previewSenderId')
        sender = (_person(participants, sender_id).get('name') or sender_id) if sender_id else ''
        if preview and members['isGroup'] and sender:
            preview = f'{sender}: {preview}'
        items.append({
            'id': f"{directory_id}-conversation-{conversation['id']}",
            'title': title, 'subtitle': (conversation.get('context') or {}).get('title'),
            'preview': preview, 'avatarProps': avatars, 'href': conversation.get('href'),
            'conversationId': conversation['id'], 'timeLabel': conversation.get('timeLabel'),
            'unreadCount': conversation.get('unreadCount', 0), 'actions': conversation.get('actions', []),
        })
    return items


def _reply_count(message: Any) -> int:
    return message.get('replyCount') if message.get('replyCount') is not None else len(message.get('replies') or [])


def _reaction_options(message: Any, default: Any, emoji_pack: Any) -> list:
    if isinstance(message, dict) and message.get('reactionOptions') is not None:
        return list(message.get('reactionOptions') or [])[:100]
    return list(default if default is not None else emoji_pack or [])[:100]


def _reaction_selected(reactions: Any, label: Any) -> bool:
    return any(isinstance(item, dict) and item.get('label') == label and item.get('selected') for item in (reactions or []))


def _reaction_attributes(reaction: Any) -> dict:
    return {
        'data-usx-chat-reaction': reaction['label'],
        'aria-label': f"{reaction['label']}, {reaction['count']}",
        'aria-pressed': 'true' if reaction.get('selected') else 'false',
    }


def _reaction_menu_items(message: Any, options: Any) -> list:
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
                'aria-pressed': 'true' if _reaction_selected(reactions, option['label']) else 'false',
            },
        }
        for option in (options or [])
    ]


def _emoji_menu_items(emoji_pack: Any) -> list:
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


def _message_state(message: dict, participant: Any, is_thread: bool, allow_forward: bool, allow_threads: bool = False) -> dict:
    """Resolve a message's presentation without adding interaction behavior."""
    unconfirmed = bool(message.get('deliveryState'))
    position = 'single' if unconfirmed else message.get('groupPosition') or 'single'
    person = participant if isinstance(participant, dict) else {}
    name = person.get('name') or message.get('senderId', '')
    interactive = message.get('layout') != 'panel' and not unconfirmed
    return {
        'senderName': name,
        'exportText': message.get('exportText') if message.get('exportText') is not None else message.get('text'),
        'avatarProps': _group_avatar({**person, 'name': name}),
        'position': position,
        'showIdentity': position in ('single', 'first'),
        'showTime': position in ('single', 'last'),
        'deliveryStatus': message.get('deliveryStatus') if message.get('deliveryStatus') is not None else 'Sending…' if message.get('deliveryState') == 'sending' else '',
        'canOpenThread': interactive and not is_thread and bool(allow_threads),
        'canForward': interactive and bool(allow_forward),
    }


def _message_with_actions(message: dict, current_user_id: str, participant: Any, conversation: Any, defaults: Any) -> dict:
    side = 'sent' if message.get('senderId') == current_user_id else 'received'
    participant = participant if isinstance(participant, dict) else {}
    conversation = conversation if isinstance(conversation, dict) else {}
    defaults = defaults if isinstance(defaults, dict) else {}
    candidates = [message.get('actions'), participant.get('messageActions'),
                  (conversation.get('messageActions') or {}).get(side), defaults.get(side)]
    return {**message, 'actions': next((value for value in candidates if value is not None), [])}


def _message_menu_items(message: Any, can_copy: bool) -> list:
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


def _directory_menu_items(actions: Any, conversation_id: Any, participant_id: Any) -> list:
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


def _conversation_menu_items(can_copy: bool, actions: Any, conversation_id: Any) -> list:
    return ([{
        'text': 'Copy conversation',
        'icon': {'name': 'content_copy'},
        'type': 'button',
        'extraAttributes': {'data-usx-chat-copy': ''},
    }] if can_copy else []) + _directory_menu_items(actions, conversation_id, None)


def _can_copy_message(message: Any, enabled: Any) -> bool:
    if enabled is False or not isinstance(message, dict):
        return False
    content = message.get('content')
    text = next((value for value in (message.get('exportText'), message.get('text'), content if isinstance(content, str) else '') if value is not None), '')
    return bool(text or message.get('attachments'))


class ChatComponent(Component):
    name = 'chat'
    template = 'chat/chat.django.html'
    props_file = 'chat/config.json'

    def get_context(self, props):
        conversation_id = props.get('activeConversationId')
        if conversation_id is None:
            conversation_id = props.get('defaultConversationId')
        conversations = props.get('conversations') or []
        conversation = next((item for item in conversations if item.get('id') == conversation_id), {})
        view = props.get('view')
        if view is None:
            view = props.get('defaultView')
        if view is None:
            view = 'inbox' if conversations else 'conversation'
        recipient_id, thread_id = props.get('recipientId'), props.get('activeThreadId')
        participants, contacts = props.get('participants') or [], props.get('contacts') or []
        recipient = _person(participants, recipient_id)
        messages = props.get('messages') or []
        if conversation:
            if conversation.get('messages') is not None:
                messages = conversation['messages']
        elif recipient_id:
            messages = []
        root = next((item for item in messages if item.get('id') == thread_id), {}) if thread_id else {}
        visible = messages
        older = conversation.get('olderHistory') if conversation else props.get('olderHistory') if not recipient_id else None
        if view == 'thread':
            visible = [{**root, '_usxThreadRoot': True}, *(root.get('replies') or [])] if root else []
            older = root.get('olderReplies')
        if view == 'thread':
            title = 'Thread'
        elif view == 'contacts':
            title = 'New message'
        elif conversation:
            title = conversation.get('title')
        elif recipient:
            title = recipient.get('name')
        else:
            title = props.get('title')
        contact = next((item for item in contacts if item.get('participantId') == recipient_id), {}) if recipient_id else {}
        attachments = (conversation or contact).get('allowAttachments')
        subject = conversation.get('context')
        typing_ids = props.get('typingIds') or []
        rows = []
        for message in _group_messages(visible, props.get('groupWindowMinutes', 5)):
            person = _person(participants, message.get('senderId'))
            rows.append({
                'message': _message_with_actions(message, props.get('currentUserId'), person, conversation, props.get('messageActions')),
                'participant': person,
                'own': message.get('senderId') == props.get('currentUserId'),
                'reactionOptions': _reaction_options(message, props.get('reactionOptions'), props.get('emojiPack')),
            })
        preview = root.get('text')
        if preview is None:
            preview = root.get('exportText')
        if preview is None:
            preview = 'Attachment: ' + root['attachments'][0]['name'] if root.get('attachments') else ''
        conversation_title = conversation.get('title')
        status = props.get('status') if view == 'conversation' else ''
        if view == 'thread':
            status = f"In {conversation_title if conversation_title is not None else props.get('title')}"
        return {
            **props,
            'currentView': view, 'selectedId': conversation_id, 'selectedConversation': conversation,
            'subject': subject if subject is not None else props.get('context'),
            'threadId': thread_id, 'chatTitle': title, 'visibleMessages': visible, 'messageRows': rows,
            'recipientId': recipient_id, 'formAction': props.get('formAction'), 'accept': props.get('accept'),
            'isThread': view == 'thread', 'isContacts': view == 'contacts',
            'canAttach': bool(attachments if attachments is not None else props.get('allowAttachments')),
            'canThread': conversation.get('allowThreads') if conversation.get('allowThreads') is not None else props.get('allowThreads'),
            'activeOlder': older or {},
            'unreadBoundary': conversation.get('firstUnreadMessageId') if conversation else props.get('firstUnreadMessageId'),
            'windowState': {
                'showBack': view in ('thread', 'contacts') or (view == 'conversation' and bool(conversations)),
                'showNewMessage': view == 'inbox' and bool(contacts),
                'showCopyAction': bool(props.get('showCopyAction')) and view in ('conversation', 'thread'),
                'conversationActions': (conversation.get('actions') or []) if view in ('conversation', 'thread') else [],
                'status': status,
            },
            'threadSender': _person(participants, root.get('senderId')).get('name') or root.get('senderId'),
            'threadPreview': preview, 'replyCount': _reply_count(root),
            'typingAvatarProps': [_group_avatar(_person(participants, person_id) or {'id': person_id, 'name': str(person_id)}) for person_id in typing_ids],
            'typingNames': [_person(participants, person_id).get('name') or person_id for person_id in typing_ids],
        }


class ChatWindowComponent(Component):
    name = 'chat-window'
    template = 'chat-window/chat-window.django.html'
    props_file = 'chat-window/config.json'

    def get_context(self, props):
        return {
            **props,
            'summaryProps': {'label': 'Open chat', **(props.get('summaryProps') or {})},
            'conversationMenuItems': _conversation_menu_items(
                props.get('showCopyAction'), props.get('conversationActions'), props.get('conversationId')),
        }


class ChatDirectoryComponent(Component):
    name = 'chat-directory'
    template = 'chat-directory/chat-directory.django.html'
    props_file = 'chat-directory/config.json'

    def get_context(self, props):
        return {**props, 'items': _directory_items(props)}


class ChatDirectoryItemComponent(Component):
    name = 'chat-directory-item'
    template = 'chat-directory-item/chat-directory-item.django.html'
    props_file = 'chat-directory-item/config.json'

    def get_context(self, props):
        return {
            **props,
            'avatars': _directory_avatars(props.get('avatarProps')),
            'menuItems': _directory_menu_items(
                props.get('actions'), props.get('conversationId'), props.get('participantId')),
        }


class ChatMessageComponent(Component):
    name = 'chat-message'
    template = 'chat-message/chat-message.django.html'
    props_file = 'chat-message/config.json'

    def get_context(self, props):
        message = props.get('message') or {}
        return {
            **props,
            'state': _message_state(message, props.get('participant'), props.get('isThread'),
                                    props.get('allowForward'), props.get('allowThreads')),
            'availableReactions': _reaction_options(message, props.get('reactionOptions'), props.get('reactionOptions')),
            'canCopyMessage': _can_copy_message(message, props.get('showCopyMessageAction')),
            'replyCount': _reply_count(message),
        }


class ChatMessageActionsComponent(Component):
    name = 'chat-message-actions'
    template = 'chat-message-actions/chat-message-actions.django.html'
    props_file = 'chat-message-actions/config.json'

    def get_context(self, props):
        return {
            **props,
            'reactionMenuItems': _reaction_menu_items(props, props.get('reactionOptions')),
            'messageMenuItems': _message_menu_items(props, props.get('canCopy')),
        }


class ChatBubbleComponent(Component):
    name = 'chat-bubble'
    template = 'chat-bubble/chat-bubble.django.html'
    props_file = 'chat-bubble/config.json'

    def get_context(self, props):
        return {
            **props,
            'formattedText': _formatted_text(props.get('text')) if props.get('content') is None else '',
            'reactionButtons': [
                {**reaction, 'attributes': _reaction_attributes(reaction)}
                for reaction in props.get('reactions') or []
            ],
        }


class ChatComposerComponent(Component):
    name = 'chat-composer'
    template = 'chat-composer/chat-composer.django.html'
    props_file = 'chat-composer/config.json'

    def get_context(self, props):
        return {
            **props,
            'emojiMenuItems': _emoji_menu_items(props.get('emojiPack')),
            'hasText': bool(str(props.get('value') or '').strip()),
        }
