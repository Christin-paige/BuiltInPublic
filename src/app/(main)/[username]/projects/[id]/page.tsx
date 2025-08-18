import { notFound } from 'next/navigation';
import { getProjectById } from '@/hooks/useProject/actions';
import ProjectUpdateCard from '@/components/Projects/ProjectUpdateCard';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ username: string; id: string }>;
}) {
  const { username, id } = await params;

  const project = await getProjectById(id);
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
      {/* Header + Description block */}
      <section className="rounded-[22px] border-2 border-white/25 bg-[#111318] p-5 md:p-6 mb-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          {/* Title pill */}
          <div className="inline-block rounded-xl border border-[#6aa7ff]/70 px-4 py-2 text-[15px] font-semibold text-[#cfe2ff]">
            {project.name}
          </div>

          {/* Status update pill */}
          <button
            type="button"
            className="rounded-xl border border-emerald-500/70 px-3 py-1 text-xs font-medium text-emerald-300 hover:bg-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          >
            status&nbsp;update
          </button>
        </div>

        {/* Big description box */}
        <div className="rounded-[22px] border-2 border-[#6aa7ff]/70 p-5">
          <p className="text-[15px] leading-7 text-[#9cc5ff]">
            {project.description ?? 'No description provided.'}
          </p>
        </div>
      </section>

      {/* Updates */}
      <section className="space-y-4">
        {project.updates?.length ? (
          project.updates.map((u) => (
            <ProjectUpdateCard
              key={u.id}
              createdAt={u.createdAt}
              text={u.text ?? ''}
            />
          ))
        ) : (
          <div className="rounded-[22px] border-2 border-white/25 bg-[#111318] p-5 text-sm text-slate-400 italic">
            No updates yet
          </div>
        )}
      </section>
    </main>
  );
}