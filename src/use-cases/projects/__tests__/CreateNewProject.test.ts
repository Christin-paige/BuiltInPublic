import { SupabaseAnonClient } from 'utils/supabase/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CreateNewProject from '../CreateNewProject';

const mockInsert = vi.fn();
const mockSupabase = {
  from: (table: string) => mockSupabase,
  insert: mockInsert,
  select: () => mockSupabase,
  single: vi.fn().mockResolvedValue({ error: null, data: { id: 'test-id' } }),
} as unknown as SupabaseAnonClient;

const mockInsertFails = vi.fn();
const mockSupabaseFails = {
  from: (table: string) => mockSupabaseFails,
  insert: mockInsertFails,
  select: () => mockSupabaseFails,
  single: vi.fn().mockResolvedValue({
    error: { message: 'violation or whatever', code: 'string' },
  }),
} as unknown as SupabaseAnonClient;

describe('CreateNewProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockInsert.mockReturnValue(mockSupabase);
    mockInsertFails.mockReturnValue(mockSupabaseFails);
  });

  it('should respond with success: true and a message when creation succeeds', async () => {
    const createNewProject = new CreateNewProject(mockSupabase);

    const actual = await createNewProject.execute({
      name: 'test project',
      ownerId: 'test-owner',
    });

    expect(actual.success).toBe(true);
    expect(actual.message).toBe('Project created!');
    expect(actual.projectId).toBeDefined();
  });

  it('should sanitize input', async () => {
    const createNewProject = new CreateNewProject(mockSupabase);

    const actual = createNewProject.execute({
      name: '<script>window.alert()</script>test name',
      ownerId: 'test-owner',
    });

    expect(mockInsert).toHaveBeenCalledWith({
      name: 'test name',
      owner_id: 'test-owner',
    });
  });

  it('should fail if sanitizing input results in empty string for name', async () => {
    const createNewProject = new CreateNewProject(mockSupabase);

    const actual = await createNewProject.execute({
      name: '<script>window.alert()</script>',
      ownerId: 'test-owner',
    });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Name is required');
  });

  it('should respond with success: false and a message when creation fails', async () => {
    const createNewProject = new CreateNewProject(mockSupabaseFails);

    const actual = await createNewProject.execute({
      name: 'test project',
      ownerId: 'test-owner',
    });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Project creation failed');
    expect(actual.projectId).toBeFalsy();
  });
});
