import { useProjectContext } from '@/components/Providers/ProjectProvider';
import { useEditProject } from '@/hooks/useProject/useProject';
import { useForm } from 'react-hook-form';
import {
  editProjectSchema,
  EditProjectSchema,
} from '../../../hooks/useProject/editProject.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationError } from 'utils/errors/ValidationError';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

interface ProjectTitleFormProps {
  stopEditing: () => void;
}

function ProjectTitleForm({ stopEditing }: ProjectTitleFormProps) {
  const { name, id } = useProjectContext();
  const mutation = useEditProject(id);

  const form = useForm<EditProjectSchema>({
    resolver: zodResolver(editProjectSchema),
    mode: 'onChange',
    defaultValues: {
      name: name,
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

  const disableButton = !form.formState.isValid || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={name} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex gap-x-2 mt-4 justify-end'>
          <Button
            variant='outline'
            onClick={(e) => {
              e.preventDefault();
              stopEditing();
            }}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={disableButton}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export function ProjectTitle() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { name } = useProjectContext();

  const handleStopEditing = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  return (
    <div className='flex gap-x-4 items-center'>
      <span>{name}</span>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogTrigger asChild>
          <Button variant='ghost' onClick={() => setIsEditing(true)}>
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle className='sr-only'>
            {"Set your project's name"}
          </DialogTitle>
        </DialogHeader>
        <DialogContent className='backdrop-blur-md'>
          <DialogDescription className='sr-only h-0'>
            {"Set your project's name"}
          </DialogDescription>
          <DialogTitle>{"Set your project's name"}</DialogTitle>
          <ProjectTitleForm stopEditing={handleStopEditing} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
