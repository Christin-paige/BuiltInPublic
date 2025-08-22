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
    <>
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
      {updates?.map((update) => (
        <ProjectUpdateCard
          key={`${name}-update-${update.id}`}
          createdAt={update.created_at}
          update={update.update}
        />
      ))}
    </>
  );
}
