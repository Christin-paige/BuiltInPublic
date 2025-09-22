'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Database } from 'supabase/supabase.types';
import { Post } from './Feed';

type User = {
  id: string;
};

interface LikesProps {
  post: Post;
  user: User | null;
}

const Likes: FC<LikesProps> = ({ post, user }) => {
  const router = useRouter();

  const handleLikes = async () => {
    // const supabase = createClientComponentClient<Database>();

    if (user) {
      // await supabase
      //   .from('likes')
      //   .insert({ user_id: user.id, post_id: post.id });
      // // Optionally refresh or re-fetch
      // router.refresh();
    }
  };

  return <button onClick={handleLikes}>{post.likes?.length ?? 0} Likes</button>;
};

export default Likes;
