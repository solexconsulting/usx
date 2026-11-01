import { UserError } from '../errors.ts';

/** A whole number option such as --concurrency, or `fallback` when it was not given. */
export function wholeNumber(
  name: string,
  text: string | undefined,
  fallback: number,
  minimum: number
): number {
  if (text === undefined) return fallback;
  const value = Number(text);
  if (!Number.isInteger(value) || value < minimum)
    throw new UserError(`--${name} must be a whole number of at least ${minimum}, got "${text}".`);
  return value;
}
