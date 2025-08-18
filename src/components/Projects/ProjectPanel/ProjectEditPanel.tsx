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
import { useProjectContext } from '@/contexts/ProjectContext';
import { ProjectVisibilityDropdown } from './ProjectVisibilityDropdown';
import { ProjectTitle } from './ProjectTitle';

export function ProjectEditPanel() {
  const { name, description, updates } = useProjectContext();
  return (
    <>
      <Card>
        <CardHeader className='flex justify-between items-center'>
          <ProjectTitle />
          <div className='flex gap-2.5 items-center'>
            <ProjectVisibilityDropdown />
            <ProjectStatusDropdown />
          </div>
        </CardHeader>
        <CardDescription className='sr-only'>{`Details of project named: ${name}`}</CardDescription>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Card>
      {updates?.map((update) => (
        <ProjectUpdateCard
          key={`${name}-update-${update.id}`}
          createdAt={update.createdAt}
          text={update.text}
        />
      ))}
    </>
  );
}
