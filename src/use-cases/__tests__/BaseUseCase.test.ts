import { describe, expect, it, beforeEach } from 'vitest';
import { BaseUseCase } from '../BaseUseCase';
import { AnySupabaseClient } from 'utils/supabase/server';

// Mock concrete implementation for testing
class TestUseCase extends BaseUseCase<TestParams> {
  async execute(
    params: TestParams
  ): Promise<{ success: boolean; message: string }> {
    return { success: true, message: 'test' };
  }
}

interface TestParams {
  id?: number | null;
  name?: string | null;
  isActive?: boolean | null;
  count?: number | null;
  metadata?: Record<string, any> | null;
}

describe('BaseUseCase.compactUpdateData', () => {
  let useCase: TestUseCase;
  const mockSupabase = {} as AnySupabaseClient;

  beforeEach(() => {
    useCase = new TestUseCase(mockSupabase);
  });

  it('removes null values from update data', () => {
    const updateData = {
      id: 1,
      name: null,
      isActive: true,
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      id: 1,
      isActive: true,
    });
  });

  it('removes undefined values from update data', () => {
    const updateData = {
      id: 1,
      name: undefined,
      isActive: false,
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      id: 1,
      isActive: false,
    });
  });

  it('removes empty string values from update data', () => {
    const updateData = {
      id: 1,
      name: '',
      isActive: true,
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      id: 1,
      isActive: true,
    });
  });

  it('preserves falsy but valid values', () => {
    const updateData = {
      id: 0,
      isActive: false,
      count: 0,
      name: 'test',
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      id: 0,
      isActive: false,
      count: 0,
      name: 'test',
    });
  });

  it('throws NO_VALID_FIELDS error when all values are nullish', () => {
    const updateData = {
      id: null,
      name: undefined,
      isActive: undefined,
      count: null,
      metadata: null,
    };

    expect(() => useCase.compactUpdateData(updateData)).toThrowError(
      'NO_VALID_FIELDS'
    );
  });

  it('handles mixed valid and nullish values', () => {
    const updateData = {
      id: 123,
      name: null,
      isActive: false,
      count: undefined,
      metadata: { key: 'value' },
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      id: 123,
      isActive: false,
      metadata: { key: 'value' },
    });
  });

  it('preserves complex object values', () => {
    const updateData = {
      id: 1,
      metadata: {
        nested: {
          value: 'test',
          nullValue: null,
        },
        array: [1, 2, 3],
      },
      name: undefined,
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      id: 1,
      metadata: {
        nested: {
          value: 'test',
          nullValue: null,
        },
        array: [1, 2, 3],
      },
    });
  });

  it('throws NO_VALID_FIELDS error for empty object input', () => {
    const updateData = {};

    expect(() => useCase.compactUpdateData(updateData)).toThrowError(
      'NO_VALID_FIELDS'
    );
  });

  it('preserves array values', () => {
    const updateData = {
      id: 1,
      metadata: [1, 2, 3],
      name: null,
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      id: 1,
      metadata: [1, 2, 3],
    });
  });

  it('preserves non-empty string values', () => {
    const updateData = {
      name: 'John Doe',
      description: ' ', // Space is not empty string
      empty: '',
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      name: 'John Doe',
      description: ' ',
    });
  });
});
