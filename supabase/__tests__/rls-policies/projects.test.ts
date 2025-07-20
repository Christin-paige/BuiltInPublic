// This file tests Row Level Security (RLS) policies for the projects table in Supabase

import { describe, it, expect } from "vitest";
import { authedClient, unauthClient } from "../testClients";
import { UUID } from "crypto";

// Create a new project object
const newProject = async () => {
  return {
    name: "Test Project" as string,
    description: "This is a test project" as string,
    owner_id: (await authedClient.auth.getUser()).data.user?.id,
  };
};

// Test suite for RLS policies on the projects table
describe("RLS Policies for Projects Table", async () => {

  // Test case: Ensure anyone can read projects if the visibility is public
  it("should allow anyone to get all projects", async () => {
    // Use the unauthenticated client to fetch all projects
    const { data, error } = await unauthClient.from("projects").select("*").eq("visibility", "public");

    // Expect no error and data to be an array (could be empty if no projects)
    expect(data).toBeInstanceOf(Array);
    expect(error).toBeNull();
  });

});