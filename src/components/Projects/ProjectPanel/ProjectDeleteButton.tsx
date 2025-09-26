'use client';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useDeleteProject } from '@/hooks/useProject/useProject';
import { useProjectContext } from '@/components/Providers/ProjectProvider';

export default function ProjectDeleteButton() {

  const { id } = useProjectContext();
  const deleteMutation = useDeleteProject(id);

  const handleDelete = () => {
    deleteMutation.mutate({ projectId: id });
  }

  return (
    <ConfirmationDialog
      title="Delete Project"
      description="Are you sure you want to delete this project? This action cannot be undone."
      onConfirm={handleDelete}
    >
      <Button variant="destructive">
        Delete Project
      </Button>
    </ConfirmationDialog>
  )
}