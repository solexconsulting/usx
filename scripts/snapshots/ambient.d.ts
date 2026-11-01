/** `?real` loads the actual Django module, bypassing the shim (see render/runtime.ts). */
declare module '*djangoComponent.js?real' {
  export const serializePropsForDjango: (value: unknown) => unknown;
}
