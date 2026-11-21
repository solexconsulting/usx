import React from 'react';
import Link from '../../../usx-react/src/components/link/Link';
import Prose from '../../../usx-react/src/components/prose/Prose';

export default {
  title: 'Documentation/Research/Chat',
  tags: ['autodocs'],
};

export const CaseStudy = {
  render: () => (
    <Prose as="article">
      <h1>Chat: design decisions</h1>
      <p>
        Chat provides composable markup for conversations between people, groups, and bots. React
        and Django share a contract and produce equivalent HTML. The Chat enhancement handles
        browser interactions; the host supplies state, transport, permissions, and policy.
      </p>
      <h2>Composition and accessibility</h2>
      <ul>
        <li>
          Use Popover for the window and existing Button, Avatar, Callout, and FileList components
          for their respective jobs.
        </li>
        <li>
          Keep sender names, message order, and thread context in the markup. Use a named log for
          the transcript and status announcements for operations.
        </li>
        <li>
          Expose message actions through focusable controls as well as pointer interactions. Closing
          an action menu returns focus to its trigger.
        </li>
        <li>
          Use theme role tokens, visible focus, and touch targets that remain usable on small
          screens.
        </li>
      </ul>
      <h2>State belongs to the host</h2>
      <p>
        Sent/received action defaults can be overridden by conversation, sender, or message. USX
        emits action identifiers; the host decides what deletion, recall, or read status means.
        Choosing recipients does not create a conversation until the host accepts the send. Failed
        delivery retains the content and provides a retry event.
      </p>
      <p>
        History requests include a visible-message anchor. The host restores it after prepending
        messages so the reader can continue from the same position. Automatic loading retains an
        explicit load/retry control. Page size and retention limits remain application decisions.
      </p>
      <h2>Evidence used</h2>
      <ul>
        <li>
          <Link href="https://www.w3.org/TR/2023/REC-WCAG22-20231005/">WCAG 2.2</Link>:
          accessibility requirements, including contrast, focus, and target size.
        </li>
        <li>
          <Link href="https://www.w3.org/TR/2017/REC-wai-aria-1.1-20171214/">WAI-ARIA</Link>:
          semantics for logs, status messages, and interactive controls.
        </li>
        <li>
          <Link href="https://www.nngroup.com/articles/chat-ux/">
            The User Experience of Customer-Service Chat
          </Link>
          : chat entry, participant identification, context, and transcript access.
        </li>
        <li>
          <Link href="https://onlinelibrary.wiley.com/doi/10.1155/2018/2056290">
            Identifying Usability Issues in Instant Messaging Apps
          </Link>
          : starting conversations, distinguishing groups, and adapting to mobile layouts.
        </li>
        <li>
          <Link href="https://elaragon.net/wp-content/uploads/2017/03/thread-not-to-thread.pdf">
            To Thread or Not to Thread
          </Link>
          : context for treating replies as a separate conversation view.
        </li>
        <li>
          <Link href="https://www.nngroup.com/articles/user-control-and-freedom/">
            User Control and Freedom
          </Link>
          : explicit cancellation and recovery paths.
        </li>
      </ul>
      <p>
        These sources inform the interaction choices; they do not establish that a particular bubble
        radius, color, emoji count, or paging threshold improves engagement. Those are
        implementation choices, not product claims.
      </p>
      <h2>Verification</h2>
      <p>
        HTML snapshot plays cover markup, keyboard controls, action events, attachments, and
        scrolling. The shared snapshot tooling compares React and Django. Working examples
        demonstrate host-owned behavior without putting application state into the renderers.
      </p>
    </Prose>
  ),
};
