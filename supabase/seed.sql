-- Seed data for Supabase database
-- This file is automatically run when doing a database reset

-- Insert test policy document into policy.policy_documents table
INSERT INTO policy.policy_documents (document_type, version, effective_from, content)
VALUES (
  'T&C',
  '0.0.1',
  now(),
  'I agree to all of the things,
  even the things that contradict the other things,
  regardless of consequence, forever and always.'
)
ON CONFLICT DO NOTHING;
