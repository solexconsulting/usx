import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('../src/components/', import.meta.url));
const components = [
  'chat',
  'chat-composer',
  'chat-history',
  'chat-context',
  'chat-attachment',
  'chat-attachments',
  'chat-directory',
  'chat-directory-item',
  'chat-bubble',
  'chat-message',
  'chat-message-actions',
  'chat-controls',
  'chat-window',
];

function assertMarkupOnly(tree, name) {
  const visit = (node) => {
    if (ts.isJsxAttribute(node))
      assert.ok(!/^on[A-Z]/.test(node.name.text), `${name}: renderer event handler`);
    if (ts.isCallExpression(node))
      assert.ok(
        !/\buse(State|Effect|LayoutEffect|Reducer|Ref|Callback)\b/.test(
          node.expression.getText(tree)
        ),
        `${name}: renderer interaction hook`
      );
    ts.forEachChild(node, visit);
  };
  visit(tree);
}

for (const name of components) {
  const directory = path.join(root, name);
  const pascal = name
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');
  const source = fs.readFileSync(path.join(directory, `${pascal}.tsx`), 'utf8');
  const tree = ts.createSourceFile(
    `${pascal}.tsx`,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const props = tree.statements.find(
    (node) => ts.isInterfaceDeclaration(node) && node.name.text === `${pascal}Props`
  );
  const config = JSON.parse(fs.readFileSync(path.join(directory, 'config.json'), 'utf8'));
  assert.deepEqual(
    props.members.map((member) => member.name.text).sort(),
    Object.keys(config.props).sort(),
    `${name}: React props must match config.json`
  );
  assertMarkupOnly(tree, name);
  console.log(`PASS ${name}: contract props, markup-only renderer`);
}

// Chat's required close button must use the same enhancement in both renderers.
const popoverSource = fs.readFileSync(path.join(root, 'popover/Popover.tsx'), 'utf8');
assertMarkupOnly(
  ts.createSourceFile(
    'Popover.tsx',
    popoverSource,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  ),
  'popover'
);
