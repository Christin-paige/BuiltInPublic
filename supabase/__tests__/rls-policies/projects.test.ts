// This file tests Row Level Security (RLS) policies for the projects table in Supabase

import { describe, it, expect, vi } from 'vitest';
import { authedClient, unauthClient } from '../testClients';

// Create a new project object
const newProject = async () => {
  return {
    name: 'Test Project' as string,
    description: 'This is a test project' as string,
    owner_id: (await authedClient.auth.getUser()).data.user?.id,
    visibility: 'private' as string,
  };
};

// Test suite for RLS policies on the projects table
describe('RLS Policies for Projects Table', async () => {
  // Test case: Ensure unauthenticated users cannot create projects
  it('should not allow unauthenticated users to create projects', async () => {
    // Create a new project object
    const project = await newProject();

    // Use the unauthenticated client to attempt to insert a new project
    const { data, error } = await unauthClient
      .from('projects')
      .insert(project)
      .select();

    // Expect no data and an error
    expect(data).toBeNull();
    expect(error).toBeDefined();
  });

  // Test case: Ensure authenticated users can create private projects
  it('should allow authenticated users to create private projects', async () => {
    // Create a new project object
    const project = await newProject();

    // Use the authenticated client to insert a new project
    const { data, error } = await authedClient
      .from('projects')
      .insert(project)
      .select();

    // Expect data to be defined and not empty
    expect(data).toBeDefined();
    expect(error).toBeNull();
  });

  //Test case: Ensure authenticated users can create public projects
  it('should allow authenticated users to create public projects', async () => {
    // Create a new project object with public visibility
    const project = await newProject();
    project.visibility = 'public';

    // Use the authenticated client to insert a new project
    const { data, error } = await authedClient
      .from('projects')
      .insert(project)
      .select();

    // Expect data to be defined and not empty
    expect(data).toBeDefined();
    expect(error).toBeNull();
  });

  // Test case: Ensure unauthenticated users can not update projects
  it('should not allow unauthenticated users to update projects', async () => {
    // Select a project to update (assuming at least one project exists)
    const { data: projects } = await authedClient
      .from('projects')
      .select('*')
      .limit(1);

    if (!projects || projects.length === 0) {
      throw new Error('No projects found');
    }

    // Use the unauthenticated client to attempt to update the project
    const { data, error } = await unauthClient
      .from('projects')
      .update({ visibility: 'private' })
      .eq('id', projects[0].id)
      .select();

    // Expect no data and an error
    expect(data?.length).toBe(0);
    expect(error).toBeDefined();
  });

  // Test case: Ensure authenticated users can update their own projects
  it('should allow authenticated users to update their own projects', async () => {
    // Get a single project created by the authenticated user
    const { data: projects } = await authedClient
      .from('projects')
      .select('*')
      .eq('owner_id', (await newProject()).owner_id)
      .limit(1);

    // Use the authenticated client to update the project
    const { data, error } = await authedClient
      .from('projects')
      .update({ visibility: 'public' })
      .eq('id', projects?.[0].id)
      .select();

    // Expect data to be defined and not empty
    expect(data).toBeDefined();
    expect(error).toBeNull();
  });

  // Test case: Ensure anyone can read projects if the visibility is public
  it('should allow anyone to get all projects', async () => {
    // Use the unauthenticated client to fetch all projects
    const { data, error } = await unauthClient
      .from('projects')
      .select('*')
      .eq('visibility', 'public');

    // Expect no error and data to be an array (could be empty if no projects)
    expect(data).toBeInstanceOf(Array);
    expect(error).toBeNull();
  });

  // Test case: Ensure private projects are not accessible to unauthenticated users
  it('should not allow unauthenticated users to get private projects', async () => {
    // Use the unauthenticated client to fetch private projects
    const { data, error } = await unauthClient
      .from('projects')
      .select('*')
      .eq('visibility', 'private');

    // Expect no data and an error
    expect(data?.length).toBe(0);
    expect(error).toBeDefined();
  });

  // Test case: Ensure authenticated users cannot access private projects they do not own
  it('should not allow authenticated users to get private projects they do not own', async () => {
    // Use the authenticated client to fetch private projects
    const { data, error } = await authedClient
      .from('projects')
      .select('*')
      .eq('visibility', 'private')
      .neq('owner_id', (await newProject()).owner_id);

    // Expect no data and an error
    expect(data?.length).toBe(0);
    expect(error).toBeDefined();
  });

  // Test case: Ensure authenticated users can access their own private projects
  it('should allow authenticated users to get their own private projects', async () => {
    // Use the authenticated client to fetch private projects
    const { data, error } = await authedClient
      .from('projects')
      .select('*')
      .eq('visibility', 'private')
      .eq('owner_id', (await newProject()).owner_id);

    // Expect data to be defined and not empty
    expect(data).toBeDefined();
    expect(data?.length).toBeGreaterThan(0);
    expect(error).toBeNull();
  });

  // Test case: Ensure unauthenticated users cannot delete projects
  it('should not allow unauthenticated users to delete projects', async () => {
    // Select a project to delete (assuming at least one project exists)
    const { data: projects } = await authedClient
      .from('projects')
      .select('*')
      .limit(1);

    if (!projects || projects.length === 0) {
      throw new Error('No projects found');
    }

    // Use the unauthenticated client to attempt to delete the project
    const { data, error } = await unauthClient
      .from('projects')
      .delete()
      .eq('id', projects[0].id)
      .select();

    // Expect no data and an error
    expect(data?.length).toBe(0);
    expect(error).toBeDefined();
  });

  // Test case: Ensure authenticated users can delete their own projects
  it('should allow authenticated users to delete their own projects', async () => {
    // Get a single project created by the authenticated user
    const { data: projects } = await authedClient
      .from('projects')
      .select('*')
      .eq('owner_id', (await newProject()).owner_id)
      .limit(1);

    // Use the authenticated client to delete the project
    const { data, error } = await authedClient
      .from('projects')
      .delete()
      .eq('id', projects?.[0].id)
      .select();

    // Expect data to be defined and not empty
    expect(data).toBeDefined();
    expect(error).toBeNull();
  });
});
