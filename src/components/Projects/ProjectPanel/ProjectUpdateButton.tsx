'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useProjectContext } from '@/contexts/ProjectContext';
import {
  updateProjectSchema,
  UpdateProjectSchema,
} from '@/hooks/useProject/updateProject.schema';
import { useUpdateProject } from '@/hooks/useProject/useProject';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ValidationError } from 'utils/errors/ValidationError';

export function ProjectUpdateButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const { id } = useProjectContext();
  const mutation = useUpdateProject(id);

  const form = useForm<UpdateProjectSchema>({
    resolver: zodResolver(updateProjectSchema),
    mode: 'onChange',
    defaultValues: {
      update: '',
    },
  });

  const submit = async (formData: UpdateProjectSchema) => {
    mutation.mutate(
      { projectId: id, data: formData },
      {
        onSettled: (data, error) => {
          if (error && error instanceof ValidationError) {
            Object.entries(error.validationErrors).forEach(
              ([field, messages]) => {
                form.setError(field as keyof UpdateProjectSchema, {
                  message: messages.join(', '),
                });
              }
            );
          }

          if (data && data.success) {
            form.reset();
            setDialogIsOpen(false);
          }
        },
      }
    );
  };

  useEffect(() => {
    return () => {
      form.reset();
    };
  }, [form]);

  const disableButton = form.formState.isSubmitting || !form.formState.isValid;

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialogIsOpen(true)}>Add Update</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add a Project Update</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              control={form.control}
              name='update'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={disableButton} type='submit'>
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
