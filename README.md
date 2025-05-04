# 🧠 CodeSphere

Welcome to **CodeSphere**, a community-focused platform where developers can build in public, track their progress, and stay motivated. It features a social and builder-centric dashboard with streak counters, project tracking, friend feeds, and more.

This is a work-in-progress so feel free to follow along or contribute!

---

## 📦 Tech Stack

| Name | Usage | 
| :--- | :--- | 
| Next.js 14 | App Router |
| Supabase | Auth & backend |
| React | Client components | 
| Tailwind CSS | Styling | 

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

## Supabase Local Setup
Running Supabase locally will require the [Supabase CLI](https://supabase.com/docs/guides/local-development?queryGroups=package-manager&package-manager=npm) and [Docker](https://docs.docker.com/engine/install/) installed as prerequisites.

With the Supabase CLI and Docker setup, open a terminal and navigate to the root of the project. Supabase is configured with the toml file in `/supabase/config.toml` and all that should be required to get it running is to start the local Supabase instance

```bash
supabase start
```

It will take a little time for Supabase to download the required Docker containers on the first run. When it's finished you should see an output like this:

```bash
API URL: http://127.0.0.1:54321
GraphQL URL: http://127.0.0.1:54321/graphql/v1
S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
Inbucket URL: http://127.0.0.1:54324
JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
S3 Access Key: 625729a08b95bf1b7ff351a663f3a23c
S3 Secret Key: 850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907
S3 Region: local

```

***NOTE**: The values in the output above only apply to your local instance of Supabase, they may differ on your machine. Never share the anon or service role keys from a production instance.*

If you don't yet have a `.env` file in the root of your project, create one now and add the following variables:
```typescript
NEXT_PUBLIC_SUPABASE_URL=// use the API URL from the output of the last step
NEXT_PUBLIC_SUPABASE_ANON_KEY=// use the anon key from the last step
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=// use the service role key from last step
```

### Supabase Auth Local Setup
Our current setup supports login via GitHub or Google, the provider is, as of April 26th 2025, determined by an environment variable:
```typescript
NEXT_PUBLIC_AUTH_PROVIDER=// either 'github' or 'google'
```

Of the two, GitHub is the simplest to setup

##### GitHub Auth
You'll need to setup an application in your GitHub account to handle GitHub authentication.

Go to Settings -> Developer Settings and select OAuth apps
![Developer setting screenshot](docs/oathapps.png)
Click the New OAuth App button on this screen and you should see the following form:
![Register app form](docs/registerapp.png)
Give your app a descriptive name. For the Homepage URL, enter `http://localhost:3000`, this is the URL that requests for authentication will originate from

For the Authorization callback URL, enter `http://localhost:54321/auth/v1/callback`, this is the URL GitHub will redirect to after authenticating

Click the button labeled "Register application"

On the next screen you will see:
![App registration confirmed](docs/appregistered.png)

You will need the Client ID and a Client secret to finish. Click the button labeled "Generate a new client secret", and copy the generated secret to the clipboard. Add the following variables to your `.env`

```typescript
GITHUB_AUTH_EXTERNAL_CLIENT_ID=// the Client ID from the previous step
GITHUB_AUTH_EXTERNAL_SECRET=// the generated Client secret from the previous step
```

With your GitHub application created and registered, and your environment variables set, we just need to restart your local Supabase instance. Run the following in your terminal
```bash
supabase stop
supabase start
```

And then start the client app with:
```bash
npm run dev
```

When you click Login in the navbar now, you should be redirected to GitHub to authenticate. After which you can verify that a user has been created by visiting the Supabase dashboard at `localhost:54323` in your browser.

Select "Table Editor" from the left sidebar, choose the auth schema from the dropdown on the Table Editor screen, and select `users` from the list of tables. You should see a user has been created with the email you use for GitHub
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


