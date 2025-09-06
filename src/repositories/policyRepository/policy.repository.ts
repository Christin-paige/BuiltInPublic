import { AnySupabaseClient } from 'utils/supabase/server';
import { BaseRepository } from '../base.repository';
import {
  PolicyDocument,
  PolicyDocumentDTO,
  PolicyDocumentType,
} from './policy.types';

export class PolicyRepository extends BaseRepository<
  PolicyDocumentDTO,
  PolicyDocument
> {
  constructor(supabase: AnySupabaseClient) {
    super(supabase);
  }

  getRawBaseQuery(count: boolean = false) {
    const query = this.supabase
      .schema('policy')
      .from('policy_documents')
      .select(
        'id, version, content, effective_from, superseded_at, document_type'
      );

    return query;
  }

  transformDTO(row: PolicyDocumentDTO): PolicyDocument {
    const {
      id,
      version,
      content,
      effective_from,
      superseded_at,
      document_type,
    } = row;

    return {
      id,
      version,
      content,
      effectiveFrom: effective_from,
      supersededAt: superseded_at,
      documentType: document_type,
    };
  }

  async getAllActivePolicies(): Promise<PolicyDocument[]> {
    try {
      const query = this.getBaseQuery();

      const { data, error } = await this.applyFilters(query, {
        superseded_at: null,
      });

      if (error) {
        console.error(error);
        throw new Error('Cannot fetch policies');
      }

      const policies: PolicyDocument[] = [];

      for (const rawPolicy of data) {
        const policy = this.safeTransformDTO(rawPolicy);

        policies.push(rawPolicy);
      }

      return policies;
    } catch (e) {
      throw e;
    }
  }

  async getActivePolicyByType(
    policyType: PolicyDocumentType
  ): Promise<PolicyDocument | null> {
    try {
      const query = this.getBaseQuery();

      const { data, error } = await this.applyFilters(query, {
        superseded_at: null,
        document_type: policyType,
      }).maybeSingle();

      if (error) {
        console.error(error);
        throw new Error('Cannot fetch policy');
      }

      if (!data) {
        return null;
      }

      const policy = this.safeTransformDTO(data);

      return policy;
    } catch (e) {
      throw e;
    }
  }

  async getAllPoliciesByType(
    policyType: PolicyDocumentType
  ): Promise<PolicyDocument[]> {
    try {
      const query = this.getBaseQuery();

      const { data, error } = await this.applyFilters(query, {
        document_type: policyType,
      });

      if (error) {
        console.error(error);
        throw new Error('Cannot fetch policies');
      }

      const policies: PolicyDocument[] = [];

      for (const rawPolicy of data) {
        const policy = this.safeTransformDTO(rawPolicy);

        policies.push(policy);
      }

      return policies;
    } catch (e) {
      throw e;
    }
  }
}
