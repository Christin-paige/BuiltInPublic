import StagingAuth from './StagingAuth';

export default async function Page() {
  return (
    <section className='h-full min-h-[90svh] flex flex-col items-center justify-center'>
      <StagingAuth />
    </section>
  );
}
