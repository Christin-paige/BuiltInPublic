// src/hooks/usePolicy/actions.ts
'use server';

import { PolicyRepository } from '@/repositories/policyRepository/policy.repository';
import { createAnonClient } from 'utils/supabase/server';
import type {
  PolicyDocumentDTO,
  PolicyDocumentType,
} from '@/repositories/policyRepository/policy.types';

export async function fetchPolicyDocument(
  policyType: PolicyDocumentType
): Promise<PolicyDocumentDTO> {
  const supabase = await createAnonClient();
  const repo = new PolicyRepository(supabase);

  const policy = await repo.getActivePolicyByType(policyType);
  if (!policy) {
    throw new Error(`No active policy found for type "${policyType}"`);
  }

  // map domain → DTO (camelCase → snake_case)
  return {
    id: policy.id,
    version: policy.version,
    document_type: policy.documentType,
    effective_from: policy.effectiveFrom,
    superseded_at: policy.supersededAt,
    content: policy.content,
  };
}
