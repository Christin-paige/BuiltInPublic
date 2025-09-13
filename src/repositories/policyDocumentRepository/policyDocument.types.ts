// src/repositories/policyDocumentRepository/policyDocument.types.ts

export type UiPolicyType = 'terms' | 'privacy' | 'cookies';

export interface PolicyDocument {
  id: string;
  version: string;
  created_at: string;
  document_type: string; // stored as enum in DB (t_c, privacy, cookies)
  effective_from: string;
  superseded_at: string | null;
  content: string; // markdown or html text of the policy
}
