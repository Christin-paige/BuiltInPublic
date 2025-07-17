import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Likes from "./Likes";
import { createAnonClient } from "utils/supabase/server";
import { Database } from "supabase/supabase.types";

export type Post = Database["public"]["Tables"]["posts"]["Row"] & {
  profiles: {
    name: string;
  };
  likes: Database["public"]["Tables"]["likes"]["Row"][];
};

export default async function Feed() {
  const supabase = await createAnonClient();

  const { data: posts, error } = (await supabase
    .from("posts")
    .select("*, profiles(name), likes(*)")) as unknown as {
    data: Post[] | null;
    error: Error | null;
  };

  // Optionally fetch the user if `createAnonClient` exposes it
/*   const {
    data: { user },
  } = await createServerComponentClient<Database>({ cookies }).auth.getUser();
 */
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
