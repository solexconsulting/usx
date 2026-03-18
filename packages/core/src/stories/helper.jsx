
/*
An array of helpers for story rendering.
*/

export const componentTag = ({ name, props }) => {
  const propsString = Object.entries(props)
    .map(([key, value]) => ` ${key}=\"${value}\"`)
    .join('');
  return `{% component "${name}"${propsString} %}`;
}
