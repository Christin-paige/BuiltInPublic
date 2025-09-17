import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Project } from '@/repositories/projectRepository/project.types';
import { ProjectStatusBadge } from '../ProjectStatusBadge';
import ProjectUpdateCard from '../ProjectUpdateCard';
import { ProjectStatusDropdown } from './ProjectStatusDropdown';
import { useProjectContext } from '@/components/Providers/ProjectProvider';
import { ProjectVisibilityDropdown } from './ProjectVisibilityDropdown';
import { ProjectTitle } from './ProjectTitle';
import { ProjectDescription } from './ProjectDescription';
import { ProjectUpdateButton } from './ProjectUpdateButton';

export function ProjectEditPanel() {
  const { name, updates } = useProjectContext();

  return (
    <section className='flex flex-col h-fit md:h-screen gap-2'>
      <Card className='w-full'>
        <CardHeader className='flex flex-col md:flex-row md:justify-between md:items-center'>
          <ProjectTitle />
          <div className='flex gap-2.5 items-center'>
            <ProjectVisibilityDropdown />
            <ProjectStatusDropdown />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className='sr-only'>{`Details of project named: ${name}`}</CardDescription>
          <ProjectDescription />
          <ProjectUpdateButton />
        </CardContent>
      </Card>
      <div className='flex flex-col gap-2 overflow-scroll scroll-hide h-fit md:h-[78vh]'>
        {updates?.map((update) => (
          <ProjectUpdateCard
            key={`${name}-update-${update.id}`}
            createdAt={update.created_at}
            update={update.update}
          />
        ))}
      </div>
    </section>
  );
}
