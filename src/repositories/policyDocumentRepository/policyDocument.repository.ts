// src/repositories/policyDocumentRepository/policyDocument.repository.ts
import { SupabaseClient } from '@supabase/supabase-js';

export type UiPolicyType = 'terms' | 'privacy' | 'cookies';

const DB_TYPE_MAP: Record<UiPolicyType, string> = {
  terms: 'T&C', // in your DB, "Terms & Conditions" is stored as t_c
  privacy: 'privacy',
  cookies: 'cookies',
};

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
   * Fetches the latest (non-superseded) policy document for a given type
   */
  async getCurrentByType(type: UiPolicyType): Promise<PolicyDocument | null> {
    const dbType = DB_TYPE_MAP[type];

    const { data, error } = await this.supabase
      .schema('policy')
      .from('policy_documents') // ✅ schema-qualified
      .select('*')
      .eq('document_type', dbType)
      .is('superseded_at', null)
      .order('effective_from', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(`getCurrentByType error [${type}]:`, error);
      return null;
    }

    return data as PolicyDocument | null;
  }
}
