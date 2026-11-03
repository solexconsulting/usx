/** `?real` loads the actual Django module, bypassing the shim (see render/runtime.ts). */
declare module '*djangoComponent.js?real' {
  export const serializePropsForDjango: (value: unknown) => unknown;
  export const storyTree: (name: string, props: unknown, renderTree?: (props: unknown) => unknown) => unknown;
  export const prepareDjangoRequest: (name: string, props: unknown) => unknown;
}
