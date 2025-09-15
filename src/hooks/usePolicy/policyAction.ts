export type UiPolicyType = 'terms' | 'privacy' | 'cookies';

export type PolicyDocDTO = {
  title: string;
  version: string;
  effective_from?: string;
  content: string; // plain text for now
};

export async function fetchPolicyDocument(policyType: UiPolicyType): Promise<PolicyDocDTO> {
  const res = await fetch(`/api/policy?type=${encodeURIComponent(policyType)}`, {
    headers: { accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Policy fetch failed (${res.status})`);
  return (await res.json()) as PolicyDocDTO;
}
