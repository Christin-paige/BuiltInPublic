export function stripObjectNullish(
  target: Record<string, any | undefined | null>
): Record<string, any> {
  let result: Record<string, any> = {};

  // nosemgrep-start
  for (const key in target) {
    const value = target[key];

    if (value !== undefined && value !== null && value !== '') {
      result[key] = value;
    }
  }
  // nosemgrep-end
  if (!Object.entries(result).length) {
    throw new Error('NO_VALID_FIELDS');
  }

  return result;
}
