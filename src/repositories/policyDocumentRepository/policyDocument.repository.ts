// src/repositories/policyDocumentRepository/policyDocument.repository.ts
import { SupabaseClient } from '@supabase/supabase-js';

export type UiPolicyType = 'terms' | 'privacy' | 'cookies';

export interface PolicyDocument {
  id: string;
  version: string;
  created_at: string;
  document_type: string;   // enum: policy_doc_types
  effective_from: string;
  superseded_at: string | null;
  content: string;         // markdown or html
}

// Runtime validator (TS alone doesn’t protect at runtime)
function isUiPolicyType(x: unknown): x is UiPolicyType {
  return x === 'terms' || x === 'privacy' || x === 'cookies';
}

// Use a switch instead of bracket indexing so Semgrep can’t flag object injection
function uiToDbType(t: UiPolicyType): 'T&C' | 'privacy' | 'cookies' {
  switch (t) {
    case 'terms':
      return 'T&C'; // DB stores Terms & Conditions as T&C (or adjust to t_c if that’s your value)
    case 'privacy':
      return 'privacy';
    case 'cookies':
      return 'cookies';
  }
}

export class PolicyDocumentRepository {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Fetches the latest (non-superseded) policy document for a given type.
   * - Validates input at runtime
   * - Maps UI type to DB enum via a switch (no bracket lookup)
   * - Uses structured logging (no unsafe format strings)
   */
  async getCurrentByType(type: unknown): Promise<PolicyDocument | null> {
    if (!isUiPolicyType(type)) {
      console.warn('getCurrentByType: invalid type', { type });
      return null;
    }

    const dbType = uiToDbType(type);

    const { data, error } = await this.supabase
      .schema('policy')
      .from('policy_documents')
      .select('*')
      .eq('document_type', dbType)
      .is('superseded_at', null)
      .order('effective_from', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('getCurrentByType error', {
        uiType: type,
        dbType,
        code: (error as any)?.code,
        message: (error as any)?.message,
      });
      return null;
    }

    return (data as PolicyDocument) ?? null;
  }
}