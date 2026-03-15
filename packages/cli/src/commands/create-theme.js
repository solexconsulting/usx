const fs = require('fs');
const path = require('path');

function createTheme(name) {
  if (!name) {
    console.error('Usage: agency-ui create-theme <name>');
    process.exitCode = 1;
    return;
  }

  const themesDir = path.join(process.cwd(), 'themes');
  fs.mkdirSync(themesDir, { recursive: true });

  const themePath = path.join(themesDir, `${name}.css`);
  if (!fs.existsSync(themePath)) {
    const content = `:root[data-theme="${name}"] {\n  --color-primary: #2563eb;\n  --color-secondary: #7c3aed;\n  --color-background: #f8fafc;\n  --color-surface: #ffffff;\n  --color-text: #0f172a;\n}\n`;
    fs.writeFileSync(themePath, content, 'utf8');
  }

  console.log(`Created theme file at ${themePath}`);
}

module.exports = {
  createTheme
};
