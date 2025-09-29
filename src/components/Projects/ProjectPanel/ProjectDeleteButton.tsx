'use client';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useDeleteProject } from '@/hooks/useProject/useProject';
import { useProjectContext } from '@/components/Providers/ProjectProvider';
import useUser from '@/hooks/useUser/useUser';

export default function ProjectDeleteButton() {
  const { id } = useProjectContext();
  const { data } = useUser();
  const deleteMutation = useDeleteProject();

  const handleDelete = () => {
    if (data?.username) {
      deleteMutation.mutate({ projectId: id, username: data.username });
    }
  };

  return (
    <ConfirmationDialog
      title='Delete Project'
      description='Are you sure you want to delete this project? This action cannot be undone.'
      onConfirm={handleDelete}
    >
      <Button variant='destructive'>Delete Project</Button>
    </ConfirmationDialog>
  );
}
