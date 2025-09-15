import { fetchPolicyDocument } from '@/app/(main)/onboarding/onboarding-form/actions';

export type PolicyDocDTO = {
  title: string;
  version: string;
  effective_from?: string;
  content: string; // plain text for now
};

export { fetchPolicyDocument };
