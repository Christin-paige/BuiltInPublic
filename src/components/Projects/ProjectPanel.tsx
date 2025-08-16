import { Project } from '@/repositories/projectRepository/project.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { ProjectStatusBadge } from './ProjectStatusBadge';

interface ProjectPanelProps {
  project: Project;
  canEdit: boolean;
}

export default async function ProjectPanel({
  project,
  canEdit,
}: ProjectPanelProps) {
  const { name, description, status, visibility } = project;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <ProjectStatusBadge status={status} />
      </CardHeader>
      <CardDescription className='sr-only'>{`Details of project named: ${name}`}</CardDescription>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
