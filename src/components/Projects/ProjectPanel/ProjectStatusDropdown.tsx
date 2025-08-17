import { ProjectStatus } from '@/repositories/projectRepository/project.types';
import { useForm } from 'react-hook-form';
import {
  updateProjectSchema,
  UpdateProjectSchema,
} from './updateProject.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProject } from '@/hooks/useProject/useProject';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ProjectStatusBadge } from '../ProjectStatusBadge';

const PROJECT_STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: 'planning', label: 'planning' },
  { value: 'in-progress', label: 'in-progress' },
  { value: 'on-hold', label: 'on-hold' },
  { value: 'completed', label: 'completed' },
  { value: 'launched', label: 'launched' },
];

export function ProjectStatusDropdown() {
  const { id, status } = useProjectContext();
  const mutation = useUpdateProject(id);

  const handleStatusChange = useCallback(
    (newStatus: ProjectStatus) => {
      if (newStatus !== status) {
        mutation.mutate({ projectId: id, data: { status: newStatus } });
      }
    },
    [mutation, status, id]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='cursor-pointer'>
          <ProjectStatusBadge status={status} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-40'>
        {PROJECT_STATUSES.map((statusOption) => (
          <DropdownMenuItem
            key={statusOption.value}
            onClick={() => handleStatusChange(statusOption.value)}
            className={status === statusOption.value ? 'bg-accent' : ''}
          >
            {statusOption.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
