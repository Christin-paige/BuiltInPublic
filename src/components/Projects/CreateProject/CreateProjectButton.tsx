import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import {
  createProjectSchema,
  CreateProjectSchema,
} from './createProject.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import useUser from '@/hooks/useUser/useUser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { createProject } from './actions';
import UINotification from '@/services/UINotification.service';
import { Plus } from 'lucide-react';
import { useCreateProject } from '@/hooks/useProject/useProject';

export function CreateProjectButton({ canEdit = true }: { canEdit?: boolean }) {
  const { data: user, isLoading: isLoadingUser } = useUser();

  const createMutation = useCreateProject();

  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const submit = async (formData: CreateProjectSchema) => {
    if (user?.id) {
      createMutation.mutate(
        { formData, ownerId: user.id, username: user.username || '' },
        {
          onError: (error) => {
            if (error?.message === 'NEXT_REDIRECT') {
              return;
            } else if (error?.message) {
              UINotification.error(error.message);
            } else {
              UINotification.error('Error creating project');
            }
          },
        }
      );
    }
  };

  const onCloseDialog = () => {
    form.reset();
  };

  const disableSubmit =
    !form.formState.isValid ||
    form.formState.isSubmitting ||
    form.formState.isSubmitted;

  if (!canEdit) {
    return null;
  }

  if (isLoadingUser) {
    return <Skeleton className='h-8 w-32' />;
  }

  return (
    <Dialog onOpenChange={onCloseDialog}>
      <DialogTrigger asChild>
        <Button className='self-end' disabled={isLoadingUser}>
          Create Project
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='backdrop-blur-md'>
        <DialogDescription className='sr-only h-0'>
          {'Create a new project'}
        </DialogDescription>
        <Form {...form}>
          <form
            className='flex flex-col gap-3'
            onSubmit={form.handleSubmit(submit)}
          >
            <DialogHeader>
              <DialogTitle>{'Create Project'}</DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Project Name'}</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter project title...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='self-end' disabled={disableSubmit} type='submit'>
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
