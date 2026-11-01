export interface DiffLine {
  readonly kind: 'same' | 'removed' | 'added';
  readonly text: string;
}

/** Stands in for `count` unchanged lines that were left out of a diff. */
export interface DiffGap {
  readonly kind: 'gap';
  readonly count: number;
}

/** Above this many table cells the changed region is shown as a block instead of matched line by line. */
const MAX_TABLE_CELLS = 16_000_000;

const lines = (kind: DiffLine['kind'], texts: readonly string[]): DiffLine[] =>
  texts.map((text) => ({ kind, text }));

/** A line-level diff: a longest common subsequence of `before` and `after`, in order. */
export function diffLines(before: readonly string[], after: readonly string[]): DiffLine[] {
  let start = 0;
  while (start < before.length && start < after.length && before[start] === after[start]) start++;
  let end = 0;
  while (
    end < before.length - start &&
    end < after.length - start &&
    before[before.length - 1 - end] === after[after.length - 1 - end]
  )
    end++;

  const removed = before.slice(start, before.length - end);
  const added = after.slice(start, after.length - end);
  return [
    ...lines('same', before.slice(0, start)),
    ...diffMiddle(removed, added),
    ...lines('same', before.slice(before.length - end)),
  ];
}

function diffMiddle(before: readonly string[], after: readonly string[]): DiffLine[] {
  if (before.length === 0 || after.length === 0)
    return [...lines('removed', before), ...lines('added', after)];
  const columns = after.length + 1;
  if ((before.length + 1) * columns > MAX_TABLE_CELLS)
    return [...lines('removed', before), ...lines('added', after)];

  // common[i * columns + j] is the length of the longest common subsequence of before[i..] and after[j..].
  const common = new Uint32Array((before.length + 1) * columns);
  for (let i = before.length - 1; i >= 0; i--) {
    for (let j = after.length - 1; j >= 0; j--) {
      common[i * columns + j] =
        before[i] === after[j]
          ? common[(i + 1) * columns + j + 1]! + 1
          : Math.max(common[(i + 1) * columns + j]!, common[i * columns + j + 1]!);
    }
  }

  const result: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < before.length && j < after.length) {
    if (before[i] === after[j]) {
      result.push({ kind: 'same', text: before[i]! });
      i++;
      j++;
    } else if (common[(i + 1) * columns + j]! >= common[i * columns + j + 1]!) {
      result.push({ kind: 'removed', text: before[i++]! });
    } else {
      result.push({ kind: 'added', text: after[j++]! });
    }
  }
  return [...result, ...lines('removed', before.slice(i)), ...lines('added', after.slice(j))];
}

/** Keeps `context` unchanged lines around each change and replaces the rest with gaps. */
export function collapseUnchanged(
  diff: readonly DiffLine[],
  context: number
): (DiffLine | DiffGap)[] {
  const keep = diff.map(() => false);
  diff.forEach((line, index) => {
    if (line.kind === 'same') return;
    const from = Math.max(0, index - context);
    const to = Math.min(diff.length - 1, index + context);
    for (let i = from; i <= to; i++) keep[i] = true;
  });

  const result: (DiffLine | DiffGap)[] = [];
  let skipped = 0;
  const flushGap = (): void => {
    if (skipped > 0) result.push({ kind: 'gap', count: skipped });
    skipped = 0;
  };
  diff.forEach((line, index) => {
    if (keep[index]) {
      flushGap();
      result.push(line);
    } else {
      skipped++;
    }
  });
  flushGap();
  return result;
}
