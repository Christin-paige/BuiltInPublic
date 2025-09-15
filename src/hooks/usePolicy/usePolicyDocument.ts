'use client';

import { useQuery } from '@tanstack/react-query';
import UINotification from '@/services/UINotification.service';

/** Shared types */
export type UiPolicyType = 'terms' | 'privacy' | 'cookies';

export type PolicyDocDTO = {
  title: string;
  version: string;
  effective_from?: string;
  content: string; // treat as plain text for now
};

/** Query keys */
export const policyDocQueryKeys = {
  all: ['policy'] as const,
  policyType: (policyType: UiPolicyType) =>
    [...policyDocQueryKeys.all, policyType] as const,
};

/** Single public hook */
export default function usePolicyDocument(policyType: UiPolicyType) {
  const { data, isLoading, error } = useQuery<PolicyDocDTO, Error>({
    queryKey: policyDocQueryKeys.policyType(policyType),
    queryFn: () => fetchPolicyDocument(policyType),
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  if (error) UINotification.error('Error fetching policy');

  return { data, isLoading, error };
}
