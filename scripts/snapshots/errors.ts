/** A failure caused by input or environment that the user can act on; the CLI prints it without a stack trace. */
export class UserError extends Error {
  override readonly name = 'UserError';
}
