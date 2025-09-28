import { SupabaseAnonClient } from 'utils/supabase/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DeleteProject } from '@/use-cases/projects/DeleteProject';

const mockDelete = vi.fn();
const mockSupabase = {
  from: (table: string) => mockSupabase,
  delete: mockDelete,
  eq: vi.fn().mockResolvedValue({ error: null, data: { id: 'test-id' } }),
} as unknown as SupabaseAnonClient;

const mockDeleteFails = vi.fn();
const mockSupabaseFails = {
  from: (table: string) => mockSupabaseFails,
  delete: mockDeleteFails,
  eq: vi.fn().mockResolvedValue({
    error: { message: 'violation or whatever', code: 'string' },
  }),
} as unknown as SupabaseAnonClient;

describe('Use case - Delete Project', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDelete.mockReturnValue(mockSupabase);
    mockDeleteFails.mockReturnValue(mockSupabaseFails);
  });

  it('should respond with success: true and a message when deletion succeeds', async () => {
    const deleteProject = new DeleteProject(mockSupabase);

    const actual = await deleteProject.execute({
      projectId: 'test-owner',
    });

    expect(actual.success).toBe(true);
    expect(actual.message).toBe('Project deleted!');
  });

  it('should respond with success: false and a message when deletion fails', async () => {
    const deleteProject = new DeleteProject(mockSupabaseFails);

    const actual = await deleteProject.execute({
      projectId: 'test-owner',
    });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Deleting project failed');
  });
});
