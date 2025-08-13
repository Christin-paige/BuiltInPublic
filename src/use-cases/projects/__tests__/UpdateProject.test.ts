import { SupabaseAnonClient } from 'utils/supabase/server';
import { beforeEach, expect, it, vi, describe } from 'vitest';
import { UpdateProject } from '../UpdateProject';

const mockUpdate = vi.fn();
const mockSupabase = {
  from: (table: string) => mockSupabase,
  update: mockUpdate,
  eq: vi.fn().mockResolvedValue({ error: null, data: { id: 'test-id' } }),
} as unknown as SupabaseAnonClient;

const mockUpdateFails = vi.fn();
const mockSupabaseFails = {
  from: (table: string) => mockSupabaseFails,
  update: mockUpdateFails,
  eq: vi.fn().mockResolvedValue({
    error: { message: 'violation or whatever', code: 'string' },
  }),
} as unknown as SupabaseAnonClient;

describe('Use case - UpdateProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdate.mockReturnValue(mockSupabase);
    mockUpdateFails.mockReturnValue(mockSupabaseFails);
  });

  it('returns success: true and a message if update succeeds', async () => {
    const updateProject = new UpdateProject(mockSupabase);

    const actual = await updateProject.execute({
      description: 'a test project for testing project tests',
      projectId: 'test-id',
    });

    expect(actual.success).toBe(true);
    expect(actual.message).toBe('Project updated!');
  });

  it('returns success: false and a message if update fails', async () => {
    const updateProject = new UpdateProject(mockSupabaseFails);

    const actual = await updateProject.execute({ projectId: 'test-id' });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Project update failed');
  });

  it.each([
    'rick and morty a hundred years forever',
    'www.hundredyears.rickandmorty.com',
    'ww.wwww.rickandmorty.hundred.yearsadventure.com',
  ])('fails if a provided URL is invalid', async (url) => {
    const updateProject = new UpdateProject(mockSupabase);

    const actual = await updateProject.execute({
      externalUrl: url,
      projectId: 'test-id',
    });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Must be valid URL');
  });

  it('sanitizes descriptions', async () => {
    const updateProject = new UpdateProject(mockSupabase);

    const actual = await updateProject.execute({
      description: '<script>window.alert()</script>malicious descriptious',
      projectId: 'test-id',
    });

    expect(mockUpdate).toHaveBeenCalledWith({
      description: 'malicious descriptious',
    });
  });

  it('sanitizes name updates', async () => {
    const updateProject = new UpdateProject(mockSupabase);

    const actual = await updateProject.execute({
      name: '<script>window.alert()</script>bad name',
      projectId: 'test-id',
    });

    expect(mockUpdate).toHaveBeenCalledWith({ name: 'bad name' });
  });

  it('fails if sanitized name update results in an empty string', async () => {
    const updateProject = new UpdateProject(mockSupabase);

    const actual = await updateProject.execute({
      name: '<script>window.alert()</script>',
      projectId: 'test-id',
    });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Name cannot be blank');
  });
});
