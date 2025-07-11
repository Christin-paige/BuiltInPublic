import { cookies } from "next/headers";
import Likes from "./likes";
import { createAnonClient } from "utils/supabase/server";
import type { Database } from "@/supabase/supabase.types";

type Post = Database["public"]["Tables"]["posts"]["Row"] & {
  profiles: {
    name: string;
  };
  likes: any[]; // You can strongly type this later if needed
};

type User = Database["public"]["Tables"]["profiles"]["Row"] | null;

const Feed = async () => {
  const supabase = await createAnonClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, profiles(name), likes(*)");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3 h-full text-white">
      <h1 className="font-semibold mb-2">Your Feed</h1>
      {posts?.map((post: Post) => (
        <div key={post.id}>
          <p>{post.profiles.name}</p>
          <p>{post.content}</p>
          <Likes post={post} user={user} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
