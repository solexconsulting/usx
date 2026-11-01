/**
 * Runs inside the Storybook preview page (see attemptPlay), before any of its scripts. It learns when
 * a play has finished from Storybook's own channel events, so nothing depends on fixed waits or on
 * scraping the console. This function is serialized by Playwright, so it must not use imports.
 */
export interface ProbeState {
  done: boolean;
  error: string | null;
  assertions: number;
}

interface PreviewChannel {
  on(event: string, handler: (payload: unknown) => void): void;
}

declare global {
  interface Window {
    __usxPlay?: ProbeState;
    __STORYBOOK_ADDONS_CHANNEL__?: PreviewChannel;
  }
}

export function installProbe(countAssertions: boolean): void {
  const state: ProbeState = { done: false, error: null, assertions: 0 };
  window.__usxPlay = state;
  const matcherIds = new Set<string>();

  const finish = (error: string | null): void => {
    if (state.done) return;
    state.error = error;
    state.assertions = matcherIds.size;
    state.done = true;
  };

  const describe = (payload: unknown, fallback: string): string => {
    if (typeof payload === 'string') return payload;
    if (typeof payload === 'object' && payload !== null) {
      const fields = payload as Record<string, unknown>;
      for (const key of ['message', 'title', 'description'])
        if (typeof fields[key] === 'string') return fields[key] as string;
    }
    return fallback;
  };

  const timer = setInterval(() => {
    const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
    if (!channel) return;
    clearInterval(timer);
    if (countAssertions)
      // A matcher call is one whose path begins with the expect() call it belongs to; waitFor retries reuse ids.
      channel.on('storybook/instrumenter/call', (call) => {
        const { id, path } = call as { id: string; path?: { __callId__?: string }[] };
        if (path?.[0]?.__callId__) matcherIds.add(id);
      });
    channel.on('storyRendered', () => finish(null));
    channel.on('playFunctionThrewException', (error) => finish(describe(error, 'The play threw.')));
    channel.on('storyThrewException', (error) => finish(describe(error, 'The story threw.')));
    channel.on('storyErrored', (error) => finish(describe(error, 'The story errored.')));
    channel.on('storyMissing', () => finish('The story is missing.'));
  }, 5);
}
