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

export function CreateProjectButton({ canEdit = true }: { canEdit?: boolean }) {
  const { data: user, isLoading: isLoadingUser } = useUser();

  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const submit = async (formData: CreateProjectSchema) => {
    if (user?.id) {
      const submission = await createProject({
        formData,
        ownerId: user.id,
        username: user.username!,
      });

      if (submission?.errors) {
        form.clearErrors();

        Object.entries(submission.errors).forEach(([field, messages]) => {
          form.setError(field as keyof CreateProjectSchema, {
            type: 'server',
            message: messages.join(', '),
          });
        });
      }

      if (!submission?.success && !submission?.errors) {
        UINotification.error('Creating project failed');
      }
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
        <Button disabled={isLoadingUser}>
          Create Project
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form className='flex flex-col gap-3' onSubmit={form.handleSubmit(submit)}>
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
            <Button disabled={disableSubmit} type='submit'>
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
