import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <section className='w-full h-full flex flex-col items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle className='sr-only'>
            {'Thanks for your interest'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {`Thanks for your interest in Built In Public, we're currently in a closed alpha stage. We'll get back to you soon!`}
        </CardContent>
      </Card>
    </section>
  );
}
