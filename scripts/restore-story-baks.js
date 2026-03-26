#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'src', 'components');
const REMOVED_WRAPPERS = path.join(ROOT, 'scripts', 'removed-wrappers');

function ensureDir(d) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }
ensureDir(REMOVED_WRAPPERS);

function isLikelyStory(content) {
  return /export\s+default\s*\{/.test(content) || /tags:\s*\['autodocs'\]/.test(content) || /djangoComponent\(/.test(content);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      // skip any backup folder just in case
      if (p.includes('backup-migrated') || p.includes('backup-migrated-stories')) continue;
      walk(p);
    } else {
      if (e.name.endsWith('.bak')) {
        try {
          const bakContent = fs.readFileSync(p, 'utf8');
          if (!isLikelyStory(bakContent)) continue;
          // compute target story filename (Alert.jsx.bak -> Alert.stories.jsx)
          const base = e.name.replace(/\.bak$/, ''); // Alert.jsx
          const stem = base.replace(/\.jsx$/, '');
          const target = path.join(dir, `${stem}.stories.jsx`);
          if (fs.existsSync(target)) continue;
          fs.copyFileSync(p, target);
          console.log(`Restored story from bak: ${path.relative(ROOT, target)}`);
        } catch (err) {
          console.error('Error restoring', p, err.message);
        }
      } else {
        // detect wrapper files we added: export { default } from './kebab.jsx';
        const content = fs.readFileSync(p, 'utf8');
        if (/export\s*\{\s*default\s*\}\s*from\s*['"]\.\/[a-z0-9\-]+\.jsx['"]\s*;?/.test(content)) {
          // move wrapper to removed-wrappers preserving path
          const rel = path.relative(COMPONENTS, p);
          const dest = path.join(REMOVED_WRAPPERS, rel);
          ensureDir(path.dirname(dest));
          try {
            fs.renameSync(p, dest);
            console.log(`Moved wrapper file to removed-wrappers: ${path.relative(ROOT, dest)}`);
          } catch (err) {
            console.error('Failed to move wrapper', p, err.message);
          }
        }
      }
    }
  }
}

walk(COMPONENTS);
console.log('Restore script finished. Backups (.bak) preserved. Wrapper files moved to scripts/removed-wrappers.');
