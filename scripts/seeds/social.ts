import { supabase } from '../seed';

// List of the comments to seed in the database: with postAuthor, commenter, content
const comments = [
  {
    postAuthor: 'testuser1',
    commenter: 'testuser2',
    content: 'Love this update! Keep it up.'
  },
  {
    postAuthor: 'testuser2',
    commenter: 'testuser3',
    content: 'This is super helpful, thanks for sharing!'
  },
  {
    postAuthor: 'testuser3',
    commenter: 'testuser4',
    content: 'Following your progress, excited to see more.'
  },
];

// List of the likes to seed in the database: with liker, postAuthor
const likes = [
  { liker: 'testuser1', postAuthor: 'testuser2' },
  { liker: 'testuser2', postAuthor: 'testuser3' },
  { liker: 'testuser3', postAuthor: 'testuser4' },
];

// List of the follows to seed in the database: with follower, following
const follows = [
  { follower: 'testuser1', following: 'testuser2' },
  { follower: 'testuser2', following: 'testuser3' },
  { follower: 'testuser3', following: 'testuser4' },
  { follower: 'testuser4', following: 'testuser1' }
];

// List of the endorsements to seed in the database: with skill_id, user_id, endorsed_to
const endorsements = [
  { skill_id: '3', user_id: 'testuser1', endorsed_to: 'testuser3' },
  { skill_id: '2', user_id: 'testuser2', endorsed_to: 'testuser1' },
];

export async function seedSocial() {
  console.log('Seeding comments, likes, follows, and endorsements...');

  // For each comment, get the commenter and target post
  for (const comment of comments) {
    const [{ data: commenterProfile }, { data: targetPosts }] = await Promise.all([
      supabase.from('profiles').select('id').eq('username', comment.commenter).maybeSingle(),
      supabase.from('posts')
        .select('id, user_id')
        .eq('user_id',
          (await supabase.from('profiles').select('id').eq('username', comment.postAuthor).maybeSingle()).data?.id || '')
        .order('created_at', { ascending: false })
        .limit(1)
    ]);

    // Get the post id from the target posts
    const postId = targetPosts?.[0]?.id;
    if (!commenterProfile || !postId) {
      console.warn(`Skipping comment from ${comment.commenter} on ${comment.postAuthor}`);
      continue;
    }

    // Insert the comment into the comments table
    const { error } = await supabase.from('comments').insert({
      user_id: commenterProfile.id,
      post_id: postId,
      content: comment.content,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error(`Failed to insert comment by ${comment.commenter}: ${error.message}`);
    } else {
      console.log(`Comment by ${comment.commenter} on ${comment.postAuthor}'s post inserted`);
    }
  }

  // For each like, get the liker and target post
  for (const like of likes) {
    const [{ data: likerProfile }, { data: targetPosts }] = await Promise.all([
      supabase.from('profiles').select('id').eq('username', like.liker).maybeSingle(),
      supabase.from('posts')
        .select('id, user_id')
        .eq('user_id',
          (await supabase.from('profiles').select('id').eq('username', like.postAuthor).maybeSingle()).data?.id || '')
        .order('created_at', { ascending: false })
        .limit(1)
    ]);

    // Get the post id from the target posts
    const postId = targetPosts?.[0]?.id;
    if (!likerProfile || !postId) {
      console.warn(`Skipping like by ${like.liker} on ${like.postAuthor}`);
      continue;
    }

    // Insert the like into the likes table
    const { error } = await supabase.from('likes').insert({
      user_id: likerProfile.id,
      post_id: postId,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error(`Failed to insert like by ${like.liker}: ${error.message}`);
    } else {
      console.log(`Like by ${like.liker} on ${like.postAuthor}'s post inserted`);
    }
  }

  // For each follow, get the follower and following
  for (const follow of follows) {
    const [{ data: followerProfile }, { data: followingProfile }] = await Promise.all([
      supabase.from('profiles').select('id').eq('username', follow.follower).maybeSingle(),
      supabase.from('profiles').select('id').eq('username', follow.following).maybeSingle()
    ]);

    if (!followerProfile || !followingProfile) {
      console.warn(`Skipping follow from ${follow.follower} to ${follow.following}`);
      continue;
    }

    // Insert the follow into the follows table
    const { error } = await supabase.from('follows').insert({
      follower_id: followerProfile.id,
      followee_id: followingProfile.id,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error(`Failed to insert follow: ${follow.follower} → ${follow.following}: ${error.message}`);
    } else {
      console.log(`${follow.follower} followed ${follow.following}`);
    }
  }

  // For each endorsement, get the endorser, endorsed, and skill
  for (const endorsement of endorsements) {
    const [{ data: endorser }, { data: endorsed }, { data: skill }] = await Promise.all([
      supabase.from('profiles').select('id').eq('username', endorsement.user_id).maybeSingle(),
      supabase.from('profiles').select('id').eq('username', endorsement.endorsed_to).maybeSingle(),
      supabase.from('skills').select('id').eq('id', endorsement.skill_id).maybeSingle(),
    ]);

    // Get the skill id from the skill
    if (!endorser || !endorsed || !skill) {
      console.warn(`Skipping endorsement: ${endorsement.user_id} → ${endorsement.endorsed_to} for ${endorsement.skill_id}`);
      continue;
    }

    // Insert the endorsement into the endorsements table
    const { error } = await supabase.from('endorsements').insert({
      user_id: endorser.id,
      endorsed_to: endorsed.id,
      skill_id: skill.id,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error(`Failed to insert endorsement: ${endorsement.user_id} → ${endorsement.endorsed_to} for ${endorsement.skill_id}: ${error.message}`);
    } else {
      console.log(`${endorsement.user_id} endorsed ${endorsement.endorsed_to} for ${endorsement.skill_id}`);
    }
  }

  console.log('Done seeding comments, likes, follows, and endorsements!');
}
