import { BaseMutationUseCase } from '../BaseMutationUseCase';
import { Database } from 'supabase/supabase.types';

export interface UserConsentParams {
  userId: string;
  policyId: string;
  ipAddress: string;
  userAgent: string;
  consentMethod: Database['policy']['Enums']['consent_methods'];
}

export class UserConsent extends BaseMutationUseCase<UserConsentParams> {
  async execute(
    params: UserConsentParams
  ): Promise<{ success: boolean; message: string }> {
    const { userId, policyId, ipAddress, userAgent, consentMethod } = params;

    try {
      const { error: insertedConsentError } = await this.supabase
        .schema('policy')
        .from('user_consents')
        .insert({
          user_id: userId,
          ip_address: ipAddress,
          document_id: policyId,
          user_agent: userAgent,
          consent_method: consentMethod,
        });

      if (insertedConsentError) {
        console.error(insertedConsentError);
        throw new Error('Cannot insert user consent');
      }

      return { success: true, message: 'Consent added' };
    } catch (e) {
      if (e instanceof Error) {
        return { success: false, message: e.message };
      }

      return { success: false, message: 'Unknown error' };
    }
  }
}
