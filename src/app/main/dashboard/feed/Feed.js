import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Likes from "./likes";
import { createAnonClient } from "utils/supabase/server";

export default async function Feed() {
  const supabase = await createAnonClient();

  const { data: posts, user } = await supabase
    .from("posts")
    .select("*, profiles(*), likes(*)");

  return (
    <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3 h-full text-white">
      <h1 className="font-semibold mb-2">Your Feed</h1>
      {posts?.map((post) => (
        <div key={post.id}>
          <p>{post.profiles.name}</p>
          <p>{post.content}</p>
          <Likes post={post} user={user} />
        </div>
      ))}
    </div>
  );
}
