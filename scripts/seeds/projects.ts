import { supabase } from "../seed";

// List of the projects to seed in the database: with name, description, username, visibility, repo_url
const projectsRaw = [
  {
    name: "CodeSphere DevHub",
    description:
      "A social media platform for devs to share projects and ideas.",
    username: "testuser1",
    visibility: "connections",
    repo_url: "https://github.com/codespheredevs/devhub",
  },
  {
    name: "NextGen Portfolio",
    description:
      "A modern, animated developer portfolio with filtering and tags.",
    username: "testuser2",
    visibility: "public",
    repo_url: "https://github.com/codespheredevs/nextgen-portfolio",
  },
];

export async function seedProjects() {
  console.log("Seeding projects...");

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
  const projects = projectsRaw
    .map((entry) => {
      const profile_id = profileMap.get(entry.username);
      if (!profile_id) {
        console.warn(`No profile found for username: ${entry.username}`);
        return null;
      }
      // Return the project with the profile id
      return {
        name: entry.name,
        description: entry.description,
        owner_id: profile_id,
        visibility: entry.visibility,
        repo_url: entry.repo_url,
      };
    })
    .filter(Boolean); // remove nulls

  // Insert into projects
  const { error } = await supabase.from("projects").insert(projects);

  if (error) {
    console.error("Failed to seed projects:", error.message);
  } else {
    console.log("Successfully seeded projects");
  }
}
