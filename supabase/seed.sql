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
--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('52810203-c8e4-4659-9ec7-749f51112737', '52810203-c8e4-4659-9ec7-749f51112737', '{"sub": "52810203-c8e4-4659-9ec7-749f51112737", "email": "codespheredevs+testuser1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-05-17 11:26:30.632768+00', '2025-05-17 11:26:30.632789+00', '2025-05-17 11:26:30.632789+00', '81070f06-8a18-4441-86b5-ceb9f3f88f8a'),
	('b25152c9-c936-4878-aa4f-7cd9f86f5f8a', 'b25152c9-c936-4878-aa4f-7cd9f86f5f8a', '{"sub": "b25152c9-c936-4878-aa4f-7cd9f86f5f8a", "email": "codespheredevs+testuser2@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-05-17 11:28:08.478698+00', '2025-05-17 11:28:08.478715+00', '2025-05-17 11:28:08.478715+00', '66163b74-abb2-4dfe-9a65-333a2b16c0fc'),
	('bc7fa96c-3df6-45ad-b12f-0b543bc556a5', 'bc7fa96c-3df6-45ad-b12f-0b543bc556a5', '{"sub": "bc7fa96c-3df6-45ad-b12f-0b543bc556a5", "email": "codespheredevs+testuser3@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-05-17 11:29:11.425378+00', '2025-05-17 11:29:11.425395+00', '2025-05-17 11:29:11.425395+00', '4d1564e1-5bfc-40a4-ac88-68b1ed439674'),
	('2f330616-6531-4dea-84f2-90871b2b58c1', '2f330616-6531-4dea-84f2-90871b2b58c1', '{"sub": "2f330616-6531-4dea-84f2-90871b2b58c1", "email": "codespheredevs+testuser4@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-05-17 11:29:47.474948+00', '2025-05-17 11:29:47.474969+00', '2025-05-17 11:29:47.474969+00', '7a3cbd28-747c-4641-9f79-e0bb246ac4a4');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
