import { Database } from 'supabase/supabase.types';

export type PolicyDocumentType =
  Database['policy']['Enums']['policy_doc_types'];

export interface PolicyDocumentDTO {
  id: string;
  version: string;
  document_type: PolicyDocumentType;
  effective_from: string;
  superseded_at: string | null;
  content: string;
}

export interface PolicyDocument {
  id: string;
  version: string;
  documentType: PolicyDocumentType;
  effectiveFrom: string;
  supersededAt: string | null;
  content: string;
}
