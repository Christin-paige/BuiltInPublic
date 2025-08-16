import { AnySupabaseClient } from 'utils/supabase/server';

export abstract class BaseMutationUseCase<TParams> {
  supabase: AnySupabaseClient;

  constructor(supabase: AnySupabaseClient) {
    this.supabase = supabase;
  }

  abstract execute(
    params: TParams
  ): Promise<{ success: boolean; message: string }>;

  protected compactUpdateData(updateData: Partial<TParams>): Partial<TParams> {
    if (!(updateData satisfies Partial<TParams>)) {
      throw new Error('INVALID_UPDATE_DATA');
    }

    const update = Object.fromEntries(
      Object.entries(updateData).filter(
        ([key, value]) => value !== null && value !== undefined && value !== ''
      )
    ) as Partial<TParams>;

    if (!Object.entries(update).length) {
      throw new Error('NO_VALID_FIELDS');
    }

    return update;
  }
}
