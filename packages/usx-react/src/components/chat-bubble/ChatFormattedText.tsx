import React from 'react';

/** The composer uses a small, predictable Markdown subset; host rich content still takes precedence. */
function inline(value: string): React.ReactNode[] {
  const pattern = /(\*\*([^*\n]+)\*\*|\*([^*\n]+)\*|<u>([^<\n]+)<\/u>|~~([^~\n]+)~~|`([^`\n]+)`)/g;
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const match of value.matchAll(pattern)) {
    const at = match.index ?? 0;
    if (at > cursor) parts.push(value.slice(cursor, at));
    const key = parts.length;
    if (match[2]) parts.push(<strong key={key}>{match[2]}</strong>);
    else if (match[3]) parts.push(<em key={key}>{match[3]}</em>);
    else if (match[4]) parts.push(<u key={key}>{match[4]}</u>);
    else if (match[5]) parts.push(<s key={key}>{match[5]}</s>);
    else parts.push(<code key={key}>{match[6]}</code>);
    cursor = at + match[0].length;
  }
  if (cursor < value.length) parts.push(value.slice(cursor));
  return parts;
}

function quotePrefix(line: string) {
  let offset = 0;
  let depth = 0;
  while (line[offset] === '>') {
    depth += 1;
    offset += 1;
    while (line[offset] === ' ' || line[offset] === '\t') offset += 1;
  }
  return { depth, content: line.slice(offset) };
}

type QuoteNode = { children: Array<QuoteNode | string> };

function quotedBlock(lines: string[]) {
  const root: QuoteNode = { children: [] };
  const stack = [root];
  for (const line of lines) {
    const { depth, content } = quotePrefix(line);
    while (stack.length - 1 > depth) stack.pop();
    while (stack.length - 1 < depth) {
      const child: QuoteNode = { children: [] };
      stack[stack.length - 1].children.push(child);
      stack.push(child);
    }
    stack[stack.length - 1].children.push(content);
  }
  const rendered = new WeakMap<QuoteNode, React.ReactNode>();
  const pending: Array<{ node: QuoteNode; ready: boolean }> = [{ node: root, ready: false }];
  while (pending.length) {
    const item = pending.pop()!;
    if (!item.ready) {
      pending.push({ node: item.node, ready: true });
      for (let index = item.node.children.length - 1; index >= 0; index -= 1) {
        const child = item.node.children[index];
        if (typeof child !== 'string') pending.push({ node: child, ready: false });
      }
      continue;
    }
    rendered.set(
      item.node,
      <blockquote>
        {item.node.children.map((child, index) =>
          typeof child === 'string' ? (
            <p key={index}>{inline(child)}</p>
          ) : (
            <React.Fragment key={index}>{rendered.get(child)}</React.Fragment>
          )
        )}
      </blockquote>
    );
  }
  return root.children.map((child, index) => (
    <React.Fragment key={index}>{rendered.get(child as QuoteNode)}</React.Fragment>
  ));
}

export default function ChatFormattedText({ text }: { text: string }) {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }
    const key = blocks.length;
    if (/^```/.test(line)) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index])) code.push(lines[index++]);
      if (index < lines.length) index += 1;
      blocks.push(
        <pre key={key}>
          <code>{code.join('\n')}</code>
        </pre>
      );
      continue;
    }
    if (quotePrefix(line).depth) {
      const quoted: string[] = [];
      while (index < lines.length && quotePrefix(lines[index]).depth) quoted.push(lines[index++]);
      blocks.push(<React.Fragment key={key}>{quotedBlock(quoted)}</React.Fragment>);
      continue;
    }
    const ordered = /^\d+\. /.test(line);
    const unordered = /^[-*] /.test(line);
    if (ordered || unordered) {
      const items: React.ReactNode[] = [];
      const itemPattern = ordered ? /^\d+\. / : /^[-*] /;
      while (index < lines.length && itemPattern.test(lines[index])) {
        items.push(<li key={items.length}>{inline(lines[index++].replace(itemPattern, ''))}</li>);
      }
      blocks.push(ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>);
      continue;
    }
    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(?:```|> ?|\d+\. |[-*] )/.test(lines[index])
    )
      paragraph.push(lines[index++]);
    blocks.push(
      <p key={key}>
        {paragraph.map((part, partIndex) => (
          <React.Fragment key={partIndex}>
            {partIndex > 0 && <br />}
            {inline(part)}
          </React.Fragment>
        ))}
      </p>
    );
  }
  return <>{blocks}</>;
}
