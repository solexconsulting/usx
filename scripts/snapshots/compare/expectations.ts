import { UserError } from '../errors.ts';
import { readTextIfExists } from '../fs.ts';
import { EXPECTATIONS_PATH } from '../model/paths.ts';
import type { ComponentName } from '../model/types.ts';

/** Differences between the React and Django snapshots of a component that are intended, with reasons. */
export interface ComponentExpectations {
  /** Attributes left out of this component's comparison entirely. */
  readonly ignoreAttributes: readonly string[];
  /** Section title -> why that section legitimately differs. */
  readonly sections: Readonly<Record<string, string>>;
}

export type Expectations = ReadonlyMap<ComponentName, ComponentExpectations>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const KNOWN_KEYS = ['ignoreAttributes', 'sections'];

const isReasons = (value: unknown): value is Record<string, string> =>
  isRecord(value) &&
  Object.values(value).every((reason) => typeof reason === 'string' && reason !== '');

const isNames = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((name) => typeof name === 'string' && name !== '');

function parseComponent(where: string, value: unknown): ComponentExpectations {
  if (!isRecord(value)) throw new UserError(`${where} must be an object.`);
  const unknown = Object.keys(value).filter((key) => !KNOWN_KEYS.includes(key));
  if (unknown.length) throw new UserError(`${where} has unknown key(s): ${unknown.join(', ')}.`);

  const { ignoreAttributes = [], sections = {} } = value;
  if (!isNames(ignoreAttributes))
    throw new UserError(`${where}.ignoreAttributes must be a list of attribute names.`);
  if (!isReasons(sections))
    throw new UserError(`${where}.sections must map section titles to non-empty reasons.`);
  return { ignoreAttributes, sections };
}

export function parseExpectations(text: string, origin: string): Expectations {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new UserError(`${origin} is not valid JSON.`, { cause: error });
  }
  if (!isRecord(parsed)) throw new UserError(`${origin} must be an object keyed by component.`);
  return new Map(
    Object.entries(parsed).map(([component, value]) => [
      component,
      parseComponent(`${origin}: ${component}`, value),
    ])
  );
}

export function loadExpectations(file: string = EXPECTATIONS_PATH): Expectations {
  const text = readTextIfExists(file);
  if (text === undefined) throw new UserError(`Expectations file not found: ${file}`);
  return parseExpectations(text, file);
}
