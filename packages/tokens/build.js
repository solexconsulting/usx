const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const primitivesDir = path.join(srcDir, 'primitives');
const distDir = path.join(__dirname, 'dist');

const tokenFiles = [
  { key: 'color', file: 'color.json' },
  { key: 'spacing', file: 'spacing.json' },
  { key: 'typography', file: 'typography.json' },
  { key: 'radius', file: 'radius.json' }
];

function loadTokens() {
  const tokens = {};

  for (const { key, file } of tokenFiles) {
    const filePath = path.join(primitivesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    tokens[key] = JSON.parse(content);
  }

  return tokens;
}

function buildCss(tokens) {
  const lines = [];

  for (const [group, groupTokens] of Object.entries(tokens)) {
    for (const [name, value] of Object.entries(groupTokens)) {
      lines.push(`  --${group}-${name}: ${value};`);
    }
  }

  return `:root {\n${lines.join('\n')}\n}\n`;
}

function buildJs(tokens) {
  return `module.exports = ${JSON.stringify(tokens, null, 2)};\n`;
}

function run() {
  const tokens = loadTokens();

  fs.mkdirSync(distDir, { recursive: true });

  fs.writeFileSync(path.join(distDir, 'tokens.css'), buildCss(tokens), 'utf8');
  fs.writeFileSync(path.join(distDir, 'tokens.js'), buildJs(tokens), 'utf8');

  console.log('Built tokens to dist/tokens.css and dist/tokens.js');
}

run();
