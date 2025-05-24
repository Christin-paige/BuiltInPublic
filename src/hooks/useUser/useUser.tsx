"use client";

import supabaseClient from "utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./actions";

export default function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { data, isLoading };
}
