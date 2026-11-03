import uswdsSprite from '@uswds/uswds/img/sprite.svg?raw';
import usxSprite from '../../../../usx/src/img/usx-sprite.svg?raw';

const usxScripts = Object.entries(
  import.meta.glob('../../../../usx/src/js/*.mjs', {
    query: '?raw',
    import: 'default',
    eager: true,
  })
)
  .filter(([path]) => !/\/(?:index|start)\.mjs$/.test(path))
  .map(([, source]) => {
    const name = /export default (\w+);/.exec(source)?.[1];
    if (!name) throw new Error('A USX preview script has no default export.');
    return `${source}\n${name}.on(document.body);`;
  });

const symbols = new Map(
  [
    ['sprite', uswdsSprite],
    ['usx-sprite', usxSprite],
  ].flatMap(([file, source]) =>
    [...source.matchAll(/<symbol\b[^>]*\bid="([^"]+)"[^>]*>[\s\S]*?<\/symbol>/g)].map(
      ([markup, id]) => [
        `${file}#${id}`,
        markup.replace(`id="${id}"`, `id="workbench-${file}-${id}"`),
      ]
    )
  )
);

function localizeSprites(html) {
  if (!/<use\b/i.test(html)) return html;
  const page = new DOMParser().parseFromString(html, 'text/html');
  const used = new Set();

  for (const use of page.querySelectorAll('use')) {
    const href = use.getAttribute('href') || use.getAttribute('xlink:href');
    if (!href) continue;
    let url;
    try {
      url = new URL(href, document.baseURI);
    } catch {
      continue;
    }

    for (const file of ['sprite', 'usx-sprite']) {
      if (url.href !== new URL(`./img/${file}.svg${url.hash}`, document.baseURI).href) continue;
      const symbol = symbols.get(`${file}${url.hash}`);
      if (!symbol) break;
      use.setAttribute('href', `#workbench-${file}-${url.hash.slice(1)}`);
      use.removeAttribute('xlink:href');
      used.add(symbol);
      break;
    }
  }

  if (!used.size) return html;
  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">${[...used].join('')}</svg>`;
  return sprite + page.body.innerHTML;
}

const policy = (nonce) =>
  `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline' http: https:; img-src data: http: https:; font-src data: http: https:; connect-src 'none'; frame-src 'none'; object-src 'none'; form-action 'none'; base-uri 'none'`;

export const djangoBaseUrl = () =>
  window.USX_DJANGO_URL?.replace(/\/$/, '') || `http://${window.location.hostname}:9090`;

export function previewDocument(html, nonce) {
  // Keep the iframe opaque. Browser SVG <use> cannot load a cross-origin sprite from it.
  const styles = [...document.styleSheets]
    .map((sheet) => sheet.ownerNode?.outerHTML || '')
    .join('\n');
  const scripts =
    `<script nonce="${nonce}" src="./js/uswds.min.js"></script>` +
    usxScripts
      .map((source) => `<script type="module" nonce="${nonce}">${source}</script>`)
      .join('');
  return `<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="${policy(nonce)}">${styles}</head><body class="bg-surface-1 text-ink padding-1">${localizeSprites(html)}${scripts}</body></html>`;
}
