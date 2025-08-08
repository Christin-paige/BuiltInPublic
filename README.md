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
├── .DS_Store
├── .env
├── .env.example
├── .eslintrc.json
├── .gitguardian.toml
├── .github
│   ├── dependabot.yml
│   ├── ISSUE_TEMPLATE
│   │   └── new-feature-request.md
│   └── workflows
│       ├── codeql.yml
│       ├── dependabot-security-auto-merge.yml
│       ├── gitleaks.yml
│       ├── npmaudit.yml
│       ├── prettier.yml
│       ├── semgrep.yml
│       └── syft.yml
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
│   │   ├── funny1.gif
│   │   ├── funny2.gif
│   │   ├── funny3.gif
│   │   ├── funny4.gif
│   │   ├── funny5.gif
│   │   ├── funny6.gif
│   │   ├── funny7.gif
│   │   ├── funny8.gif
│   │   └── funny9.gif
│   ├── BuiltInPublic.png
│   ├── door.jpg
│   ├── example-cover-img.jpg
│   ├── logo3.png
│   ├── og-image.jpg
│   └── terminal-logo.png
├── README.md
├── scripts
│   ├── generateSupabaseTypes.ts
│   ├── precheck.sh
│   ├── seed.ts
│   └── seeds
│       ├── auth-users.ts
│       ├── posts.ts
│       ├── profile-skills.ts
│       ├── projects.ts
│       ├── skills.ts
│       └── social.ts
├── security
│   └── semgrep
│       └── general.yml
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
│   │   └── page.tsx
│   ├── components
│   │   ├── Footer.tsx
│   │   ├── Navbar
│   │   │   ├── actions.ts
│   │   │   ├── index.ts
│   │   │   └── Navbar.tsx
│   │   ├── ProfileIcon.tsx
│   │   ├── Providers
│   │   │   ├── QueryProvider.tsx
│   │   │   └── ThemeProvider.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── textarea.tsx
│   ├── contexts
│   │   └── ProfileEditContext.tsx
│   ├── hooks
│   │   ├── useProfile
│   │   │   ├── actions.ts
│   │   │   └── useProfile.tsx
│   │   └── useUser
│   │       ├── actions.ts
│   │       └── useUser.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── middleware.ts
│   ├── repositories
│   │   ├── base.repository.ts
│   │   └── profileRepository
│   │       ├── profile.repository.ts
│   │       └── profile.types.ts
│   ├── services
│   │   └── UINotification.service.ts
│   └── setupTests.ts
├── supabase
│   ├── __tests__
│   │   ├── rls-policies
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
│   ├── migrations
│   │   ├── 20250517104606_base_tables_rls.sql
│   │   └── 20250518145124_new_profile_trigger.sql
│   └── supabase.types.ts
├── tsconfig.json
├── utils
│   ├── supabase
│   │   ├── middleware.ts
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
