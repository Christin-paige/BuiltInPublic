'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'supabase/supabase.types';

type Project = Database['public']['Tables']['projects']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  const supabase = createClientComponentClient<Database>();
  const pathname = usePathname();

  // ✅ Only show "+ New" on /username (not on /username/projects)
  const isOnUsernameRoot = /^\/[^/]+$/.test(pathname || '');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: userResult, error: userError } = await supabase.auth.getUser();
      const user = userResult?.user;
      if (!user || userError) {
        console.error('No user found', userError);
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        console.error('Profile fetch failed', profileError);
        setLoading(false);
        return;
      }

      setProfile(profile);

      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('owner_id', profile.id);

      if (projectsError) {
        console.error('Projects fetch failed', projectsError.message);
      } else {
        setProjects(projects || []);
      }

      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  const handleCreateProject = async () => {
    if (!newProjectName || !profile) return;

    const { error } = await supabase.from('projects').insert({
      name: newProjectName,
      description: newProjectDesc,
      owner_id: profile.id,
      visibility: 'public',
    });

    if (error) {
      console.error('Failed to create project:', error.message);
      return;
    }

    setNewProjectName('');
    setNewProjectDesc('');
    setShowModal(false);

    // Refresh list
    const { data: updatedProjects } = await supabase
      .from('projects')
      .select('*')
      .eq('owner_id', profile.id);

    setProjects(updatedProjects || []);
  };

  return (
    <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3">
      <h1 className="font-semibold text-center mb-4 text-white">Projects</h1>

      {loading && <p className="text-white">Loading...</p>}

      {!loading && projects?.length > 0 ? (
        projects.map((project) => (
          <div
            key={project.id}
            className="border border-white rounded p-4 mb-3 cursor-pointer bg-black text-white hover:bg-gray-800"
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg font-bold">{project.name}</h2>
              <span className="text-sm uppercase text-gray-400">
                {project.visibility}
              </span>
            </div>
            <p className="text-sm text-gray-300">{project.description}</p>
          </div>
        ))
      ) : (
        !loading && (
          <p className="text-gray-300">No projects found for this user.</p>
        )
      )}

      {isOnUsernameRoot && (
        <button
          onClick={() => setShowModal(true)}
          className="w-full mt-4 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded"
        >
          + New
        </button>
      )}

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-lg w-full max-w-md border border-purple-700">
            <h2 className="text-lg text-white font-bold mb-4">Create New Project</h2>

            <input
              type="text"
              placeholder="Project name"
              className="w-full p-2 rounded mb-2 bg-slate-800 text-white border border-slate-600"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />

            <textarea
              placeholder="Description (optional)"
              className="w-full p-2 rounded mb-2 bg-slate-800 text-white border border-slate-600"
              value={newProjectDesc}
              onChange={(e) => setNewProjectDesc(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded text-white bg-slate-700 hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 rounded text-white bg-purple-700 hover:bg-purple-800"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}