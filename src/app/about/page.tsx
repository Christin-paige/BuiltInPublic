import { FC } from 'react';

const About: FC = () => {
  return (
    <div className='flex flex-col items-center justify-center pt-45 min-h-screen bg-gradient-to-b from-[#1d1d1d] to-[#86059F] p-8 text-white'>
      <h1 className='text-4xl font-bold text-center mb-8'>
        A space to build, grow, and support each other — one commit at a time
      </h1>

      <section className='w-full max-w-4xl space-y-10 leading-relaxed'>
        <div>
          <h2 className='text-2xl font-semibold mb-3'>
            What is BuiltInPublic?
          </h2>
          <p>
            BuiltInPublic is a community-driven platform where developers build
            out loud, celebrate wins, share struggles, and lift each other up.
            Whether you’re shipping your very first project or polishing your
            tenth pull request, this is your corner of the dev world.
          </p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold mb-3'>Why we built this</h2>
          <p>
            Coding can be isolating—especially when you’re starting out or
            making a career switch. I built BuiltInPublic to change that: a
            place where developers connect, share their journey, and know
            they’re not alone.
          </p>
        </div>

        <div>
          <h2 className='text-2xl font-semibold mb-3'>Who it’s for</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>Self-taught devs</li>
            <li>Career changers</li>
            <li>Bootcamp grads</li>
            <li>Builders who want to work in public</li>
            <li>Curious, kind, growth-minded humans</li>
          </ul>
        </div>

        <div>
          <h2 className='text-2xl font-semibold mb-3'>What you can do here</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>Share updates on your projects</li>
            <li>Ask for feedback (or give some 🙌)</li>
            <li>Document your learning journey</li>
            <li>Connect with devs on a similar path</li>
            <li>Get inspired—and inspire others</li>
          </ul>
        </div>

        <div>
          <h2 className='text-2xl font-semibold mb-3'>The vibe</h2>
          <p className='mb-2'>Community first. Always.</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Progress &gt; perfection</li>
            <li>Encouragement &gt; competition</li>
            <li>Curiosity &gt; comparison</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
