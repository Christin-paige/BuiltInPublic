import { supabase } from "../seed";

export async function seedSkills() {
  // List of the skills to seed in the database: with name
  const skills = [
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "React" },
    { name: "Node.js" },
    { name: "Express" },
    { name: "MongoDB" },
    { name: "SQL" },
    { name: "GraphQL" },
    { name: "REST" },
    { name: "HTML" },
    { name: "CSS" },
    { name: "TailwindCSS" },
  ];

  // Insert into skills
  const { error } = await supabase.from("skills").upsert(skills);
  if (error) throw new Error(`Failed to seed skills: ${error.message}`);
  console.log(`Seeded ${skills.length} skills`);
}
