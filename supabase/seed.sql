
SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'e6e14b3f-5bee-437b-84b4-a7f5d9471ac0', '{"action":"user_signedup","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}', '2025-04-14 18:00:02.576696+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce91f57f-f2db-4d94-a818-a0d83845d061', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:00:03.013689+00', ''),
	('00000000-0000-0000-0000-000000000000', '97c9c2d9-a6e7-40c4-a1ba-8735babd6ae1', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:07:21.295722+00', ''),
	('00000000-0000-0000-0000-000000000000', '59162915-3676-42f9-af76-72e266b23775', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:07:21.732842+00', ''),
	('00000000-0000-0000-0000-000000000000', '15c803b0-4faa-4c85-afbd-01d70323217b', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:12:27.207986+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b4e46ad0-8130-413a-bfca-45431a54e4c5', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:12:27.591066+00', ''),
	('00000000-0000-0000-0000-000000000000', '1dafa99b-b74e-4b31-80ed-48285998ef34', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:15:59.607211+00', ''),
	('00000000-0000-0000-0000-000000000000', '0f6be7be-4e8f-4215-902e-baf9e89b0b1f', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:15:59.998271+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cd88c41c-5393-4cc8-bfea-719dadbd00ad', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:16:32.862008+00', ''),
	('00000000-0000-0000-0000-000000000000', 'adae9ead-87db-4221-9e31-d1d3667025fb', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:16:33.313815+00', ''),
	('00000000-0000-0000-0000-000000000000', '2eb68679-7ac6-4834-829f-aab807d67d3c', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:16:58.783695+00', ''),
	('00000000-0000-0000-0000-000000000000', '14b6d8b6-b3d1-4ef7-a749-1941d47a74bd', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:16:59.104286+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db59fed5-94c8-4587-9001-02da5bfdab24', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:41:10.899583+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ff51d0be-fa14-49e5-9472-8c47d466290f', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:41:11.364871+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c0142ba-baf6-46e8-b5db-663fa182a780', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:41:15.211928+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d7f4005-1734-488b-8eb2-e834200dc040', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:41:15.475593+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee65407d-044b-4384-b64c-5422e3e045ab', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:42:17.259877+00', ''),
	('00000000-0000-0000-0000-000000000000', '09f3ea16-8c67-4531-a978-20b338f26c84', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:42:17.469135+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6f6b7e6-ff69-4a21-8287-16e5ffef98a0', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:42:22.086707+00', ''),
	('00000000-0000-0000-0000-000000000000', '845152e1-5938-41a6-84a1-b35b175e8a8d', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:42:22.258965+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e3d0c9fb-920d-44f7-a8f0-f24d29b59386', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:43:01.664786+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e71a3e15-7e74-40d1-b7cd-44370cd6f729', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:43:01.874551+00', ''),
	('00000000-0000-0000-0000-000000000000', '6df099b2-5c5a-45f2-a984-c115b55d9563', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:44:07.591243+00', ''),
	('00000000-0000-0000-0000-000000000000', '18556157-cac6-4c43-b859-d727ffe51ad0', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:44:07.785421+00', ''),
	('00000000-0000-0000-0000-000000000000', '34af38aa-42b1-49a5-8a87-cce1d85c126b', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:44:32.16725+00', ''),
	('00000000-0000-0000-0000-000000000000', '77b8edea-2abe-4bf9-9a62-4e0ec809fdee', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:44:32.345427+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d2a24e4-b782-40b0-978c-ce4ccc2cfd37', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:46:26.156194+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ee8cd66-8179-4c1e-b226-d807048371b8', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:46:26.452101+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0e11d55-5f7b-44cc-a0ce-bb7fc09a3b57', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-14 18:52:33.386621+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f192e0e9-b4a3-472b-ae15-067b9a358283', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:52:38.80078+00', ''),
	('00000000-0000-0000-0000-000000000000', '4000aece-b9ee-4cf3-b6cd-d5dda6f7e523', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:52:38.976987+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e87f098-acdd-409c-937c-0890b989f814', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-14 18:52:44.934487+00', ''),
	('00000000-0000-0000-0000-000000000000', '490c2756-9772-433c-a590-7bd07e2f4a0d', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:53:14.499553+00', ''),
	('00000000-0000-0000-0000-000000000000', '7349a3b3-2ab1-46bf-a0cf-b80840cca1dd', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:53:14.69982+00', ''),
	('00000000-0000-0000-0000-000000000000', '77e6d6a3-5e50-42ca-92bb-01408f32760f', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-14 18:56:20.24717+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c40191e1-c1e3-42af-83c1-1434af2f5c06', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:56:23.102242+00', ''),
	('00000000-0000-0000-0000-000000000000', '66313ea3-24b6-4b95-968e-22a806782b59', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:56:23.415685+00', ''),
	('00000000-0000-0000-0000-000000000000', '11629d51-178c-408d-86f3-c02112033a2c', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-14 18:57:28.767747+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb7615be-01fe-4bbb-baac-3be6a4512b49', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 18:57:51.365523+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b4703ced-f0a7-470e-9c7a-afe9974107e5', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 18:57:51.746425+00', ''),
	('00000000-0000-0000-0000-000000000000', '3626c2f2-e4f4-4dd7-bf64-431d76be031e', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-14 18:59:17.494835+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd042f56-9c65-40a8-870f-f03726bd6974', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 19:01:31.771389+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d70ab56-92d0-474e-a931-f0165796c132', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 19:01:32.251174+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e25c8292-3562-4588-b996-65e72d2f8284', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-14 19:01:34.516716+00', ''),
	('00000000-0000-0000-0000-000000000000', '872c7aa5-2e90-412d-b9d6-34858b3ff07e', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 19:48:49.61049+00', ''),
	('00000000-0000-0000-0000-000000000000', '7a8c9944-4cc9-47ce-8311-8b89ef0468b7', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 19:48:49.924613+00', ''),
	('00000000-0000-0000-0000-000000000000', '51827fa9-d78e-44b4-999b-d0cb356b8104', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-14 19:49:08.904381+00', ''),
	('00000000-0000-0000-0000-000000000000', '843495f5-9291-4ffb-8a74-b952b671ed14', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 19:51:53.37082+00', ''),
	('00000000-0000-0000-0000-000000000000', '43a061ca-c39a-42e7-b24d-4bfba4b7fcb7', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 19:51:53.667624+00', ''),
	('00000000-0000-0000-0000-000000000000', '42db656b-d55e-43fb-ad81-ff093fa71be3', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-14 19:51:57.034017+00', ''),
	('00000000-0000-0000-0000-000000000000', '50d28583-e52c-4ec9-b8c9-cc55b1f4d6a9', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 20:26:28.713461+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8a2c677-f855-4206-bd76-6689e692b5aa', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 20:26:29.321599+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4ba8ba2-748b-4c66-8417-41f1916f719c', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-14 20:27:18.876185+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b47f016c-d1e3-490d-a3eb-71b8e4a43065', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-14 20:27:28.4863+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d45535c-3922-46df-b6e5-ce24af643424', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-14 20:27:28.737188+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b4dd832d-71aa-4e53-b6ec-ba4a9a57f588', '{"action":"token_refreshed","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 11:42:18.270324+00', ''),
	('00000000-0000-0000-0000-000000000000', '86dfd9de-e4ad-4fb8-97fe-e19595f05fcf', '{"action":"token_revoked","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 11:42:18.275861+00', ''),
	('00000000-0000-0000-0000-000000000000', '10ac5d65-4983-43d0-89f3-a0fa3ecdd053', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-15 11:42:20.551121+00', ''),
	('00000000-0000-0000-0000-000000000000', 'beafdf5b-34c0-4f37-a4ac-55f23932618e', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-15 14:01:14.499628+00', ''),
	('00000000-0000-0000-0000-000000000000', '4989c5a2-4b0b-44d2-9ce2-2f765e1c71c3', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-15 14:01:15.061019+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f3b8678f-6b69-4891-aac1-5cb950cc8cc4', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-15 14:15:49.133064+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fdfc39f2-e011-4082-bd76-e7d3d2be3581', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-15 14:16:53.120246+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a16ba111-5199-4da1-8a9c-7b5a61ffdec6', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-15 14:16:53.423389+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f35ffe4b-b62f-4c16-aa24-28035ec6c642', '{"action":"token_refreshed","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 15:15:14.271158+00', ''),
	('00000000-0000-0000-0000-000000000000', '42836102-d6d3-4a9c-9e94-821b0ea3a328', '{"action":"token_revoked","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 15:15:14.2736+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fbfaee67-c791-41e3-bc69-3038eb39a337', '{"action":"token_refreshed","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 16:18:14.463321+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c201d9f-9d89-4682-a84c-458b85e5c87b', '{"action":"token_revoked","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 16:18:14.465624+00', ''),
	('00000000-0000-0000-0000-000000000000', '4bcab6d1-3b22-4cda-b7de-625b7ed29b7b', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-15 16:40:02.440975+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ba2a393-07cb-4f18-8978-52fc9792036b', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-15 16:40:07.579447+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ff3fe74d-6620-4490-a242-36809eb600d7', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-15 16:40:07.998196+00', ''),
	('00000000-0000-0000-0000-000000000000', '3cefe9cf-ca9a-44ce-ac06-bee002867fee', '{"action":"token_refreshed","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 17:38:08.476392+00', ''),
	('00000000-0000-0000-0000-000000000000', '97399093-02af-4bbf-aaea-b439060dd6ef', '{"action":"token_revoked","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 17:38:08.477351+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd60e9c08-dc51-4782-b498-d8a38a742b86', '{"action":"token_refreshed","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 18:36:20.746021+00', ''),
	('00000000-0000-0000-0000-000000000000', '286c7af9-6243-40f8-9ca7-a15aa8c4b34e', '{"action":"token_revoked","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 18:36:20.748524+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f0a194fa-b939-4157-89d4-ebf8e24f4cc6', '{"action":"token_refreshed","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 20:01:19.444738+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af4c2cc2-4fbc-495c-9f99-2babcd2f7573', '{"action":"token_revoked","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 20:01:19.446871+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ebd9b473-8795-46ef-8667-b2076a2646ab', '{"action":"token_refreshed","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 20:59:20.035423+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f399fa41-ee73-4fc5-81cb-24fa0b3900e3', '{"action":"token_revoked","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 20:59:20.037048+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2fb1bdb-0130-4c7b-928a-f05cd70a429c', '{"action":"token_refreshed","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 11:20:26.326945+00', ''),
	('00000000-0000-0000-0000-000000000000', '0915f7c1-83bb-4e41-a3fc-dfb23a3c7b93', '{"action":"token_revoked","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 11:20:26.337207+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e3f9e40-127a-46d8-bd5d-0298fa5d4321', '{"action":"token_refreshed","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 13:01:32.578747+00', ''),
	('00000000-0000-0000-0000-000000000000', '9cb446e2-c4fb-4bd6-afc4-f8a6e65838d2', '{"action":"token_revoked","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 13:01:32.581444+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bc815f45-a8b0-42ef-afa1-d2e1ff1f2143', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-16 13:01:44.597717+00', ''),
	('00000000-0000-0000-0000-000000000000', '8938b850-577b-408a-8f6e-3e81f6bcc083', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-16 13:02:06.65535+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ae6eda6-cdce-475d-a5ca-0d36e25ef515', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-16 13:02:07.263748+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9a6ea8d-811d-46e8-8944-8b4351a7d38e', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-16 13:03:08.942937+00', ''),
	('00000000-0000-0000-0000-000000000000', '91a896dc-55ee-4c8f-a65b-7fbb27357f00', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-16 15:49:02.400043+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f510d0e8-f343-4e75-9b58-e638b2774ae1', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-16 15:49:02.984696+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce290a82-e112-4c6a-9b0f-6969018a1ef3', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-16 15:49:17.455935+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d6ed6dc-470e-4ceb-9c05-e85b697edf22', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-16 15:52:03.794845+00', ''),
	('00000000-0000-0000-0000-000000000000', '508c086b-4884-4811-b382-9bec8cb5335e', '{"action":"login","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-16 15:52:04.114867+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ba918af-24aa-4e0c-abd4-c3c478a93864', '{"action":"logout","actor_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-16 16:38:15.109086+00', ''),
	('00000000-0000-0000-0000-000000000000', '6172ba78-313f-4a84-8799-5594cd27c357', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"christinpmartin@gmail.com","user_id":"3d6fa0dd-37f4-4d2f-a068-dd93b37a6a8a","user_phone":""}}', '2025-04-16 16:38:57.252974+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b0d76f0-3c31-40d8-a560-2f5c24d9dda0', '{"action":"user_signedup","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}', '2025-04-16 16:39:22.023377+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bdad5225-0949-4e14-8f1f-55a3e0b00a4f', '{"action":"login","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-16 16:39:22.657596+00', ''),
	('00000000-0000-0000-0000-000000000000', '5f74c9e1-f229-4c12-bb80-2a373c16e907', '{"action":"logout","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-16 17:00:02.422353+00', ''),
	('00000000-0000-0000-0000-000000000000', '33d39e63-7e45-48a1-b4b8-45a4b5259cdb', '{"action":"login","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-16 17:00:08.309137+00', ''),
	('00000000-0000-0000-0000-000000000000', '95694d84-5ce2-4f10-977d-7176075acf44', '{"action":"login","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-16 17:00:08.596708+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c310067c-19d8-4ea7-8618-913a4691d3f3', '{"action":"logout","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-16 17:43:24.304547+00', ''),
	('00000000-0000-0000-0000-000000000000', '300dd4f9-f143-41c4-943d-ea4af4658af7', '{"action":"login","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-16 17:43:30.516327+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c7f96126-13d1-4ed2-bb66-445b49115f03', '{"action":"login","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-16 17:43:30.908477+00', ''),
	('00000000-0000-0000-0000-000000000000', '52c61b54-b105-4740-b097-018ba93bd941', '{"action":"logout","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-16 17:53:19.285753+00', ''),
	('00000000-0000-0000-0000-000000000000', '79b8f264-8867-4eae-a258-0202b9550d11', '{"action":"login","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-16 17:53:23.322354+00', ''),
	('00000000-0000-0000-0000-000000000000', '5c742653-7ea2-46f0-9e36-7292b0ea17a7', '{"action":"login","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-16 17:53:23.766668+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a0c7694-1495-431c-9375-d74983a01b3a', '{"action":"logout","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-16 18:25:07.838419+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cf786dcf-cbbf-4ee6-89db-0684b204e26a', '{"action":"login","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-16 18:25:14.631026+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df222114-14dd-45c1-9034-03f1402c5322', '{"action":"login","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-16 18:25:15.059405+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a48fa4d3-401b-4f94-82b6-4aa203471327', '{"action":"logout","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-16 18:31:51.983967+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e1c4e31c-22cb-4100-8eba-6c511a0d2c2d', '{"action":"login","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-16 18:31:54.930569+00', ''),
	('00000000-0000-0000-0000-000000000000', '16383123-c971-429d-86d6-2b572cde68b7', '{"action":"login","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-16 18:31:55.310676+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dac7a075-da8a-4dfe-85f4-8e616c0bee2e', '{"action":"logout","actor_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-16 18:33:45.510898+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb44336e-a3e9-4681-a84c-a4f659198675', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"christinpmartin@gmail.com","user_id":"935064bf-25b1-4757-9ed3-255d0c13f6a7","user_phone":""}}', '2025-04-16 18:38:13.760199+00', ''),
	('00000000-0000-0000-0000-000000000000', '7607fd1f-9b7c-43e7-8bb2-2664c48d4a8a', '{"action":"user_signedup","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}', '2025-04-17 11:46:22.243275+00', ''),
	('00000000-0000-0000-0000-000000000000', '1ce43510-d080-4e38-91e7-ab4436026d40', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-17 11:46:22.650488+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6c21d8c-0115-454e-a16e-dc68512ee31b', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 12:47:14.679724+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b1127b34-991d-4ec4-a25a-d86e831f4726', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 12:47:14.684531+00', ''),
	('00000000-0000-0000-0000-000000000000', '55f165ae-0f3b-4464-9328-dc10fd018af3', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-17 12:47:25.124353+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a261158e-a533-4435-a7d9-4bbfc6973a6b', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-17 12:47:29.685657+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e2ac2ac-1947-4caf-bbac-2aeeee4a03b2', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-17 12:47:30.48841+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a3b18eb-a4cd-40e2-8e9b-3368ba67833e', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 16:36:51.94747+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c5de06b-6d5a-445d-b076-3c4b63e65225', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 16:36:51.95001+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd1988f10-93c7-4f39-8bf7-97a2c524e1c3', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-17 17:22:27.467057+00', ''),
	('00000000-0000-0000-0000-000000000000', '90aef221-680a-4826-ae55-520a1bbfbed8', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-17 17:22:35.987556+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c474ff0a-7ee1-4b43-b380-90a785d867e8', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-17 17:22:36.530389+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aabd0691-9616-4142-81cf-2b258867257b', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-17 17:31:19.791609+00', ''),
	('00000000-0000-0000-0000-000000000000', '5869c55a-da86-4906-88f2-71539a95675e', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-17 17:31:20.500293+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dda1cb19-e68d-44cd-93b6-98cd068f874c', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-17 18:25:01.546322+00', ''),
	('00000000-0000-0000-0000-000000000000', '14c4c33d-2c16-46c7-9956-990cffc531ea', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-17 18:25:06.797409+00', ''),
	('00000000-0000-0000-0000-000000000000', '401a3074-148d-4464-94fe-68700b19eb0e', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-17 18:25:07.180654+00', ''),
	('00000000-0000-0000-0000-000000000000', '1888af82-3428-43f5-af1f-ca87ae90a2bf', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 19:44:16.424472+00', ''),
	('00000000-0000-0000-0000-000000000000', '1295aea8-44a2-46f7-a6b8-e2b6c2aebcb5', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 19:44:16.425398+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ff051e06-c23a-40c0-a76a-130139a9c2b4', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-17 19:44:24.570587+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd71033cd-f689-4142-be79-83be90ee9e28', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-17 19:45:01.650097+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aebb9dd4-03e5-481e-a0c2-7cc99939f8cb', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-17 19:45:02.463508+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a11fb4e0-8ee0-4d00-bfd1-8707ff01d6ed', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-17 19:50:14.736966+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ff9e860-355d-4ca6-9031-5c71f4cb4fef', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-17 19:50:15.269162+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ff14d31-05ac-4fad-a557-f37f5fdb814d', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 20:48:23.241228+00', ''),
	('00000000-0000-0000-0000-000000000000', '6fb7278b-50f1-4df3-83f2-6ec9e5f74aad', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 20:48:23.242865+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a551ac58-6f92-49e0-9490-bdce8fb55ef1', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 21:58:26.665212+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ecd18b69-7169-405e-964e-aeadea878e8f', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 21:58:26.669275+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f9bb550-e263-4b69-a352-327d79852cea', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 12:00:05.50918+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e78e5d82-463c-44de-92da-cef02871ab76', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 12:00:05.527667+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe72b2f7-1657-4685-adfa-e8a294c10b9d', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-20 12:00:07.386606+00', ''),
	('00000000-0000-0000-0000-000000000000', '7039abe7-a6e7-425a-8ea0-481f782f2ec8', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-20 12:00:12.61407+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b96a1600-3c60-4c85-89b8-558e84c2887e', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-20 12:00:13.183628+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e69fec1-9943-465c-b4c6-12f44081420a', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-20 12:00:43.430127+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ed9c0cb-ac7e-4340-8e55-b3d64dfab735', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-20 12:00:51.002633+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a97d6377-6e02-4d09-9824-3ec911baabb4', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-20 12:00:51.223404+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c75e74a3-1d5c-4fa1-b82e-6fc8cb99c955', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 12:59:13.03454+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e46ee261-73c6-4c8a-ae5f-07c7e1930b58', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 12:59:13.037422+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd361435-be3b-46ba-b1e9-e9e6cbc2c154', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 13:57:22.595802+00', ''),
	('00000000-0000-0000-0000-000000000000', '42aac95f-957c-49df-a28c-7fbc7df23407', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 13:57:22.598202+00', ''),
	('00000000-0000-0000-0000-000000000000', '4312a993-41de-49a4-9f9e-ed2fa2444b0b', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 18:05:11.364176+00', ''),
	('00000000-0000-0000-0000-000000000000', '61b7fe0f-92c7-402e-9356-1a11c80e5a17', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 18:05:11.367238+00', ''),
	('00000000-0000-0000-0000-000000000000', '3a335d3a-40b5-4b6e-92df-0ceeb02062bc', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-20 18:33:13.304474+00', ''),
	('00000000-0000-0000-0000-000000000000', 'abaa2d09-2765-41f0-b188-481b0b9e4b02', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-20 18:33:13.859177+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b978b99-5188-4c14-8d01-10260129d920', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-21 08:39:50.604591+00', ''),
	('00000000-0000-0000-0000-000000000000', '4c206616-aa3a-44c7-9c11-68a9fede4eaa', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-21 08:39:51.167602+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9ba019d-fded-4248-a8bf-95a0e8e0c0b6', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 17:49:06.573404+00', ''),
	('00000000-0000-0000-0000-000000000000', '8001711c-e33e-43ac-ae20-168873dce713', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 17:49:06.592338+00', ''),
	('00000000-0000-0000-0000-000000000000', '092bea6d-8ef9-4709-b0a7-159b7e7eb921', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-21 17:49:08.927737+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a3741ca-f05f-4fc8-abf4-59184fdc5a30', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-21 17:49:14.810753+00', ''),
	('00000000-0000-0000-0000-000000000000', '246bdc22-5fe5-43ea-9629-8e5db28cccf4', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-21 17:49:15.26975+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb4f6c95-5d8e-4144-b86e-4e40edc562a1', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-21 18:12:50.469416+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a9910289-1438-4eb3-880f-95a6dc91aacb', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-21 18:13:18.430168+00', ''),
	('00000000-0000-0000-0000-000000000000', '2332ddbe-4a5b-4877-9707-cdf5bccea5e4', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-21 18:13:18.794316+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8a3f856-c1be-4068-bc93-8d869d9c0988', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-21 18:19:33.855869+00', ''),
	('00000000-0000-0000-0000-000000000000', '34eadce8-0db3-40ca-83c3-da54ca8c2166', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-21 18:19:40.854168+00', ''),
	('00000000-0000-0000-0000-000000000000', '89bef8da-4a92-4231-9864-e426ae97f750', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-21 18:19:41.280239+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd293c229-c11d-4ba3-8089-3dd5a15b05bf', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 22:55:43.118651+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ff5222a4-562e-4b62-89ed-2c4e57c5b1f9', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 22:55:43.127448+00', ''),
	('00000000-0000-0000-0000-000000000000', '28027eb5-8579-4cf7-94f4-606477be0dc2', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-26 13:24:08.565734+00', ''),
	('00000000-0000-0000-0000-000000000000', '73428349-bd5c-4ef3-995c-19fc7f3d6632', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-26 13:24:08.580611+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d97635c-c7a5-422e-817e-01322a26019c', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-26 13:46:57.603411+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f4d65a90-43ac-485a-8f59-68c4e387ca07', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-26 13:47:01.456392+00', ''),
	('00000000-0000-0000-0000-000000000000', '0138088e-aad1-483a-ae74-f36fc71ffd38', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-26 13:47:01.972204+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bd11b3a1-66b6-4aae-b701-641c9af9d3f8', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-26 13:52:23.054871+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee25aaab-d68b-45d2-80af-fc4fa9950ac8', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-26 13:52:37.009406+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e3166d45-e183-4c5d-bc6a-63e76141b653', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-26 13:52:37.526974+00', ''),
	('00000000-0000-0000-0000-000000000000', '5df9c7fe-2fc0-43f5-9e7e-3da33a38b51a', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-26 14:01:14.183726+00', ''),
	('00000000-0000-0000-0000-000000000000', '897fadf3-91fc-49d7-b2fb-a3737fca099d', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-26 14:01:19.207864+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2e8538f-424f-4ba8-ac7b-e9146118640f', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-26 14:01:19.580762+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4b7ab4b-1356-48c1-a673-ba4bfe2b6769', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-26 19:43:57.094644+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f55b09d5-b2cc-42bd-ab38-1e24b56ec261', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-26 19:43:57.119711+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c500d5cb-246e-438d-858b-1a6c9453e431', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-26 20:42:24.74255+00', ''),
	('00000000-0000-0000-0000-000000000000', '07fda33b-b749-42f5-be7e-f53097df7968', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-26 20:42:24.748111+00', ''),
	('00000000-0000-0000-0000-000000000000', '9f522fa2-3b50-4963-9cd8-711102bbc9c1', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-26 20:58:54.219739+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f6e89659-b387-4b9e-9a5e-cf0e5abc2b53', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-26 20:59:04.002229+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de8e817a-b4cf-47db-85e0-9a6343e05e35', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-26 20:59:04.52464+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9f59464-e27b-409e-ab0f-0901cf27bf5b', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-26 21:02:04.509305+00', ''),
	('00000000-0000-0000-0000-000000000000', '3422d65a-e699-4f06-b299-3322f60ad787', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-26 21:02:33.07938+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a3711975-1e03-4119-b2b6-9320553c50dd', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-26 21:02:33.628036+00', ''),
	('00000000-0000-0000-0000-000000000000', '12c1ca26-5a85-4560-b9f0-461aac599658', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-26 21:08:51.013834+00', ''),
	('00000000-0000-0000-0000-000000000000', '071d4263-9845-4f32-946d-6ddf53e42cea', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-26 21:08:51.595092+00', ''),
	('00000000-0000-0000-0000-000000000000', '3364bb2c-3f05-40cc-892f-06e5636137ec', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-26 21:17:51.202795+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c67c482e-2224-4712-8e8c-4d3a08a1c83d', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-26 21:17:52.026468+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f114560-a2b1-4811-8805-b3eefb42283f', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-26 21:21:46.351212+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8082986-95b3-4866-9ad3-b2ee5df4211f', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-26 21:21:46.819485+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c52183d0-bcb7-46f0-98da-2e3a6e5deef1', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-26 22:55:27.753161+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b5cf5244-980d-4c01-b0f2-9922151bc0f7', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-26 22:55:27.760874+00', ''),
	('00000000-0000-0000-0000-000000000000', '723c03ae-ca60-45f7-89ed-013935f465f3', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-27 12:16:53.914805+00', ''),
	('00000000-0000-0000-0000-000000000000', '4948aff6-01f2-49a2-9781-ec7d1c2b5a6b', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-27 12:16:53.93465+00', ''),
	('00000000-0000-0000-0000-000000000000', '490d9304-8de2-4766-8c1c-faed0516e36b', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-27 12:22:54.90417+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de23af9f-6da5-4fc4-b626-b727b38b9dac', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-28 23:31:54.460652+00', ''),
	('00000000-0000-0000-0000-000000000000', '08a84dae-31cd-4415-828d-10a896b3ebec', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-28 23:31:54.865688+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ccf2f9fb-0aa1-4bbc-a032-cd15b0c9a69f', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-28 23:32:27.139215+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a9f1c993-1e58-47d1-8c1a-b85fc704eabd', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-28 23:32:27.267331+00', ''),
	('00000000-0000-0000-0000-000000000000', '2e9e0a7e-84ed-42c9-8c7a-c6cbfd557206', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-28 23:32:54.983273+00', ''),
	('00000000-0000-0000-0000-000000000000', '8aa7ae2f-7155-470f-9133-f06a8c581f0a', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-28 23:32:55.120336+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b8300bf-2823-403c-92fc-a1a1edadf24d', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-04-28 23:51:30.629249+00', ''),
	('00000000-0000-0000-0000-000000000000', '4288660b-aa2f-4c71-9653-3c71d2c35ae9', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-04-28 23:51:30.984826+00', ''),
	('00000000-0000-0000-0000-000000000000', '81744bc2-21a6-4a2e-9a9e-a3610176c591', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-03 14:54:57.007519+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ebdb932-4182-4fcc-a9ab-0b0dd2d545a1', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-03 14:54:57.017954+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2296701-fd16-472d-8fda-17df0520e863', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-05-03 14:55:01.985065+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae8ca420-ac7a-4fb5-8eb7-4fe687853d7c', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2025-05-03 14:55:02.435706+00', ''),
	('00000000-0000-0000-0000-000000000000', '23aca5ee-50bc-498f-9b9e-2e623189d8cf', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-03 23:23:25.237403+00', ''),
	('00000000-0000-0000-0000-000000000000', '27692410-d3d0-43a0-a0b7-0c8cdfae171f', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-03 23:23:25.25016+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec8ac06e-9dbd-49a8-bf14-39ec0d4349e4', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-05-04 01:03:19.063671+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a548e07-42dd-4b4b-89ec-738952eda3a9', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-05-04 01:03:31.105557+00', ''),
	('00000000-0000-0000-0000-000000000000', '38bae38b-4652-4d02-a949-2ca8426eea5d', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-05-04 01:03:33.54882+00', ''),
	('00000000-0000-0000-0000-000000000000', '2284d021-47ea-43b7-bb18-e3b282bf942b', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2025-05-04 01:05:09.130211+00', ''),
	('00000000-0000-0000-0000-000000000000', '9439e6d4-5a69-4334-b10c-632d7d60952c', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-05-04 01:05:53.086328+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea294c73-e895-4d74-9ef1-b517a6ba18f1', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-05-04 01:05:56.49786+00', ''),
	('00000000-0000-0000-0000-000000000000', '094b1472-c554-4b53-bcd8-eb22e9c95e76', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2025-05-04 01:05:59.337736+00', ''),
	('00000000-0000-0000-0000-000000000000', '8d167f8a-5641-4e97-b46e-02c25e5781d4', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-04 12:49:38.583283+00', ''),
	('00000000-0000-0000-0000-000000000000', '856c274d-790f-4edb-a447-603bb70542bd', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-04 12:49:38.59893+00', ''),
	('00000000-0000-0000-0000-000000000000', '832725cb-5594-4da3-a4dc-85f60a4921ba', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-05-04 12:50:26.589666+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f8db1ca1-0650-4380-bd5c-321c514aab7b', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-05-04 12:56:01.591452+00', ''),
	('00000000-0000-0000-0000-000000000000', '35717029-8c38-4f64-9299-83af6bf6a328', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2025-05-04 12:56:05.467566+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b717255-0a61-4672-be6c-886a27e05d22', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 08:50:31.961254+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ddf510a6-5ed7-4879-9861-047944dec6bd', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-05 08:50:31.97249+00', ''),
	('00000000-0000-0000-0000-000000000000', '8e407eb4-07f2-42aa-a470-056caa6763d8', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-08 17:46:32.428637+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db61dc8d-0112-429c-80cd-e71c0f602ca2', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-08 17:46:32.455921+00', ''),
	('00000000-0000-0000-0000-000000000000', '539d7b31-6e3b-44bc-beed-a671de922028', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-05-08 17:47:04.8974+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ef65d06f-f8b4-4421-9357-d0fdcb43b71c', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2025-05-08 17:47:09.485778+00', ''),
	('00000000-0000-0000-0000-000000000000', '15e00fa3-d41b-4536-a435-746861de8b06', '{"action":"logout","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin Martin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-05-08 17:48:33.406653+00', ''),
	('00000000-0000-0000-0000-000000000000', '26077914-1919-423a-b44a-ab3f28a715d5', '{"action":"login","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2025-05-08 19:02:20.3665+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e954f3e3-d65c-4c4e-b778-50303f56528f', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-08 20:00:35.202395+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e3b55d5-5415-4357-8e2f-c03f42dc4a6c', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-08 20:00:35.209774+00', ''),
	('00000000-0000-0000-0000-000000000000', '2c7c6d95-3bf3-4094-b9ea-f96dc0152baa', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-08 22:51:48.421487+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f5cd035-1ef6-431a-8f4e-30b23870f5ee', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-08 22:51:48.424565+00', ''),
	('00000000-0000-0000-0000-000000000000', '92a119e5-4ec2-4cd2-ba39-603488e810c1', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-09 08:39:44.592102+00', ''),
	('00000000-0000-0000-0000-000000000000', '9b60a7aa-118f-4916-b0fe-925374376a38', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-09 08:39:44.612199+00', ''),
	('00000000-0000-0000-0000-000000000000', '57c6bbd7-0499-4c13-a46d-3318c13301fd', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-11 00:25:04.87993+00', ''),
	('00000000-0000-0000-0000-000000000000', '481975be-ed94-4a2c-813f-be11fcf50eeb', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-11 00:25:04.911512+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d529ee4-1d4d-47ea-aae4-6eff8df32c76', '{"action":"token_refreshed","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-11 11:47:26.423969+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e835cf1-5265-43aa-a774-13d459a9b5de', '{"action":"token_revoked","actor_id":"944ecc3b-8630-48da-bd5a-772d4b89e7ff","actor_name":"Christin","actor_username":"christinpmartin@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-11 11:47:26.444679+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
	('1b189bfc-622d-4f6f-beb3-128568001be9', NULL, 'c34d1def-f5c7-4ec9-b837-494ea102ee11', 's256', 'X_9mReRUK7X47buVYI8GU0JbbJM9yrRyK4yy5OKG7gA', 'google', '', '', '2025-04-14 17:53:12.347943+00', '2025-04-14 17:53:12.347943+00', 'oauth', NULL),
	('61f68e61-1825-487d-9202-05bd542feed0', NULL, 'f83e42a3-1f4a-4905-90ee-4d8f549df502', 's256', 'Znklfg0ix8OyRuVwSKK62fUT10eLO8sfUHfGcV0ppQc', 'github', '', '', '2025-04-28 23:31:21.799735+00', '2025-04-28 23:31:21.799735+00', 'oauth', NULL),
	('129744ca-aa76-46d3-9ce9-f427b4f62708', NULL, 'f1cee9c0-e57f-40c9-9c11-a4468911dfbc', 's256', 'pw07lKfD0NmS7OvtF3MQk9gKECcjex4qSWT84IW9qvk', 'github', '', '', '2025-04-28 23:31:27.007143+00', '2025-04-28 23:31:27.007143+00', 'oauth', NULL),
	('2d2a417c-0b14-485e-8997-ce52f14b54ae', NULL, 'a6ed6977-d3f7-4db5-99e8-d8d0e656994f', 's256', 'cg0U91-m-_xduSMN91R8lNFU42oewng7B-GRnJmqync', 'github', '', '', '2025-04-28 23:31:59.392036+00', '2025-04-28 23:31:59.392036+00', 'oauth', NULL),
	('e6e1e0c3-c451-4a11-8eac-d61cf9b52a9c', NULL, '8cd37546-99c3-422b-9b49-33b8f1831f5b', 's256', 'vmRnhZyZhwIUkYUtVtRXSc27j5aLiqOel_wlAVeZJBU', 'github', '', '', '2025-04-28 23:32:21.335041+00', '2025-04-28 23:32:21.335041+00', 'oauth', NULL),
	('eaf53309-8230-4aca-8c87-da44e15cf639', NULL, '04f41254-d3e9-4429-8cfb-c847a4123a9c', 's256', '0kjNzZ-eFKaAJlov0n8HSjthV6kpnJv-G9ay0pZe4vU', 'github', '', '', '2025-04-28 23:32:58.878129+00', '2025-04-28 23:32:58.878129+00', 'oauth', NULL),
	('7e3c5026-b0bf-45bf-a643-d7d8c8bc3876', NULL, '2286811d-7684-4ed6-8a00-832b80906087', 's256', '2_Prx_znECN7VcWn7aPDWN4GWWX4Hg_jQNFLql8oJ9E', 'github', '', '', '2025-04-28 23:51:26.882104+00', '2025-04-28 23:51:26.882104+00', 'oauth', NULL),
	('7862d330-632c-4012-a1de-6f2102f721f6', NULL, 'e46caace-f6f4-427f-86f3-b07473dd1db1', 's256', 'yAiUnWFVNptxEZtcXn7esztgGkT38q2lCQJq7rJbUUA', 'google', '', '', '2025-04-16 18:38:23.061264+00', '2025-04-16 18:38:23.061264+00', 'oauth', NULL),
	('0482b416-403e-4aef-a4fb-cf79eef27576', NULL, '81d7fe49-0728-4a50-92e7-ccf44b290c6e', 's256', '2Vut-PmedhINoRE7UvG8bGC5xYjrWVcl_YgnWlTUARE', 'google', '', '', '2025-04-16 18:49:19.041981+00', '2025-04-16 18:49:19.041981+00', 'oauth', NULL),
	('cebce149-9183-430c-865c-5e3048ab2c7d', NULL, 'efd6c453-9bef-4f74-b6c7-48d5c379410e', 's256', 'qa_ek0mSwi-8S5PKkoDJysHP0_OaEMrIEvrSKLq5XlE', 'google', '', '', '2025-04-16 18:49:28.28587+00', '2025-04-16 18:49:28.28587+00', 'oauth', NULL),
	('2d408c44-3997-4aa2-8e7e-71d37fc984b4', NULL, '76239cd6-83d5-483c-96a6-a90fa14eb724', 's256', 'GLZSUYy7IZjr2McgALA2iVvNmygZDDfHiO-BgNYo8I0', 'google', '', '', '2025-04-16 18:50:10.265831+00', '2025-04-16 18:50:10.265831+00', 'oauth', NULL),
	('eac2d61e-0c5c-420c-8a74-cc892d45d1e7', NULL, 'a3bc4906-94e5-452b-9ac1-21b83bceeb79', 's256', 'wHqcSmMI9w3ngSTkvkbZuy1WoQwQozaX6BW9E2d6E6c', 'google', '', '', '2025-04-16 18:51:25.986888+00', '2025-04-16 18:51:25.986888+00', 'oauth', NULL),
	('f9b0e7e6-954e-44c1-825c-e117e62537e4', NULL, '01aed011-c4c8-4505-8973-297719408fc3', 's256', 'Z80JmYmR9B5QacwR9LrPdeNiO9eghNKUn4BQHXMUD_s', 'google', '', '', '2025-04-16 18:57:31.982161+00', '2025-04-16 18:57:31.982161+00', 'oauth', NULL),
	('a9774947-36fb-41c7-92e7-889e3c2e2c54', NULL, '4c7ba1d3-437a-4386-8cfb-c48cf99af429', 's256', 'C8sET-iVdTntpergvkH8a-iCQkMMQCyaYDcI1Lb3LnE', 'google', '', '', '2025-04-16 19:01:19.065898+00', '2025-04-16 19:01:19.065898+00', 'oauth', NULL),
	('9c9e639c-d769-41a3-9035-1cf318f3f1d0', NULL, 'e926b218-05c8-4b7f-8f85-68fea376dd5b', 's256', '8pEV5c0nwVyKRKAAyZKPeNZOaGB9m_7XLXQB8Ozz33Y', 'google', '', '', '2025-04-16 19:02:51.023922+00', '2025-04-16 19:02:51.023922+00', 'oauth', NULL),
	('3f56ea2d-ceae-43ee-9940-58bc9bbbc5c0', NULL, '45231adc-913b-43d7-88f9-a3058ad9be74', 's256', 'FDtNwzsS6VNu3-hIUMM1-3vzPTtYhhd2jsn1UMcppaw', 'google', '', '', '2025-04-16 19:03:09.091455+00', '2025-04-16 19:03:09.091455+00', 'oauth', NULL),
	('acfe40d6-e3a9-4567-b33e-296eb1c8bec4', NULL, '4f6666ca-7454-42c9-a9ec-9f66363a7c19', 's256', 'qDicM2zXS_5sEnfvi-7bUO_cYj5RIcF5xtTHKNgVO9M', 'google', '', '', '2025-04-16 19:03:35.975972+00', '2025-04-16 19:03:35.975972+00', 'oauth', NULL),
	('fd704c85-b011-4aeb-b146-ddc638406bcb', NULL, 'a24053ad-e075-470c-b178-e01e2b00fd3c', 's256', 'vu4yRBeUHbJiRqGin_JClCL2ZEGpIPi0ugBjms-FiRI', 'google', '', '', '2025-04-16 23:03:01.853605+00', '2025-04-16 23:03:01.853605+00', 'oauth', NULL),
	('2481245a-efc5-4f10-9d81-d81c19db30fc', NULL, 'c2c2a64f-b623-4302-9cf1-97242253bbda', 's256', 'X8lZ8EUO1yqViheOVVzMrEpudybowURBr0toK-U3IiM', 'google', '', '', '2025-04-16 23:18:04.120691+00', '2025-04-16 23:18:04.120691+00', 'oauth', NULL),
	('a2f5ed9c-f725-4cf9-9844-39d1c55f5010', NULL, 'ba29b62e-9dcb-49ed-9418-bbb6d47b00c2', 's256', 'I4--AvDni6v5e_S6HXkcb0pFIVwGRwZfSU6jyagv2xM', 'google', '', '', '2025-04-16 23:18:46.271893+00', '2025-04-16 23:18:46.271893+00', 'oauth', NULL),
	('d5681395-2090-4ae3-b25a-07566a9efaad', NULL, '843aba34-6a5d-4b09-a219-97f000bd9627', 's256', 'gmykJb2Bxda5xYiGv92ZyXm2HU1kRQLCEdrjgwxkrT4', 'google', '', '', '2025-04-16 23:19:56.307398+00', '2025-04-16 23:19:56.307398+00', 'oauth', NULL),
	('2769ab91-e67f-4456-a4b0-13116c1f0496', NULL, '762d09fd-2f62-448c-b827-a2b6dc9f4435', 's256', 'ns9IvPIZbZ_IeZZRkucqIhWbHNI_LL0kIDowFkVw5o0', 'google', '', '', '2025-04-16 23:26:38.488332+00', '2025-04-16 23:26:38.488332+00', 'oauth', NULL),
	('fd70bde0-ce72-4a32-ad2c-0aa009491fd0', NULL, '3f8e238e-a13c-4842-9f17-217ef8d974e7', 's256', 'ZNMQ029SIzm03If4bfsO-X5UECtq_yxRBNP__v2iTcw', 'google', '', '', '2025-04-16 23:32:20.270556+00', '2025-04-16 23:32:20.270556+00', 'oauth', NULL),
	('d822a5f1-8033-455d-ad19-c2fd91b23c81', NULL, 'da7bd8fc-c96e-42aa-b0ba-bd016466e694', 's256', 'llYaNHJfUq-atd461jfqqwcbfA8QEEqhqRaqn27ZPfI', 'google', '', '', '2025-04-16 23:37:53.002612+00', '2025-04-16 23:37:53.002612+00', 'oauth', NULL),
	('aecd0553-f2a2-4837-9ade-e05a733b9a2e', NULL, '53dd4d9d-8587-408f-bfde-32fe00e4b696', 's256', '1a_1rClISm22WOzTTuhmraV2hOs0RbYxgQERTzUyt1U', 'google', '', '', '2025-04-16 23:40:39.790911+00', '2025-04-16 23:40:39.790911+00', 'oauth', NULL),
	('3c46da79-b197-4f02-a2d9-b80ef0b15371', NULL, '4c8f740a-f546-4c27-95ce-75fff7168ccf', 's256', 'zpTt34bn8yRPAIIuKy60orU7ZaSgP23RE7X6-GDArAM', 'google', '', '', '2025-04-16 23:40:48.174704+00', '2025-04-16 23:40:48.174704+00', 'oauth', NULL),
	('ff1f1471-a6a2-4f2a-9c87-bcb55536f682', NULL, '27f1de3b-f8e0-4685-99b0-9b79f3458a66', 's256', 'sy7zIVB_UcugeZr_Aa_1nEm4aKb8Z1ccPZsaFfXE4uk', 'google', '', '', '2025-04-16 23:50:08.187874+00', '2025-04-16 23:50:08.187874+00', 'oauth', NULL),
	('6cd29c66-046c-4fe0-82e5-fb6f4573536b', NULL, 'aa5a7e0a-72ce-4e8c-8a06-8b20b6ae0b35', 's256', 'FVVRnNNI6ztiuOqTCIa3oSGdRqECIzCpSquW3GGt744', 'google', '', '', '2025-04-16 23:50:15.140811+00', '2025-04-16 23:50:15.140811+00', 'oauth', NULL),
	('44aae585-e974-40a2-a0b2-946f642520fc', NULL, '13c8edfd-8e37-4f81-a218-6d3806079025', 's256', '-Rsoi5I4QS7dDR9qwTO3sgsDuybIfSV9lzYYd1K1PFc', 'google', '', '', '2025-04-16 23:52:25.584261+00', '2025-04-16 23:52:25.584261+00', 'oauth', NULL),
	('6c97ed09-ab3a-4162-b37f-5f6e0f28e7c6', NULL, '40fc557f-2785-4cff-a1de-dd686cc664cb', 's256', 'yy8jO3I3NSgAJKxwz-7JPglrk62k2N6sG1EAeG8fFLg', 'google', '', '', '2025-04-16 23:53:47.921655+00', '2025-04-16 23:53:47.921655+00', 'oauth', NULL),
	('07a4f24c-589a-46b3-9616-8dafebf4b2c7', NULL, 'b4746ff2-3c4c-42ce-80f4-ad4087a645e5', 's256', 'uV3jmqzmB5fhqBhyJfOLe4CfEJ_EGaIWFniVVoDTlLU', 'google', '', '', '2025-04-16 23:55:21.209953+00', '2025-04-16 23:55:21.209953+00', 'oauth', NULL),
	('f27401c9-b81d-4a6f-b853-efbb5223ef88', NULL, '0bfc2c64-47a4-45d4-a823-49d22e0d2580', 's256', 'pBvLzvsXXehTEb1zy_tX9SEFDZ8tiyYhsFtNM8xfoME', 'google', '', '', '2025-04-17 11:23:57.495311+00', '2025-04-17 11:23:57.495311+00', 'oauth', NULL),
	('c177f6dd-2756-489b-a34b-fd4f53012272', NULL, 'abbcb1f5-7bb1-4c79-b062-30f3a1ca378d', 's256', 'oe9JnJA6jK2tWBDBQKrtmbnd0l1lB-P4uIk1ToYHUdQ', 'google', '', '', '2025-04-17 11:31:06.484134+00', '2025-04-17 11:31:06.484134+00', 'oauth', NULL),
	('af43ea31-63ec-486f-9260-69eb651c4e64', NULL, '1825644d-0287-486b-b099-881d0ecde9ab', 's256', 'XxUkB_2I6HkiY9jVr4UQNXO-73-Y4xdge15ljAwMsZg', 'google', '', '', '2025-04-17 11:31:32.806767+00', '2025-04-17 11:31:32.806767+00', 'oauth', NULL),
	('ab13f2f8-8ef9-4819-a933-31958c9129a1', NULL, '6ad31ca0-396f-4717-bfa7-580c96ab8196', 's256', '7TBJUeddTbQ7xwpeSKn8jxbwgb5lLYQWn8oF-4JMuHw', 'google', '', '', '2025-04-17 11:37:10.706851+00', '2025-04-17 11:37:10.706851+00', 'oauth', NULL),
	('46fc1907-eb6d-475f-b69c-4dd6a3477484', NULL, '48109de4-f086-40b9-9f94-8401901653df', 's256', 'WU-VXY5izX4StB69rOKflXb6sUX9nEtMFFpH2-sNh5o', 'google', '', '', '2025-04-17 11:39:53.084188+00', '2025-04-17 11:39:53.084188+00', 'oauth', NULL),
	('8589879d-b57a-4937-8478-c36f957ea0ef', NULL, '873e9787-b9d0-44b6-927a-843446be7b87', 's256', 'nYzMMs7B5PLKcc4o5YAr1bHSAvlY7zG48ExSKj6esOo', 'github', '', '', '2025-05-03 14:54:56.92347+00', '2025-05-03 14:54:56.92347+00', 'oauth', NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	(NULL, '11111111-1111-1111-1111-111111111111', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"name": "Test User", "avatar_url": "https://example.com/avatar.png"}', NULL, NULL, NULL, NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '944ecc3b-8630-48da-bd5a-772d4b89e7ff', 'authenticated', 'authenticated', 'christinpmartin@gmail.com', NULL, '2025-04-17 11:46:22.249602+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-05-08 19:02:20.368925+00', '{"provider": "google", "providers": ["google", "github"]}', '{"iss": "https://api.github.com", "sub": "128321147", "name": "Christin", "email": "christinpmartin@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJHVJu4plMmH6L2U6Vy4EjT3zvUkb8T-w2tiWRzVXqVLER_JHvw=s96-c", "full_name": "Christin", "user_name": "Christin-paige", "avatar_url": "https://avatars.githubusercontent.com/u/128321147?v=4", "provider_id": "128321147", "email_verified": true, "phone_verified": false, "preferred_username": "Christin-paige"}', NULL, '2025-04-17 11:46:22.223774+00', '2025-05-11 11:47:26.461982+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('103430121917238874515', '944ecc3b-8630-48da-bd5a-772d4b89e7ff', '{"iss": "https://accounts.google.com", "sub": "103430121917238874515", "name": "Christin Martin", "email": "christinpmartin@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJHVJu4plMmH6L2U6Vy4EjT3zvUkb8T-w2tiWRzVXqVLER_JHvw=s96-c", "full_name": "Christin Martin", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJHVJu4plMmH6L2U6Vy4EjT3zvUkb8T-w2tiWRzVXqVLER_JHvw=s96-c", "provider_id": "103430121917238874515", "email_verified": true, "phone_verified": false}', 'google', '2025-04-17 11:46:22.237805+00', '2025-04-17 11:46:22.237857+00', '2025-05-08 17:47:09.473185+00', '8fa90f01-2214-4413-9240-b1a820eea7ca'),
	('128321147', '944ecc3b-8630-48da-bd5a-772d4b89e7ff', '{"iss": "https://api.github.com", "sub": "128321147", "name": "Christin", "email": "christinpmartin@gmail.com", "full_name": "Christin", "user_name": "Christin-paige", "avatar_url": "https://avatars.githubusercontent.com/u/128321147?v=4", "provider_id": "128321147", "email_verified": true, "phone_verified": false, "preferred_username": "Christin-paige"}', 'github', '2025-05-04 01:05:09.123225+00', '2025-05-04 01:05:09.123275+00', '2025-05-08 19:02:20.349376+00', 'fb81bef2-7501-4b23-92b1-09493a082358');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('b9914cfa-4635-45ba-b367-11e689831d3c', '944ecc3b-8630-48da-bd5a-772d4b89e7ff', '2025-05-08 19:02:20.370298+00', '2025-05-11 11:47:26.475076+00', NULL, 'aal1', NULL, '2025-05-11 11:47:26.473826', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '96.240.143.234', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('b9914cfa-4635-45ba-b367-11e689831d3c', '2025-05-08 19:02:20.382885+00', '2025-05-08 19:02:20.382885+00', 'oauth', '8a236c5f-f51d-49ee-9bb5-e3e8d514ad4e');


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
-- Data for Name: profiles; Type: TABLE DATA; Schema: auth; Owner: postgres
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 101, 'vs7YoPcmgl6r9A704yR9pg', '944ecc3b-8630-48da-bd5a-772d4b89e7ff', true, '2025-05-08 19:02:20.377383+00', '2025-05-08 20:00:35.210327+00', NULL, 'b9914cfa-4635-45ba-b367-11e689831d3c'),
	('00000000-0000-0000-0000-000000000000', 102, 'E0xdcBlp6-JS-4JobixaVg', '944ecc3b-8630-48da-bd5a-772d4b89e7ff', true, '2025-05-08 20:00:35.213706+00', '2025-05-08 22:51:48.425167+00', 'vs7YoPcmgl6r9A704yR9pg', 'b9914cfa-4635-45ba-b367-11e689831d3c'),
	('00000000-0000-0000-0000-000000000000', 103, 'z-3bqvg0zeBxaYsxKp3pQw', '944ecc3b-8630-48da-bd5a-772d4b89e7ff', true, '2025-05-08 22:51:48.427212+00', '2025-05-09 08:39:44.612892+00', 'E0xdcBlp6-JS-4JobixaVg', 'b9914cfa-4635-45ba-b367-11e689831d3c'),
	('00000000-0000-0000-0000-000000000000', 104, '01D6lKtUnY2IRHOaNltjFw', '944ecc3b-8630-48da-bd5a-772d4b89e7ff', true, '2025-05-09 08:39:44.618291+00', '2025-05-11 00:25:04.915325+00', 'z-3bqvg0zeBxaYsxKp3pQw', 'b9914cfa-4635-45ba-b367-11e689831d3c'),
	('00000000-0000-0000-0000-000000000000', 105, '8S9S5DktD-10F20xunRV0A', '944ecc3b-8630-48da-bd5a-772d4b89e7ff', true, '2025-05-11 00:25:04.941213+00', '2025-05-11 11:47:26.445878+00', '01D6lKtUnY2IRHOaNltjFw', 'b9914cfa-4635-45ba-b367-11e689831d3c'),
	('00000000-0000-0000-0000-000000000000', 106, 'qaiarp82EiIMJWfBHvd9Jw', '944ecc3b-8630-48da-bd5a-772d4b89e7ff', false, '2025-05-11 11:47:26.455949+00', '2025-05-11 11:47:26.455949+00', '8S9S5DktD-10F20xunRV0A', 'b9914cfa-4635-45ba-b367-11e689831d3c');


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
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "name", "avatar_url") VALUES
	('944ecc3b-8630-48da-bd5a-772d4b89e7ff', 'Christin Martin', 'https://lh3.googleusercontent.com/a/ACg8ocJHVJu4plMmH6L2U6Vy4EjT3zvUkb8T-w2tiWRzVXqVLER_JHvw=s96-c');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."posts" ("id", "created_at", "content", "user_id") VALUES
	('c1c113dc-3083-4413-a89e-927ffe8db034', '2025-04-17 18:37:02.368743+00', 'Hello', '944ecc3b-8630-48da-bd5a-772d4b89e7ff'),
	('f18c61be-090d-4f93-8f61-c21b14a830a9', '2025-04-17 19:04:55.248062+00', 'second post', '944ecc3b-8630-48da-bd5a-772d4b89e7ff');


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 106, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."likes_id_seq"', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
