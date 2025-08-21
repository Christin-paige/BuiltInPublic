import { Pencil } from 'lucide-react';

export default function EditButton({ onClick, label }: { onClick: () => void, label: string }) {
  return (
    <button
      aria-label={`Edit ${label}`}
      className='hover:bg-secondary-950 p-1 cursor-pointer rounded-sm transition-all duration-300 border hover:border-secondary-800 active:scale-95'
      onClick={onClick}
    >
      <Pencil className='h-4 w-4' />
    </button>
  );
}