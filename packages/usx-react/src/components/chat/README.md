# Chat integration

Chat's React and Django renderers produce markup from the same `config.json` contract. Neither renderer manages navigation, drafts, requests, or event handlers. `view`, `activeConversationId`, `activeThreadId`, `recipientId`, messages, and delivery states are supplied by the host.

The host owns the launcher's content, styling, and placement through `summaryProps`:

```jsx
<Chat
  id="support"
  side="top"
  align="end"
  summaryProps={{
    className: 'my-custom-launcher',
    ariaLabel: 'Contact support',
    children: <span>Contact support</span>,
  }}
>
  <button type="button">Request a callback</button>
</Chat>
```

```django
{% dict label='Contact support' className='my-custom-launcher' as launcherProps %}
{% chat id='support' side='top' align='end' summaryProps=launcherProps %}
  <button type="button">Request a callback</button>
{% endchat %}
```

Chat and ChatWindow pass these props to Popover's unstyled Summary without adding launcher classes. The default label is `Open chat`. Use `summaryProps.children` for rich launcher content, and `ariaLabel` for icon-only launchers. Chat's own `children` remain custom controls above the composer; ChatWindow's children remain its body. All behavior belongs to enhancement or the host.

For a viewport-corner launcher, place Chat inside a host-owned fixed container and set `side="top"` and `align="end"`. The Floating Launcher story demonstrates this layout. Chat no longer has a `floating` prop.

Chat composes the following parts. Each has its own `config.json`, markup-only React renderer, matching Django template, and stories under `Chat/<part>`. Story files live in `chat/subcomponents/<component-name>/`.

On viewports at or below 35rem, the open Chat window fills the viewport. Its header and composer stay visible while the conversation history or directory scrolls.

Conversations and threads open at the latest message. An appended message keeps the transcript at the bottom only when the reader was already there; reading older messages leaves the scroll position intact. The unread divider remains in the transcript to identify the first unread message.

| Part | Responsibility |
| --- | --- |
| ChatWindow | Popover launcher and window, heading, back/new-message controls, conversation actions, required close button, and status. Its children supply the body. |
| ChatDirectory | Resolves conversation/contact data and composes a list of ChatDirectoryItem rows. |
| ChatDirectoryItem | One conversation, contact, or selectable recipient: shared avatar, title, subtitle, preview, metadata, and optional sibling action menu. |
| ChatContext | The subject of a conversation, such as a listing or support request. |
| ChatMessage | One transcript list item: sender, avatar, bubble, delivery feedback, timestamp, thread count, and action bar. |
| ChatBubble | Formatted text or rich content, attachments, and existing reactions. |
| ChatMessageActions | Reaction picker, reply/forward controls, copy, and host-supplied message actions. |
| ChatAttachments | The `ul.usx-chat__attachments` list, composed from ChatAttachment items with optional images and download links. |
| ChatHistory | Earlier-history loading, retry, and beginning-of-history states. |
| ChatControls | Suggested questions, choices, and a slot for custom controls. |
| ChatComposer | Text area, optional formatting and attachments, emoji picker, and submission controls. |

Directory rows use Clickable as a single button or navigation link. The visible context title is plain text within the row; its URL is available from the opened conversation. Action menus are separate sibling controls. Standalone Directory navigation emits the same `usx:chat-navigate` events as the assembled Chat.

Selectable ChatDirectory rows use the Checkbox input and label classes. The label contains the participant Avatar and text; its native checkbox remains associated with the composer form.

The parent resolves the selected conversation/thread, derives message grouping, and composes these parts. Formatting text and deriving presentation from props are pure rendering operations.

A message group is a sequence of `ChatMessage` items with `message.groupPosition` set to `first`, `middle`, and `last` (or `single`). It does not introduce another DOM wrapper or live region. Chat derives positions from sender and timestamps; standalone consumers can supply them. Grouping accepts ISO calendar timestamps (`YYYY-MM-DDTHH:mm[:ss[.fraction]]`) with `Z`, an explicit `±HH:mm` offset, or no timezone. Missing timezones mean UTC. Fractions are truncated to milliseconds, and invalid dates remain ungrouped. The supplied `timeLabel` and `sentAt` datetime attribute are rendered unchanged; no display timezone conversion is performed. The Message/Grouped story demonstrates the complete sequence. Each message retains its own actions, and intermediate timestamps remain available to assistive technology.

