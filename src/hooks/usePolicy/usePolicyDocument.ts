// src/hooks/usePolicy/usePolicyDocument.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import UINotification from '@/services/UINotification.service';
import { fetchPolicyDocument, PolicyDocDTO, UiPolicyType } from './actions';
import { PolicyDocument, PolicyDocumentType } from '@/repositories/policyRepository/policy.types';
import { PolicyRepository } from '@/repositories/policyRepository/policy.repository';

/** Query keys */
export const policyDocQueryKeys = {
  all: ['policy'] as const,
  policyType: (policyType: UiPolicyType) =>
    [...policyDocQueryKeys.all, policyType] as const,
};

/** Hook */
export function usePolicyDocument(policyType: UiPolicyType) {
  return useQuery<PolicyDocDTO>({
    queryKey: policyDocQueryKeys.policyType(policyType),
    queryFn: async () => {
      try {
        return await fetchPolicyDocument(policyType);
      } catch (err: any) {
        UINotification.error('Failed to fetch policy document');
        throw err;
      }
    },
  });
}