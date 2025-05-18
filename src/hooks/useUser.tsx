"use client";

import supabaseClient from "utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      //types have been generated using supabase typescript client - hover over data to see the types
      const { data } = await supabaseClient.auth.getSession();
      if (data.session?.user) {
        const { data: user } = await supabaseClient
          //fetch user information from profile table

          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();

        return user;
      }

      return null;
    },
  });

  return { data, isLoading };
}
