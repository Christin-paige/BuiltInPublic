export default function About() {
    return (
      <div className="flex flex-col items-center justify-center pt-45 min-h-screen bg-gradient-to-b from-[#1d1d1d] to-[#86059F] p-8 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">
          A space to build, grow, and support each other — one commit at a time
        </h1>
  
        <section className="w-full max-w-4xl space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">What is CodeSphere?</h2>
            <p>
              CodeSphere is a community-driven platform designed for developers who want to 
              build in public, share wins and struggles, and support each other in a safe and inclusive space.
              Whether you're working on your first personal project or your tenth pull request,
              this is your corner of the dev world.
            </p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold mb-2">Why we built this</h2>
            <p>
              I created CodeSphere because I know how isolating coding can feel—especially when you're just getting started
              or making a career switch. I wanted to create a space where developers can come together, share their progress, 
              and support each other.
            </p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold mb-2">Who it's for</h2>
            <ul className="list-disc list-inside">
              <li>Self-taught devs</li>
              <li>Career changers</li>
              <li>Bootcamp grads</li>
              <li>Anyone building in public or hoping to</li>
              <li>Curious, kind, and growth-minded humans</li>
            </ul>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold mb-2">What you can do here</h2>
            <ul className="list-disc list-inside">
              <li>Share updates on your personal projects</li>
              <li>Ask for help or feedback</li>
              <li>Document your learning journey</li>
              <li>Connect with other devs who are also figuring it out</li>
              <li>Get inspired—and inspire others</li>
            </ul>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold mb-2">The vibe</h2>
            <p className="mb-2">CodeSphere is community-first. That means:</p>
            <ul className="list-disc list-inside">
              <li>Progress over perfection</li>
              <li>Encouragement over competition</li>
              <li>Curiosity over comparison</li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
  