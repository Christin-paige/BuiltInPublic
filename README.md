# 🧠 BuiltInPublic

Welcome to **BuiltInPublic**, a community-focused platform where developers can build in public, track their progress, and stay motivated. It features a social and builder-centric dashboard with streak counters, project tracking, friend feeds, and more.

This is a work-in-progress so feel free to follow along or contribute!

---

## 🛠️ Tech Stack

See the **[Wiki](https://github.com/Christin-paige/BuiltInPublic/wiki#-tech-stack)** for more details.

## 🔧 Prerequisites

Before getting started, make sure you have the following installed:

| Tool                              | Notes                                          |
| --------------------------------- | ---------------------------------------------- |
| [Node.js](https://nodejs.org/)    | v18 or later recommended                       |
| [npm](https://www.npmjs.com/)     | Dependancy management                          |
| [Supabase](https://supabase.com/) | Project and API keys                           |
| [Git](https://git-scm.com/)       | For cloning the repository and version control |

---

## 🗂️ Project Structure

<details>
<summary>📁 Click to expand project file structure</summary>

```plaintext
.
├── .env.example
├── .gitguardian.toml
├── .github
│   ├── ISSUE_TEMPLATE
│   │   └── new-feature-request.md
│   └── workflows
│       ├── codeql.yml
│       ├── gitleaks.yml
│       ├── prettier.yml
│       ├── push-migrations-prod.yml
│       ├── push-migrations-staging.yml
│       ├── renovate.yml
│       ├── semgrep.yml
│       ├── syft.yml
│       └── unit-tests.yml
├── .gitignore
├── .gitleaks.toml
├── .husky
│   ├── _
│   │   ├── .gitignore
│   │   ├── applypatch-msg
│   │   ├── commit-msg
│   │   ├── h
│   │   ├── husky.sh
│   │   ├── post-applypatch
│   │   ├── post-checkout
│   │   ├── post-commit
│   │   ├── post-merge
│   │   ├── post-rewrite
│   │   ├── pre-applypatch
│   │   ├── pre-auto-gc
│   │   ├── pre-commit
│   │   ├── pre-merge-commit
│   │   ├── pre-push
│   │   ├── pre-rebase
│   │   └── prepare-commit-msg
│   ├── pre-commit
│   └── pre-push
├── .prettierignore
├── .prettierrc.yml
├── components.json
├── config
│   └── private
│       └── profanity-list.ts
├── docs
│   ├── appregistered.png
│   ├── oathapps.png
│   ├── pull_request_template.md
│   └── registerapp.png
├── eslint.config.mjs
├── gitleaks-report.json
├── instrumentation-client.ts
├── knip-report.md
├── knip.config.json
├── LICENSE
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── .DS_Store
│   ├── 404
│   │   ├── .DS_Store
│   │   ├── funny1.png
│   │   ├── funny10.png
│   │   ├── funny2.png
│   │   ├── funny3.png
│   │   ├── funny4.png
│   │   ├── funny5.png
│   │   ├── funny6.png
│   │   ├── funny7.png
│   │   ├── funny8.png
│   │   └── funny9.png
│   ├── BiP_Banner.png
│   ├── BuiltInPublic.png
│   ├── door.jpg
│   ├── example-cover-img.jpg
│   ├── icons
│   │   ├── github-sign-in-btn.svg
│   │   └── web_neutral_rd_SI.svg
│   ├── logo3.png
│   ├── og-image.jpg
│   └── terminal-logo.png
├── README.md
├── renovate.json
├── scripts
│   ├── generateSupabaseTypes.ts
│   ├── precheck.sh
│   ├── seed.ts
│   └── seeds
│       ├── auth-users.ts
│       ├── policy-doc.ts
│       ├── posts.ts
│       ├── profile-skills.ts
│       ├── projects.ts
│       ├── skills.ts
│       └── social.ts
├── SECURITY.md
├── src
│   ├── app
│   │   ├── (main)
│   │   │   ├── [username]
│   │   │   ├── dashboard
│   │   │   ├── layout.tsx
│   │   │   └── onboarding
│   │   ├── about
│   │   │   └── page.tsx
│   │   ├── auth
│   │   │   ├── actions.ts
│   │   │   ├── callback
│   │   │   ├── DevSignIn.tsx
│   │   │   ├── oauth
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── project
│   │   │   └── [id]
│   │   ├── staging-auth
│   │   │   ├── actions.ts
│   │   │   ├── page.tsx
│   │   │   ├── stagingAuth.schema.ts
│   │   │   └── StagingAuth.tsx
│   │   └── thanks
│   │       └── page.tsx
│   ├── components
│   │   ├── Buttons
│   │   │   ├── BackButton.tsx
│   │   │   ├── EditButton.tsx
│   │   │   └── SignOutBtn.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar
│   │   │   ├── index.ts
│   │   │   └── Navbar.tsx
│   │   ├── Profile
│   │   │   ├── Bio.tsx
│   │   │   └── DisplayName.tsx
│   │   ├── ProfileIcon.tsx
│   │   ├── Projects
│   │   │   ├── CreateProject
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectPanel
│   │   │   ├── ProjectsList.tsx
│   │   │   ├── ProjectStatusBadge.tsx
│   │   │   ├── ProjectUpdateCard.tsx
│   │   │   └── ProjectVisibilityBadge.tsx
│   │   ├── Providers
│   │   │   ├── ProfileProvider.tsx
│   │   │   ├── ProjectProvider.tsx
│   │   │   ├── QueryProvider.tsx
│   │   │   └── ThemeProvider.tsx
│   │   └── ui
│   │       ├── avatar.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── confirmation-dialog.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── modal.tsx
│   │       ├── skeleton.tsx
│   │       └── textarea.tsx
│   ├── hooks
│   │   ├── useProfile
│   │   │   ├── actions.ts
│   │   │   ├── profile.schema.ts
│   │   │   └── useProfile.tsx
│   │   ├── useProject
│   │   │   ├── actions.ts
│   │   │   ├── editProject.schema.ts
│   │   │   ├── updateProject.schema.ts
│   │   │   └── useProject.tsx
│   │   └── useUser
│   │       ├── actions.ts
│   │       └── useUser.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── middleware.ts
│   ├── repositories
│   │   ├── base.repository.ts
│   │   ├── policyDocumentRepository
│   │   │   ├── policyDocument.repository.ts
│   │   │   └── policyDocument.types.ts
│   │   ├── policyRepository
│   │   │   ├── policy.repository.ts
│   │   │   └── policy.types.ts
│   │   ├── profileRepository
│   │   │   ├── profile.repository.ts
│   │   │   └── profile.types.ts
│   │   └── projectRepository
│   │       ├── project.repository.ts
│   │       └── project.types.ts
│   ├── services
│   │   └── UINotification.service.ts
│   ├── setupTests.ts
│   └── use-cases
│       ├── __tests__
│       │   └── BaseMutationUseCase.test.ts
│       ├── BaseFetchUseCase.ts
│       ├── BaseMutationUseCase.ts
│       ├── projects
│       │   ├── __tests__
│       │   ├── CreateNewProject.ts
│       │   ├── EditProject.ts
│       │   ├── GetProject.ts
│       │   └── UpdateProject.ts
│       ├── updateUserProfile
│       │   ├── __tests__
│       │   └── UpdateUserProfile.ts
│       └── userConsent
│           ├── __tests__
│           └── UserConsent.ts
├── supabase
│   ├── __tests__
│   │   ├── rls-policies
│   │   │   ├── profiles.business.test.ts
│   │   │   ├── profiles.test.ts
│   │   │   └── projects.test.ts
│   │   ├── testClients.ts
│   │   └── testUser.ts
│   ├── .branches
│   │   └── _current_branch
│   ├── .gitignore
│   ├── .temp
│   │   └── cli-latest
│   ├── config.toml
│   ├── functions
│   │   ├── _shared
│   │   │   └── supabase.types.ts
│   │   ├── deno.json
│   │   ├── email-signup-link
│   │   │   ├── .npmrc
│   │   │   ├── deno.json
│   │   │   └── index.ts
│   │   └── env.example
│   ├── migrations
│   │   ├── 20250517104606_base_tables_rls.sql
│   │   ├── 20250518145124_new_profile_trigger.sql
│   │   ├── 20250801104606_create_project_updates.sql
│   │   ├── 20250803000000_add_project_updates_table.sql
│   │   ├── 20250807230208_insert_profile_update.sql
│   │   ├── 20250812161712_project_defaults.sql
│   │   ├── 20250823004425_alpha_token_table.sql
│   │   ├── 20250825164024_alpha_token_email.sql
│   │   ├── 20250829201136_user_consent_tables.sql
│   │   ├── 20250830223716_private_profile.sql
│   │   ├── 20250905144832_usage_on_policy_docs.sql
│   │   └── 20250907141731_policy_doc_triggers.sql
│   ├── seed.sql
│   └── supabase.types.ts
├── tsconfig.json
├── utils
│   ├── errors
│   │   └── ValidationError.ts
│   ├── SecureURLValidator
│   │   ├── __tests__
│   │   │   └── SecureURLValidator.test.ts
│   │   └── SecureURLValidator.ts
│   ├── supabase
│   │   ├── middleware.ts
│   │   ├── NextJSCookieStorage.ts
│   │   └── server.ts
│   ├── types.ts
│   └── usernameValidator.ts
└── vitest.config.mts
```

</details>

---

## 🚀 Join the Movement

Wanna help make this platform amazing? Whether it’s code, content, or good vibes — your contributions matter.

👉 [Start Contributing Today!](https://github.com/Christin-paige/BuiltInPublic/wiki)

---

## 📚 Setting up your environment

Wanna get this thing running? You’ll need a few secrets in place first.
Head over to our [Environment Setup Guide](https://github.com/Christin-paige/BuiltInPublic/wiki/Environment) for everything you need to configure your `.env` file, Supabase keys, and more.

---

## 👥 BuiltInPublic Contributors

- [Christin Martin](https://www.linkedin.com/in/christin-martin/)
- [Andrew Couture](https://www.linkedin.com/in/andrew-couture-15937ab/)
- [Gavin Hensley](https://www.linkedin.com/in/g-hensley/)
- [Brenda Hensley](https://www.linkedin.com/in/brenda-hensley-/)
- [Dielle De Noon](https://www.linkedin.com/in/dielle-denoon/)
- [Alina Bhatti](https://www.linkedin.com/in/alina-bhatti-0b0122353/)
- [Nick Clark](https://www.linkedin.com/in/nicholas-a-clark//)
- [Vinay Gajjar](https://www.linkedin.com/in/vinaygajjar/)
- [Gagandeep Guru](https://www.linkedin.com/in/igagandeep95/)
- [Charmayne Knox](https://www.linkedin.com/in/charmayneknox/)
- [Devyn Lowry](https://www.linkedin.com/in/devynwlowry/)
- [David Weiss](https://www.linkedin.com/in/bydavidweiss/)

---

## ❓ Questions?

- [Connect with me on LinkedIn](https://www.linkedin.com/in/christin-martin)

- Happy to collaborate and make this a great app!
