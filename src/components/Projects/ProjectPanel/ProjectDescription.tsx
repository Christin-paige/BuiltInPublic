import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useProjectContext } from '@/contexts/ProjectContext';
import {
  editProjectSchema,
  EditProjectSchema,
} from '@/hooks/useProject/editProject.schema';
import { useEditProject } from '@/hooks/useProject/useProject';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ValidationError } from 'utils/errors/ValidationError';

interface ProjectDescriptionFormProps {
  stopEditing: () => void;
}

function ProjectDescriptionForm({ stopEditing }: ProjectDescriptionFormProps) {
  const { description, id } = useProjectContext();
  const mutation = useEditProject(id);

  const form = useForm<EditProjectSchema>({
    resolver: zodResolver(editProjectSchema),
    mode: 'onChange',
    defaultValues: {
      description: description || '',
    },
  });

  const submit = async (formData: EditProjectSchema) => {
    mutation.mutate(
      { projectId: id, data: formData },
      {
        onSettled: (data, error) => {
          if (error && error instanceof ValidationError) {
            Object.entries(error.validationErrors).forEach(
              ([field, messages]) => {
                form.setError(field as keyof EditProjectSchema, {
                  message: messages.join(', '),
                });
              }
            );
          }

          if (data && data.success) {
            stopEditing();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder={description} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex gap-2 mt-2'>
          <Button type='submit' disabled={disableButton}>
            Save
          </Button>
          <Button variant={'outline'} onClick={stopEditing}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export function ProjectDescription() {
  const { description } = useProjectContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleStopEditing = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  if (isEditing) {
    return (
      <Card className='border-none'>
        <CardHeader className='pl-0'>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <ProjectDescriptionForm stopEditing={handleStopEditing} />
      </Card>
    );
  }

  return (
    <Card className='border-none bg-transparent'>
      <CardHeader className='flex justify-start items-center pl-0'>
        <CardTitle>Description</CardTitle>
        <Button variant={'ghost'} onClick={() => setIsEditing(true)}>
          <Pencil />
        </Button>
      </CardHeader>
      <p className='whitespace-pre-wrap'>{description}</p>
    </Card>
  );
}
