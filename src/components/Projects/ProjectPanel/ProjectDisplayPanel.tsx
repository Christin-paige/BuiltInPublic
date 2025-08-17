import { Project } from '@/repositories/projectRepository/project.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { ProjectStatusBadge } from '../ProjectStatusBadge';
import ProjectUpdateCard from '../ProjectUpdateCard';

interface ProjectPanelProps {
  project: Project;
}

export function ProjectDisplayPanel({ project }: ProjectPanelProps) {
  const { name, description, status, visibility, updates, externalUrl } =
    project;

  return (
    <>
      <Card>
        <CardHeader className='flex justify-between'>
          <CardTitle>{name}</CardTitle>
          <ProjectStatusBadge status={status} />
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
