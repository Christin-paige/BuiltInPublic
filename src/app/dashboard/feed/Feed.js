
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Feed() {
 const supabase = createServerComponentClient({ cookies });
 const { data: posts } = await supabase
   .from("posts")
   .select("*, profiles(*)");
  


  return (
    <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3 h-full text-white">
      <h1 className="font-semibold mb-2">Your Feed</h1>
<pre>{JSON.stringify(posts, null, 2)}</pre>
      <p className="text-lg">No updates yet. Be the first to reach out!</p>
    </div>
  );
}
