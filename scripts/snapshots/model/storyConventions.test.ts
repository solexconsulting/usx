import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

test('React and Django stories leave play tests to the HTML snapshots', () => {
  const root = fileURLToPath(new URL('../../../packages/usx-stories/src/', import.meta.url));
  const files = fs
    .readdirSync(root, { recursive: true })
    .map(String)
    .filter((file) => /\.(React|Django)\.stories\.[jt]sx?$/.test(file));
  assert.ok(files.length > 0, 'Renderer stories must be discovered');
  const violations: string[] = [];
  for (const file of files) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = (node: ts.Node) => {
      if (
        (ts.isPropertyAssignment(node) ||
          ts.isShorthandPropertyAssignment(node) ||
          ts.isMethodDeclaration(node)) &&
        node.name.getText(tree).replace(/['"]/g, '') === 'play'
      ) {
        const { line } = tree.getLineAndCharacterOfPosition(node.getStart(tree));
        violations.push(`${file}:${line + 1}`);
      }
      ts.forEachChild(node, visit);
    };
    visit(tree);
  }
  assert.deepEqual(violations, [], 'Move play tests to the corresponding HTML.stories file');
});
