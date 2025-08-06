import { BaseRepository } from '@/repositories/base.repository';
import { AnySupabaseClient } from 'utils/supabase/server';

export abstract class BaseUseCase<
  Tr extends BaseRepository<any, any, any>,
  TParams,
> {
  repository: Tr;
  supabase: AnySupabaseClient;

  constructor(repository: Tr, supabase: AnySupabaseClient) {
    this.repository = repository;
    this.supabase = supabase;
  }

  abstract execute(
    params: TParams
  ): Promise<{ success: boolean; message: string }>;
}
