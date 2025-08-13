import { stripObjectNullish } from 'utils/stripObjectNullish';
import { describe, expect, it } from 'vitest';

describe('stripObjectNullish', () => {
  it('returns an object with only defined values', () => {
    const input = { a: 1, b: undefined, c: null, d: '' };

    const expected = { a: 1 };
    const actual = stripObjectNullish(input);

    expect(actual).toEqual(expected);
  });

  it('handles falsy but valid values correctly', () => {
    const input = { a: 0, b: false, c: 'anything' };

    const expected = { a: 0, b: false, c: 'anything' };
    const actual = stripObjectNullish(input);

    expect(actual).toEqual(expected);
  });

  it('throws when result is empty object', () => {
    const input = { a: undefined, b: null };

    expect(() => stripObjectNullish(input)).toThrowError('NO_VALID_FIELDS');
  });
});
