import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <section className='w-full h-screen flex flex-col items-center justify-center bg-primary-950/30'>
      <Card className='p-6'>
        <CardHeader>
          <CardTitle>{'See you soon!'}</CardTitle>
        </CardHeader>
        <CardContent>
          {`Thanks for your interest in Built In Public, we're currently in a closed alpha stage. We'll get back to you soon!`}
        </CardContent>
      </Card>
    </section>
  );
}
