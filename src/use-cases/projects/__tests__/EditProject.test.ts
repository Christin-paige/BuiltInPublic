import { SupabaseAnonClient } from 'utils/supabase/server';
import { beforeEach, expect, it, vi, describe } from 'vitest';
import { EditProject } from '../EditProject';

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

describe('Use case - EditProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockUpdate.mockReturnValue(mockSupabase);
    mockUpdateFails.mockReturnValue(mockSupabaseFails);
  });

  it('returns success: true and a message if update succeeds', async () => {
    const editProject = new EditProject(mockSupabase);

    const actual = await editProject.execute({
      description: 'a test project for testing project tests',
      projectId: 'test-id',
    });

    expect(actual.success).toBe(true);
    expect(actual.message).toBe('Project updated!');
  });

  it('returns success: false and a message if update fails', async () => {
    const editProject = new EditProject(mockSupabaseFails);

    const actual = await editProject.execute({ projectId: 'test-id' });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Project update failed');
  });

  it.each([
    'rick and morty a hundred years forever',
    'www.hundredyears.rickandmorty.com',
    'ww.wwww.rickandmorty.hundred.yearsadventure.com',
  ])('fails if a provided URL is invalid', async (url) => {
    const editProject = new EditProject(mockSupabase);

    const actual = await editProject.execute({
      external_url: url,
      projectId: 'test-id',
    });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Must be valid URL');
  });

  it('sanitizes descriptions', async () => {
    const editProject = new EditProject(mockSupabase);

    const actual = await editProject.execute({
      description: '<script>window.alert()</script>malicious descriptious',
      projectId: 'test-id',
    });

    expect(mockUpdate).toHaveBeenCalledWith({
      description: 'malicious descriptious',
    });
  });

  it('sanitizes name updates', async () => {
    const editProject = new EditProject(mockSupabase);

    const actual = await editProject.execute({
      name: '<script>window.alert()</script>bad name',
      projectId: 'test-id',
    });

    expect(mockUpdate).toHaveBeenCalledWith({ name: 'bad name' });
  });

  it('fails if sanitized name update results in an empty string', async () => {
    const editProject = new EditProject(mockSupabase);

    const actual = await editProject.execute({
      name: '<script>window.alert()</script>',
      projectId: 'test-id',
    });

    expect(actual.success).toBe(false);
    expect(actual.message).toBe('Name cannot be blank');
  });
});
