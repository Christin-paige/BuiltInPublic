import { SupabaseAnonClient } from 'utils/supabase/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UpdateProject } from '../UpdateProject';

const mockInsert = vi.fn();
const mockSupabase = {
  from: (table: string) => mockSupabase,
  insert: mockInsert,
} as unknown as SupabaseAnonClient;

const mockInsertFails = vi.fn();
const mockSupabaseFails = {
  from: (table: string) => mockSupabaseFails,
  insert: mockInsertFails,
  select: () => mockSupabaseFails,
} as unknown as SupabaseAnonClient;

describe('Use case - UpdateProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockInsert.mockResolvedValue({ error: null, data: { id: 'test-id' } });
    mockInsertFails.mockResolvedValue({
      error: { message: 'violation or whatever', code: 'string' },
    });
  });

  it('should respond with success: true and a message when creation succeeds', async () => {
    const updateProject = new UpdateProject(mockSupabase);

    const actual = await updateProject.execute({
      update: 'test project',
      projectId: 'test-owner',
    });

    expect(actual.success).toBe(true);
    expect(actual.message).toBe('Update added!');
  });

  it('should sanitize input', async () => {
    const updateProject = new UpdateProject(mockSupabase);

    const actual = updateProject.execute({
      update: '<script>window.alert()</script>test update',
      projectId: 'test-owner',
    });

    expect(mockInsert).toHaveBeenCalledWith({
      update: 'test update',
      project_id: 'test-owner',
    });
  });

  it('should fail if sanitizing input results in empty string for update', async () => {
    const updateProject = new UpdateProject(mockSupabase);

    const actual = await updateProject.execute({
      update: '<script>window.alert()</script>',
      projectId: 'test-owner',
    });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Update cannot be blank');
  });

  it('should respond with success: false and a message when creation fails', async () => {
    const updateProject = new UpdateProject(mockSupabaseFails);

    const actual = await updateProject.execute({
      update: 'test project',
      projectId: 'test-owner',
    });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Creating Update failed');
  });
});
