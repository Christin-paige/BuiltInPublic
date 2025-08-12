import { BaseRepository } from '@/repositories/base.repository';
import { AnySupabaseClient } from 'utils/supabase/server';

export abstract class BaseUseCase<TParams> {
  supabase: AnySupabaseClient;

  constructor(supabase: AnySupabaseClient) {
    this.supabase = supabase;
  }

  abstract execute(
    params: TParams
  ): Promise<{ success: boolean; message: string }>;
}
