import OnboardingForm from './onboarding-form/OnboardingForm';

export default async function Onboarding() {
  return (
    <main className='flex items-center justify-center w-full h-screen px-4 bg-primary-950/30 relative'>
      <div className="absolute w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-radial from-accent-700 to-primary-700 rounded-full
        blur-3xl opacity-40"
      >
      </div>
      <div className='flex flex-col md:flex-row w-full md:w-fit mx-auto px-4 md:px-8 text-center rounded-md border bg-secondary-950/50 py-8 gap-8 z-10 backdrop-blur-3xl
        md:gap-16 items-center border-secondary-900/70 shadow-md shadow-black/30 transition-all duration-300 ease-in-out hover:border-secondary-800/80'>

        <header className='flex flex-col gap-2'>
          <h1 className='text-5xl text-text-100 font-bold font-subheading'>Welcome!</h1>
          <p className='text-text-200 max-w-md text-lg font-body'>
            Let's finish setting up your profile for BuiltInPublic!
          </p>
        </header>

        <div className='min-w-xs'>
          <OnboardingForm />
        </div>

      </div>
    </main>
  );
}
