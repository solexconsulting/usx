export interface Command {
  readonly name: string;
  readonly summary: string;
  readonly usage: string;
  /** Runs the command and returns the process exit code. Throws UserError for bad input. */
  run(argv: readonly string[], write: (text: string) => void): Promise<number>;
}
