// src/repositories/policyDocumentRepository/policyDocument.repository.ts
import { SupabaseClient } from '@supabase/supabase-js';

export type UiPolicyType = 'terms' | 'privacy' | 'cookies';

// Freeze + const-assert to prevent accidental mutation and limit keys/values
const DB_TYPE_MAP = Object.freeze({
  terms: 'T&C', // DB stores "Terms & Conditions" as T&C (or t_c if you prefer)
  privacy: 'privacy',
  cookies: 'cookies',
} as const satisfies Record<UiPolicyType, string>);

// Runtime type guard (TS types don’t protect at runtime)
function isUiPolicyType(x: unknown): x is UiPolicyType {
  return x === 'terms' || x === 'privacy' || x === 'cookies';
}

export interface PolicyDocument {
  id: string;
  version: string;
  created_at: string;
  document_type: string; // enum: policy_doc_types
  effective_from: string;
  superseded_at: string | null;
  content: string; // markdown or html
}

export class PolicyDocumentRepository {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Fetches the latest (non-superseded) policy document for a given type.
   * - Validates `type` at runtime
   * - Maps UI type to DB enum via a frozen allowlist
   * - Uses structured logging (no format-string risks)
   */
  async getCurrentByType(type: unknown): Promise<PolicyDocument | null> {
    if (!isUiPolicyType(type)) {
      // structured log; no string concat or dynamic format strings
      console.warn('getCurrentByType: invalid type', { type });
      return null;
    }

    const dbType = DB_TYPE_MAP[type]; // ✅ safe: vetted key from a frozen map

    const { data, error } = await this.supabase
      .schema('policy')
      .from('policy_documents')
      .select('*')
      .eq('document_type', dbType) // ✅ parameterized by supabase-js
      .is('superseded_at', null)
      .order('effective_from', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      // structured log that won’t trigger unsafe-formatstring or leak objects in odd ways
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
