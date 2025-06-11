import { supabase } from "../seed";

// List of the profile skills to seed in the database: with username, skill_id, level
const rawProfileSkills = [
  { username: "testuser1", skill_id: 1, level: 4 },
  { username: "testuser2", skill_id: 2, level: 5 },
  { username: "testuser3", skill_id: 3, level: 3 },
  { username: "testuser4", skill_id: 4, level: 2 },
];

export async function seedProfileSkills() {
  console.log("Seeding profile_skills...");

  // Fetch all profiles
  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("id, username");

  if (profileError) {
    console.error("Failed to fetch profiles:", profileError.message);
    return;
  }

  // Create a map of username to profile id
  const profileMap = new Map(profiles.map((p) => [p.username, p.id]));

  // Build insertable rows
  const profileSkills = rawProfileSkills
    .map((entry) => {
      const profile_id = profileMap.get(entry.username);
      if (!profile_id) {
        console.warn(`No profile found for username: ${entry.username}`);
        return null;
      }
      // Return the profile skill with the profile id
      return {
        profile_id,
        skill_id: entry.skill_id,
        level: entry.level,
      };
    })
    .filter(Boolean); // remove nulls

  // Insert into profile_skills
  const { error } = await supabase.from("profile_skills").insert(profileSkills);

  if (error) {
    console.error("Failed to seed profile_skills:", error.message);
  } else {
    console.log("Successfully seeded profile_skills");
  }
}
