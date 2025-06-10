SET session_replication_role = replica;

-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '354943f2-a777-42df-9508-ba67c230c77b', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"codespheredevs+testuser1@gmail.com","user_id":"52810203-c8e4-4659-9ec7-749f51112737","user_phone":""}}', '2025-05-17 11:26:30.633242+00', ''),
	('00000000-0000-0000-0000-000000000000', '562a14a7-992a-406a-a8fe-e3fc9df5f1c9', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"codespheredevs+testuser2@gmail.com","user_id":"b25152c9-c936-4878-aa4f-7cd9f86f5f8a","user_phone":""}}', '2025-05-17 11:28:08.479042+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ef4a3a6-ddc1-4fac-98f5-d990cb1d5597', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"codespheredevs+testuser3@gmail.com","user_id":"bc7fa96c-3df6-45ad-b12f-0b543bc556a5","user_phone":""}}', '2025-05-17 11:29:11.425684+00', ''),
	('00000000-0000-0000-0000-000000000000', '3cb54fa9-5558-439d-a954-1feeee03b24b', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"codespheredevs+testuser4@gmail.com","user_id":"2f330616-6531-4dea-84f2-90871b2b58c1","user_phone":""}}', '2025-05-17 11:29:47.475368+00', '');


TRUNCATE TABLE auth."users" RESTART IDENTITY CASCADE;



INSERT INTO
    auth."users" (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        invited_at,
        confirmation_token,
        confirmation_sent_at,
        recovery_token,
        recovery_sent_at,
        email_change_token_new,
        email_change,
        email_change_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        created_at,
        updated_at,
        phone,
        phone_confirmed_at,
        phone_change,
        phone_change_token,
        phone_change_sent_at,
        email_change_token_current,
        email_change_confirm_status,
        banned_until,
        reauthentication_token,
        reauthentication_sent_at,
        is_sso_user,
        deleted_at,
        is_anonymous
    )
VALUES
    (
        '00000000-0000-0000-0000-000000000000',
        '52810203-c8e4-4659-9ec7-749f51112737',
        'authenticated',
        'authenticated',
        'codespheredevs+testuser1@gmail.com',
        '$2a$10$TVyWwuiSpLFxdc/NuX5yU.8mczOhBoWqKeCJUd16qD/FdPUQw4CfG',
        '2025-05-17 11:26:30.634158+00',
        NULL,
        '',
        NULL,
        '',
        NULL,
        '',
        '',
        NULL,
        NULL,
        '{"provider":"email","providers":["email"]}',
        '{"email_verified":true}',
        NULL,
        '2025-05-17 11:26:30.63047+00',
        '2025-05-17 11:26:30.634919+00',
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        false
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'b25152c9-c936-4878-aa4f-7cd9f86f5f8a',
        'authenticated',
        'authenticated',
        'codespheredevs+testuser2@gmail.com',
        '$2a$10$bAOVDu9h677odyLKK.Pts.iqSIXxeGXGs91asR3v/g1wRrNP1D/aa',
        '2025-05-17 11:28:08.47943+00',
        NULL,
        '',
        NULL,
        '',
        NULL,
        '',
        '',
        NULL,
        NULL,
        '{"provider":"email","providers":["email"]}',
        '{"email_verified":true}',
        NULL,
        '2025-05-17 11:28:08.478217+00',
        '2025-05-17 11:28:08.479641+00',
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        false
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'bc7fa96c-3df6-45ad-b12f-0b543bc556a5',
        'authenticated',
        'authenticated',
        'codespheredevs+testuser3@gmail.com',
        '$2a$10$wD5X2sPCkt3wu9T.if1l7.WPK6CaLrLP/r6l21AwlEuH7gjIc3/MS',
        '2025-05-17 11:29:11.426042+00',
        NULL,
        '',
        NULL,
        '',
        NULL,
        '',
        '',
        NULL,
        NULL,
        '{"provider":"email","providers":["email"]}',
        '{"email_verified":true}',
        NULL,
        '2025-05-17 11:29:11.42485+00',
        '2025-05-17 11:29:11.426252+00',
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        false
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '2f330616-6531-4dea-84f2-90871b2b58c1',
        'authenticated',
        'authenticated',
        'codespheredevs+testuser4@gmail.com',
        '$2a$10$ewfOI44WyxuZFSzg7BIRwOA.Jk3loZVSU9tHcjIpf4hfW/Yz6L7E2',
        '2025-05-17 11:29:47.475752+00',
        NULL,
        '',
        NULL,
        '',
        NULL,
        '',
        '',
        NULL,
        NULL,
        '{"provider":"email","providers":["email"]}',
        '{"email_verified":true}',
        NULL,
        '2025-05-17 11:29:47.474285+00',
        '2025-05-17 11:29:47.475974+00',
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        false
    );

ALTER TABLE auth."users" ENABLE ROW LEVEL SECURITY;

-- Seed auth.identities table
CREATE EXTENSION IF NOT EXISTS pgcrypto
WITH SCHEMA public;

-- Temporarily disable RLS on auth.identities
ALTER TABLE auth.identities DISABLE ROW LEVEL SECURITY;

