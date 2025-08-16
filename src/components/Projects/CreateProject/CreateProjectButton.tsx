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

export function CreateProjectButton() {
  const { data: user, isLoading: isLoadingUser } = useUser();

  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
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

  if (isLoadingUser) {
    return <Skeleton className='h-8 w-32' />;
  }

  if (!user) {
    return null;
  }

  return (
    <Dialog>
      <Form {...form}>
        <form>
          <DialogTrigger asChild>
            <Button variant='outline' disabled={isLoadingUser}>
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{'Create Project'}</DialogTitle>
              <DialogDescription>{'Create a new project'}</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Project Name'}</FormLabel>
                  <FormControl>
                    <Input placeholder='new project' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={'outline'} type='submit'>
              Create
            </Button>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
