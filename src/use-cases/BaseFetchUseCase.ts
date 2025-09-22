import { AnySupabaseClient } from 'utils/supabase/server';

export abstract class BaseFetchUseCase<TParams, TEntity> {
  protected supabase: AnySupabaseClient;

  constructor(supabase: AnySupabaseClient) {
    this.supabase = supabase;
  }

  abstract execute(params: TParams): Promise<TEntity | null>;
}
