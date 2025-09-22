import { describe, expect, it, beforeEach } from 'vitest';
import { BaseMutationUseCase } from '../BaseMutationUseCase';
import { AnySupabaseClient } from 'utils/supabase/server';

// Mock concrete implementation for testing
class TestUseCase extends BaseMutationUseCase<TestParams> {
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

  it('preserves null values in update data', () => {
    const updateData = {
      id: 1,
      name: null,
      isActive: true,
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      id: 1,
      name: null,
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

  it('preserves empty string values in update data', () => {
    const updateData = {
      id: 1,
      name: '',
      isActive: true,
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      id: 1,
      name: '',
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

  it('throws NO_VALID_FIELDS error when all values are undefined', () => {
    const updateData = {
      id: undefined,
      name: undefined,
      isActive: undefined,
      count: undefined,
      metadata: undefined,
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
      name: null,
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
      name: null,
    });
  });

  it('preserves all string values including empty strings', () => {
    const updateData = {
      name: 'John Doe',
      description: ' ',
      empty: '',
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      name: 'John Doe',
      description: ' ',
      empty: '',
    });
  });

  it('preserves null values for bio deletion use case', () => {
    const updateData = {
      id: 1,
      name: null,
      isActive: undefined,
    };

    const result = useCase.compactUpdateData(updateData);

    expect(result).toEqual({
      id: 1,
      name: null,
    });
  });
});
