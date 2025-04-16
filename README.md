# 🧠 CodeSphere

Welcome to **CodeSphere**, a community-focused platform where developers can build in public, track their progress, and stay motivated. It features a social and builder-centric dashboard with streak counters, project tracking, friend feeds, and more.

This is a work-in-progress so feel free to follow along or contribute!

---

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **Supabase** – Auth & backend
- **React** – Client components
- **Tailwind CSS** – Styling

---

## ✅ Features So Far

- 🔐 Google OAuth login using Supabase Auth
- 🚪 Logout functionality with redirect to landing page
- 🧠 Supabase client/server utility setup
- 🧭 Smart Navbar for login/logout states
- 🔄 Middleware to handle session syncing
- 🧩 Modular dashboard layout with multiple components

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/codesphere.git
cd codesphere
```
### 2. Install dependencies 

```bash
npm install
# or
yarn install
```
### 3. Set up environment variables
- Create a .env.local file in the root of the project and add:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```
### 4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Auth Setup
#### To enable Google Auth:
1. Go to your Supabase project
2. Under Authentication > Providers, enable Google
3. Add your credentials (Client ID & Secret from Google Cloud Console)
4. Set redirectTo in the supabase.auth.signInWithOAuth() to call your app URL

## What's Next
- Dashboard logic for each section (profile page, friends' projects, user's projects, streak counter...)
- User avatars in the navbar (from Google)
- Sign-in without Google option
- Help/FAQ section

## Contributing 
#### Contributions are welcome!

1. Fork the repo
2. Create a new branch: git checkout -b my-branch-name
3. Make your changes
4. Commit: git commit -m "Added my feature"
5. Push: git push origin -u my-branch-name
6. Open a pull request!

## Questions?
- [Connect with me on LinkedIn](https://www.linkedin.com/in/christinmartin)

- Happy to collaborate and make this a great app!


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


