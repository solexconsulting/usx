const fs = require('fs');
const path = require('path');

function createComponent(name) {
  if (!name) {
    console.error('Usage: agency-ui create-component <name>');
    process.exitCode = 1;
    return;
  }

  const componentDir = path.join(process.cwd(), 'components', name);
  fs.mkdirSync(componentDir, { recursive: true });

  const componentClass = `aui-${name}`;
  const htmlPath = path.join(componentDir, `${name}.html`);
  const cssPath = path.join(componentDir, `${name}.css`);

  if (!fs.existsSync(htmlPath)) {
    fs.writeFileSync(
      htmlPath,
      `<div class="${componentClass}">${name} component</div>\n`,
      'utf8'
    );
  }

  if (!fs.existsSync(cssPath)) {
    fs.writeFileSync(
      cssPath,
      `.${componentClass} {\n  color: var(--color-text);\n}\n`,
      'utf8'
    );
  }

  console.log(`Created component scaffold at ${componentDir}`);
}

module.exports = {
  createComponent
};
