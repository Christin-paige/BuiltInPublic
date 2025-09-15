'use client';

import { useQuery } from '@tanstack/react-query';
import UINotification from '@/services/UINotification.service';
import { fetchPolicyDocument, PolicyDocDTO } from './actions';

/** Query keys */
export const policyDocQueryKeys = {
  all: ['policy'] as const,
  policyType: (policyType: UiPolicyType) =>
    [...policyDocQueryKeys.all, policyType] as const,
};
