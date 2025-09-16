// src/hooks/usePolicy/usePolicyDocument.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import UINotification from '@/services/UINotification.service';
import { fetchPolicyDocument } from './actions';
import type {
  PolicyDocumentDTO,
  PolicyDocumentType,
} from '@/repositories/policyRepository/policy.types';

export const policyDocQueryKeys = {
  all: ['policy'] as const,
  byType: (type: PolicyDocumentType) =>
    [...policyDocQueryKeys.all, type] as const,
};

export function usePolicyDocument(type: PolicyDocumentType) {
  return useQuery<PolicyDocumentDTO>({
    queryKey: policyDocQueryKeys.byType(type),
    queryFn: async () => {
      try {
        return await fetchPolicyDocument(type);
      } catch (err) {
        UINotification.error('Failed to fetch policy document');
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}