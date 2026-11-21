import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);

// Follow emitted chunks as well as source imports: moving an export alone must
// not leave optional code in a shared chunk loaded by the default entry point.
function reachableSource(file, seen = new Set()) {
  if (seen.has(file)) return '';
  seen.add(file);
  const source = fs.readFileSync(new URL(file), 'utf8');
  const dependencies = [...source.matchAll(/(?:\bfrom\s*|\bimport\s*|\brequire\(\s*)["'](\.[^"']+)["']/g)];
  return source + dependencies.map(([, relative]) =>
    reachableSource(new URL(relative, file).href, seen)
  ).join('\n');
}

function checkCoreGraph(entry) {
  const source = reachableSource(entry);
  assert.doesNotMatch(source, /usx-chat|usx:chat/, `${entry} includes Chat code`);
}

for (const format of ['import', 'require']) {
  const core = format === 'import' ? await import('@solexllc/usx-react') : require('@solexllc/usx-react');
  const chat = format === 'import' ? await import('@solexllc/usx-react/chat') : require('@solexllc/usx-react/chat');
  assert.equal(Object.keys(core).some((name) => name.startsWith('Chat')), false);
  assert.deepEqual(Object.keys(chat).sort(), [
    'Chat', 'ChatAttachment', 'ChatAttachments', 'ChatBubble', 'ChatComposer',
    'ChatContext', 'ChatControls', 'ChatDirectory', 'ChatDirectoryItem',
    'ChatHistory', 'ChatMessage', 'ChatMessageActions', 'ChatWindow',
  ].sort());
  assert.match(renderToStaticMarkup(React.createElement(chat.Chat, { id: 'optional-chat' })), /usx-chat/);
  assert.match(renderToStaticMarkup(React.createElement(chat.ChatComposer, { id: 'optional-composer' })), /usx-chat-composer/);
  checkCoreGraph(new URL(`../dist/index.${format === 'import' ? 'js' : 'cjs'}`, import.meta.url).href);
}

for (const entry of ['@solexllc/usx/js', '@solexllc/usx/js/start']) {
  checkCoreGraph(import.meta.resolve(entry));
}
const enhancements = await import('@solexllc/usx/js');
assert.equal('chat' in enhancements, false);
assert.equal('chat' in enhancements.default, false);
const { default: chat } = await import('@solexllc/usx/js/chat');
assert.equal(typeof chat.init, 'function');
console.log('PASS: Chat entry points load in ESM and CommonJS; default React and enhancement graphs exclude Chat.');
