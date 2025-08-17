import { ProjectVisibility } from '@/repositories/projectRepository/project.types';
import { useUpdateProject } from '@/hooks/useProject/useProject';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ProjectVisibilityBadge } from '../ProjectVisibilityBadge';

const PROJECT_VISIBILITIES: { value: ProjectVisibility; label: string }[] = [
  { value: 'public', label: 'public' },
  { value: 'private', label: 'private' },
];

export function ProjectVisibilityDropdown() {
  const { id, visibility } = useProjectContext();
  const mutation = useUpdateProject(id);

  const handleVisibilityChange = useCallback(
    (newVisibility: ProjectVisibility) => {
      if (newVisibility !== visibility) {
        mutation.mutate({
          projectId: id,
          data: { visibility: newVisibility },
        });
      }
    },
    [mutation, visibility, id]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='cursor-pointer'>
          <ProjectVisibilityBadge visibility={visibility} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-40'>
        {PROJECT_VISIBILITIES.map((visibilityOption) => (
          <DropdownMenuItem
            key={visibilityOption.value}
            onClick={() => handleVisibilityChange(visibilityOption.value)}
            className={visibility === visibilityOption.value ? 'bg-accent' : ''}
          >
            {visibilityOption.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