`ChatDirectoryItem`, `ChatMessage`, `ChatHistory`, and `ChatControls` render list items and belong inside an appropriate `ol` or `ul`. `ChatAttachments` supplies the attachment list; its retained ChatAttachment item renderer is demonstrated and checked through the Attachments stories. `ChatBubble` composes this list with message content and reactions. `ChatMessageActions` stays visible when used by itself; within `ChatMessage`, it appears on hover, focus, or the existing touch enhancement. These parts keep the same CSS classes and data hooks as the assembled Chat.

Participants can provide `avatarProps.statusRingColor` and `avatarProps.statusLabel`. Directory presence maps `online` to the `success` border utility and `away` to `warning`; other Avatar status colors and labels remain host supplied.

Avatar defaults are shared by messages, directory rows, and typing indicators. Supplied `avatarProps.contentClassName` replaces the default colors, including an empty string. Chat retains Button and Link theming; composer tools wrap to the available width, while the segmented formatting bar scrolls horizontally on narrow screens. Rich-message content controls its own form layout.

Import Chat and its parts from `@solexllc/usx-react/chat`. Include the optional
`pkg:@solexllc/usx/chat` Sass entry (or `pkg:@solexllc/usx/chat/themed` for runtime
theming) alongside the core styles. See [asset setup](../../../../usx/README.md#optional-chat).

Initialize the default exports from `@solexllc/usx/js/chat` and `@solexllc/usx/js/popover` after rendering either technology. Chat is excluded from `@solexllc/usx/js` and `js/start`. Chat's enhancement handles formatting, emoji insertion, attachment selection, keyboard submission, copying, message action controls, and history request events. There is no separate composer enhancement or React-specific initialization path.

Like other USX enhancements, `init(root)` marks enhanced components with `data-enhanced="true"` and respects a host wrapper with `usx-data-enhanced="true"` to opt out of behavior.

| Event | Host responsibility |
| --- | --- |
| `usx:chat-navigate` | Render the requested view using the supplied conversation, participant, or thread ID. |
| `usx:chat-send` | Send `text` and `files`; use `clientMessageId` for correlation and render delivery state. Cancel the event to handle submission locally. |
| `usx:chat-retry` | Retry the supplied message and update its delivery state. |
| `usx:chat-forward` | Choose a recipient and prepare the forwarded draft. |
| `usx:chat-message-action` | Handle the action ID for the message. |
| `usx:chat-directory-action` | Handle `actionId` for `conversationId` and/or `participantId`, from a directory row or the open conversation header. |
| `usx:chat-recipients-change` | Observe the selected `recipientIds`; optionally update host state or recipient-dependent capabilities. |
| `usx:chat-reaction` | Update the selected reaction and count for the message. |
| `usx:chat-option` | Handle a suggestion or choice; cancel to override filling the composer. |
| `usx:chat-load-older` | Fetch history using the cursor and IDs, then restore the provided scroll anchor. |

Set `formAction` for native form submission. Supply `allowAttachments` to enable uploads; a conversation or contact may override that option. Each use of Attach files adds to the staged FileList, and each Delete control removes one file from the list and input. Supply `allowFormatting` to render the formatting panel and enable its shortcuts. Both default to false. `emojiPack` supplies the picker and shortcode choices; an empty array hides the picker.

Hosts retain drafts and pending files across view changes, handle optimistic delivery and failures, and update data after navigation or actions. The interactive React stories demonstrate one application host; that code is not shipped in the component library. `captureChatScroll` and `restoreChatScroll` from the Chat enhancement support preserving the visible message during history updates.

Conversations share one `actions` list between their directory row and their open conversation or thread header. Labels, availability, disabled states, and event payloads are identical in both locations. Standalone ChatWindow accepts this list as `conversationActions` with `conversationId`; built-in Copy conversation and the custom `actions` slot remain available alongside it.

Directory entries accept `actions: [{ id, label, disabled? }]`, just like messages. For example, a group may offer `leave-group` and `delete-history`; a message may offer `delete-message`, `recall`, or `mark-unread`. These IDs are host-defined, not commands interpreted by USX. Omit an action when unavailable, including recall outside the host's allowed time window. Omit `actions` or supply `[]` for no menu. The host handles confirmation, authorization, persistence, and any resulting markup update. Selecting an action closes its menu and restores focus before dispatching the event. Directory menus are siblings of the navigation control, so selecting an action does not open the conversation.

Message-action events include `messageId`, `actionId`, and the surrounding `conversationId` and `threadRootId` when present. Directory actions also work with standalone ChatDirectory markup after `chat.init()` and `popover.init()`; listen on the directory or an ancestor.

Use `messageActions: { sent: [...], received: [...] }` to configure consistent host actions across messages. Each side contains `{ id, label, disabled? }` objects. Resolution takes the first defined list in this order: `message.actions`, the sender's `participant.messageActions`, the selected conversation's `messageActions.sent` or `.received`, then Chat's matching default. Missing lists inherit; `[]` explicitly opts out. This also applies to thread replies. Copy, reply, forwarding, and reaction controls retain their separate options.

For example, Chat can supply Edit/Delete for sent messages and Mark unread for received messages. A customer conversation can set `messageActions.sent: []`, a bot participant can set `messageActions: []`, and one archived message can set `actions: []`. **Message Action Defaults** demonstrates these policies without repeating actions on every message. **Message Actions** demonstrates the per-message exceptions for recall eligibility.

Read state remains host-owned. The examples expose exactly one of Mark read or Mark unread, replace it after activation, and update the unread divider and inbox count. Opening an unread conversation acknowledges it in the example host; explicitly marking a message unread remains effective when returning to the inbox. Action IDs are still host-defined rather than commands interpreted by the component enhancement.

The React and Django **Attachments** examples preload real `File` objects into the composer using story-only browser code. The host calls the native form `reset()` after accepting a send, and the shared enhancement clears the staged list and send state. The **Failed Send** host retains the original files and image previews for retry, then sends the same payload instead of merely changing its status label.

History request events carry a visible-message anchor. In threads, the anchor is a reply, because the original message stays ahead of every reply page. The example adapter restores it after React commits or Django replaces the markup, including loading/error updates, so newly loaded messages appear above the current reading position. Failed automatic loads require an explicit retry.

The `contacts` view is now a new-message draft: select one or more people and write before creating a conversation. `recipientIds` supplies initial selections. ChatDirectory uses `selectable`, `recipientIds`, and `formId` to render checkboxes associated with ChatComposer's `${id}-composer` form. Their repeated `recipientIds` fields are included in native form submission and in `usx:chat-send.detail.recipientIds`. `requireRecipients` disables sending until at least one recipient is selected; drafting stays available. Selection emits `usx:chat-recipients-change` without navigating away. On send, the host decides whether to reuse an existing conversation or create a direct/group conversation. The single `recipientId` prop remains supported for existing integrations.

Stories: **Chat/Conversation Actions**, **Chat/Message Actions**, and **Chat/New Group Message** show the complete patterns. **Conversation Actions** demonstrates both the header and inbox-row action menus in one example. **Message Actions** combines reactions, editing, forwarding, threads, deleting, recalling, and marking unread; it includes a message with no replies for starting a thread and an older message for which recall is unavailable. **Formatting** demonstrates the included emoji pack in both pickers and `:name:` shortcodes; **Custom Emoji Pack** shows the host override. **Empty Inbox** demonstrates the first conversation flow. **All Unread** and **Mixed Unread** remain separate because their divider positions need to be visible when each story opens. **Directory/With Actions**, **Directory/Contact Actions**, **Directory/Recipient Picker**, **Message Actions/Host Actions**, and **Composer/Group Message** demonstrate the corresponding parts. The action stories use in-memory example hosts: leaving removes the group, deleting history empties the conversation, deleting removes a message, recalling replaces its text, and marking unread updates the divider and inbox badge. The group-message story creates or reuses an in-memory conversation after sending.

Defaults are defined in each component’s `config.json`. Empty strings, zero, false, and empty arrays are explicit values; they must not accidentally trigger a fallback intended for an omitted prop.

`pnpm test:parity` checks the renderer snapshots for every component with stories and runs shared direct-input regression tests. Chat's fixtures retain the omitted/default/empty-value, variant, nested override, thread, slot, and avatar cases. See [renderer parity testing](../../../../../scripts/tests/fixtures/renderer-parity/README.md) for coverage and how to add cases for any component.

`node packages/usx-react/test/chat-contract-check.mjs` checks that Chat's React prop names match its contracts and that its renderers contain no interaction hooks or event attributes. Parity comparisons belong to the shared command.

Django uses the existing component `get_context()` hook to prepare rendering data in `chat_component.py`, following DataTable's pattern. The shared template-tag library contains no Chat helpers. These context methods derive markup from props; host state and browser interaction remain outside the renderers.

Play tests live exclusively in the `HTML.stories.jsx` snapshot suites. React and Django stories supply examples and snapshot states without play hooks. The snapshot tests cover action defaults and per-message opt-outs, read-action commands, directory/header payloads, recipient submission, staged-file reset, failed/sent image markup, and history anchors. Host-owned persistence and navigation effects remain in the demo hosts; the snapshot tests assert the component's markup and enhancement events. The snapshot tooling tests also reject play hooks in React or Django story files.

## Story coverage

React and Django use the same example host. Changes stay in memory; **Reset example** restores the scenario. The isolated parts use that host too: their events have a surrounding conversation, history source, or composer to act on. Navigation can open the complete Chat so forwarding, recipient selection, and thread replies remain usable.

Each top-level story has a distinct purpose:

| Story | Specific coverage |
| --- | --- |
| Default | Minimal conversation, sending, reactions |
| Inbox Journey | Inbox navigation, drafts, forwarding, read-on-open |
| Empty Inbox | Creating the first conversation |
| Group Inbox | Group avatars, avatar overflow, sender previews |
| Multiple Participants | Multiple senders and simultaneous typing indicators |
| Bot Controls With History | Suggested questions and choices with mock responses |
| Attachments | Preloaded staged files; sending files without text |
| Actions And Rich Content | Custom content and header links alongside copy, mute, pin, read state, and deletion |
| Message Actions | Editing, deletion, recall, read/unread toggles, thread creation |
| Message Action Defaults | Sender defaults, contact overrides, conversation overrides, explicit per-message opt-out; navigate between coworker, customer, and bot |
| Conversation Actions | Shared directory/header actions; leave a group or delete its history from either location |
| Formatting | Optional formatting toolbar and text shortcuts |
| Custom Emoji Pack | Host-defined emoji and aliases |
| Thread History | Loading older replies while retaining the scroll position |
| Long History | Loading older conversation messages, retrying a failed load, incoming-message announcements |
| Contextual Inbox | Separate subjects with the same contact and working subject links |
| Mixed Unread | Initial unread boundary within a loaded conversation |
| Linked Navigation | Host-owned conversation routes |
| Failed Send | Text and image failures, retry, preserving image-only content |
| Floating Launcher | Host-owned placement and Popover alignment |
| Text Launcher | Custom launcher content through `summaryProps` |
| Unavailable Thread | Missing thread root and recovery through Back |
| New Group Message | Selecting multiple recipients before sending |

Customer/bot action states, an already-read inbox, unread message actions, and directory actions are reached within these journeys rather than duplicated as separate stories. The all-unread fixture was redundant with the unread-boundary example.

The subcomponent stories isolate their own contracts:

| Part | Distinct examples |
| --- | --- |
| Window | Basic shell/status; inbox New message; thread Back/actions; closed custom launcher |
| Directory | Empty state; contacts; unread inbox; conversation actions; contact actions; selectable recipients; contextual rows |
| Directory Item | Conversation metadata/actions; contact; linked contact; selected recipient; group avatars; wrapping/truncation |
| Context | Plain context; link to an actual example request |
| Message | Incoming; outgoing/read/edited; actions and replies; sending completion; failed-send retry; unknown sender; grouped bubbles; short-bubble action alignment |
| Bubble | Plain text; formatted text; attachment; toggleable reaction; custom interactive content |
| Message Actions | Built-in actions and reporting; host lifecycle actions/disabled action; reactions only |
| Attachments | Images and downloadable files within a complete list |
| Composer | Plain text; formatting; attachments/emoji; thread reply; preselected group recipients |
| Controls | Suggested questions; choices; disabled choices with an enable control; custom controls slot |
| History | Load; pending request that completes; retryable error; beginning of history |

Play tests remain on the HTML snapshots. They verify the rendered contracts and enhancement events; the React/Django stories supply the mock application responses.

Thread replies are controlled by `allowThreads` (default `false`) on Chat, with an optional override on each conversation. Enabling it provides the thread action on every delivered message, regardless of sender or existing replies. `ChatMessage` receives that resolved setting; messages no longer carry `canReplyInThread`. Thread views do not offer nested threads, and pending/failed messages must be sent successfully before they can start one.
