'use client';

import { useForm } from 'react-hook-form';
import StagingAuthSchema, { StagingAuthSchemaType } from './stagingAuth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authenticateStaging } from './actions';

export default function StagingAuth() {
  const form = useForm<StagingAuthSchemaType>({
    resolver: zodResolver(StagingAuthSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (formData: StagingAuthSchemaType) => {
    return await authenticateStaging(formData);
  };

  return (
    <section>
      <Card>
        <CardTitle>{'Access Staging Environment'}</CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Password'}</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormDescription>
                    {'Enter staging environment password'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </Card>
    </section>
  );
}
