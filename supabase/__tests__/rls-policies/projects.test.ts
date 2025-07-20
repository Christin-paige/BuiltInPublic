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
    visibility: "private" as string,
  };
};

// Test suite for RLS policies on the projects table
describe("RLS Policies for Projects Table", async () => {

  // Test case: Ensure unauthenticated users cannot create projects
  it("should not allow unauthenticated users to create projects", async () => {
    // Create a new project object
    const project = await newProject();

    // Use the unauthenticated client to attempt to insert a new project
    const { data, error } = await unauthClient.from("projects").insert(project).select();

    // Expect no data and an error
    expect(data).toBeNull();
    expect(error).toBeDefined();
  });

  // Test case: Ensure authenticated users can create private projects
  it("should allow authenticated users to create private projects", async () => {
    // Create a new project object
    const project = await newProject();
    console.log(project);
    console.log(await authedClient.auth.getUser());

    // Use the authenticated client to insert a new project
    const { data, error } = await authedClient.from("projects").insert(project).select();
    console.log(data, error);

    // Expect data to be defined and not empty
    expect(data).toBeDefined();
    expect(error).toBeNull();
  });

  // Test case: Ensure anyone can read projects if the visibility is public
  it("should allow anyone to get all projects", async () => {
    // Use the unauthenticated client to fetch all projects
    const { data, error } = await unauthClient.from("projects").select("*").eq("visibility", "public");

    // Expect no error and data to be an array (could be empty if no projects)
    expect(data).toBeInstanceOf(Array);
    expect(error).toBeNull();
  });

  // Test case: Ensure private projects are not accessible to unauthenticated users
  it("should not allow unauthenticated users to get private projects", async () => {

    // Use the unauthenticated client to fetch private projects
    const { data, error } = await unauthClient.from("projects").select("*").eq("visibility", "private");

    // Expect no data and an error
    expect(data?.length).toBe(0);
    expect(error).toBeDefined();
  });

  // Test case: Ensure authenticated users cannot access private projects they do not own
  it("should not allow authenticated users to get private projects they do not own", async () => {
    // Use the authenticated client to fetch private projects
    const { data, error } = await authedClient.from("projects").select("*").eq("visibility", "private").neq("owner_id", (await newProject()).owner_id);

    // Expect no data and an error
    expect(data?.length).toBe(0);
    expect(error).toBeDefined();
  });

  // Test case: Ensure authenticated users can access their own private projects
  it("should allow authenticated users to get their own private projects", async () => {
    // Use the authenticated client to fetch private projects
    const { data, error } = await authedClient.from("projects").select("*").eq("visibility", "private").eq("owner_id", (await newProject()).owner_id);

    // Expect data to be defined and not empty
    expect(data).toBeDefined();
    expect(data?.length).toBeGreaterThan(0);
    expect(error).toBeNull();
  });

});