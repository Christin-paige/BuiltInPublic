import OnboardingForm from './onboarding-form/OnboardingForm';

export default async function Onboarding() {
  return (
    <div className='flex items-center justify-center w-full h-screen px-4'>
      <div className='flex flex-col md:flex-row w-full max-w-5xl mx-auto text-center rounded-md border bg-slate-950 overflow-hidden md:h-[75vh]'>
        <div className='w-full md:w-1/2 flex items-center justify-center p-6'>
          <div className='flex-row space-y-4'>
            <h1 className='text-5xl text-white font-bold'>Welcome!</h1>
            <p className='text-white max-w-md text-lg'>
              Let's finish setting up your profile!
            </p>
          </div>
        </div>

        <div className='w-full md:w-1/2 flex items-center justify-center p-6'>
          <OnboardingForm />
        </div>
      </div>
    </div>
  );
}
