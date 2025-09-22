import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { seedSkills } from './seeds/skills';
import { seedUsers } from './seeds/auth-users';
import { seedProfileSkills } from './seeds/profile-skills';
import { seedProjects } from './seeds/projects';
import { seedPosts } from './seeds/posts';
import { seedSocial } from './seeds/social';
import { seedPolicy } from './seeds/policy-doc';

// Load the environment variables
config();

// Check if the environment variables are set and throw an error if they are not
if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY
) {
  throw new Error('Missing Supabase environment variables');
}

// Create a Supabase client with the environment variables
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Function to run the seeds in the following order:
// 1. seedUsers
// 2. seedSkills
// 3. seedProfileSkills
// 4. seedProjects
// 5. seedPosts
// 6. seedSocial
// 7. seedPolicy
async function runSeeds() {
  try {
    console.info('Seeding data...');
    await seedUsers();
    await seedSkills();
    await seedProfileSkills();
    await seedProjects();
    await seedPosts();
    await seedSocial();
    await seedPolicy();
    console.info('All seeds done!');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

// Run the seeds function and catch any errors
runSeeds().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
