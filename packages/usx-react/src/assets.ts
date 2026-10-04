declare global {
  interface Window {
    usxBaseUrl?: string;
  }
}

export function getAssetUrl(assetPath: string, staticBaseUrl?: string): string {
  if (/^[a-z][a-z\d+.-]*:/i.test(assetPath)) return assetPath;
  const base = staticBaseUrl || (typeof window !== 'undefined' && window.usxBaseUrl) || '/';
  return `${base.replace(/\/+$/, '')}/${assetPath.replace(/^\/+/, '')}`;
}

export function getAssetSrcSet(srcSet: string, staticBaseUrl?: string): string {
  return srcSet.replace(/(^\s*|,\s*)(\S*[^,\s])(?=,?(?:\s|$))/g, (_match, separator, url) =>
    `${separator}${getAssetUrl(url, staticBaseUrl)}`);
}