import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default async function Onboarding() {
  return (
    <div className="flex items-center justify-center w-full h-screen px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto text-center rounded-md border bg-slate-950 overflow-hidden md:h-[75vh]">

        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="flex-row space-y-4">
            <h1 className="text-5xl text-white font-bold">Welcome!</h1>
            <p className="text-white max-w-md text-lg">Let's finish setting up your profile!</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <form className="flex flex-col gap-4 w-full max-w-sm items-center">
            <Input
              className="text-center"
              id="userName"
              type="text"
              placeholder="username"
              required
            />
            <Input
              className="text-center"
              id="displayName"
              type="text"
              placeholder="display name"
              required
            />
            <Textarea className="text-center" placeholder="bio" />
            <Button
              variant="outline"
              className="w-1/2 flex items-center gap-2 p-2 cursor-pointer justify-center"
              type="submit"
            >
              submit
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
