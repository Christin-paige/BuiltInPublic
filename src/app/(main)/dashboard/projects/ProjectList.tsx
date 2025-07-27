// app/dashboard/projects/ProjectList.tsx

import { createAnonClient } from 'utils/supabase/server';
import { Database } from 'supabase/supabase.types';

type Project = Database['public']['Tables']['projects']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export default async function ProjectList() {
  const supabase = await createAnonClient();

  // 1. Get current authenticated user (from cookies/session)
  const { data: userResult, error: userError } = await supabase.auth.getUser();
  const user = userResult?.user;

  console.log('🔍 Supabase auth.getUser() result:', user);
  if (userError) {
    console.error('❌ Error getting user:', userError.message);
  }

  if (!user) {
    console.error('❌ No authenticated user found.');
    return <p className='text-red-400'>User not found</p>;
  }

  // 2. Look up the corresponding profile record
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('❌ Profile not found for user.id:', user.id);
    return <p className='text-red-400'>Profile not found for this user.</p>;
  }

  console.log('👤 Loaded profile:', profile);

  // 3. Fetch projects that belong to this profile
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .eq('owner_id', profile.id);

  if (projectsError) {
    console.error('❌ Projects fetch error:', projectsError.message);
    return <p className='text-red-400'>Failed to load projects</p>;
  }

  console.log('📦 Projects found for profile.id:', profile.id, projects);

  return (
    <div className='bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3'>
      <h1 className='font-semibold text-center mb-2 text-white'>Projects</h1>

      {projects?.length ? (
        projects.map((project) => (
          <div
            key={project.id}
            className='border border-white rounded p-4 mb-3 cursor-pointer bg-black text-white hover:bg-gray-800'
          >
            <div className='flex justify-between items-center mb-1'>
              <h2 className='text-lg font-bold'>{project.name}</h2>
              <span
                className={`status-badge status-${project.status
                  ?.toLowerCase()
                  .replace(/\s+/g, '-')}`}
              >
                {project.status}
              </span>
            </div>
            <p className='text-sm text-gray-300'>{project.description}</p>
          </div>
        ))
      ) : (
        <p className='text-gray-300'>No projects found for this user.</p>
      )}

      <button className='w-full mt-4 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded'>
        + New
      </button>
    </div>
  );
}
