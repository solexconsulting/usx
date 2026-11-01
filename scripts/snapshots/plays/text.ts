// eslint-disable-next-line no-control-regex
const ANSI_ESCAPE = /\u001b\[[0-9;]*m/g;

/** One line of readable text from a browser or Storybook message. */
export function cleanMessage(message: string, limit = 600): string {
  return message.replace(ANSI_ESCAPE, '').replace(/\s+/g, ' ').trim().slice(0, limit);
}
