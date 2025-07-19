// This file tests Row Level Security (RLS) policies for the comments table in Supabase

import { describe, it, expect } from "vitest";
import { authedClient, unauthClient } from "../testClients";
import { UUID } from "crypto";

const newComment = async () => {
  return {
    post_id: "11111111-1111-1111-1111-111111111111" as UUID,
    user_id: (await authedClient.auth.getUser()).data.user?.id,
    content: "This is a test comment" as string,
  };
};

// Test suite for RLS policies on the comments table
describe("RLS Policies for Comments Table", async () => {
  // Test case: Ensure authenticated users can read comments
  it("should allow authenticated user to get all comments", async () => {
    // Use the authenticated client to fetch all comments
    const { data, error } = await authedClient.from("comments").select("*");

    // Expect no error and data to be an array (could be empty if no comments)
    expect(data).toBeInstanceOf(Array);
    expect(error).toBeNull();
  });

  // Test case: Ensure unauthenticated users cannot read comments
  it("should not allow unauthenticated user to get comments", async () => {
    // Use the unauthenticated client to try and fetch comments
    const { data } = await unauthClient.from("comments").select("*");

    // Expect 0 data returned for unauthenticated user
    expect(data?.length).toBe(0);
  });

  // Test case: Ensure authenticated users can insert comments
  it("should allow an authenticated user to insert a comment", async () => {
    const comment = await newComment();

    // Use the authenticated client to insert a new comment
    const { data, error } = await authedClient
      .from("comments")
      .insert(comment)
      .select();

    // Expect no error and data to be a non empty array with data in it
    expect(data).toBeInstanceOf(Array);
    expect(data?.length).toBeGreaterThan(0);
    expect(error).toBeNull();
  });

  // Test case: Ensure unauthenticated users cannot insert comments
  it("should not allow an unauthenticated user to insert a comment", async () => {
    const comment = await newComment();

    // Use the unauthenticated client to try and insert a new comment
    const { data, error } = await unauthClient
      .from("comments")
      .insert(comment)
      .select();

    // Expect error and no data returned for unauthenticated user
    expect(data).toBeNull();
    expect(error).not.toBeNull();
  });

  // Test case: Ensure authenticated users can update their own comments
  it("should allow an authenticated user to update their own comment", async () => {
    const comment = await newComment();

    // First, get the test comment that was just inserted
    const { data: commentData, error: commentError } = await authedClient
      .from("comments")
      .select()
      .eq("content", comment.content)
      .single();

    // Now, update the inserted comment
    const { data: updateData, error: updateError } = await authedClient
      .from("comments")
      .update({ content: "Updated comment content" })
      .eq("id", commentData.id)
      .select();

    // Expect no error and updated data to reflect the changes
    expect(updateError).toBeNull();
    expect(updateData).toBeInstanceOf(Array);
    expect(updateData?.[0].content).toBe("Updated comment content");
  });

  // Test case: Ensure authenticated users cannot update others' comments
  it("should not allow an authenticated user to update someone else's comment", async () => {
    // First get a comment that does not belong to the authenticated user
    const { data: otherCommentData, error: otherCommentError } =
      await authedClient
        .from("comments")
        .select()
        .eq("content", "This is super helpful, thanks for sharing!");

    // Expect no errors and at least one comment returned
    expect(otherCommentError).toBeNull();
    expect(otherCommentData).toBeInstanceOf(Array);
    expect(otherCommentData?.length).toBeGreaterThan(0);

    // Now, attempt to update that comment
    const { data: updateData, error: updateError } = await authedClient
      .from("comments")
      .update({ content: "Trying to update someone else's comment" })
      .eq("id", otherCommentData?.[0].id)
      .select();

    // Expect an error and no data returned when trying to update someone else's comment
    expect(updateData?.length).toBe(0);
    expect(updateError).toBeFalsy();
  });

  // Test case: Ensure unauthenticated users cannot update comments
  it("should not allow an unauthenticated user to update a comment", async () => {
    // First get a comment to attempt to update
    const { data: commentData, error: commentError } = await authedClient
      .from("comments")
      .select()
      .limit(1)
      .single();

    // Now, attempt to update that comment
    const { data: updateData, error: updateError } = await authedClient
      .from("comments")
      .update({ content: "Trying to update someone else's comment" })
      .eq("id", commentData?.id)
      .select();

    // Expect an error and no data returned when trying to update someone else's comment
    expect(updateData?.length).toBe(0);
    expect(updateError).toBeFalsy();
  });
});
