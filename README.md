# 🧠 BuiltInPublic

Welcome to **BuiltInPublic**, a community-focused platform where developers can build in public, track their progress, and stay motivated. It features a social and builder-centric dashboard with streak counters, project tracking, friend feeds, and more.

This is a work-in-progress so feel free to follow along or contribute!

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Supabase
- **Auth:** Supabase Auth
- **Database:** PostgreSQL (via Supabase)
- **Deployment:** Vercel
- **Linting & Formatting:** ESLint, Prettier

---

## 🔧 Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)
- A [Supabase](https://supabase.com/) project and API keys
- [Git](https://git-scm.com/) for cloning the repo

---

## 🗂️ Project Structure

<details>
<summary>📁 Click to expand project file structure</summary>

````plaintext
.
├── @
│   └── components
│       └── ui
│           └── button.jsx
├── bun.lock
├── components.json
├── docs
│   ├── appregistered.png
│   ├── oathapps.png
│   ├── pull_request_template.md
│   └── registerapp.png
├── eslint.config.mjs
├── LICENSE
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
│   ├── BuiltInPublic.png
│   ├── door.jpg
│   ├── example-cover-img.jpg
│   ├── logo3.png
│   └── terminal-logo.png
├── README.md
├── scripts
│   ├── seeds
│   │   ├── auth-users.ts
│   │   ├── posts.ts
│   │   ├── profile-skills.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── social.ts
│   └── seed.ts
├── security
│   └── semgrep
│       └── general.yml
├── SECURITY.md
├── src
│   ├── app
│   │   ├── about
│   │   │   └── page.js
│   │   ├── auth
│   │   │   ├── actions.ts
│   │   │   ├── callback
│   │   │   ├── DevSignIn.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── hook
│   │   │   └── useUser.tsx
│   │   ├── layout.tsx
│   │   ├── (main)
│   │   │   ├── dashboard
│   │   │   ├── layout.tsx
│   │   │   └── [username]
│   │   └── page.js
│   ├── components
│   │   ├── Footer.tsx
│   │   ├── Navbar
│   │   │   ├── actions.ts
│   │   │   ├── index.ts
│   │   │   └── Navbar.tsx
│   │   ├── ProfileIcon.tsx
│   │   └── Providers
│   │       ├── QueryProvider.tsx
│   │       └── ThemeProvider.tsx
│   ├── hooks
│   │   ├── useProfile
│   │   │   ├── actions.ts
│   │   │   └── useProfile.tsx
│   │   └── useUser
│   │       ├── actions.ts
│   │       └── useUser.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── middleware.ts
│   ├── repositories
│   │   ├── base.repository.ts
│   │   └── profileRepository
│   │       ├── profile.repository.ts
│   │       └── profile.types.ts
│   ├── services
│   │   └── UINotification.service.ts
│   └── setupTests.ts
├── structure.md
├── supabase
│   ├── config.toml
│   ├── migrations
│   │   ├── 20250517104606_base_tables_rls.sql
│   │   └── 20250518145124_new_profile_trigger.sql
│   └── supabase.types.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── utils
│   ├── supabase
│   │   ├── client.ts
│   │   ├── middleware.ts
│   │   └── server.ts
│   └── types.ts
└── vitest.config.mts
</details>```
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

- [Andrew Couture](https://www.linkedin.com/in/andrew-couture-15937ab/)
- [Gavin Hensley](https://www.linkedin.com/in/g-hensley/)
- [Brenda Hensley](https://www.linkedin.com/in/brenda-hensley-/)
- [Dielle De Noon](https://www.linkedin.com/in/dielle-denoon/)
- [Alina Bhatti](https://www.linkedin.com/in/alina-bhatti-0b0122353/)
- [Nick Clark](https://www.linkedin.com/in/nicholas-a-clark//)

---

## ❓ Questions?

- [Connect with me on LinkedIn](https://www.linkedin.com/in/christin-martin)

- Happy to collaborate and make this a great app!
````
