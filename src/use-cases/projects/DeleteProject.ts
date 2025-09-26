import { BaseMutationUseCase } from "@/use-cases/BaseMutationUseCase";

export interface DeleteProjectParams {
  projectId: string;
}

export class DeleteProject extends BaseMutationUseCase<DeleteProjectParams> {
  async execute(
    params: DeleteProjectParams
  ): Promise<{ success: boolean; message: string }> {
    const { projectId } = params;

    const { error } = await this.supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error(
        `Deleting project failed with: ${JSON.stringify(error, null, 2)} for project id: ${projectId}`
      );
      return { success: false, message: 'Deleting project failed' };
    }

    return { success: true, message: 'Project deleted!' };
  }
}