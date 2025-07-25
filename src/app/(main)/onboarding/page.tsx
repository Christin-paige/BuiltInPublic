import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default async function Onboarding() {
  return (
    <div className='flex items-center justify-center w-full h-screen'>

      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto text-center rounded-md border bg-slate-950">
            
        <div className="w-full md:w-1/2 flex items-center justify-center  p-6">
          <h1>Welcome!</h1>
        </div>
        <div className=''>
          <form className='flex flex-col gap-4'>
          <Input
            className="align-middle text-center"
            id="userName"
            type="text"
            placeholder="username"
            required
          />
          <Input
            className="align-middle text-center"
            id="displayName"
            type="text"
            placeholder="display name"
            required
          />
          <Textarea 
            className="align-middle text-center"
            placeholder="bio" />
          <Button
            variant='outline'
            className='w-full flex items-center gap-2 p-2 cursor-pointer'
            type='submit'
          >
            submit
          </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
