import { Zap } from "lucide-react";

export default function Stats() {
  return (
    <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3 h-full text-white">
      <h1 className="font-semibold mb-5 text-center">Stats</h1>
      <div className="flex items-center justify-center">
        <Zap className="w-10 h-10 border-solid border-1 p-2 bg-amber-300" />
        <Zap className="w-10 h-10 border-solid border-1 p-2 bg-amber-300" />
        <Zap className="w-10 h-10 border-solid border-1 p-2" />
        <Zap className="w-10 h-10 border-solid border-1 p-2" />
        <Zap className="w-10 h-10 border-solid border-1 p-2" />
      </div>
      <div className="flex items-center justify-center">
        <Zap className="w-10 h-10 border-solid border-1 p-2" />
        <Zap className="w-10 h-10 border-solid border-1 p-2" />
        <Zap className="w-10 h-10 border-solid border-1 p-2" />
        <Zap className="w-10 h-10 border-solid border-1 p-2" />
        <Zap className="w-10 h-10 border-solid border-1 p-2" />
      </div>
      <div>
        <p className="mt-4">2 days in a row of building in public! </p>
      </div>
    </div>
  );
}
