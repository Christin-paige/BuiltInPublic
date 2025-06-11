import { supabase } from '../seed';

// List of the auth users to seed in the database: with email, password, role, name, username, avatar_url
const users = [
  {
    email: 'codespheredevs+testuser1@gmail.com',
    password: 'codesphere123',
    role: 'user',
    name: 'Test User 1',
    username: 'testuser1',
    avatar_url: 'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740',
  },
  {
    email: 'codespheredevs+testuser2@gmail.com',
    password: 'codesphere123',
    role: 'user',
    name: 'Test User 2',
    username: 'testuser2',
    avatar_url: 'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740',
  },
  {
    email: 'codespheredevs+testuser3@gmail.com',
    password: 'codesphere123',
    role: 'user',
    name: 'Test User 3',
    username: 'testuser3',
    avatar_url: 'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740',
  },
  {
    email: 'codespheredevs+testuser4@gmail.com',
    password: 'codesphere123',
    role: 'user',
    name: 'Test User 4',
    username: 'testuser4',
    avatar_url: 'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740',
  },
];

export async function seedUsers() {
  console.log('Seeding auth users and profiles...');

  // For each user, create a new user in the auth.users table and a new profile in the profiles table
  for (const u of users) {
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: {
        role: u.role,
        name: u.name,
        username: u.username,
      },
    });

    if (createError) {
      console.error(`Failed to create ${u.email}: ${createError.message}`);
      continue;
    }

    const userId = created?.user?.id;
    if (!userId) {
      console.error(`No ID returned for ${u.email}`);
      continue;
    }

    // Create a new profile in the profiles table
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: userId,
      username: u.username,
      avatar_url: u.avatar_url,
    });

    if (profileError) {
      console.error(`Failed to create profile for ${u.email}: ${profileError.message}`);
    } else {
      console.log(`Created user & profile for ${u.email}`);
    }
  }

  console.log('Done seeding users!');
}