-- Insert one identity row per user
INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('52810203-c8e4-4659-9ec7-749f51112737', '52810203-c8e4-4659-9ec7-749f51112737', '{"sub": "52810203-c8e4-4659-9ec7-749f51112737", "email": "codespheredevs+testuser1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-05-17 11:26:30.632768+00', '2025-05-17 11:26:30.632789+00', '2025-05-17 11:26:30.632789+00', '81070f06-8a18-4441-86b5-ceb9f3f88f8a'),
	('b25152c9-c936-4878-aa4f-7cd9f86f5f8a', 'b25152c9-c936-4878-aa4f-7cd9f86f5f8a', '{"sub": "b25152c9-c936-4878-aa4f-7cd9f86f5f8a", "email": "codespheredevs+testuser2@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-05-17 11:28:08.478698+00', '2025-05-17 11:28:08.478715+00', '2025-05-17 11:28:08.478715+00', '66163b74-abb2-4dfe-9a65-333a2b16c0fc'),
	('bc7fa96c-3df6-45ad-b12f-0b543bc556a5', 'bc7fa96c-3df6-45ad-b12f-0b543bc556a5', '{"sub": "bc7fa96c-3df6-45ad-b12f-0b543bc556a5", "email": "codespheredevs+testuser3@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-05-17 11:29:11.425378+00', '2025-05-17 11:29:11.425395+00', '2025-05-17 11:29:11.425395+00', '4d1564e1-5bfc-40a4-ac88-68b1ed439674'),
	('2f330616-6531-4dea-84f2-90871b2b58c1', '2f330616-6531-4dea-84f2-90871b2b58c1', '{"sub": "2f330616-6531-4dea-84f2-90871b2b58c1", "email": "codespheredevs+testuser4@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-05-17 11:29:47.474948+00', '2025-05-17 11:29:47.474969+00', '2025-05-17 11:29:47.474969+00', '7a3cbd28-747c-4641-9f79-e0bb246ac4a4');

-- Re-enable RLS
ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

-- Create insert policy for profile setup
DROP POLICY IF EXISTS "Allow inserts into profiles for setup" ON public.profiles;

CREATE POLICY "Allow inserts into profiles for setup" ON public.profiles FOR INSERT TO public
WITH CHECK (true);


-- Seed public tables
-- Seed profiles table
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

TRUNCATE TABLE public.profiles RESTART IDENTITY CASCADE;

INSERT INTO
    public.profiles (id, username, avatar_url)
VALUES
    (
        '52810203-c8e4-4659-9ec7-749f51112737',
        'testuser1',
        'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740'
    ),
    (
        'b25152c9-c936-4878-aa4f-7cd9f86f5f8a',
        'testuser2',
        'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740'
    ),
    (
        'bc7fa96c-3df6-45ad-b12f-0b543bc556a5',
        'testuser3',
        'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740'
    ),
    (
        '2f330616-6531-4dea-84f2-90871b2b58c1',
        'testuser4',
        'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740'
    );

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- skills
ALTER TABLE public.skills DISABLE ROW LEVEL SECURITY;

TRUNCATE TABLE public.skills RESTART IDENTITY CASCADE;

INSERT INTO
    public.skills (name)
VALUES
    ('JavaScript'),
    ('Python'),
    ('Security'),
    ('DevOps'),
    ('UI/UX');

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- profile_skills
ALTER TABLE public.profile_skills DISABLE ROW LEVEL SECURITY;

TRUNCATE TABLE public.profile_skills CASCADE;

INSERT INTO
    public.profile_skills (profile_id, skill_id, level)
VALUES
    ('52810203-c8e4-4659-9ec7-749f51112737', 1, 4),
    ('b25152c9-c936-4878-aa4f-7cd9f86f5f8a', 2, 5),
    ('bc7fa96c-3df6-45ad-b12f-0b543bc556a5', 3, 3),
    ('2f330616-6531-4dea-84f2-90871b2b58c1', 4, 2);

ALTER TABLE public.profile_skills ENABLE ROW LEVEL SECURITY;

-- projects
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;

TRUNCATE TABLE public.projects RESTART IDENTITY CASCADE;

INSERT INTO
    public.projects (owner_id, name, description, visibility, repo_url)
VALUES
    (
        '52810203-c8e4-4659-9ec7-749f51112737', -- corrected UUID
        'Project Alpha',
        'Sample project',
        'public',
        'https://github.com/test1/alpha'
    ),
    (
        'b25152c9-c936-4878-aa4f-7cd9f86f5f8a',
        'Project Beta',
        'Sample project',
        'connections',
        'https://github.com/test2/beta'
    );

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- posts
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;

TRUNCATE TABLE public.posts RESTART IDENTITY CASCADE;

INSERT INTO
    public.posts (id, user_id, content, visibility)
VALUES
    (
        '11111111-1111-1111-1111-111111111111',
        '52810203-c8e4-4659-9ec7-749f51112737',
        'Hello world',
        'public'
    ),
    (
        '22222222-2222-2222-2222-222222222222',
        'b25152c9-c936-4878-aa4f-7cd9f86f5f8a',
        'Hi there',
        'public'
    ),
    (
        '33333333-3333-3333-3333-333333333333',
        'bc7fa96c-3df6-45ad-b12f-0b543bc556a5',
        'Security matters',
        'public'
    );

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;




-- Set the sequence value for the refresh_tokens table
SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);

-- Set the sequence value for the hooks table
SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);

RESET ALL;
