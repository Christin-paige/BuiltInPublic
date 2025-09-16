// src/hooks/usePolicy/actions.ts
'use server';

import { PolicyRepository } from '@/repositories/policyRepository/policy.repository';
import type {
  PolicyDocumentType,
  PolicyDocumentDTO,
} from '@/repositories/policyRepository/policy.types';
import { createAnonClient } from 'utils/supabase/server';

export type UiPolicyType = 'terms' | 'privacy' | 'cookies';

// If your DB enum literals are identical, this is a 1:1 map.
// If the DB uses different literals, change the right-hand side.
const UI_TO_DB: Record<UiPolicyType, PolicyDocumentType> = {
  terms: 'T&C',
  privacy: 'privacy',
  cookies: 'cookies',
};

// Helper: domain → DTO
function toDTO(p: {
  id: string;
  version: string;
  documentType: PolicyDocumentType;
  effectiveFrom: string;
  supersededAt: string | null;
  content: string;
}): PolicyDocumentDTO {
  return {
    id: p.id,
    version: p.version,
    document_type: p.documentType,
    effective_from: p.effectiveFrom,
    superseded_at: p.supersededAt,
    content: p.content,
  };
}

/** Latest (active/unsuperseded) policy for a given UI type, as PolicyDocumentDTO */
export async function fetchPolicyDocument(
  policyType: UiPolicyType
): Promise<PolicyDocumentDTO> {
  const supabase = await createAnonClient();
  const repo = new PolicyRepository(supabase);

  const dbType = UI_TO_DB[policyType];
  const policy = await repo.getActivePolicyByType(dbType);
  if (!policy) {
    throw new Error(`No active policy found for type "${policyType}"`);
  }
  return toDTO(policy);
}

/** (Optional) All versions for a type, newest → oldest, as PolicyDocumentDTO[] */
export async function fetchAllPolicyVersions(
  policyType: UiPolicyType
): Promise<PolicyDocumentDTO[]> {
  const supabase = await createAnonClient();
  const repo = new PolicyRepository(supabase);

  const dbType = UI_TO_DB[policyType];
  const policies = await repo.getAllPoliciesByType(dbType);
  // If you want most recent first and your BaseRepository doesn’t sort, sort here:
  // policies.sort((a, b) => b.effectiveFrom.localeCompare(a.effectiveFrom));
  return policies.map(toDTO);
}
