import { supabase } from '../seed';

// List of the posts to seed in the database: with id, username, content, visibility
const postsRaw = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    username: 'testuser1',
    content: 'Hello World!',
    visibility: 'public',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    username: 'testuser2',
    content: 'Hi there!',
    visibility: 'connections',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    username: 'testuser3',
    content: 'I love coding!',
    visibility: 'public',
  },
];

export async function seedPosts() {
  console.info('Seeding posts...');

  // Fetch all profiles
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('id, username');

  if (profileError) {
    console.error('Failed to fetch profiles:', profileError.message);
    return;
  }

  // Create a map of username to profile id
  const profileMap = new Map(
    profiles.map((p: { username: string; id: string }) => [p.username, p.id])
  );

  // For each post, get the profile id from the profile map
  // Build insertable rows
  const posts = postsRaw
    .map((entry) => {
      const profile_id = profileMap.get(entry.username);
      if (!profile_id) {
        console.warn(`No profile found for username: ${entry.username}`);
        return null;
      }
      // Return the post with the profile id
      return {
        id: entry.id,
        user_id: profile_id,
        content: entry.content,
        visibility: entry.visibility,
      };
    })
    .filter(Boolean); // remove nulls

  // Insert into posts
  const { error } = await supabase.from('posts').insert(posts);

  if (error) {
    console.error('Failed to seed posts:', error.message);
  } else {
    console.info('Successfully seeded posts');
  }
}
